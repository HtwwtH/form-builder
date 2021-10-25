<template>
  <div class="scheme-list">
    <div class="field" :class="{ invalid: $v.schemeName.$error }">
      <label for="scheme-name"
        ><span class="asterisk">*</span>Название схемы</label
      >
      <input
        id="scheme-name"
        v-model="schemeName"
        type="text"
        placeholder="Укажите название схемы"
        required
        v-model.trim="$v.schemeName.$model"
      />
    </div>
    <h2>Свойства схемы</h2>
    <p class="hint">Схема должна содержать хотя бы одно свойство</p>

    <div v-for="(item, index) in list" :key="item.key" class="added-property">
      <div class="added-property__header">
        <div class="added-property__info">
          <h4>Свойство {{ index + 1 }}: {{ item.label }}</h4>
          <p>{{ getType(item.type) }}; {{ item.key }}</p>
        </div>
        <button class="added-property__remove" @click="list.splice(index, 1)">
          <img src="../assets/images/icons/delete.svg" alt="" />
        </button>
      </div>
      <!-- <SchemeProperty @saveScheme="saveScheme" :position="index + 1" /> -->
    </div>

    <SchemeProperty @saveScheme="saveScheme" :position="list.length + 1" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { required } from "vuelidate/lib/validators";
import { namespace } from "vuex-class";
const Form = namespace("Form");
const Scheme = namespace("Scheme");
import SchemeProperty from "@/components/SchemeProperty.vue";
import { Field, TypeLib, Schema } from "@/Interfaces";

@Component({
  components: {
    SchemeProperty,
  },
  validations: {
    schemeName: {
      required,
    },
  },
})
export default class SchemePropertyList extends Vue {
  @Provide() typeLib: any = {
    "Текстовое поле": "string",
    "Числовое поле": "number",
    Пароль: "password",
    Чекбокс: "checkbox",
    "Номер телефона": "phone",
    "Выпадающий список": "select",
  };

  schemeName = "";
  submitStatus = "";

  @Form.Action
  private saveNewForm!: (item: Schema) => Promise<any>;

  @Scheme.Action
  private addToListAction!: (item: Field) => void;

  @Scheme.Action
  private clearListAction!: () => void;

  @Scheme.Getter("getSchemeList")
  schemeList!: [];

  get list(): Field[] {
    return this.schemeList;
  }

  getType(value: string): string {
    return Object.keys(this.typeLib).find((key) => this.typeLib[key] === value);
  }

  saveScheme(item: Field): void {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = "ERROR";
    } else {
      this.addToListAction(item);
      let result = {
        name: this.schemeName,
        fields: this.list,
      };
      console.log("result: ", result);

      this.saveNewForm(result)
        .then(() => {
          this.clearListAction();
          this.$router.push("/profile");
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      content: url("../assets/images/icons/select-dropdown.svg");
      transform: rotate(-90deg);
    }
  }
}

.added-property {
}

.added-property__header {
  padding: 20px 36px;
  border-bottom: 1px solid $grayText;
  display: flex;
  justify-content: space-between;
  &__info {
    p {
      font-size: 14px;
      line-height: 22px;
      color: $dark;
      opacity: 0.6;
    }
  }
}
</style>
