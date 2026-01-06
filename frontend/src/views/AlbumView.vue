<script setup lang="ts">
import { ref } from 'vue'
import { BadgeCard, LandscapeCard, PortraitCard, type CardProps } from '@/components/cards'
import { useCardsStore } from '@/stores/cards'

type Card = CardProps

const cardsStore = useCardsStore()

const selectedCard = ref<Card | null>(null)
const modalOpen = ref(false)

const openCard = (card: Card) => {
  if (!card.collected) return
  selectedCard.value = card
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  selectedCard.value = null
}
</script>

<template>
  <section class="album-shell">
    <div class="album-header">
      <div class="left">
        <div class="album-name">Sub-album: Disney Classics — Page A</div>
        <div class="album-meta">
          Structure identical per subset · Accessible text on inspect
        </div>
      </div>
      <div class="album-meta">
        <span class="pill">
          <strong>{{ cardsStore.stats.collected }}</strong> collected ·
          <strong>{{ cardsStore.stats.missing }}</strong> missing ·
          <strong>{{ cardsStore.stats.duplicates }}</strong> duplicates
        </span>
      </div>
    </div>

    <div class="album-body">
      <div v-for="block in cardsStore.blocks" :key="block.id" class="block">
        <!-- First row: badge + landscape -->
        <div class="row-hero">
          <template v-for="card in block.cards.slice(0, 2)" :key="card.id">
            <BadgeCard v-if="card.type === 'badge'" :card="card" @click="openCard" />
            <LandscapeCard v-else-if="card.type === 'landscape'" :card="card" @click="openCard" />
          </template>
        </div>

        <!-- Portrait rows: render all portraits dynamically -->
        <div class="row-portraits">
          <PortraitCard
            v-for="card in block.cards.slice(2)"
            :key="card.id"
            :card="card"
            @click="openCard"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Modal -->
  <div :class="['modal-backdrop', { open: modalOpen }]" @click="closeModal">
    <div class="modal" @click.stop tabindex="-1">
      <header>
        <h2 id="modalTitle">Card details</h2>
        <button class="close" @click="closeModal" type="button" aria-label="Close">
          Close
        </button>
      </header>
      <div v-if="selectedCard" class="content">
        <div class="preview">
          <div :class="['img', selectedCard.type]"></div>
        </div>
        <div class="meta">
          <div class="kv">
            <span class="tag">{{ selectedCard.name }}</span>
            <span class="tag">{{ selectedCard.rarity }}</span>
            <span class="tag">{{ selectedCard.type }}</span>
            <span v-if="selectedCard.duplicates > 1" class="tag">
              ×{{ selectedCard.duplicates }}
            </span>
          </div>
          <p class="desc">
            This is a placeholder description for the {{ selectedCard.name }} card. In a real
            application, this would contain detailed information about the card, its history, and
            significance in the collection.
          </p>
          <div class="actions">
            <button class="btn" type="button">Find trade</button>
            <button class="btn" type="button">Toggle open-to-trade</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles are inherited from main.css */
</style>
