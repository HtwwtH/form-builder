<template>
  <div class="option">
    <div class="option__value">
      <input id="keyInput" type="text" :value="optValue" disabled />
    </div>
    <div class="option__key">
      <input type="text" :value="optKey" disabled />
      <label>Такой ключ уже существует</label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { required } from "vuelidate/lib/validators";

@Component({
  components: {},
  validations: {
    schemeName: {
      required,
    },
  },
})
export default class Option extends Vue {
  @Prop() optValue!: string;
  @Prop() optKey!: string;
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";

.option {
  margin-bottom: 20px;
}
.option__value {
  margin-bottom: 8px;
}
.option__key {
  label {
    display: none;
  }
  &.invalid {
    position: relative;
    &:after {
      content: url("../assets/images/icons/alert-circle.svg");
      display: block;
      position: absolute;
      top: 12px;
      right: 12px;
    }
    label {
      display: block;
    }
  }
}
</style>
