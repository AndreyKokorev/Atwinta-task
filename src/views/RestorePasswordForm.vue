<template lang="pug">
.container.mt-4
  .row
    .col-sm-6.mx-auto
      form(@submit.prevent="restorePassword", novalidate)
        .form-group
          label.form-group__label(for="token-input") Токен
          input#email-input.form-group__input.form-control(
            :class="status('token')",
            @blur="$v.token.$touch()",
            v-model.trim="token",
            type="text",
            aria-describedby="passwordHelp"
          )
          .form-group__feedback(v-if="!$v.token.required && $v.token.$dirty") Обязательное поле

        .form-group
          label.form-group__label(for="password-input") Пароль
          input#password-input.form-group__input.form-control(
            :class="status('password')",
            @blur="$v.password.$touch()",
            v-model.trim="password",
            type="password",
            aria-describedby="passwordHelp"
          )
          .form-group__feedback(
            v-if="!$v.password.minLength && $v.password.$dirty"
          ) Введите не меньше {{ $v.password.$params.minLength.min }}

        .form-group
          label.form-group__label(for="password-input") Подтверждение пароля
          input#password-input.form-group__input.form-control(
            :class="status('password_confirmation')",
            @blur="$v.password_confirmation.$touch()",
            v-model.trim="password_confirmation",
            type="password",
            aria-describedby="passwordHelp"
          )
          .form-group__feedback(v-if="!$v.password_confirmation.sameAs") Пароли не совпадают

        button.btn-back.btn.btn-secondary(
          @click="$router.push('/auth/restore')",
          type="submit"
        ) Назад
        button.btn-restore.btn.btn-primary(
          :disabled="$v.$invalid",
          type="submit"
        ) Сбросить пароль
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  props: {
    service: Object,
  },
  computed: {
    ...mapGetters(["RESTORE_FORM_DATA"]),
    password: {
      get() {
        return this.RESTORE_FORM_DATA.password;
      },
      set(password) {
        this.SET_RESTORE_PASSWORD_TO_STATE(password);
      },
    },
    password_confirmation: {
      get() {
        return this.RESTORE_FORM_DATA.confirmedPassword;
      },
      set(password) {
        this.SET_RESTORE_CONFIRMED_PASSWORD_TO_STATE(password);
      },
    },
    token: {
      get() {
        return this.RESTORE_FORM_DATA.token;
      },
      set(token) {
        this.SET_RECOVER_TOKEN_TO_STATE(token);
      }
    }
  },
  methods: {
    ...mapActions(["SEND_RESTORE_PASSWORD", "DISPLAY_POPUP"]),
    ...mapMutations([
      "SET_RESTORE_PASSWORD_TO_STATE",
      "SET_RESTORE_CONFIRMED_PASSWORD_TO_STATE",
      "SET_RECOVER_TOKEN_TO_STATE"
    ]),
    restorePassword: async function () {
      this.SEND_RESTORE_PASSWORD();
      this.DISPLAY_POPUP("Пароль сброшен");
    },
    status(type) {
      if (this.$v[type].$dirty) {
        if (type === "password") {
          if (!this.$v.password.minLength) {
            return "is-invalid warning";
          } else if (!this.$v.password.$error) {
            return "is-valid";
          }
        }

        if (type === "password_confirmation") {
          if (!this.$v.password_confirmation.sameAs) {
            return "is-invalid warning";
          } else if (
            this.$v.password_confirmation.sameAs &&
            this.$v.password.required
          ) {
            return "is-valid";
          }
        }

        if (type ==='token' && this.$v.token.required) {
          return "is-valid"
        } else {
          return "is-invalid warning"
        }
      }
    },
  },
  validations: {
    token: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    password_confirmation: {
      sameAs: sameAs("password"),
    },
  },
};
</script>

<style lang="scss" scoped>
.warning {
  background: rgba(228, 25, 25, 0.11);
}

.btn-back {
  margin-right: 20px;
}
</style>