let audio: HTMLAudioElement | null = null
let timeoutId: ReturnType<typeof setTimeout> | null = null
let isMuted = false

export function playAudio(url: string) {
  if (audio) {
    audio.pause()
    audio.currentTime = 0
  }

  audio = new Audio()
  audio.preload = 'auto'
  audio.src = url

  audio.addEventListener(
    'loadeddata',
    () => {
      audio?.play().catch(() => {})
    },
    { once: true },
  )
  audio.muted = isMuted

  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    audio?.pause()
    audio = null
  }, 37_000)
}

export function stopAudio() {
  if (audio) {
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
  }
  if (timeoutId) clearTimeout(timeoutId)
}

export function muteAudio(mute: boolean = true) {
  isMuted = mute
  if (audio) {
    audio.muted = mute
  }
}

export function toggleMuteAudio(): boolean {
  const next = !isMuted
  muteAudio(next)
  return next
}

export function isAudioMuted(): boolean {
  return isMuted
}
