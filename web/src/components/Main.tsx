'use client'

import { useContextVariable } from '@/context/ContextVariable'
import { ComponentProps } from 'react'
import { Textarea } from './ui/textarea'

export type MainProps = ComponentProps<'div'>

export function Main(props: MainProps) {
  const { input, handleInputChange, completion } = useContextVariable()

  return (
    <div className="flex flex-1 flex-col gap-4" {...props}>
      <div className="grid flex-1 grid-rows-2 gap-4">
        <Textarea
          placeholder="Inclua o prompt para a IA..."
          className="resize-none p-4 leading-relaxed"
          value={input}
          onChange={handleInputChange}
        />
        <Textarea
          placeholder="Resultado gerado pela IA..."
          readOnly
          className="resize-none p-4 leading-relaxed"
          value={completion}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Lembre-se: você pode utilizar a variável{' '}
        <code className="text-violet-400">{'{transcription}'}</code> no seu
        prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
      </p>
    </div>
  )
}
