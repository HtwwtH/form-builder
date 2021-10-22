<template>
  <div class="home">
    <div class="container">
      <Login />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/components/Login.vue";

@Component({
  components: {
    Login,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
