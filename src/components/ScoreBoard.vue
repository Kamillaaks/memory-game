<script setup lang="ts">
import type { GameScore } from '../types'

defineProps<{
    score: GameScore
    elapsed: string
    progress: number
}>()


</script>

<template>
    <div class="score-board">
        <div class="stat attempts">
            <span class="stat-value">{{ score.attempts }}</span>
            <span class="stat-label">Attempts</span>
        </div>

        <div class="stat matches">
            <span class="stat-value">{{ score.matches }}</span>
            <span class="stat-label">Matches</span>
        </div>

        <div class="stat time">
            <span class="stat-value">{{ elapsed }}</span>
            <span class="stat-label">Time</span>
        </div>

        <div class="progress-bar">
            <div class="progress-fill" 
            :style="{ width: `${progress}%` }"
            ></div>
        </div>
    </div>
    
</template>

<style scoped>
.score-board {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    color: var(--text-primary);
    margin-bottom: var(--space-lg);
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
}

.stat-value {
    font-size: 24px;
    font-weight: 600;
    font-family: var(--font-mono);
}

.stat-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
}

.attempts {
    color: var(--error);
}

.matches {
    color: var(--success);
}

.time {
    color: var(--warning);
}

.progress-bar {
    width: 100%;
    height: 3px;
    background: var(--bg-surface-elevated);
    border-radius: var(--radius-sm);
    margin-top: var(--space-sm);
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: var(--accent);
    transition: width 0.3s ease;
}
</style>