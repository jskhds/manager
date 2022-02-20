<template>
    <h1>登录</h1>
    <el-button @click="goHome">回首页</el-button>
</template>

<script>
import Welcome from './Welcome.vue'

export default {
    name: "login",
    components: Welcome,
    mounted(){
        /*this.$request({
            methods:'get',
            url: '/login',
            data: {
                name: 'dmoon',
            }
        }).then((res)=>{
            console.log(res);
        })*/
        // this.$request.get('/login', {name: 'dmoon'}, {mock:true, loading:true}).then((res)=>{
        //     console.log(res);
        // })
    },
    methods: {
        goHome() {
            this.$router.push("./welcome");
        }
    },
    components: { Welcome }
}

</script>

<style>
</style>