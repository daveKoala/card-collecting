<script setup lang="ts">
import BaseCard, { type CardProps } from './BaseCard.vue'

interface Props {
  card: CardProps
}

defineProps<Props>()

const emit = defineEmits<{
  click: [card: CardProps]
}>()
</script>

<template>
  <BaseCard :card="card" @click="emit('click', $event)">
    <template #card-content>
      <!-- Display the card image if collected -->
      <img
        v-if="card.collected && card.image"
        :src="card.image"
        :alt="card.name"
        class="badge-image"
      />
    </template>
  </BaseCard>
</template>

<style scoped>
/* Badge-specific styles are in main.css under .card.badge */
.badge-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* padding: 20px; */
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}
</style>
