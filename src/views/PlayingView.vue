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
    <div class="playing-view">
        <WonView 
            v-if="gameStore.isComplete"
            :score="gameStore.score"
            :elapsed="gameStore.elapsedTimeFormatted"
            :finalScore="gameStore.finalScore"
            @play-again="gameStore.startGame"
            @save-score="handleSaveScore"
        />

        <div v-else class="game-container">
            <div class="game-header">
                <h1 class="game-title">Memory</h1>

                <div class="button-group">

                    <button 
                        v-if="gameStore.cards.length > 0"
                        class="btn btn-warning" 
                        @click="gameStore.resetGame"
                    >
                        Reset
                    </button>

                    <button 
                        v-else
                        class="btn btn-primary" 
                        @click="gameStore.startGame"
                        >
                        Start Game
                    </button>

                    <button
                        class="btn"
                        @click="router.push('/highscores')"
                    >
                        High Scores
                    </button>

                   
                </div>
            </div>
            <div v-if="gameStore.cards.length > 0">
                <ScoreBoard
                :score="gameStore.score"
                :elapsed="gameStore.elapsedTimeFormatted"
                :progress="gameStore.progress"
            />

                <div class="card-grid">
                    <Card
                        v-for="card in gameStore.cards"
                        :key="card.id"
                        :card="card"
                        @card-clicked="gameStore.flipCard"
                    />
                </div>
            </div>
            
            <div v-else class="empty-state">
                <h2>Memory</h2>
                <p>Click Start Game to begin</p>
                <button 
                    class="btn btn-primary start-large-btn"
                    @click="gameStore.startGame"
                >
                    Start Game
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.playing-view {
    width: 100%;
    min-height: 100vh;
    background: var(--bg-base);
    font-family: var(--font-sans);
    padding: var(--space-lg);
    box-sizing: border-box;
}

.game-container {
    max-width: 600px;
    margin: 0 auto;
}

.game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-lg);
    color: var(--text-primary);
}

.game-title {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
}

.button-group {
    display: flex;
    gap: var(--space-sm);
}

.btn {
    padding: var(--space-sm) var(--space-md);
    font-size: 13px;
    font-weight: 500;
    font-family: inherit;
    border: 1px solid var(--border-medium);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    background: var(--bg-surface-raised);
    color: var(--text-secondary);
}

.btn:hover {
    background: var(--bg-surface-elevated);
    color: var(--text-primary);
    border-color: var(--border-strong);
}

.btn-primary {
    background: var(--accent);
    color: var(--text-inverse);
    border-color: transparent;
}

.btn-primary:hover {
    background: var(--accent-hover);
    color: var(--text-inverse);
}

.btn-warning {
    background: var(--warning-subtle);
    color: var(--warning);
    border-color: var(--warning);
}

.btn-warning:hover {
    background: var(--warning);
    color: var(--text-inverse);
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-2xl) var(--space-md);
    color: var(--text-primary);
    text-align: center;
}

.empty-state h2 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: var(--space-md);
    letter-spacing: -0.02em;
}

.empty-state p {
    color: var(--text-muted);
    margin-bottom: var(--space-xl);
    font-size: 15px;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-md);
    justify-items: center;
}

.start-large-btn {
    padding: 16px 40px;
    font-size: 16px;
}

@media (max-width: 500px) {
    .playing-view {
        padding: var(--space-md);
    }

    .card-grid {
        gap: var(--space-sm);
    }

    .button-group {
        flex-direction: column;
        gap: var(--space-xs);
    }
}
</style>