<template>
  <div class="video-wrapper">
    <!-- Видео без штатных контролов -->
    <video
      ref="videoRef"
      :src="src"
      :poster="poster"
      class="html-video"
      preload="metadata"
      playsinline
    />

    <!-- Кастомная кнопка «Play» (показывается только когда ролик не играет) -->
    <ui-button-base
      v-if="!isPlaying"
      icon="play"
      class="play-btn"
      size="52"
      @click="handlePlay"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Принимаем путь (или URL) к видеоролику */
defineProps<{ src: string; poster?: string }>()

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)

/** Запуск воспроизведения по нажатию кастомной кнопки */
function handlePlay() {
  if (!videoRef.value) return
  videoRef.value.currentTime = 0 // на случай повторного просмотра
  videoRef.value.play() // начинается событие «play»
}

onMounted(() => {
  if (!videoRef.value) return

  /** Синхронизация видимости кнопки с реальным состоянием плеера */
  const handlePlayEvent = () => (isPlaying.value = true)
  const handlePauseEvent = () => (isPlaying.value = false)
  const handleEndedEvent = () => (isPlaying.value = false)

  videoRef.value.addEventListener('play', handlePlayEvent)
  videoRef.value.addEventListener('pause', handlePauseEvent)
  videoRef.value.addEventListener('ended', handleEndedEvent)

  onBeforeUnmount(() => {
    videoRef.value?.removeEventListener('play', handlePlayEvent)
    videoRef.value?.removeEventListener('pause', handlePauseEvent)
    videoRef.value?.removeEventListener('ended', handleEndedEvent)
  })
})
</script>

<style scoped lang="scss">
.video-wrapper {
  position: relative;
  width: 100%;
  height: 218px;
  border-radius: 22px;
  overflow: hidden;
  background-color: var(--dark-800);
}

.html-video {
  display: block;
  width: 100%;
  height: 100%;
}

.play-btn {
  @include center;
}
</style>
