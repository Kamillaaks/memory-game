import {createRouter, createWebHistory} from 'vue-router'
import PlayingView from '../views/PlayingView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), 
    routes: [
        {
            path: '/',
            component: PlayingView,
        }
    ]
})

export default router