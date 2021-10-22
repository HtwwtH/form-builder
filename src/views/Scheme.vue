<template>
  <div class="scheme-page">
    <div class="container">
      <Scheme />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Scheme from "@/components/Scheme.vue";
const Auth = namespace("Auth");

@Component({
  components: {
    Scheme,
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
.scheme-page {
  padding-top: 36px;
}
</style>