<template lang="pug">
.container.mt-4
  .row
    .col-sm-6.mx-auto
      h2.mb-5 Регистрация
      form(@submit.prevent="saveProfile", novalidate)
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
          label(for="phone-input") Телефон
          input#phone-input.form-control(v-model="profile.phone", type="tel")

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
          label(for="birthday-input") Год рождения
          input#birthday-input.form-control(
            v-model="profile.birthday",
            type="date"
          )

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

        .form-group
          label(for="github-input") Ссылка на проект
          input#github-input.form-control(
            v-model="profile.github",
            type="text"
          )

        .form-group
          label(for="github-input") Телеграм
          input#github-input.form-control(
            v-model="profile.github",
            type="text"
          ) 

        button.btn.btn-light.mr-2(type="submit", @click="prevStep") Сохранить
        button.btn.btn-primary(type="submit") Зарегистрироваться
</template>


<script>
import { required, helpers, numeric } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Zа-яА-Я]*$/);

export default {
  props: ["service", "isLoggedIn"],
  data() {
    return {
      profile: {
        id: "",
        name: "Viktor",
        email: "motowest12@mail.ru",
        phone: "88-555",
        city: "Kemerovo",
        birthday: "28.11.1990",
        type: "front",
        github: "https://github.com/",
        telegram: "",
        about: "",
      },
    };
  },
  methods: {
    saveProfile() {},
    status(type) {
      return {
        "is-invalid warning": this.$v.profile[type].$error,
      };
    },
  },
  validations: {
    profile: {
      id: {},
      name: {
        alpha,
        required,
      },
      email: {},
      phone: {
        numeric,
      },
      city: {},
      birthday: {},
      type: {},
      github: {},
      telegram: {},
      about: {},
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