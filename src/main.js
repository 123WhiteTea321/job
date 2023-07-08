
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import "./assets/iconfont/iconfont"
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css


const app = createApp(App)

app.use(router)
app.mount('#app')
app.use(vue3videoPlay)