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
export default class SchemePage extends Vue {
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
.scheme-page {
  padding-top: 36px;
}
</style>