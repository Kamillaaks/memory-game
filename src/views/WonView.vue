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
