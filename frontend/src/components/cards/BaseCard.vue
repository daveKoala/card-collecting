<script setup lang="ts">
import type { Card } from '@/types/card'

export type CardProps = Card

interface Props {
  card: Card
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [card: Card]
}>()

const handleClick = () => {
  if (props.card.collected) {
    emit('click', props.card)
  }
}
</script>

<template>
  <div
    :class="['card', card.type, { missing: !card.collected }]"
    :data-dup="card.duplicates"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
    :tabindex="card.collected ? 0 : -1"
    role="button"
    :aria-label="card.collected ? `View ${card.name} card` : `${card.name} - Not collected`"
  >
    <div class="img">
      <slot name="card-content"></slot>
    </div>
    <div class="frame"></div>

    <div v-if="card.collected" class="label">
      <span class="name">{{ card.name }}</span>
      <span class="type">{{ card.rarity }}</span>
    </div>
    <div v-else class="silhouette">{{ card.name }}</div>

    <div v-if="card.duplicates > 1" class="dup">×{{ card.duplicates }}</div>
  </div>
</template>

<style scoped>
/* Card-specific styles are inherited from main.css */
/* This component focuses on structure and behavior */
</style>
