import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import DashboardGenerale from './views/DashboardGenerale.vue'
import NewItemVIew from './views/NewItemVIew.vue'
import HomeView from './views/HomeView.vue'

// Define application routes
const routes = [
  { path: '/', component: HomeView },
  { path: '/graphs', component: DashboardGenerale },
  { path: '/newItem', component: NewItemVIew },
]

// Initialize Vue router with history mode and predefined routes
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
