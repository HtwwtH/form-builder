<template>
  <div class="scheme-constructor">
    <h2>Свойства схемы</h2>
    <p class="hint">Схема должна содержать хотя бы одно свойство</p>
    <SchemePropertyList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SchemePropertyList from "@/components/SchemeProperty.vue";

@Component({
  components: {
    SchemePropertyList,
  },
})
export default class SchemeConstructor extends Vue {
  // @Form.Getter("getCurrentForm")
  // getCurrentForm!: any;
  // @Form.Action
  // private fetchSingleForm!: (id: string) => Promise<any>;
  // get schemeName(): string {
  //   return this.getCurrentForm.schema.name;
  // }
  // get fields(): [] {
  //   return this.getCurrentForm.schema.fields;
  // }
  // mounted(): void {
  //   const id = this.$route.params.id;
  //   this.fetchSingleForm(id)
  //     .then(() => {
  //       console.log("fetched form on mounted");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";

.scheme-constructor {
  h2 {
    margin-bottom: 8px;
  }

  .hint {
    font-size: 16px;
    line-height: 24px;
    color: $black;
    opacity: 0.5;
    margin-bottom: 20px;
  }
}
</style>
