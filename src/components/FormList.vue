<template>
  <div class="form-list">
    <router-link
      :to="'/scheme/' + item.id"
      class="form-list__item"
      v-for="item in getFormList"
      :key="item.id"
    >
      {{ item.schema.name ? item.schema.name : "*no-name*" }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Form = namespace("Form");

@Component
export default class FormList extends Vue {
  @Form.Getter("getFormList")
  getFormList!: [];

  @Form.Action
  private fetchForms!: () => Promise<any>;

  created(): void {
    this.fetchForms().catch((error) => {
      console.log(error);
    });
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";

.form-list {
  background: $white;
}

.form-list__item {
  color: $black;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  padding: 13px 20px;
  border-bottom: 1px solid $lightGray;
}
</style>
