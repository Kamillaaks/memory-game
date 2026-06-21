import {createRouter, createWebHistory} from 'vue-router'
import PlayingView from '../views/PlayingView.vue'
import WonView from '../views/WonView.vue'
import HighScoresView from '../views/HighScoresView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), 
    routes: [
        {
            path: '/',
            component: PlayingView,
        },
        {
            path: '/won',
            component: WonView,
        },
        {
            path: '/highscores',
            component: HighScoresView,
        },
    ]
})

export default router