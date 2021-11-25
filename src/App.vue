<template>
  <div id="app">
    <BlogHeader />
    <el-main>
      <router-view></router-view>
    </el-main>
    <BlogFooter />
  </div>
</template>
<script>
import "@/assets/styles/global.scss";
import BlogHeader from "@/components/layout/BlogHeader";
import BlogFooter from "@/components/layout/BlogFooter";

export default {
  name: "app",
  components: { BlogFooter, BlogHeader },
};
</script>
<style></style>
