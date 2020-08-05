<template lang="pug">
.container.mt-4
  .row
    .col-sm-6.mx-auto
      form(@submit.prevent="authUser", novalidate)
        transition(name="slide-fade")
          .step(v-show="step === 1")
            .form-group
              label(for="email-input") Email
              input#email-input.form-control(
                :class="status('email')",
                @input="$v.formLog.email.$touch()",
                v-model="formLog.email",
                type="email",
                aria-describedby="emailHelp"
              )
              .invalid-feedback(v-if="!$v.formLog.email.required") Поле обязательно для заполнения
              .invalid-feedback(v-if="!$v.formLog.email.email") Поле должно быть email адресом

            .form-group
              label(for="password-input") Пароль
              input#password-input.form-control(
                :class="status('password')",
                @input="$v.formLog.password.$touch()",
                v-model="formLog.password",
                type="password",
                aria-describedby="passwordHelp"
              )
              .invalid-feedback(v-if="!$v.formLog.password.required") Поле обязательно для заполнения

            button.btn.btn-primary(type="submit") Войти
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  props: ["service"],
  data() {
    return {
      step: 1,
      formLog: {
        email: "andrey.kokorev.w.dev@gmail.com",
        password: "I7ExBEs4YZ",
      },
    };
  },
  methods: {
    authUser: async function () {
      const response = await this.service.authorization(this.formLog);
      const accessToken = response.token;

      localStorage.setItem('accessToken', accessToken);
    },
    status(type) {
      return {
        "is-invalid warning": this.$v.formLog[type].$error
      };
    }
  },
  validations: {
    formLog: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scope>
.warning {
  background: rgba(228, 25, 25, 0.11);
}
</style>