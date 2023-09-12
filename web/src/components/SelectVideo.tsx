import { FileVideo } from 'lucide-react'

export function SelectVideo() {
  return (
    <>
      <label
        htmlFor="video"
        className={`
          flex aspect-video cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-sm
          text-muted-foreground hover:bg-primary/5
        `}
      >
        <FileVideo className="h4 w-4" />
        Selecione um vídeo
      </label>

      <input type="file" id="video" accept="video/mp4" className="sr-only" />
    </>
  )
}
