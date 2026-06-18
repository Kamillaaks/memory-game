import { defineStore } from 'pinia'
import {ref, computed} from 'vue'
import type {CardData, CardSymbol, GameScore, AppState} from '../types'
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

    const currentView = ref("playing")

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

function flipCard(cardId: string): void {
    const card = cards.value.find((c) => c.id === cardId)
    if (!card || card.state !== "hidden" || flippedCards.value.length >= 2) {
        return
    }

    card.state = "revealed"
    flippedCards.value.push(cardId)

    if (flippedCards.value.length === 2) {
        score.value.attempts++
        checkMatch()
    }
}

function checkMatch(): void {
    const [id1, id2] = flippedCards.value
    const card1 = cards.value.find((c) => c.id === id1)
    const card2 = cards.value.find((c) => c.id === id2)

    if (card1?.symbol === card2?.symbol) {
        setTimeout(() => {
            card1!.state = "matched"
            card2!.state = "matched"
            score.value.matches++
            flippedCards.value = []

            if (score.value.matches === cards.value.length / 2) {
                score.value.endTime = Date.now()
                currentView.value = "won"
            }
        }, 500)
    } else {
        setTimeout(() => {
            card1!.state = "hidden"
            card2!.state = "hidden"
            flippedCards.value = []
        }, 1000)
    }
}


 return {
        cards,
        flippedCards,
        score,
        startGame,
        resetGame,
        flipCard,
        checkMatch,
    }
})

