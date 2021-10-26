<template>
  <div class="field" :class="{ invalid: isEmpty }">
    <label for="scheme-name"
      ><span class="asterisk">*</span>Название схемы</label
    >
    <input
      id="scheme-name"
      v-model="schemeName"
      @input="setSchemeName()"
      type="text"
      placeholder="Укажите название схемы"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Scheme = namespace("Scheme");

@Component({
  components: {},
})
export default class SchemePropertyList extends Vue {
  @Prop() isEmpty!: boolean;
  schemeName = "";

  @Scheme.Action
  private setSchemeNameAction!: (name: string) => void;

  setSchemeName(): void {
    this.$emit("startInputName");
    this.setSchemeNameAction(this.schemeName);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";

.scheme-list {
  .field {
    padding-bottom: 30px;
    margin-bottom: 40px;
    border-bottom: 1px solid $mediumGray;
    input {
      max-width: 422px;
    }
  }
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
  h4 {
    position: relative;
    &:before {
      position: absolute;
      left: -21px;
      top: -1px;
      content: url("../../assets/images/icons/select-dropdown.svg");
      transform: rotate(-90deg);
    }
  }
}
</style>
