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
        class="portrait-image"
      />
    </template>
  </BaseCard>
</template>

<style scoped>
/* Portrait-specific styles are in main.css under .card.portrait */
.portrait-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
}
</style>
