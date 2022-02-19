<template>
    <h1>login</h1>
    welcome 组件
    <Welcome msg = "dmoon"/>
    <br> welcome 组件
    <br>
    <el-button @click="goHome">回首页</el-button>
</template>

<script>
import Welcome from './Welcome.vue'

export default {
    name: "login",
    components: Welcome,
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