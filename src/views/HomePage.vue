<template>
  <div class="home">
    <h1>Home Page</h1>
    <div v-if="articles">
      <BlogArticle v-for="item in articles" :key="item.id" :item="item" />
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
  articles = '';

  mounted() {
    this.articles = this.$store.getters.getArticles;
    this.$store.dispatch('fetchInfo');
  }
}
</script>
<style lang="scss"></style>
