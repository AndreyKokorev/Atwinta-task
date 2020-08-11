<template lang="pug">
.workers.mt-4
  .row
    .col-sm-6.mx-auto
      Spinner(v-if="LOADING_INDICATOR")
      h2.mb-5 Профиль
      transition(name="profile")
        form(
          @submit.prevent="setProfileData",
          v-show="!LOADING_INDICATOR",
          novalidate
        )
          .form-group
            label.form-group__label.form-group__label--required(
              for="name-input"
            ) Имя
            input#name-input.form-group__input.form-control(
              :class="status('name')",
              @blur="$v.name.$touch()",
              v-model.trim="name",
              type="text",
              aria-describedby="emailHelp"
            )
            .form-group__feedback(v-if="!$v.name.required") Обязательное поле
            .form-group__feedback(v-if="!$v.name.alpha") Используйте только символы алфавита
          .form-container 
            .form-group
              label.form-group__label(for="email-input") Почта
              input#email-input.form-control.form-group__input(
                v-model="email",
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
                  @blur="$v.phone.$touch()",
                  v-model.trim="phone",
                  type="tel"
                )
              .form-group__feedback(v-if="!$v.phone.required") Обязательное поле
              .form-group__feedback(v-if="!$v.phone.numeric") Некорректный номер

            .form-group
              label.form-group__label.form-group__label--required(
                for="city-input"
              ) Населённый пункт
              input#city-input.form-group__input.form-control(
                :class="status('city')",
                @blur="$v.city.$touch()",
                v-model.trim="city",
                type="text"
              )
              .form-group__feedback(v-if="!$v.city.required") Используйте только символы алфавита

            .form-group
              label.form-group__label.form-group__label--required(
                for="birthday-input"
              ) Дата рождения
              input#birthday-input.form-group__input.form-control(
                :class="status('birthday')",
                @blur="$v.birthday.$touch()",
                v-model="birthday",
                type="date"
              )

          .form-group
            label.form-group__label(for="type-input") Тип задания
            select#type-input.form-group__select.form-control(
              v-model="type",
              disabled
            )
              option(disabled) Выберите один из вариантов
              option(value="front") Frontend
              option(value="back") Backend

          .form-group
            label.label-group__label(for="github-input") Ссылка на проект
            .form-group__inputl-group.input-group 
              .input-group__prepend https://
              input#github-input.input-group__input.form-control(
                v-model.trim="github",
                type="text"
              )

          .form-group
            label(for="github-input") Телеграм
            .form-group__input-group.input-group
              .input-group__prepend @
              input#github-input.input-group__input.form-control(
                v-model.trim="telegram",
                type="text"
              ) 

          .form-group
            label.form-group__label(for="about-input") О себе
            textarea#about-input.form-group__input.form-control(
              v-model="about"
            )

          button.btn.btn-success.mr-2(type="submit") Сохранить
          button.btn.btn-danger(@click="logOut()", type="button") Выйти
</template>


<script>
import Spinner from "../components/Spinner";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { required, helpers, numeric } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Zа-яА-Я]*$/);

export default {
  components: {
    Spinner,
	},
	
  created: async function () {
    this.SWITCH_LOADING_INDICATOR(true);
    await this.GET_PROFILE_DATA_FROM_API();
    this.SWITCH_LOADING_INDICATOR(false);
  },

  computed: {
    ...mapGetters(["LOADING_INDICATOR", "PROFILE_DATA"]),
    name: {
      get() {
        return this.PROFILE_DATA.name;
      },
      set(name) {
        this.$store.commit('SET_NAME_TO_STATE', name)
      },
    },
    email: {
      get() {
        return this.PROFILE_DATA.email;
      },
    },
    phone: {
      get() {
        return this.PROFILE_DATA.phone;
      },
      set(phone) {
        this.$store.commit('SET_PHONE_TO_STATE', phone);
      },
    },
    city: {
      get() {
        return this.PROFILE_DATA.city;
      },
      set(city) {
        this.$store.commit('SET_CITY_TO_STATE', city);
      },
    },
    birthday: {
      get() {
        return this.PROFILE_DATA.birthday;
      },
      set(birthday) {
        this.$store.commit('SET_BIRTHDAY_TO_STATE', birthday);
      },
    },
    type: {
      get() {
        return this.PROFILE_DATA.type;
      },
    },
    github: {
      get() {
        return this.PROFILE_DATA.github;
      },
      set(github) {
        this.$store.commit('SET_GITHUB_TO_STATE', github);
      },
    },
    telegram: {
      get() {
        return this.PROFILE_DATA.telegram;
      },
      set(telegram) {
        this.$store.commit('SET_TELEGRAM_TO_STATE', telegram);
      },
    },
    about: {
      get() {
        return this.PROFILE_DATA.about;
      },
      set(about) {
        this.$store.commit('SET_ABOUT_TO_STATE', about);
      },
    },
  },

  methods: {
    ...mapMutations(["SET_PROFILE_DATA_TO_STATE"]),
    ...mapActions([
      "SWITCH_LOADING_INDICATOR",
      "GET_PROFILE_DATA_FROM_API",
      "SET_PROFILE_DATA_TO_API",
      "DISPLAY_POPUP",
      "LOG_OUT",
    ]),
    status(type) {
      if (this.$v[type].$error && this.$v[type].$dirty) {
        return "is-invalid warning";
      } else if (this.$v[type].$dirty && !this.$v[type].$error) {
        return "is-valid";
			}
    },
    setProfileData: async function () {
      await this.SET_PROFILE_DATA_TO_API();
      this.DISPLAY_POPUP("Профиль успешно сохранён");
    },
    logOut() {
      this.LOG_OUT();
      this.DISPLAY_POPUP("Вы вышли из аккаунта");
    },
  },
  validations: {
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
};
</script>


<style lang="scss" scoped>
h2 {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 27px;
  font-weight: bold;
}

.row {
  margin: 0px;
}

.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3vw;
}
.profile-enter-active {
  transition: opacity 1s;
}

.profile-enter {
  opacity: 0;
}

@media screen and (max-width: 1100px) {
  .form-container {
    grid-template-columns: auto;
    grid-column-gap: 0px;
  }
}
</style>