<template>
  <div class="newscheme-page">
    <div class="container">
      <h2>Новая схема</h2>
      <SchemeConstructor />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SchemeConstructor from "@/components/SchemeConstructor.vue";
const Auth = namespace("Auth");

@Component({
  components: {
    SchemeConstructor,
  },
})
export default class NewSchemePage extends Vue {
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
.newscheme-page {
  padding-top: 40px;
  h2 {
    margin-bottom: 20px;
  }
}
</style>