<script setup lang="ts">
import type { HighScoreEntry  } from '../types';
import { padZero } from '../utils/string';

defineProps<{
    highScores: HighScoreEntry[]
}>()

const emit = defineEmits<{
    goHome: []
}>()

function goHome(): void {
    emit('goHome')
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

        <div class="scores-list" v-if="highScores.length === 0">
            <div class="empty-state">
                <p class="empty-state-text">
                    No scores yet. Play a game to set the first record.
                </p>
            </div>
        </div>

        <div class="scores-list" v-else>
            <div 
                class="score-row"
                v-for="(entry, index) in highScores"
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
