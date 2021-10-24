<template>
  <div class="options-list">options list</div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { required } from "vuelidate/lib/validators";
import { namespace } from "vuex-class";
import SchemeProperty from "@/components/SchemeProperty.vue";

@Component({
  components: {
    SchemeProperty,
  },
  validations: {
    schemeName: {
      required,
    },
  },
})
export default class OptionsList extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";

.options-list {
}
</style>
