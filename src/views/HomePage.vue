<template>
  <div class="home">
    <el-row type="flex" justify="center">
      <el-col :span="12" :xs="20" class="articles-control">
        <el-input placeholder="Search" v-model="searchValue"></el-input>
        <el-tooltip
          class="item"
          effect="dark"
          content="Change view"
          placement="top-start"
        >
          <el-button
            type="primary"
            :icon="viewMode ? 'el-icon-menu' : 'el-icon-tickets'"
            circle
            @click="changeView"
          ></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <div v-if="articles" :class="viewMode ? '' : 'block-view'">
      <BlogArticle
        v-for="item in articles"
        :key="item.id"
        :item="item"
        :search="searchValue"
        :viewMode="viewMode"
      />
    </div>
    <div v-else>Page is empty</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BlogArticle from "@/components/BlogArticle.vue";

@Component({
  components: { BlogArticle },
})
export default class Home extends Vue {
  searchValue = "";
  viewMode = true;
  articles = "";

  changeView() {
    this.viewMode = !this.viewMode;
  }

  mounted() {
    this.articles = this.$store.getters.getArticles;
    this.$store.dispatch("fetchInfo");
  }
}
</script>
<style lang="scss" scoped>
.articles-control {
  .el-input {
    display: inline-block;
    width: 250px;
    margin: 0 5px 0 0;
    @media (max-width: 768px) {
      display: block;
      width: 100%;
      margin: 0 0 5px 0;
    }
  }
}
.block-view {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>
