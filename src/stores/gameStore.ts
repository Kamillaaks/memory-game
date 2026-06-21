import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { HighScoreEntry, CardData, CardSymbol, GameScore } from '../types'
import { shuffle, sortByDescending } from '../utils/array'
import { calculateFinalScore, calculateProgress } from '../utils/score'
import { formatElapsedTime } from '../utils/time'

const CARD_SYMBOLS: CardSymbol[] = ['🍎', '🍌', '🍇', '🍊', '🍋', '🍉', '🍓', '🍒']

export const useGameStore = defineStore('game', () => {
    const cards = ref<CardData[]>([])
    const flippedCards = ref<string[]>([])

    const score = ref<GameScore>({
        attempts: 0,
        matches: 0,
        startTime: 0,
    })

    const highScores = ref<HighScoreEntry[]>([])

    const timerInterval = ref<number | undefined>(undefined)

    const currentTime = ref(Date.now())

    function createCards(): CardData[] {
        const symbols = CARD_SYMBOLS.slice(0, 8)
        const pairs = [...symbols, ...symbols]

        shuffle(pairs)

        return pairs.map((symbol, index) => ({
            id: `card-${index}`,
            symbol,
            state: 'hidden' as const,
        }))
    }

    function startGame(): void {
        const now = Date.now()

        cards.value = createCards()

        score.value = {
            attempts: 0,
            matches: 0,
            startTime: now,
        }

        currentTime.value = now
        flippedCards.value = []

        startTimer()
    }

    function startTimer(): void {
        if (timerInterval.value !== undefined) {
            clearInterval(timerInterval.value)
        }
        
        timerInterval.value = window.setInterval(() => {
            currentTime.value = Date.now()
        }, 1000)
    }

    function resetGame(): void {
        if (timerInterval.value !== undefined) {
            clearInterval(timerInterval.value)
            timerInterval.value = undefined
        }

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

        if (!card || card.state !== 'hidden' || flippedCards.value.length >= 2) {
            return
        }

        card.state = 'revealed'
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
                card1!.state = 'matched'
                card2!.state = 'matched'
                score.value.matches++
                flippedCards.value = []

                if (score.value.matches === cards.value.length / 2) {
                    score.value.endTime = Date.now()

                    if (timerInterval.value !== undefined) {
                        clearInterval(timerInterval.value)
                        timerInterval.value = undefined
                    }
                }
            }, 500)
        } else {
            setTimeout(() => {
                card1!.state = 'hidden'
                card2!.state = 'hidden'
                flippedCards.value = []
            }, 1000)
        }
    }

    function saveHighScore(name: string) {
        const entry: HighScoreEntry = {
            name: name,
            pairs: totalPairs.value,
            attempts: score.value.attempts,
            time: elapsedTimeFormatted.value,
            score: finalScore.value,
            date: Date.now(),
        }

        highScores.value.push(entry)
        highScores.value = sortByDescending(highScores.value)
    }

    const totalPairs = computed(() => {
        return cards.value.length / 2
    })

    const isComplete = computed(() => {
        return score.value.matches === cards.value.length / 2 && cards.value.length > 0
    })

    const progress = computed(() => {
        return calculateProgress(score.value.matches, cards.value.length)
    })

    const elapsedTimeFormatted = computed(() => {
        if (score.value.startTime === 0) {
            return '00:00'
        }

        return formatElapsedTime(score.value.startTime, currentTime.value)
    })

    const finalScore = computed(() => {
        return calculateFinalScore(score.value)
    })

    return {
        cards,
        flippedCards,
        score,
        highScores,
        startGame,
        resetGame,
        flipCard,
        checkMatch,
        saveHighScore,
        totalPairs,
        isComplete,
        progress,
        elapsedTimeFormatted,
        finalScore,
    }
})
