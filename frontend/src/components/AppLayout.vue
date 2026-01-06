<script setup lang="ts">
import { ref, onMounted } from 'vue'

const labelMode = ref<'none' | 'dupes' | 'full'>('none')
const theme = ref<'light' | 'dark'>('dark')

// Initialize theme from localStorage or system preference
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light' || savedTheme === 'dark') {
    theme.value = savedTheme
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    theme.value = 'light'
  }
  applyTheme()
})

const applyTheme = () => {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme.value)
  localStorage.setItem('theme', theme.value)
}

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme()
}

const toggleLabels = () => {
  const modes: Array<'none' | 'dupes' | 'full'> = ['none', 'dupes', 'full']
  const currentIndex = modes.indexOf(labelMode.value)
  labelMode.value = modes[(currentIndex + 1) % modes.length]
}

const getLabelButtonText = () => {
  switch (labelMode.value) {
    case 'none':
      return 'Show labels'
    case 'dupes':
      return 'Show all labels'
    case 'full':
      return 'Hide labels'
  }
}
</script>

<template>
  <div class="app" :data-label-mode="labelMode">
    <header>
      <div class="title-wrap">
        <h1>Album Page Layout</h1>
        <p class="subtitle">
          Card collection manager with repeating blocks
        </p>
      </div>

      <div class="controls">
        <button class="btn" @click="toggleTheme" type="button">
          {{ theme === 'dark' ? 'Light mode' : 'Dark mode' }}
        </button>
        <button class="btn" @click="toggleLabels" type="button">
          {{ getLabelButtonText() }}
        </button>
      </div>
    </header>

    <main>
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 1040px;
  margin: 0 auto;
  padding: 18px 18px 40px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.title-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

h1 {
  font-size: 18px;
  margin: 0;
  letter-spacing: 0.2px;
}

.subtitle {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
    align-items: flex-start;
  }

  .controls {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
