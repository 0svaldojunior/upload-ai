'use client'

import { useCompletion } from 'ai/react'
import {
  ChangeEvent,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react'

type ContextVariableType = {
  input: string
  setInput: (newString: string) => void
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void
  temperature: number
  setTemperature: (newInput: number) => void
  videoId: string | null
  setVideoId: (newInput: string) => void
}

const ContextVariableContext = createContext<ContextVariableType | undefined>(
  undefined,
)

export function ContextVariable({ children }: { children: ReactNode }) {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const { input, setInput, handleInputChange } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
  })

  return (
    <ContextVariableContext.Provider
      value={{
        input,
        setInput,
        handleInputChange,
        temperature: 0.5,
        setTemperature,
        videoId: null,
        setVideoId,
      }}
    >
      {children}
    </ContextVariableContext.Provider>
  )
}

export function useContextVariable() {
  const context = useContext(ContextVariableContext)

  if (context === undefined) {
    throw new Error('useContextVariable must be used within a ContextVariable.')
  }

  return context
}
