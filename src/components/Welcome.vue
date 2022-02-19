
<template>
    <h1>Welcome {{msg}}</h1>
    <router-link to="/login">登录</router-link>
</template>

<script setup>
import { reactive} from "vue";

defineProps({
    msg: String
})
</script>

<style>
</style>