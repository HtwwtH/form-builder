<template>
  <div class="profile">
    <div class="container">
      <h2>Мои схемы</h2>
      <FormList />
      <router-link to="/new-scheme" class="btn btn--default btn--blue"
        >Создать схему</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import FormList from "@/components/FormList.vue";
const Auth = namespace("Auth");

@Component({
  components: {
    FormList,
  },
})
export default class Profile extends Vue {
  @Auth.Getter("isLoggedIn")
  isLoggedIn!: boolean;

  mounted(): void {
    if (!this.isLoggedIn) {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss">
.profile {
  padding-top: 40px;

  h2 {
    margin-bottom: 40px;
  }

  .btn {
    margin-top: 40px;
    width: fit-content;
  }
}
</style>