<template>
  <div class="scheme-list">
    <SchemeName @startInputName="startInputName" :isEmpty="isNameEmpty" />
    <h2>Свойства схемы</h2>
    <p class="hint">Схема должна содержать хотя бы одно свойство</p>

    <div v-for="(item, index) in list" :key="item.key" class="added-property">
      <SchemePropertyHeader
        @removeProperty="removeProperty"
        v-if="index < list.length - 1"
        :item="item"
        :index="index"
      />

      <SchemeProperty
        :item="item"
        v-if="index == list.length - 1"
        @saveNewScheme="saveNewScheme"
        @addNewProperty="addNewProperty"
        :position="index"
      />
    </div>

    <SchemeButtons
      @triggerNewProperty="triggerNewPropertyAction"
      @validateScheme="validateScheme"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Form = namespace("Form");
const Scheme = namespace("Scheme");
import SchemeName from "@/components/SchemeConstructor/SchemeName.vue";
import SchemeButtons from "@/components/SchemeConstructor/SchemeButtons.vue";
import SchemePropertyHeader from "@/components/SchemeConstructor/SchemePropertyHeader.vue";
import SchemeProperty from "@/components/SchemeConstructor/SchemeProperty.vue";
import { Field, Schema } from "@/Interfaces";
@Component({
  components: {
    SchemeName,
    SchemePropertyHeader,
    SchemeProperty,
    SchemeButtons,
  },
})
export default class SchemePropertyList extends Vue {
  submitStatus = "";
  isNameEmpty = false;

  @Form.Action
  private saveNewForm!: (item: Schema) => Promise<any>;

  @Scheme.Action
  private addToListAction!: (item: Field) => void;

  @Scheme.Action
  private removeFromListAction!: (index: number) => void;

  @Scheme.Action
  private clearListAction!: () => void;

  @Scheme.Action
  private triggerNewPropertyAction!: () => void;

  @Scheme.Action
  private triggerNewSchemeAction!: () => void;

  @Scheme.Getter("getSchemeList")
  schemeList!: [];

  @Scheme.Getter("getSchemeName")
  schemeName!: [];

  get list(): Field[] {
    return this.schemeList;
  }

  addNewProperty(): void {
    this.addToListAction({
      key: "",
      label: "",
      type: "",
      validation: {
        required: false,
      },
    });
  }

  removeProperty(index: number): void {
    this.list.splice(index, 1);
  }

  startInputName(): void {
    this.isNameEmpty = false;
  }

  validateSchemeName(): boolean {
    if (this.schemeName) return true;
    else return false;
  }

  validateScheme(): void {
    this.validateSchemeName()
      ? this.triggerNewSchemeAction()
      : (this.isNameEmpty = true);
  }

  saveNewScheme(): void {
    let result = {
      name: this.schemeName,
      fields: this.list,
    };

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

.added-property {
  width: 100%;
}
</style>
