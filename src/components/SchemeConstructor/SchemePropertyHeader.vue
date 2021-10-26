<template>
  <div class="">
    <div
      class="added-property__header"
      @click="showDetails = !showDetails"
      v-show="!showDetails"
    >
      <div class="added-property__info">
        <h4 :class="{ opened: showDetails }">
          Свойство {{ index + 1 }}: {{ item.label }}
        </h4>
        <p>{{ getType(item.type) }}; {{ item.key }}</p>
      </div>
      <button
        class="added-property__remove"
        @click="$emit('removeProperty', index)"
      >
        <img src="../../assets/images/icons/delete.svg" alt="" />
      </button>
    </div>
    <SchemeProperty
      v-if="showDetails"
      :keyVal="item.key"
      :labelVal="item.label"
      :typeFieldVal="item.type"
      :validateInfo="item.validation"
      :position="index"
      @hideInfo="showDetails = !showDetails"
      v-click-outside="showDetails = false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SchemeProperty from "@/components/SchemeConstructor/SchemeProperty.vue";
import { Field } from "@/Interfaces";
import { TypeLib } from "@/TypeLib";

@Component({
  components: {
    SchemeProperty,
  },
})
export default class SchemePropertyHeader extends Vue {
  @Prop() item: Field;
  @Prop() index!: number;
  typeLib = TypeLib;
  showDetails = false;

  getType(value: string): string {
    return Object.keys(this.typeLib).find((key) => this.typeLib[key] === value);
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/_vars.scss";

.added-property__header {
  padding: 20px 36px;
  border-bottom: 1px solid $grayText;
  display: flex;
  justify-content: space-between;

  .added-property__info {
    p {
      font-size: 14px;
      line-height: 22px;
      color: $dark;
      opacity: 0.6;
    }

    h4 {
      cursor: pointer;
      position: relative;
      &:before {
        position: absolute;
        left: -21px;
        top: -1px;
        content: url(/img/select-dropdown.a82c6dde.svg);
        transform: rotate(-90deg);
      }
      &.opened {
        &:before {
          left: -19px;
          top: -4px;
          transform: rotate(0);
        }
      }
    }
  }
}
</style>
