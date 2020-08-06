<template lang="pug">
.container.mt-4
  .row
    .col-sm-6.mx-auto
      h2.mb-5 Регистрация

      form(@submit.prevent="registerUser", novalidate)
        transition(name="slide-fade")
          .step(v-show="step === 1")
            .form-group
              label(for="name-input") Полное имя
              input#name-input.form-control(
                :class="status('name')",
                @input="$v.profile.name.$touch()",
                v-model="profile.name",
                type="text",
                aria-describedby="emailHelp"
              )
              .invalid-feedback(v-if="!$v.profile.name.required") Поле обязательно для заполнения
              .invalid-feedback(v-if="!$v.profile.name.alpha") Используйте только символы алфавита

            .form-group
              label(for="email-input") Email
              input#email-input.form-control(
                :class="status('email')",
                @input="$v.profile.email.$touch()",
                v-model="profile.email",
                type="email",
                aria-describedby="emailHelp"
              )
              .invalid-feedback(v-if="!$v.profile.email.required") Поле обязательно для заполнения
              .invalid-feedback(v-if="!$v.profile.email.email") Поле должно быть email адресом

            .form-group
              label(for="type-input") Тип задания
              select#type-input.form-control(
                :class="status('type')",
                @input="$v.profile.type.$touch()",
                v-model="profile.type"
              )
                option(disabled) Выберите один из вариантов
                option(value="front") Frontend
                option(value="back") Backend
              .invalid-feedback(v-if="!$v.profile.email.required") Поле обязательно для заполнения

           

        transition(name="slide-fade")
          .step(v-show="step === 2")
            .form-group
              label(for="github-input") Гитхаб
              input#github-input.form-control(
                v-model="profile.github",
                type="text"
              )

            .form-group
              label(for="city-input") Населённый пункт
              input#city-input.form-control(
                :class="status('city')",
                @input="$v.profile.city.$touch()",
                v-model="profile.city",
                type="text"
              )
              .invalid-feedback(v-if="!$v.profile.city.alpha") Используйте только символы алфавита

            .form-group
              label(for="phone-input") Телефон
              input#phone-input.form-control(
                v-model="profile.phone",
                type="tel"
              )
              small Format: 999-999-999

            .form-group
              label(for="birthday-input") Дата рождения
              input#birthday-input.form-control(
                v-model="profile.birthday",
                type="date"
              )

            button.btn.btn-light.mr-2(type="button", @click="prevStep") назад
            button.btn.btn-primary(type="submit") Зарегистрироваться
</template>


<script>
import { required, email, helpers } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Zа-яА-Я]*$/);

export default {
  props: ["service", "isLoggedIn"],
  data() {
    return {
      profile: {
        name: "Viktor",
        email: "motowest12@mail.ru",
        type: "front",
        github: "https://github.com/",
        city: "Kemerovo",
        phone: "88-555",
        birthday: "28.11.1990",
      },
    };
  },
  methods: {
    registerUser() {
      for (const input in this.profile) {
        this.profile[input] = "";
      }
      this.$v.$reset();
    },
  },
  status(type) {
    return {
      "is-invalid warning": this.$v.profile[type].$error,
    };
  },

  validations: {
    profile: {
      name: {
        required,
        alpha,
      },
      email: {
        required,
        email,
      },
      type: {
        required,
      },
      city: {
        alpha,
      },
    },
  },
  created() {
    if (this.isLoggedIn === false) {
      this.$router.push("login");
    }
  },
};
</script>

<style lang="scss" scope>
</style>