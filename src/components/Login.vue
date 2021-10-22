<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/images/sibdev-logo.svg" alt="" />
    </div>
    <h3>Вход</h3>
    <div class="h3 err-message" v-if="error">Ошибка входа</div>
    <form name="form" @submit.prevent="handleLogin" class="login__form">
      <div class="field">
        <label>Логин</label>
        <div class="input-wrapper">
          <input
            v-model="user.username"
            type="text"
            class="input"
            name="username"
            placeholder="Login"
            required
          />
        </div>
      </div>
      <div class="field">
        <label>Пароль</label>
        <div class="input-wrapper pass">
          <input
            v-model="user.password"
            :type="passVisible ? 'text' : 'password'"
            class="input"
            name="username"
            placeholder="Password"
            required
          />
          <button
            type="button"
            class="hide-pass"
            @click="passVisible = !passVisible"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94ZM9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19L9.9 4.24002Z"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 1L23 23"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <button type="submit" class="btn btn--default btn--blue">Войти</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class Login extends Vue {
  private user = { username: "", password: "" };
  passVisible = true;
  error = false;

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: {
    username: string;
    password: string;
  }) => Promise<any>;

  created(): void {
    if (this.isLoggedIn) {
      this.$router.push("/profile");
    }
  }

  handleLogin(): void {
    if (this.user.username && this.user.password) {
      this.login(this.user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          console.log("error from error", error);
          this.error = true;
        }
      );
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_vars.scss";

.login {
  padding: 40px 88px 60px;
  margin: 0 auto;
  background: $white;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 510px;
  border: 1px solid rgba(39, 39, 39, 0.1);
  border-radius: 5px;

  .logo {
    width: 88px;
    height: 88px;
    margin-bottom: 32px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  h3 {
    margin-bottom: 20px;
  }

  .err-message {
    margin-bottom: 20px;
    color: $red;
  }
}

.login__form {
  width: 100%;
  .field {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    label {
      font-size: 16px;
      line-height: 22px;
      text-align: left;
      color: $grayText;
    }

    .input-wrapper {
      position: relative;
      border: 1px solid rgba(23, 23, 25, 0.2);
      border-radius: 5px;

      &:focus-within {
        border: 1px solid $blue;
        background: $lightBlue;
        .input {
          background: $lightBlue;
          & + button.hide-pass {
            svg path {
              stroke: $blue;
            }
          }
        }
      }
    }

    .input {
      width: 100%;
      padding: 11px 14px;
      color: $dark;
      font-size: 20px;
      line-height: 24px;
      border-radius: 5px;
      box-sizing: border-box;

      &::placeholder {
        color: $dark;
        opacity: 0.3;
      }
    }

    button.hide-pass {
      position: absolute;
      right: 15px;
      top: 12px;

      svg path {
        stroke: #d1d1d1;
      }
    }
  }

  .btn {
    margin-top: 20px;
    width: 176px;
  }
}
</style>
