import { FileVideo } from 'lucide-react'

import { ComponentProps } from 'react'

export type SelectVideoProps = ComponentProps<'input'> & {
  previewURL: string | null
}

export function SelectVideo({ previewURL, ...props }: SelectVideoProps) {
  return (
    <>
      <label
        htmlFor="video"
        className={`
          relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-md border border-dashed
          text-sm text-muted-foreground hover:bg-primary/5
        `}
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0 aspect-video"
          />
        ) : (
          <>
            <FileVideo className="h4 w-4" />
            Selecione um vídeo
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        {...props}
      />
    </>
  )
}
