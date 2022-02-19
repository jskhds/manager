import { createApp } from 'vue'
import App from './App.vue'
import  router  from "./router"
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import request from './utlis/request'
console.log("环境变量=>",import.meta.env); // 不是 process.env 了
const app = createApp(App);
// 全局挂载 request
app.config.globalProperties.$request = request;  
app.use(router).use(ElementPlus).mount('#app')
