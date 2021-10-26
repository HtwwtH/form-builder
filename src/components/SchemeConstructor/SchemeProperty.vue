<template>
  <div class="">
    <div class="property__content">
      <div class="scheme-property">
        <h4 @click="$emit('hideInfo')">
          Свойство {{ position + 1 }}: {{ labelField }}
        </h4>
        <div class="field" :class="{ invalid: $v.keyField.$error }">
          <label for="keyInput"
            ><span class="asterisk">*</span>Ключ свойства</label
          >
          <input
            id="keyInput"
            v-model="keyField"
            type="text"
            placeholder="Укажите ключ свойства"
            @change="updateListState(position)"
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
            @change="updateListState(position)"
          />
        </div>
        <div class="field" :class="{ invalid: $v.typeField.$error }">
          <label for="typeInput"
            ><span class="asterisk">*</span>Поле для отображения</label
          >
          <select
            id="typeInput"
            v-model="typeField"
            @change="updateListState(position)"
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
          :position="position"
          :options="schemeList[position].options"
          v-if="typeLib[typeField] == 'select'"
          @updateOptionsList="updateOptionsList"
        />
      </div>

      <div v-if="typeLib[typeField]" class="scheme-validity">
        <h4>Валидация</h4>

        <div class="scheme-validity__toggle">
          <input
            v-model="validation.required"
            type="checkbox"
            id="toggle-button"
            class="toggle-button"
            @change="updateListState(position)"
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
              @change="updateListState(position)"
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
              @change="updateListState(position)"
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
              @change="updateListState(position)"
            />
          </div>
        </div>
      </div>

      <button
        v-if="position != 0"
        class="added-property__remove"
        @click="list.splice(position, 1)"
      >
        <img src="../../assets/images/icons/delete.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { required } from "vuelidate/lib/validators";
import { namespace } from "vuex-class";
import OptionsList from "@/components/SchemeConstructor/OptionsList.vue";
import { Validity, Option, Field } from "@/Interfaces";
import { TypeLib } from "@/TypeLib";
const Scheme = namespace("Scheme");

@Component({
  name: "SchemeProperty",
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
  @Prop() item!: Field;

  typeLib = TypeLib;

  optionsList: Option[] = [
    {
      id: new Date().toString(),
      key: "",
      value: "",
    },
  ];

  submitStatus = "";

  keyField = this.item.key;
  labelField = this.item.label;
  typeField = this.getType(this.item.type);
  validation: Validity = this.item.validation;
  minVal = this.item.validation.minlength
    ? this.item.validation.minlength
    : this.item.validation.min
    ? this.item.validation.min
    : null;
  maxVal = this.item.validation.maxlength
    ? this.item.validation.maxlength
    : this.item.validation.max
    ? this.item.validation.max
    : null;
  pattern = this.item.validation.pattern ? this.item.validation.pattern : "";

  getType(value: string): string {
    if (typeof value === undefined || value === "") return "";
    else {
      return Object.keys(TypeLib).find((key) => TypeLib[key] === value);
    }
  }

  @Scheme.Action
  private setSchemeBtnStatusAction!: (status: boolean) => void;

  @Scheme.Action
  private addToListAction!: (item: Field) => void;

  @Scheme.Mutation("updateList")
  private updateList!: (data: [Field, number]) => void;

  @Scheme.Getter("getSchemeList")
  schemeList!: [];

  @Scheme.Getter("getNewPropertyTrigger")
  triggerNewProperty!: false;

  @Scheme.Getter("getNewSchemeTrigger")
  triggerNewScheme!: false;

  get list(): Field[] {
    return this.schemeList;
  }

  @Watch("triggerNewProperty")
  addNewProperty(): void {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = "ERROR";
    } else {
      this.$emit("addNewProperty");
    }
  }

  @Watch("triggerNewScheme")
  addNewScheme(): void {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = "ERROR";
    } else {
      this.$emit("saveNewScheme");
    }
  }

  @Watch("position")
  clearData(): void {
    this.clearProperty();
  }

  updateListState(index: number): void {
    let obj = this.getProperty();
    this.updateList([obj, index]);
    if (
      this.list[0].key != "" &&
      this.list[0].label != "" &&
      this.list[0].type != ""
    )
      this.setSchemeBtnStatusAction(false);
    else this.setSchemeBtnStatusAction(true);
  }

  updateOptionsList(data: Option[], index: number): void {
    this.optionsList = data;
    this.updateListState(index);
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
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";

.property__content {
  display: flex;
  background: $white;
  padding: 20px 36px 40px;
  margin-bottom: 40px;
  position: relative;
}

.added-property__remove {
  position: absolute;
  top: 13px;
  right: 20px;
}

.scheme-property {
  width: 44%;

  h4 {
    cursor: pointer;
    margin-bottom: 20px;
    position: relative;

    &:before {
      position: absolute;
      left: -19px;
      top: -4px;
      content: url("../../assets/images/icons/select-dropdown.svg");
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
