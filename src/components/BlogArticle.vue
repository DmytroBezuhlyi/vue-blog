<template>
  <el-row type="flex" justify="center">
    <el-col :xs="23" :sm="22" :md="20" :lg="18" :xl="18" class="post-view">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <h3>{{ item.title }}</h3>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" class="post-sub-title">
        <el-col :span="5">
          Destination:<br />
          <strong>{{ item.destination }}</strong>
        </el-col>
        <el-col :span="5">
          Author:<br />
          <strong>{{ item.author }}</strong>
        </el-col>
        <el-col :span="5">
          Posted date:<br />
          <strong>{{ item.postTime }}</strong>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <img :src="item.image" alt="article image" />
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <p>Article Text Content</p>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col class="post-button" :span="12">
          <el-button @click="viewMore(`${item.id}`, item)">Read More</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Item } from "@/types/index.ts";

@Component
export default class BlogArticle extends Vue {
  @Prop() item: Item | undefined;

  viewMore(id: string, item: any): void {
    this.$router.push({
      name: "ArticlePage",
      params: { id, item },
    });
  }
}
</script>
<style lang="scss"></style>
