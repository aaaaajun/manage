<template>
  <div>
    <h2>这是home组件</h2>
    <el-button @click="out">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    out() {
      sessionStorage.removeItem("token");
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style>
</style>