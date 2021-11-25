<template>
  <el-row type="flex" justify="center">
    <el-col :xs="23" :sm="22" :md="20" :lg="18" :xl="18" class="post-view">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <h3>Article Title</h3>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" class="post-sub-title">
        <el-col :span="5">
          Destination:<br />
          <strong>&lt;destination&gt;</strong>
        </el-col>
        <el-col :span="5">
          Author:<br />
          <strong>&lt;author&gt;</strong>
        </el-col>
        <el-col :span="5">
          Posted date:<br />
          <strong>Posted time</strong>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <img src="" alt="article image" />
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <p>Article Text Content</p>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col class="post-button" :span="12">
          <el-button>Read More </el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class BlogArticle extends Vue {}
</script>
<style lang="scss"></style>
