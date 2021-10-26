<template>
  <div class="field__content">
    <select
      v-if="item.type == 'select'"
      v-model="userData[i].userValue"
      @change="userData[i].invalid = false"
    >
      <option value="" disabled selected hidden>
        Выберите поле для отображения
      </option>
      <option v-for="option in item.options" :key="option.key">
        {{ option.value }}
      </option>
    </select>

    <label v-else-if="item.type == 'checkbox'" class="custom-checkbox">
      <input
        :type="item.type"
        v-model="userData[i].userValue"
        @input="userData[i].invalid = false"
      />
      <span>{{ item.label }}</span>
    </label>

    <input
      v-else
      :type="item.type"
      :placeholder="'Введите ' + item.label"
      :pattern="item.validation.pattern"
      :min="item.validation.min"
      :max="item.validation.max"
      :minlength="item.validation.minlength"
      :maxlength="item.validation.maxlength"
      v-model="userData[i].userValue"
      @input="userData[i].invalid = false"
    />

    <label v-if="item.type != 'checkbox'"
      ><span v-if="item.validation.required" class="asterisk">*</span
      >{{ item.label }}
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from "vue-property-decorator";

@Component
export default class Field extends Vue {
  @Prop() item!: { id: number; schema: { name: string; fields: [] } };
  @Prop() i!: number;
  @Inject() userData!: [];
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";

.field__content {
  display: flex;
  flex-direction: column;
  label {
    order: -1;
  }

  input:focus:invalid,
  select:focus:invalid {
    border: 1px solid $red;
    background: rgba(235, 87, 87, 0.1);
    &::placeholder {
      color: $red;
      opacity: 0.6;
    }
    & + label {
      color: $red;
    }
  }
  select:focus:invalid {
    background-image: url("../assets/images/icons/select-dropdown.svg");
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
    &:required:invalid {
      color: rgba(235, 87, 87, 0.6);
    }
  }
}
</style>