<template>
  <div class="exception">
    <img src="../assets/images/404.png" alt="" />
    <el-button @click="goHome" class="btn-home">回首页</el-button>
  </div>
</template>

<script>
export default {
  name: "404",
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.exception {
  position: relative;
  img {
    width: 100%;
    height: 100vh;
  }
  .btn-home {
    position: fixed;
    bottom: 200px;
    left: 50%;
    margin-left: -34px;
    height: 30px;
    font-size: 14px;
  }
}
</style>
