<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore';
import { padZero } from '../utils/string';
import { onMounted } from 'vue';

const gameStore = useGameStore()
const router = useRouter()

onMounted(() => {
    gameStore.loadHighScores()
})

function goHome(): void {
    router.push('/')
}
</script>

<template>
    <div class="highscores-container">
        <div class="header">
            <h1 class="page-title">High Scores</h1>
            <button 
                class="back-button" 
                id="back-btn"
                @click="goHome"
                >
                ← Back
            </button>
        </div>

        <div class="scores-list" v-if="gameStore.highScores.length === 0">
            <div class="empty-state">
                <p class="empty-state-text">
                    No scores yet. Play a game to set the first record.
                </p>
            </div>
        </div>

        <div class="scores-list" v-else>
            <div 
                class="score-row"
                v-for="(entry, index) in gameStore.highScores"
                :key="entry.name + entry.score"
            >
                <div class="rank-cell">
                    <span class="rank-badge">
                        {{ padZero(index + 1) }}
                    </span>
                </div>

                <div class="name-cell">{{ entry.name }}</div>

                <div class="details-cell">
                    <span>{{ entry.pairs }}P</span>
                    <span>{{ entry.attempts }}T</span>
                </div>

                <div class="time-cell">{{ entry.time }}</div>
                <div class="score-cell">{{ entry.score }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.highscores-container {
    max-width: 640px;
    min-height: 100vh;
    margin: 0 auto;
    padding: var(--space-lg);
    background: var(--bg-base);
    font-family: var(--font-sans);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-xl);
}

.page-title {
    font-size: 24px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.02em;
}

.back-button {
    padding: var(--space-sm) var(--space-md);
    font-size: 13px;
    font-weight: 500;
    font-family: inherit;
    color: var(--text-secondary);
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.back-button:hover {
    background: var(--bg-surface-raised);
    color: var(--text-primary);
    border-color: var(--border-medium);
}

.scores-list {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    overflow: hidden;
}

.score-row {
    display: grid;
    grid-template-columns: 48px 1fr 80px 80px 80px;
    gap: var(--space-md);
    padding: var(--space-md) var(--space-lg);
    border-bottom: 1px solid var(--border-subtle);
    transition: background var(--transition-fast);
    align-items: center;
}

.score-row:last-child {
    border-bottom: none;
}

.score-row:hover {
    background: var(--bg-surface-raised);
}

.score-row.highlight {
    background: var(--warning-subtle);
}

.score-row.highlight:hover {
    background: var(--warning-subtle);
}

.rank-cell {
    display: flex;
    align-items: center;
    justify-content: center;
}

.rank-badge {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    font-family: var(--font-mono);
}

.rank-gold {
    background: var(--warning-subtle);
    color: var(--warning);
}

.rank-silver {
    background: var(--border-medium);
    color: var(--text-secondary);
}

.rank-bronze {
    background: rgba(205, 127, 50, 0.15);
    color: #cd7f32;
}

.rank-default {
    background: var(--bg-surface-elevated);
    color: var(--text-muted);
}

.name-cell {
    color: var(--text-primary);
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.04em;
}

.details-cell {
    display: flex;
    gap: var(--space-md);
    color: var(--text-muted);
    font-size: 13px;
}

.time-cell {
    color: var(--text-secondary);
    font-size: 14px;
    font-family: var(--font-mono);
    text-align: right;
}

.score-cell {
    color: var(--accent);
    font-size: 18px;
    font-weight: 600;
    font-family: var(--font-mono);
    text-align: right;
}

.empty-state {
    padding: var(--space-2xl) var(--space-md);
    text-align: center;
    color: var(--text-muted);
}

.empty-state-text {
    font-size: 15px;
}

@media (max-width: 640px) {
    .score-row {
        grid-template-columns: 40px 1fr 60px;
        gap: var(--space-sm);
        padding: var(--space-md);
    }

    .details-cell {
        display: none;
    }

    .time-cell {
        display: none;
    }

    .page-title {
        font-size: 20px;
    }
}
</style>