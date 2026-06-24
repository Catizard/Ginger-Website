import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import './assets/global.css'
import i18n from "./i18n";

const app = createApp(App)

app.use(i18n);
app.use(router)
app.use(naive)

app.mount('#app')
