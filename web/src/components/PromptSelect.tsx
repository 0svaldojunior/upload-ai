'use client'

import { useContextVariable } from '@/context/ContextVariable'
import { api } from '@/lib/axios'
import { ComponentProps, useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

type Prompt = {
  id: string
  title: string
  template: string
}

export type PromptSelectProps = ComponentProps<typeof Select> & {
  onPromptSelected: (template: string) => void
}

export function PromptSelect({
  onPromptSelected,
  ...props
}: PromptSelectProps) {
  const [prompts, setProps] = useState<Prompt[] | null>(null)

  const { setInputPrompt } = useContextVariable()

  useEffect(() => {
    api.get('/prompts').then((response) => {
      setProps(response.data)
    })
  }, [])

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId)

    if (!selectedPrompt) return

    onPromptSelected(selectedPrompt.template)
    setInputPrompt(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected} {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>

      <SelectContent>
        {prompts?.map((prompt) => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
