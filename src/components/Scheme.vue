<template>
  <form @submit.prevent="onSubmit2" class="scheme">
    <div v-if="loading" class="">Loading...</div>
    <div v-else class="scheme__wrapper">
      <h2 class="title">{{ schemeName }}</h2>

      <div
        v-for="(item, i) in fields"
        :key="item.key"
        class="field"
        :class="{ invalid: userData[i].invalid }"
      >
        <InputField :item="item" :i="i" />
      </div>

      <button @click="onSubmit" type="button" class="btn btn--wide btn--blue">
        Валидация
      </button>

      <div v-if="validationError" class="validate-failure">
        <span>Валидация не пройдена.</span>
      </div>
      <div v-else-if="validationSuccess" class="validate-success">
        <span>Валидация пройдена успешно!</span>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { namespace } from "vuex-class";
import InputField from "@/components/InputField.vue";
import { Field, UserInput } from "@/Interfaces";
import FormService from "@/services/forms/formService";
const Form = namespace("Form");

@Component({
  components: {
    InputField,
  },
})
export default class Scheme extends Vue {
  loading = false;
  schemeName = "";
  fields: Field[] = [];
  validationError = false;
  validationSuccess = false;
  @Provide() userData: UserInput[] = [];

  @Form.Getter("getCurrentForm")
  getCurrentForm!: { id: number; schema: { name: string; fields: [] } };

  @Form.Action
  private fetchSingleForm!: (id: string) => Promise<any>;

  mounted(): void {
    this.loading = true;
    const id = this.$route.params.id;
    this.fetchSingleForm(id)
      .then(() => {
        this.schemeName = this.getCurrentForm.schema.name;
        this.fields = this.getCurrentForm.schema.fields;
        this.fields.forEach((item) =>
          this.userData.push({
            name: item.label,
            userValue: "",
            invalid: false,
          })
        );
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.log(error);
      });
  }

  onSubmit(): void {
    this.validationError = false;
    this.validationSuccess = false;
    this.userData = FormService.customValidate(this.fields, this.userData);
    let errorCounter = this.userData.filter((item) => item.invalid).length;
    errorCounter > 0
      ? (this.validationError = true)
      : (this.validationSuccess = true);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";

.scheme {
  background: $white;
  padding: 36px;

  h2 {
    margin-bottom: 20px;
  }
}

.scheme__wrapper {
  width: 562px;
}

.validate-failure,
.validate-success {
  padding: 16px 8px;
  border-radius: 5px;
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;

  span {
    display: flex;
    align-items: center;
    &:before {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
}
.validate-failure {
  color: $red;
  border: 1px solid $red;
  span:before {
    content: url("../assets/images/icons/x.svg");
  }
}
.validate-success {
  color: $green;
  border: 1px solid $green;
  span:before {
    content: url("../assets/images/icons/ok.svg");
  }
}
</style>
