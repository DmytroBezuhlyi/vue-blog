<template>
  <div id="app">
    <BlogHeader />
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>
<script>
import "@/assets/styles/global.scss";
import BlogHeader from "@/components/layout/BlogHeader";

export default {
  name: "app",
  components: { BlogHeader },
};
</script>
<style></style>
