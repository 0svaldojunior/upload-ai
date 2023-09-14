'use client'

import { getFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { Upload } from 'lucide-react'
import {
  ChangeEvent,
  ComponentProps,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from 'react'
import { SelectVideo } from './SelectVideo'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'

export type VideoInputFormProps = ComponentProps<'form'>

export function VideoInputForm(props: VideoInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) return

    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  async function convertVideoToAudio(video: File) {
    console.log('Convert started.')

    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // ffmpeg.on('log', (log) => {
    //   console.log(log)
    // })

    ffmpeg.on('progress', (progress) => {
      console.log('Convert progress: ' + Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg',
    })

    console.log('Convert finished')

    return audioFile
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) return

    const audioFile = await convertVideoToAudio(videoFile)

    console.log(audioFile, prompt)
  }

  const previewURL = useMemo(() => {
    if (!videoFile) return null

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6" {...props}>
      <SelectVideo onChange={handleFileSelected} previewURL={previewURL} />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription-prompt">Prompt de transcrição</Label>

        <Textarea
          ref={promptInputRef}
          id="transcription-prompt"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
          className="h-20 resize-none leading-relaxed"
        />
      </div>

      <Button type="submit" className="w-full">
        Carregar vídeo
        <Upload className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}
