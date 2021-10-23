<template>
  <div class="scheme-list"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SchemeProperty from "@/components/SchemeProperty.vue";

@Component({
  components: {
    SchemeProperty,
  },
})
export default class SchemePropertyList extends Vue {
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

.scheme-list {
}
</style>
