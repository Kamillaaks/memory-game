<script setup lang="ts">
import type { GameScore } from '../types'
import { ref } from 'vue'
import { sanitizeInitials } from '../utils/string'

defineProps<{
    score: GameScore
    elapsed: string
    finalScore: number
}>()

const emit = defineEmits<{
    saveScore: [name: string]
    playAgain: []
}>()

const initials = ref('')

function updateInitials(): void {
    initials.value = sanitizeInitials(initials.value)
}

function saveScore(): void {
    if (initials.value.length === 3) {
        emit('saveScore', initials.value)
    } else {
        alert('Please enter exactly 3 letters!')
    }
}

function playAgain(): void {
    emit('playAgain')
}
</script>

<template>
    <div class="won-container">
        <h1 class="won-title">You Won</h1>
        <div class="score-display">{{ finalScore }} points</div>
        <div class="stats">
            <div class="stat-box">
                <div class="stat-value attempts-value">{{ score.attempts }}</div>
                <div class="stat-label">Attempts</div>
            </div>

            <div class="stat-box">
                <div class="stat-value time-value">{{ elapsed }}</div>
                <div class="stat-label">Time</div>
            </div>
        </div>

        <div class="initials-section">
            <div class="initials-label">Enter your initials</div>
            <input
                type="text"
                class="initials-input"
                id="initials-input"
                maxlength="3"
                placeholder="ABC"
                v-model="initials"
                @input="updateInitials"
                />
        </div>

        <div class="button-group">
            <button 
                class="btn btn-primary" 
                id="save-btn"
                @click="saveScore"
                >
                Save Score
            </button>
            <button 
                class="btn btn-error" 
                id="play-again-btn"
                @click="playAgain"
                >
                Play Again
            </button>
        </div>
    </div>
</template>

<style scoped>
.won-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: var(--space-lg);
    color: var(--text-primary);
    text-align: center;
}

.won-title {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: var(--space-sm);
    letter-spacing: -0.02em;
}

.score-display {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: var(--space-xl);
    color: var(--accent);
}

.stats {
    margin: var(--space-xl) 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
    width: 100%;
    max-width: 320px;
}

.stat-box {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    padding: var(--space-lg);
    border-radius: var(--radius-lg);
}

.stat-value {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: var(--space-xs);
}

.stat-label {
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.attempts-value {
    color: var(--error);
}

.time-value {
    color: var(--warning);
}

.initials-section {
    margin: var(--space-xl) 0;
}

.initials-label {
    font-size: 14px;
    margin-bottom: var(--space-sm);
    color: var(--text-muted);
}

.initials-input {
    font-size: 28px;
    font-weight: 600;
    width: 120px;
    text-align: center;
    padding: var(--space-sm) var(--space-md);
    border: 1px solid var(--border-medium);
    border-radius: var(--radius-md);
    background: var(--bg-surface);
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 6px;
    font-family: var(--font-mono);
}

.initials-input:focus {
    outline: none;
    border-color: var(--accent);
}

.button-group {
    display: flex;
    gap: var(--space-md);
    margin-top: var(--space-lg);
}

.btn {
    padding: 14px 36px;
    font-size: 16px;
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
}

.btn-primary {
    background: var(--accent);
    color: var(--text-inverse);
    border-color: transparent;
}

.btn-primary:hover {
    background: var(--accent-hover);
}

.btn-error {
    background: var(--error-subtle);
    color: var(--error);
    border-color: var(--error);
}

.btn-error:hover {
    background: var(--error);
    color: var(--text-inverse);
}
</style>