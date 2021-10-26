<template>
  <div class="options-list">
    <div v-for="(item, index) in optionsList" :key="item.id" class="option">
      <div class="option__value">
        <input
          type="text"
          placeholder="значение опции"
          v-model="optionsList[index].value"
        />
        <button
          v-if="optionsList.length > 1"
          @click="removeOption(index)"
          class="remove-btn"
        >
          <img src="../../assets/images/icons/cross-lines.svg" alt="" />
        </button>
      </div>
      <div class="option__key">
        <input
          type="text"
          placeholder="ключ опции"
          v-model="optionsList[index].key"
          @change="updateOptions()"
          :class="{ invalid: checkUnique(optionsList[index].key) == false }"
        />
        <label>Такой ключ уже существует</label>
        <img src="../../assets/images/icons/alert-circle.svg" alt="" />
      </div>
    </div>

    <button class="option-add__btn" type="button" @click="addOption()">
      Add option
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { OptionField } from "@/Interfaces";

@Component({
  components: {},
})
export default class OptionsList extends Vue {
  @Prop() position!: number;
  @Prop() options!: OptionField[];

  optionsList: OptionField[] = this.options
    ? this.options
    : [
        {
          id: new Date().toString(),
          key: "",
          value: "",
        },
      ];

  addOption(): void {
    if (
      this.optionsList[this.optionsList.length - 1].key &&
      this.optionsList[this.optionsList.length - 1].value
    ) {
      this.optionsList.push({
        id: new Date().toString(),
        key: "",
        value: "",
      });
    }
  }

  updateOptions(): void {
    this.$emit("updateOptionsList", this.optionsList, this.position);
  }

  removeOption(index: number): void {
    this.optionsList.splice(index, 1);
    this.$emit("updateOptionsList", this.optionsList, this.position);
  }

  checkUnique(key: string): boolean {
    if (
      key === "" ||
      this.optionsList.filter((item: OptionField) => item.key == key).length ==
        1
    )
      return true;
    else return false;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";

.options-list {
  padding-left: 20px;
}
.option {
  margin-bottom: 20px;
}
.option__value {
  margin-bottom: 8px;
  position: relative;

  button {
    position: absolute;
    top: 12px;
    right: 12px;
  }
}
.option__key {
  position: relative;

  input + label {
    display: none;
  }

  input + label + img {
    display: none;
    position: absolute;
    top: 12px;
    right: 12px;
  }

  input.invalid {
    border: 1px solid $red;
    background: rgba(235, 87, 87, 0.1);
    &::placeholder {
      color: $red;
      opacity: 0.6;
    }
  }

  input.invalid + label {
    color: $red;
    display: block;
  }

  input.invalid + label + img {
    display: block;
  }
}
.option-add__btn {
}
</style>
