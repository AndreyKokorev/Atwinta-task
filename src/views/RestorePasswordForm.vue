<template lang="pug">
.container.mt-4
  .row
    .col-sm-6.mx-auto
      form(@submit.prevent="restorePassword", novalidate)
        .form-group
          label.form-group__label(for="password-input") Пароль
          input#password-input.form-group__input.form-control(
            :class="status('password')",
            @blur="$v.formRest.password.$touch()",
            v-model.trim="formRest.password",
            type="password",
            aria-describedby="passwordHelp"
          )

          .form-group__feedback(
            v-if="!$v.formRest.password.minLength && $v.formRest.password.$dirty"
          ) Введите не меньше {{ $v.formRest.password.$params.minLength.min }}

        .form-group
          label.form-group__label(for="password-input") Подтверждение пароля
          input#password-input.form-group__input.form-control(
            :class="status('password_confirmation')",
            @blur="$v.formRest.password_confirmation.$touch()",
            v-model.trim="formRest.password_confirmation",
            type="password",
            aria-describedby="passwordHelp"
          )
          .form-group__feedback(
            v-if="!$v.formRest.password_confirmation.sameAs"
          ) Пароли не совпадают

        button.btn-back.btn.btn-secondary(@click="$router.push('/auth/restore')", type="submit") Назад
        button.btn-restore.btn.btn-primary(
          :disabled="$v.$invalid",
          type="submit"
        ) Сбросить пароль
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  props: {
    service: Object,
  },
  data() {
    return {
      formRest: {
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    restorePassword: async function () {
      const response = await this.service.restorePassword(this.formRest);
      console.lof(response);
    },
    status(type) {
      if (this.$v.formRest[type].$dirty) {
        if (type === "password") {
          if (!this.$v.formRest.password.minLength) {
            return "is-invalid warning";
          } else if (!this.$v.formRest.password.$error) {
            return "is-valid";
          }
        }

        if (type === "password_confirmation") {
          if (!this.$v.formRest.password_confirmation.sameAs) {
            return "is-invalid warning";
          } else if (
            this.$v.formRest.password_confirmation.sameAs &&
            this.$v.formRest.password.required
          ) {
            return "is-valid";
          }
        }
      }
    },
  },
  validations: {
    formRest: {
      password: {
        required,
        minLength: minLength(6),
      },
      password_confirmation: {
        sameAs: sameAs("password"),
      },
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