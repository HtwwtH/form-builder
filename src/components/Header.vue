<template>
  <header>
    <div class="header__content container">
      <div class="logo">
        <img src="@/assets/images/sibdev-logo.svg" alt="" />
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/profile">Мои схемы</router-link>
          </li>
          <li>
            <router-link to="#">Создать схему</router-link>
          </li>
        </ul>
      </nav>
      <button class="logout" @click="signOut">Выйти</button>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class Header extends Vue {
  @Auth.Action
  private logOut!: () => void;

  signOut(): void {
    this.logOut();
    this.$router.push("/");
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/_vars.scss";

header {
  font-size: 18px;
  line-height: 28px;
  color: $blue;
  padding: 16px 0;
  background: $white;
}

.header__content {
  display: flex;
  justify-content: space-between;
}

.header__content .logo {
  margin-right: 20px;
}

.header__content nav {
  ul {
    height: 100%;
    list-style: none;
    display: flex;

    li {
      height: 100%;
      a {
        height: 100%;
        margin: 0 20px;
        color: $blue;
        font-size: 18px;
        line-height: 28px;
        display: flex;
        align-items: center;
      }
    }
  }
}

.header__content .logout {
  margin-left: auto;
  padding: 0 20px;
  color: $blue;
  font-size: 18px;
  line-height: 28px;
}
</style>
