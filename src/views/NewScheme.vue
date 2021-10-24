<template>
  <div class="newscheme-page">
    <div class="container">
      <h2>Новая схема</h2>
      <SchemePropertyList />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import SchemePropertyList from "@/components/SchemePropertyList.vue";
const Auth = namespace("Auth");

@Component({
  components: {
    SchemePropertyList,
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
  padding-bottom: 100px;
  h2 {
    margin-bottom: 20px;
  }
}
</style>