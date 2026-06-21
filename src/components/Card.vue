<script setup lang="ts">
import type { CardData } from '../types'

defineProps<{
    card: CardData
}>()

const emit = defineEmits<{
    cardClicked: [cardId: string]
}>()
</script>

<template>
    <div 
        class="card" 
        :class="card.state"
        @click="emit('cardClicked', card.id)"
        >
        {{ card.state !== 'hidden' ? card.symbol: '' }}
    </div>
</template>

<style scoped>
.card {
    width: 80px;
    height: 120px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    cursor: pointer;
    transition: transform var(--transition-base), background-color var(--transition-base);
    user-select: none;
    border: 1px solid var(--border-subtle);
}

.card:hover:not(.matched) {
    transform: translateY(-2px);
}

.card.hidden {
    background: var(--bg-surface-raised);
    color: var(--text-muted);
}

.card.hidden::after {
    content: "?";
    font-size: 28px;
    font-weight: 500;
    color: var(--text-muted);
}

.card.revealed {
    background: var(--accent-subtle);
    border-color: var(--accent);
    color: var(--accent);
}

.card.matched {
    background: var(--success-subtle);
    border-color: var(--success);
    color: var(--success);
    cursor: default;
    opacity: 0.6;
}

@media (max-width: 500px) {
    .card {
        width: 60px;
        height: 90px;
    }
}
</style>