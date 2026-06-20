<script setup lang="ts">
import Card from '../components/Card.vue'
import { useGameStore } from '../stores/gameStore.ts'
import ScoreBoard from '../components/ScoreBoard.vue'

const gameStore = useGameStore()
</script>

<template>
    <button @click="gameStore.startGame">Start Game</button>
    
    <div class="score-board">
        <ScoreBoard
            :score="gameStore.score"
            :elapsed="gameStore.elapsedTimeFormatted"
            :progress="gameStore.progress"
        />
    </div>
    
    <div class="card-grid">
        <Card
            v-for="card in gameStore.cards"
            :key="card.id"
            :card="card"
            @card-clicked="gameStore.flipCard"
        />
    </div>
</template>