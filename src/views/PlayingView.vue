<script setup lang="ts">
import Card from '../components/Card.vue'
import { useGameStore } from '../stores/gameStore.ts'
import ScoreBoard from '../components/ScoreBoard.vue'
import WonView from '../views/WonView.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const gameStore = useGameStore()

const router = useRouter()

function handleSaveScore(name: string) {
    gameStore.saveHighScore(name)
    router.push('/highscores')
}

onMounted(() => {
    gameStore.loadHighScores()
})

</script>

<template>
    <WonView 
        v-if="gameStore.isComplete"
        :score="gameStore.score"
        :elapsed="gameStore.elapsedTimeFormatted"
        :finalScore="gameStore.finalScore"
        @play-again="gameStore.startGame"
        @save-score="handleSaveScore"
    />

    <div v-else>
        <button @click="gameStore.startGame">Start Game</button>
        <button @click="gameStore.resetGame">Reset</button>
    
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
    </div>
</template>