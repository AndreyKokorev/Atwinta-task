<template lang="pug">
.container.mt-4
  .row
    .col-sm-6.mx-auto
      <Spinner v-if="isLoading"/>
      h2.mb-5 Профиль
      transition(name="profile")
        form(@submit.prevent="setProfileData", v-show="!isLoading", novalidate)
          .form-group
            label.form-group__label.form-group__label--required(
              for="name-input"
            ) Имя
            input#name-input.form-group__input.form-control(
              :class="status('name')",
              @blur="$v.profile.name.$touch()",
              v-model.trim="profile.name",
              type="text",
              aria-describedby="emailHelp"
            )
            .form-group__feedback(v-if="!$v.profile.name.required") Обязательное поле
            .form-group__feedback(v-if="!$v.profile.name.alpha") Используйте только символы алфавита

          .form-group
            label.form-group__label(for="email-input") Email
            input#email-input.form-control.form-group__input(
              v-model="profile.email",
              type="email",
              aria-describedby="emailHelp",
              disabled
            )

          .form-group
            label.form-group__label.form-group__label--required(
              for="phone-input"
            ) Телефон
            .form-group__input-group.input-group
              .input-group__prepend +7
              input#phone-input.input-group__input.form-control(
                :class="status('phone')",
                @blur="$v.profile.phone.$touch()",
                v-model.trim="profile.phone",
                type="tel"
              )
            .form-group__feedback(v-if="!$v.profile.phone.required") Обязательное поле
            .form-group__feedback(v-if="!$v.profile.phone.numeric") Некорректный номер

          .form-group
            label.form-group__label.form-group__label--required(for="city-input") Населённый пункт
            input#city-input.form-group__input.form-control(
              :class="status('city')",
              @blur="$v.profile.city.$touch()",
              v-model.trim="profile.city",
              type="text"
            )
            .form-group__feedback(v-if="!$v.profile.city.required") Используйте только символы алфавита

          .form-group
            label.form-group__label.form-group__label--required(
              for="birthday-input"
            ) Дата рождения
            input#birthday-input.form-group__input.form-control(
              :class="status('birthday')",
              @blur="$v.profile.birthday.$touch()",
              v-model="profile.birthday",
              type="date"
            )

          .form-group
            label.form-group__label(for="type-input") Тип задания
            select#type-input.form-group__select.form-control(disabled)
              option(disabled) Выберите один из вариантов
              option(value="front") Frontend
              option(value="back") Backend

          .form-group
            label.label-group__label(for="github-input") Ссылка на проект
            .form-group__inputl-group.input-group 
              .input-group__prepend https://
              input#github-input.input-group__input.form-control(
                v-model.trim="profile.github",
                type="text"
              )

          .form-group
            label(for="github-input") Телеграм
            .form-group__input-group.input-group
              .input-group__prepend @
              input#github-input.input-group__input.form-control(
                v-model.trim="profile.telegram",
                type="text"
              ) 

          .form-group
            label.form-group__label(for="about-input") О себе
            textarea#about-input.form-group__input.form-control(
              v-model="profile.about",
            )

          button.btn.btn-success.mr-2(type="submit") Сохранить
          button.btn.btn-danger(@click="logOff", type="button") Выйти
</template>


<script>
import Spinner from '../components/Spinner';
import { required, helpers, numeric } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Zа-яА-Я]*$/);

export default {
  components: {
    Spinner
  },
  props: {
    service: Object,
    isLoggedIn: Boolean,
    logOff: Function,
    displayPopup: Function
  },
  data() {
    return {
      isLoading: true,
      profile: {
        name: "",
        email: "",
        phone: "",
        city: "",
        birthday: "",
        type: "",
        github: "",
        telegram: "",
        about: "",
        is_finished: false
      },
    };
  },
  created: async function () {
    if (this.isLoggedIn === false) {
      this.$router.push("login");
    } else {
      const data = await this.service.getProfileData();
      this.profile = { ...data, name: data.name };
      this.isLoading = false;
    }
  },
  methods: {
    status(type) {
      if (this.$v.profile[type].$error && this.$v.profile[type].$dirty) {
        return "is-invalid warning";
      } else if (this.$v.profile[type].$dirty && !this.$v.profile[type].$erro) {
        return "is-valid";
      }
    },
    setProfileData: async function () {
     await this.service.setProfileData(this.profile);
     this.displayPopup('Данные успешно сохранены');
    },
    leaveProfile() {
      this.logOff();
      this.displayPopup('Вы вышли из аккаунта');
    }
  },
  validations: {
    profile: {
      name: {
        alpha,
        required,
      },
      email: {},
      phone: {
        required,
        numeric,
      },
      city: {
        required,
      },
      birthday: {
        required,
      },
      type: {},
      github: {},
      telegram: {},
      about: {},
    },
  },
};
</script>


<style lang="scss" scope>
h2 {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 27px;
  font-weight: bold;
}

.profile-enter-active {
  transition: opacity 1s;
}

.profile-enter {
  opacity: 0;
}

</style>