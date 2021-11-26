<template>
  <el-footer height="auto">
    <el-row>
      <el-col :span="24">
        <router-link class="footer-logo" to="/">
          <img src="@/assets/img/footer-logo.svg" alt="logo" />
        </router-link>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="footer-text"> Footer text </el-col>
    </el-row>
  </el-footer>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class BlogFooter extends Vue {}
</script>
<style lang="scss" scoped>
.el-footer {
  padding: 70px 0;
  text-align: center;
  background-color: #9b9b9b;
  @media (max-width: 768px) {
    padding: 60px 0;
  }
}
.footer-logo {
  display: inline-block;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
}
.footer-text {
  font-size: 18px;
  color: #fff;
  @media (max-width: 768px) {
    font-size: 14px;
  }
}
</style>
