<script setup lang="ts">
import type { GameScore } from '../types'

defineProps<{
    score: GameScore
    elapsed: string
    progress: number
}>()


</script>

<template>
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
        <div class="progress-fill" :style="{ width: `${progress}%` }">Progress {{ progress }}%</div>
    </div>
</template>
