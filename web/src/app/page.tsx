import { Header } from '@/components/Header'
import { Main } from '@/components/Main'
import { ModelForm } from '@/components/ModelForm'
import { SelectVideo } from '@/components/SelectVideo'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Upload } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1 gap-6 p-6">
        <Main />
        <aside className="w-80 space-y-6">
          <form action="" className="space-y-6">
            <SelectVideo />

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="transcription-prompt">
                Prompt de transcrição
              </Label>

              <Textarea
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

          <Separator />

          <ModelForm />
        </aside>
      </div>
    </div>
  )
}
