import { createApp } from 'vue'
import App from './App.vue'
import  router  from "./router"
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import  config  from "./config"
import axios from "axios"
console.log("环境变量=>",import.meta.env); // 不是 process.env 了
const app = createApp(App);
axios.get(config.mockApi + '/login').then((res)=>{
    console.log(res)
})
app.use(router).use(ElementPlus).mount('#app')
