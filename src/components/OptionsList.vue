<template>
  <div class="options-list">
    <div v-for="(item, index) in optionsList" :key="item.key" class="option">
      <div class="option__value">
        <input
          type="text"
          placeholder="значение опции"
          v-model="optionsList[index].value"
        />
        <button
          v-if="optionsList.length > 1"
          @click="optionsList.splice(index, 1)"
          class="remove-btn"
        >
          <img src="../assets/images/icons/cross-lines.svg" alt="" />
        </button>
      </div>
      <div class="option__key">
        <input
          type="text"
          placeholder="ключ опции"
          v-model="optionsList[index].key"
          @change="checkUnique(optionsList[index].key)"
          :class="{ invalid: checkUnique(optionsList[index].key) == false }"
        />
        <label>Такой ключ уже существует</label>
        <img src="../assets/images/icons/alert-circle.svg" alt="" />
      </div>
    </div>

    <button class="option-add__btn" type="button" @click="addOption">
      Add option
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { required } from "vuelidate/lib/validators";

@Component({
  components: {},
  validations: {
    schemeName: {
      required,
    },
  },
})
export default class OptionsList extends Vue {
  @Inject() optionsList;

  addOption(): void {
    this.optionsList.push({
      key: "",
      value: "",
    });
  }

  checkUnique(key: string): boolean {
    if (
      (key === "") |
      (this.optionsList.filter((item) => item.key == key).length == 1)
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
  // label {
  //   display: none;
  // }
  // &.invalid {
  //   &:after {
  //     content: url("../assets/images/icons/alert-circle.svg");
  //     display: block;
  //     position: absolute;
  //     top: 12px;
  //     right: 12px;
  //   }
  //   label {
  //     color: $red;
  //     display: block;
  //   }
  // }

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
