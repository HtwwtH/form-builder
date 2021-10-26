<template>
  <div class="property__buttons">
    <button
      @click="$emit('triggerNewProperty')"
      type="button"
      class="btn btn--default btn--transparent"
    >
      Добавить новое свойство
    </button>
    <button
      @click="$emit('validateScheme')"
      type="button"
      class="btn btn--default btn--blue"
      :disabled="saveBtnStatus"
    >
      Сохранить схему
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Scheme = namespace("Scheme");

@Component({
  components: {},
})
export default class SchemeButtons extends Vue {
  @Prop() saveDisabled!: boolean;

  @Scheme.Getter("getSaveBtnStatus")
  saveBtnStatus!: boolean;
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";
.property__buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
