import { createApp } from 'vue'
import App from './App.vue'
import  router  from "./router"
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import request from './utils/request'
import storage from './utils/storage'
console.log("环境变量=>",import.meta.env); // 不是 process.env 了
const app = createApp(App);
// 全局挂载 request storage
app.config.globalProperties.$request = request;  
app.config.globalProperties.$storage = storage;
app.use(router).use(ElementPlus).mount('#app')
