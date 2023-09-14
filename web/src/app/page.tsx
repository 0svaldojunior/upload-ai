import { Aside } from '@/components/Aside'
import { Header } from '@/components/Header'
import { Main } from '@/components/Main'
import { ContextVariable } from '@/context/ContextVariable'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <ContextVariable>
        <div className="flex flex-1 gap-6 p-6">
          <Main />
          <Aside className="w-80 space-y-6" />
        </div>
      </ContextVariable>
    </div>
  )
}
