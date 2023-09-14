'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

type ContextVariableType = {
  inputPrompt: string
  setInputPrompt: (newInput: string) => void
}

const ContextVariableContext = createContext<ContextVariableType | undefined>(
  undefined,
)

export function ContextVariable({ children }: { children: ReactNode }) {
  const [inputPrompt, setInputPrompt] = useState('')

  return (
    <ContextVariableContext.Provider value={{ inputPrompt, setInputPrompt }}>
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
