<template>
  <div class="profile">
    <div class="container">
      <h2>Мои схемы</h2>
      <FormList />
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
  @Auth.State("user")
  private currentUser;

  mounted(): void {
    if (!this.currentUser) {
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
}
</style>