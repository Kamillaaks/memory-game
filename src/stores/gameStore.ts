import { defineStore } from 'pinia'
import {ref, computed} from 'vue'
import type {CardData, CardSymbol, GameScore} from '../types'
import {shuffle} from '../utils/array'

const CARD_SYMBOLS: CardSymbol[] = ['🍎', '🍌', '🍇', '🍊', '🍋', '🍉', '🍓', '🍒']

export const useGameStore = defineStore('game', () => {
    const cards = ref<CardData[]>([])
    const flippedCards = ref<string[]>([])

    const score = ref<GameScore>({
        attempts: 0,
        matches: 0,
        startTime: 0,
    })

    function createCards(): CardData[] {
    const symbols = CARD_SYMBOLS.slice(0, 8)
    const pairs = [...symbols, ...symbols]
    shuffle(pairs)

    return pairs.map((symbol, index) => ({
        id: `card-${index}`,
        symbol,
        state: "hidden" as const,
    }))
}

function startGame(): void {
    cards.value = createCards()
    score.value = {
        attempts: 0,
        matches: 0,
        startTime: Date.now(),
    }

    flippedCards.value = []
}

function resetGame(): void {
    cards.value = []
    score.value = {
        attempts: 0,
        matches: 0,
        startTime: 0,
    }

    flippedCards.value = []
}

 return {
        cards,
        flippedCards,
        score,
        startGame,
        resetGame,
    }
})

