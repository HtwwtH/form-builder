<template>
  <div class="">
    <div class="property__content">
      <div class="scheme-property">
        <h4>Свойство 1: {{ field.label }}</h4>
        <div class="field" v-bind:class="{ invalid: keyFieldError }">
          <label for="keyInput"
            ><span class="asterisk">*</span>Ключ свойства</label
          >
          <input
            id="keyInput"
            v-model="field.key"
            type="text"
            placeholder="Укажите ключ свойства"
            required
            @click="keyFieldError = false"
          />
        </div>
        <div class="field" v-bind:class="{ invalid: labelFieldError }">
          <label for="labelInput"
            ><span class="asterisk">*</span>Название свойства</label
          >
          <input
            id="labelInput"
            v-model="field.label"
            type="text"
            placeholder="Укажите название свойства"
            required
            @click="labelFieldError = false"
          />
        </div>
        <div class="field" v-bind:class="{ invalid: typeFieldError }">
          <label for="typeInput"
            ><span class="asterisk">*</span>Поле для отображения</label
          >
          <select
            id="typeInput"
            ref="typeInput"
            v-model="field.type"
            placeholder="Выберите поле для отображения"
            required
            @change="setValidity"
            @click="typeFieldError = false"
          >
            <option value="" disabled selected hidden>
              Выберите поле для отображения
            </option>
            <option>Текстовое поле</option>
            <option>Числовое поле</option>
            <option>Пароль</option>
            <option>Чекбокс</option>
            <option>Номер телефона</option>
            <!-- <option>Выпадающий список</option> -->
          </select>
        </div>
      </div>

      <div v-if="validateVisible" class="scheme-validity">
        <h4>Валидация</h4>

        <div class="scheme-validity__toggle">
          <input
            v-model="field.validation.required"
            type="checkbox"
            id="toggle-button"
            class="toggle-button"
          />
          <label for="toggle-button" class="text"
            >Обязательно для заполнения</label
          >
        </div>
      </div>
    </div>
    <div class="property__buttons">
      <button
        @click="addNewProperty"
        type="button"
        class="btn btn--default btn--transparent"
      >
        Добавить новое свойство
      </button>
      <button type="button" class="btn btn--default btn--blue">
        Сохранить схему
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface Validity {
  required: boolean;
}

interface Field {
  key: string;
  label: string;
  type: string;
  validation: Validity;
  options?: [];
}

@Component({
  components: {},
})
export default class SchemeProperty extends Vue {
  field: Field = {
    key: "",
    label: "",
    type: "",
    validation: {
      required: false,
    },
  };
  validateVisible = false;
  keyFieldError = false;
  labelFieldError = false;
  typeFieldError = false;

  setValidity(): void {
    console.log("setValidity");
    this.validateVisible = true;
  }

  validate(): void {
    console.log("validate");
    if (!this.field.key) this.keyFieldError = true;
    if (!this.field.label) this.labelFieldError = true;
    if (!this.field.type) this.typeFieldError = true;
  }

  addNewProperty(): void {
    console.log("addNewProperty");
    this.validate();
  }

  // @Form.Getter("getCurrentForm")
  // getCurrentForm!: any;
  // @Form.Action
  // private fetchSingleForm!: (id: string) => Promise<any>;
  // get schemeName(): string {
  //   return this.getCurrentForm.schema.name;
  // }
  // get fields(): [] {
  //   return this.getCurrentForm.schema.fields;
  // }
  // mounted(): void {
  //   const id = this.$route.params.id;
  //   this.fetchSingleForm(id)
  //     .then(() => {
  //       console.log("fetched form on mounted");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";

.property__content {
  display: flex;
  background: $white;
  padding: 20px 36px 40px;
  margin-bottom: 40px;
}

.scheme-property {
  width: 44%;

  h4 {
    margin-bottom: 20px;
  }
}

.scheme-validity {
  width: 44%;
  margin-left: auto;
  h4 {
    margin-bottom: 50px;
  }
}

.scheme-validity__toggle {
  label {
    font-size: 18px;
    line-height: 22px;
    color: $dark;
  }
  .toggle-button {
    position: relative;
    display: inline-block;
    width: 35px;
    height: 22px;
    margin: 0;
    vertical-align: top;
    background: $grayText;
    border-radius: 19px;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
    margin-right: 20px;
  }
  .toggle-button::after {
    content: "";

    display: inline-block;
    position: absolute;
    left: 3px;
    top: 3px;
    width: 16px;
    height: 16px;
    background-color: $white;
    border-radius: 50%;

    transform: translateX(0);
    transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
  }
  .toggle-button:checked::after {
    transform: translateX(calc(60% + 3px));
    background-color: $white;
  }
  .toggle-button:checked {
    background-color: $blue;
  }
}

.property__buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
