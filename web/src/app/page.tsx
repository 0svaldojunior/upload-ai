import { Header } from '@/components/Header'
import { Main } from '@/components/Main'
import { ModelForm } from '@/components/ModelForm'
import { Separator } from '@/components/ui/separator'
import { VideoInputForm } from '@/components/VideoInputForm'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1 gap-6 p-6">
        <Main />
        <aside className="w-80 space-y-6">
          <VideoInputForm />

          <Separator />

          <ModelForm />
        </aside>
      </div>
    </div>
  )
}
