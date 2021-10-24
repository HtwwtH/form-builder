<template>
  <form @submit.prevent="onSubmit" class="scheme">
    <div v-if="loading" class="">Loading...</div>
    <div v-else class="scheme__wrapper">
      <h2 class="title">{{ schemeName }}</h2>

      <div
        v-for="(item, i) in fields"
        :key="item.key"
        class="field"
        :class="{ invalid: userData[i].invalid }"
      >
        <label v-if="item.type != 'checkbox'"
          ><span v-if="item.validation.required" class="asterisk">*</span
          >{{ item.label }}
        </label>

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
            :required="item.validation.required"
            v-model="userData[i].userValue"
            @input="userData[i].invalid = false"
          />
          <span>{{ item.label }}</span>
        </label>

        <input
          v-else
          :type="item.type"
          :placeholder="'Введите ' + item.label"
          v-model="userData[i].userValue"
          @input="userData[i].invalid = false"
        />
      </div>

      <button type="submit" class="btn btn--wide btn--blue">Валидация</button>

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
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Field from "@/components/Field.vue";
const Form = namespace("Form");

@Component({
  components: {
    Field,
  },
})
export default class Scheme extends Vue {
  loading = false;
  schemeName = "";
  fields = [];
  userData = [];
  validationError = false;
  validationSuccess = false;

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
            required: item.validation.required,
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

  setStatus(): void {
    if (
      this.userData.filter((item) => item.required & (item.userValue === ""))
        .length == 0
    )
      this.validationSuccess = true;
    else this.validationError = true;
  }

  onSubmit(): void {
    this.validationSuccess = false;
    this.validationError = false;
    this.userData.forEach((item) => {
      if (item.required & (item.userValue === "")) {
        item.invalid = true;
      }
    });
    this.setStatus();
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
