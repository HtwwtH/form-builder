<template>
  <div class="scheme">
    id {{ $route.params.id }}

    <h2 class="title">{{ shemeName }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Field } from "@/components/Field.vue";
const Form = namespace("Form");

@Component({
  components: {
    Field,
  },
})
export default class Scheme extends Vue {
  @Form.Getter("getCurrentForm")
  getCurrentForm!: any;

  @Form.Action
  private fetchSingleForm!: (id: string) => Promise<any>;

  get shemeName(): string {
    return this.getCurrentForm.schema.name;
  }

  get fields(): [] {
    return this.getCurrentForm.schema.fields;
  }

  mounted(): void {
    const id = this.$route.params.id;
    this.fetchSingleForm(id)
      .then(() => {
        console.log("fetched form on mounted");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";

.scheme {
  background: $white;
}
</style>
