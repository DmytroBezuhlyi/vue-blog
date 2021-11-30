<template>
  <el-header height="auto">
    <el-row type="flex" justify="space-between">
      <el-col class="header-logo" :span="8">
        <router-link to="/">
          <img src="@/assets/img/header-logo.svg" alt="logo" />
        </router-link>
      </el-col>
      <el-col class="header-menu" :span="12" :xs="10" :sm="16">
        <div v-if="$route.name !== 'LoginPage'">
          <el-button plain size="mini" class="mobile-nav" @click="menuNav">
            <i v-if="menuIsActive" class="el-icon-close"></i>
            <i v-else class="el-icon-menu"></i>
          </el-button>
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            v-bind:class="{ '': !menuIsActive, isOpen: menuIsActive }"
          >
            <el-menu-item index="1">
              <router-link data-test="home" to="/">Home</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link data-test="info" to="/info">Info</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link data-test="about" to="/about">About</router-link>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="user-icon">
          <i class="el-icon-user-solid"></i>
          <span class="user-name">{{ userName }}</span>
        </div>
        <el-button
          v-if="$route.name !== 'LoginPage'"
          data-test="logout"
          @click="logout"
          class="logout-btn"
          size="mini"
          type="info"
          ><i class="el-icon-toilet-paper"></i>
          <span class="text-block">Logout</span></el-button
        >
      </el-col>
    </el-row>
  </el-header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "firebase/database";

@Component({})
export default class HeaderComponent extends Vue {
  activeIndex = "1";
  menuIsActive = false;

  lang = "en";

  get userName() {
    return this.$store.getters.getInfo.userName;
  }

  logout(): void {
    this.$store.dispatch("logout");
    localStorage.removeItem("currentUser");
    this.$router.push({ name: "LoginPage" });
  }

  menuNav(): void {
    this.menuIsActive = !this.menuIsActive;
  }

  async mounted() {
    await this.$store.dispatch("fetchInfo");
  }
}
</script>
<style lang="scss" scoped>
.el-header {
  padding: 0;
  position: relative;

  .header-logo {
    padding: 5px 10px;
    display: flex;

    img {
      max-width: 100%;
    }
  }

  .header-menu {
    //width: 100%;
    display: flex;
    justify-content: flex-end;

    .user-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px;

      i {
        margin-bottom: 5px;
        margin-right: 15px;
      }
    }

    .user-name {
      @media (max-width: 576px) {
        display: none;
      }
    }

    .el-menu--horizontal.el-menu {
      border: none;
      flex-direction: column;
      flex-wrap: wrap;
      @media (max-width: 768px) {
        right: 0;
        width: auto !important;
        z-index: 1;
      }
      @media (max-width: 576px) {
        width: 100% !important;
      }

      .el-menu-item {
        background: transparent;

        a {
          font-size: 16px;
          text-decoration: none;
        }

        &.is-active {
          border: none;
        }
      }

      @media (max-width: 768px) {
        display: none;
        opacity: 0;
        background: #585757;
      }

      &.isOpen {
        position: absolute;
        width: 100%;
        top: 60px;
        display: block;
        opacity: 1;
      }
    }

    .mobile-nav {
      display: none;
      margin: 15px 10px 0 0;
      font-size: 14px;
      height: 29px;
      padding: 0 5px;
      @media (max-width: 768px) {
        display: block;
      }
    }
  }

  .el-radio-group {
    margin: 15px 15px 0 0;
  }

  .logout-btn {
    margin: 15px 15px 0 0;
    font-size: 14px;
    height: 29px;
    @media (max-width: 480px) {
      .text-block {
        display: none;
      }
    }
  }
}
</style>
