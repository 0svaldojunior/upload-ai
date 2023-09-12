import { Github } from 'lucide-react'
import { ComponentProps } from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export type HeaderProps = ComponentProps<'div'>

export function Header(props: HeaderProps) {
  return (
    <div
      className="flex items-center justify-between border-b px-6 py-3"
      {...props}
    >
      <h1 className="text-xl font-bold">upload.ai</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Desenvolvido com ❤️
        </span>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="outline">
          <Github className="mr-2 h-4 w-4" />
          Github
        </Button>
      </div>
    </div>
  )
}
