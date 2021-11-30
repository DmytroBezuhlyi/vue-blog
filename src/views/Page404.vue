<template>
  <div class="page-not-found">
    <div class="inner">
      <h1>404</h1>
      <p>Page not found back to home page</p>
      <p>
        <el-button type="primary">
          <router-link to="/">Back to Home</router-link>
        </el-button>
      </p>
    </div>
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
h1 {
  font-size: 130px !important;
  letter-spacing: 20px;
  margin: 20px !important;
}
p {
  font-size: 18px;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
