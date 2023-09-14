'use client'

import { useContextVariable } from '@/context/ContextVariable'
import { Wand2 } from 'lucide-react'
import { ComponentProps } from 'react'
import { PromptSelect } from './PromptSelect'
import { VideoInputForm } from './VideoInputForm'
import { Button } from './ui/button'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Separator } from './ui/separator'
import { Slider } from './ui/slider'

export type AsideProps = ComponentProps<'aside'>

export function Aside({ ...props }: AsideProps) {
  const {
    temperature,
    setTemperature,
    setVideoId,
    setInput,
    handleSubmit,
    isLoading,
  } = useContextVariable()

  return (
    <aside className="space-y-6" {...props}>
      <VideoInputForm onVideoUploaded={setVideoId} />

      <Separator />

      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label>Prompt</Label>

          <PromptSelect onPromptSelected={setInput} />
        </div>

        <div className="space-y-2">
          <Label>Modelo</Label>

          <Select disabled defaultValue="gpt3.5">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
            </SelectContent>
          </Select>

          <span className="block text-xs italic text-muted-foreground">
            Você poderá customizar essa opção em breve
          </span>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label>Temperatura</Label>

          <Slider
            min={0}
            max={1}
            step={0.1}
            value={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
          />

          <span className="block text-xs italic leading-relaxed text-muted-foreground">
            Valores mais altos tendem a deixar o resultado mais criativo e com
            possíveis erros.
          </span>
        </div>

        <Separator />

        <Button disabled={isLoading} type="submit" className="w-full">
          Executar
          <Wand2 className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </aside>
  )
}
