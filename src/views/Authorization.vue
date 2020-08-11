<template lang="pug">
.container.mt-4
  .row
    .col-sm-6.mx-auto
      form(@submit.prevent="authUser", novalidate)
        .auth
          .form-group
            label.form-group__label(for="email-input") Email
            input#email-input.form-group__input.form-control(
              :class="status('email')",
              @blur="$v.email.$touch()",
              v-model.trim="email",
              type="email",
              aria-describedby="emailHelp"
            )

            .form-group__feedback(v-if="!$v.email.required && $v.email.$dirty") Обязательное поле

            .form-group__feedback(v-if="!$v.email.email && $v.email.$dirty") Поле должно быть email адресом

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
              v-if="$v.password.$dirty && !$v.password.required"
            ) Обязательное поле

            .form-group__feedback(
              v-if="$v.password.$dirty && !$v.password.minLength > 0"
            ) Пароль должен быть не меньше {{ $v.password.$params.minLength.min }} символов

          .btn-container
            button.btn.btn-primary(:disabled="$v.$invalid", type="submit") Войти
            button.btn.btn-secondary(@click="restorePassword", type="button") Забыли пароль?
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  props: {
    service: Object,
    onLogin: Function,
    displayPopup: Function,
    isLoggedIn: Boolean,
  },
  computed: {
    ...mapGetters(["LOGIN_FORM_DATA"]),
    email: {
      get() {
        return this.LOGIN_FORM_DATA.email;
      },
      set(email) {
        this.SET_LOGIN_EMAIL_TO_STATE(email);
      },
    },
    password: {
      get() {
        return this.LOGIN_FORM_DATA.password;
      },
      set(password) {
        this.SET_LOGIN_PASSWORD_TO_STATE(password);
      },
    },
  },
  methods: {
    ...mapActions(["AUTHORIZATION", "DISPLAY_POPUP"]),
    ...mapMutations(["SET_LOGIN_EMAIL_TO_STATE", "SET_LOGIN_PASSWORD_TO_STATE"]),
    authUser: async function () {
      await this.AUTHORIZATION(this.formLog);
      this.DISPLAY_POPUP("Вы авторизировались");
    },
    status(type) {
      if (this.$v[type].$error && this.$v[type].$dirty) {
        return "is-invalid warning";
      } else if (this.$v[type].$dirty && !this.$v[type].$error) {
        return "is-valid";
			}
    },
    restorePassword() {
      this.$router.push({
        name: "restore",
      });
    },
  },
  validations: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
  },
};
</script>

<style lang="scss" scope>
.container {
  justify-self: flex-end;
}

.btn-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 30px 40px;
  width: 100%;
  margin-top: 40px;
}

.warning {
  background: rgba(228, 25, 25, 0.11);
}

.form-group {
  position: relative;

  &__feedback {
    position: absolute;
  }
}
</style>