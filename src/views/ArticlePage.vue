<template>
  <el-row type="flex" justify="center" class="article-page">
    <el-col :xs="23" :sm="22" :md="20" :lg="16" :xl="16">
      <h1>{{ content.title }}</h1>
      <img :src="content.image" alt="post picture" />
      <p>
        {{ content.text }}
      </p>
      <el-divider></el-divider>
      <el-row type="flex" justify="space-between">
        <el-col :span="12" class="article-information text-left">
          {{ content.author }}
        </el-col>
        <el-col :span="12" class="article-information text-right">
          {{ content.postTime }}
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="article-control">
        <el-col :span="12">
          <el-button @click="backToArticles" type="primary">Back</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ArticlePage extends Vue {
  content = "";

  mounted(): void {
    this.content = this.$route.params.item;
  }

  backToArticles(): void {
    this.$router.go(-1);
  }
}
</script>
<style lang="scss"></style>
