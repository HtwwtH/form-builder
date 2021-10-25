<template>
  <div class="">
    <form @submit.prevent="" class="property__content">
      <div class="scheme-property">
        <h4>Свойство {{ position }}: {{ labelField }}</h4>
        <div class="field" :class="{ invalid: $v.keyField.$error }">
          <label for="keyInput"
            ><span class="asterisk">*</span>Ключ свойства</label
          >
          <input
            id="keyInput"
            v-model="keyField"
            type="text"
            placeholder="Укажите ключ свойства"
            required
            v-model.trim="$v.keyField.$model"
          />
        </div>
        <div class="field" :class="{ invalid: $v.labelField.$error }">
          <label for="labelInput"
            ><span class="asterisk">*</span>Название свойства</label
          >
          <input
            id="labelInput"
            v-model="labelField"
            type="text"
            placeholder="Укажите название свойства"
            required
          />
        </div>
        <div class="field" :class="{ invalid: $v.typeField.$error }">
          <label for="typeInput"
            ><span class="asterisk">*</span>Поле для отображения</label
          >
          <select
            id="typeInput"
            v-model="typeField"
            required
            @change="validateVisible = true"
          >
            <option value="" disabled selected hidden>
              Выберите поле для отображения
            </option>
            <option>Текстовое поле</option>
            <option>Числовое поле</option>
            <option>Пароль</option>
            <option>Чекбокс</option>
            <option>Номер телефона</option>
            <option>Выпадающий список</option>
          </select>
        </div>

        <OptionsList
          v-if="typeLib[typeField] == 'select'"
          @updateOptionsList="updateOptionsList"
        />
      </div>

      <div v-if="validateVisible" class="scheme-validity">
        <h4>Валидация</h4>

        <div class="scheme-validity__toggle">
          <input
            v-model="validation.required"
            type="checkbox"
            id="toggle-button"
            class="toggle-button"
          />
          <label for="toggle-button" class="text"
            >Обязательно для заполнения</label
          >
        </div>

        <div
          v-if="
            (typeLib[typeField] == 'string') |
              (typeLib[typeField] == 'number') |
              (typeLib[typeField] == 'password')
          "
          class="scheme-validity__range"
        >
          <div class="field">
            <label
              v-if="
                (typeLib[typeField] == 'string') |
                  (typeLib[typeField] == 'password')
              "
              for="minValInput"
              >Мин. кол-во символов</label
            >
            <label v-else-if="typeLib[typeField] == 'number'" for="minValInput"
              >Мин. значение</label
            >
            <input
              id="minValInput"
              v-model="minVal"
              type="number"
              placeholder=""
            />
          </div>
          <div class="field">
            <label
              v-if="
                (typeLib[typeField] == 'string') |
                  (typeLib[typeField] == 'password')
              "
              for="maxValInput"
              >Макс. кол-во символов</label
            >
            <label v-else-if="typeLib[typeField] == 'number'" for="maxValInput"
              >Макс. значение</label
            >
            <input
              id="maxValInput"
              v-model="maxVal"
              type="number"
              placeholder=""
            />
          </div>
        </div>

        <div
          v-if="
            (typeLib[typeField] == 'string') |
              (typeLib[typeField] == 'password')
          "
          class="scheme-validity__pattern"
        >
          <div class="field">
            <label for="patternInput">Шаблон ввода</label>
            <input
              id="patternInput"
              v-model="pattern"
              type="text"
              placeholder=""
            />
          </div>
        </div>
      </div>
    </form>

    <div class="property__buttons">
      <button
        @click="addNewProperty"
        type="button"
        class="btn btn--default btn--transparent"
      >
        Добавить новое свойство
      </button>
      <button
        type="button"
        class="btn btn--default btn--blue"
        :disabled="isDisabled"
        @click="saveNewScheme"
      >
        Сохранить схему
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide, Inject } from "vue-property-decorator";
import { required } from "vuelidate/lib/validators";
import { namespace } from "vuex-class";
import OptionsList from "@/components/OptionsList.vue";
import { Validity, Option, Field, TypeLib } from "@/Interfaces";
const Scheme = namespace("Scheme");

@Component({
  components: {
    OptionsList,
  },
  validations: {
    keyField: {
      required,
    },
    labelField: {
      required,
    },
    typeField: {
      required,
    },
  },
})
export default class SchemeProperty extends Vue {
  @Prop() position!: number;
  @Inject() readonly typeLib;

  optionsList: Option[] = [
    {
      id: new Date().toString(),
      key: "",
      value: "",
    },
  ];

  submitStatus = "";

  validateVisible = false;

  keyField = "";
  labelField = "";
  typeField = "";
  validation: Validity = {
    required: false,
  };
  minVal = null;
  maxVal = null;
  pattern = "";

  get isDisabled(): boolean {
    if (this.keyField == "" && this.labelField == "" && this.typeField == "")
      return true;
    else return false;
  }

  @Scheme.Action
  private addToListAction!: (item: Field) => void;

  updateOptionsList(data: Option[]): void {
    this.optionsList = data;
  }

  addNewProperty(): void {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = "ERROR";
    } else {
      this.createProperty();
    }
  }

  getProperty(): Field {
    let obj: Field = {
      key: this.keyField,
      label: this.labelField,
      type: this.typeLib[this.typeField],
      validation: {
        required: this.validation.required,
      },
    };
    if (this.typeLib[this.typeField] == "string") {
      if (this.minVal) obj.validation.minlength = this.minVal;
      if (this.maxVal) obj.validation.maxlength = this.maxVal;
    }
    if (this.typeLib[this.typeField] == "number") {
      if (this.minVal) obj.validation.min = this.minVal;
      if (this.maxVal) obj.validation.max = this.maxVal;
    }
    if (this.pattern) obj.validation.pattern = this.pattern;
    if (this.typeLib[this.typeField] == "phone")
      obj.validation.pattern =
        "[+7|8] [(][0-9]{3}[)] [0-9]{3}-[0-9]{2}-[0-9]{2}";
    if (this.typeLib[this.typeField] == "select") {
      obj.options = this.optionsList;
    }

    return obj;
  }

  clearProperty(): void {
    this.keyField = "";
    this.labelField = "";
    this.typeField = "";
    this.validation = {
      required: false,
    };
    this.minVal = null;
    this.maxVal = null;
    this.pattern = "";
    this.optionsList = [
      {
        id: new Date().toString(),
        key: "",
        value: "",
      },
    ];
    this.$v.$reset();
  }

  createProperty(): void {
    let obj = this.getProperty();
    this.clearProperty();
    this.addToListAction(obj);
  }

  saveNewScheme(): void {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = "ERROR";
    } else {
      let obj = this.getProperty();
      this.$emit("saveScheme", obj);
    }
  }
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
    position: relative;

    &:before {
      position: absolute;
      left: -19px;
      top: -4px;
      content: url("../assets/images/icons/select-dropdown.svg");
    }
  }
}

.scheme-validity {
  width: 44%;
  margin-left: auto;
  h4 {
    margin-bottom: 50px;
  }
}

// toggler
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
    margin-bottom: 30px;
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

// range
.scheme-validity__range {
  display: flex;
  justify-content: space-between;

  .field {
    width: calc(50% - 22px);
    margin-bottom: 18px;
  }
}

// pattern
.scheme-validity__pattern {
  width: 100%;
}
</style>
