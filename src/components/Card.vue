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
    border: 1px solid black;
}
</style>