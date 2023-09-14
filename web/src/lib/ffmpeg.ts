import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL } from '@ffmpeg/util'

const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd'

let ffmpeg: FFmpeg | null

export async function getFFmpeg() {
  if (ffmpeg) {
    return ffmpeg
  }
  const coreURL = await toBlobURL(
    `${baseURL}/ffmpeg-core.js`,
    'text/javascript',
  )
  const wasmURL = await toBlobURL(
    `${baseURL}/ffmpeg-core.wasm`,
    'application/wasm',
  )
  const workerURL = await toBlobURL(
    `${baseURL}/ffmpeg-worker.js`,
    'text/javascript',
  )

  ffmpeg = new FFmpeg()

  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL,
      wasmURL,
      workerURL,
    })
  }

  return ffmpeg
}
