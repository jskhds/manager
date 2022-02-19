/**
 * 环境配置封装
 */
 const env = import.meta.env.MODE || 'prod';
 const EnvConfig = {
     dev:{
         baseApi:'/',
         mockApi:'https://www.fastmock.site/mock/697a09f361cbaf5b90b3b89aa6eddd85/api'
     },
     test:{
         baseApi:'//test.futurefe.com/api',
         mockApi:'https://www.fastmock.site/mock/697a09f361cbaf5b90b3b89aa6eddd85/api'
     },
     prod:{
         baseApi:'//futurefe.com/api',
         mockApi:'https://www.fastmock.site/mock/697a09f361cbaf5b90b3b89aa6eddd85/api'
     }
 }
 export default {
     env,
     mock:true,
     namespace:'manager',
     ...EnvConfig[env]
 }