<template>
  <div class="page-not-found">
    <h1>404</h1>
    <p>Page not found back to home page</p>
    <p>
      <el-button type="primary">
        <router-link to="/">Back to Home</router-link></el-button
      >
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PageNotFound extends Vue {}
</script>
<style lang="scss">
.page-not-found {
  display: flex;
  height: 100vh;
}
.inner {
  margin: auto;
}
</style>
