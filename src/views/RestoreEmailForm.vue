<template lang="pug">
.container.mt-4
  .row
    .col-sm-6.mx-auto
      form(@submit.prevent="sendEmail(), $router.push('/auth/restore/confirm')", novalidate)
        .form-group
          label.form-group__label(for="email-input") Введите email для получения токена
          input#email-input.form-group__input.form-control(
            :class="status()",
            @blur="$v.email.$touch()",
            v-model.trim="email",
            type="email",
            aria-describedby="passwordHelp"
          )

          .form-group__feedback(v-if="!$v.email.email && $v.email.$dirty") Поле должно быть email адресом
  
        button.btn-back.btn.btn-secondary(
          @click="$router.push('/auth')",
          type="submit"
        ) Назад

        button.btn-restore.btn.btn-primary(
          :disabled="$v.$invalid",
          type="submit"
        ) Отправить
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { email, required } from "vuelidate/lib/validators";

export default {
  computed: {
    ...mapGetters(["RESTORE_FORM_DATA"]),
    email: {
      get() {
       return this.RESTORE_FORM_DATA.email;
      },
      set(email) {
        this.SET_RESTORE_EMAIL_TO_STATE(email);
      },
    },
  },
  methods: {
    ...mapActions(["SEND_RESTORE_EMAIL", "DISPLAY_POPUP"]),
    ...mapMutations(["SET_RESTORE_EMAIL_TO_STATE"]),
    sendEmail: async function () {
      await this.SEND_RESTORE_EMAIL();
      this.DISPLAY_POPUP("Проверьте почту");       
    },
    status() {
      if (this.$v.email.$dirty) {
        if (!this.$v.email.email) {
          return "is-invalid warning";
        } else if (this.$v.email.email && this.$v.email.required) {
          return "is-valid";
        }
      }
    },
  },
  validations: {
    email: {
      email,
      required,
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