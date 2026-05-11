import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import './assets/global.css'
import { useI18n } from './i18n'

const app = createApp(App)

const { initLang } = useI18n()
initLang()

app.use(router)
app.use(naive)

app.mount('#app')
