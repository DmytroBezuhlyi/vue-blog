<template>
  <el-row type="flex" justify="center">
    <el-col :xs="23" :sm="22" :md="20" :lg="18" :xl="18" class="post-view">
      <el-row type="flex" justify="center">
        <el-col :span="12" :xs="22">
          <h3>{{ item.title }}</h3>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="post-sub-title">
        <el-col :span="6" :xs="24">
          Destination:<br />
          <strong>{{ item.destination }}</strong>
        </el-col>
        <el-col :span="6" :xs="24">
          Author:<br />
          <strong>{{ item.author }}</strong>
        </el-col>
        <el-col :span="6" :xs="24">
          Posted date:<br />
          <strong>{{ item.postTime }}</strong>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="20" :xs="22">
          <img :src="item.image" alt="article image" />
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="18" :xs="22">
          <p>{{ item.text }}</p>
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
  @Prop() item?: Item;

  viewMore(id: string, item: any): void {
    this.$router.push({
      name: "ArticlePage",
      params: { id, item },
    });
  }
}
</script>
<style lang="scss">
.post-view {
  margin-bottom: 40px;
  max-width: 1170px;

  &:first-child {
    margin-top: 20px;
  }

  h3 {
    margin: 0;
    font-size: 36px;
    line-height: 42px;
    text-align: center;
    color: #1e1e1e;
  }

  img {
    width: 100%;
  }

  .post-sub-title {
    margin: 25px 0;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;

      div:not(:last-of-type) {
        margin-bottom: 15px;
      }
    }

    div {
      text-align: center;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      color: #9b9b9b;

      strong {
        color: #4a4a4a;
      }
    }
  }

  .post-button {
    text-align: center;
    margin: 15px 0;
  }
}
</style>
