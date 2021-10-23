<template>
  <div class="field">
    field
    {{ field }}
    <label for="key"
      ><span v-if="required" class="asterisk">*</span>{{ label }}</label
    >
    <input
      :id="key"
      :type="type"
      :placeholder="'Введите ' + label"
      :required="required"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Field extends Vue {
  @Prop({}) field!: any;

  get label(): string {
    return this.field.label;
  }

  get key(): string {
    return this.field.key;
  }

  get type(): string {
    return this.field.type;
  }

  get required(): boolean {
    return this.field.validation.required;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";
</style>