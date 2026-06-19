<script setup lang="ts">
import Card from '../components/Card.vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
</script>

<template>
    <button @click="gameStore.startGame">Start Game</button>
    
    <div class="card-grid">
        <Card
            v-for="card in gameStore.cards"
            :key="card.id"
            :card="card"
            @card-clicked="gameStore.flipCard"
        />
    </div>
</template>