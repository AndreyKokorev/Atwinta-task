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
                @input="$v.formReg.name.$touch()",
                v-model="formReg.name",
                type="text",
                aria-describedby="emailHelp"
              )
              .invalid-feedback(v-if="!$v.formReg.name.required") Поле обязательно для заполнения
              .invalid-feedback(v-if="!$v.formReg.name.alpha") Используйте только символы алфавита

            .form-group
              label(for="email-input") Email
              input#email-input.form-control(
                :class="status('email')",
                @input="$v.formReg.email.$touch()",
                v-model="formReg.email",
                type="email",
                aria-describedby="emailHelp"
              )
              .invalid-feedback(v-if="!$v.formReg.email.required") Поле обязательно для заполнения
              .invalid-feedback(v-if="!$v.formReg.email.email") Поле должно быть email адресом

            .form-group
              label(for="type-input") Тип задания
              select#type-input.form-control(
                :class="status('type')",
                @input="$v.formReg.type.$touch()",
                v-model="formReg.type"
              )
                option(disabled) Выберите один из вариантов
                option(value="front") Frontend
                option(value="back") Backend
              .invalid-feedback(v-if="!$v.formReg.email.required") Поле обязательно для заполнения

            button.btn.btn-primary.next(
              @click="nextStep",
              :disabled="disabledBtn",
              type="button"
            ) Следующий шаг

        transition(name="slide-fade")
          .step(v-show="step === 2")
            .form-group
              label(for="github-input") Гитхаб
              input#github-input.form-control(
                v-model="formReg.github",
                type="text"
              )

            .form-group
              label(for="city-input") Населённый пункт
              input#city-input.form-control(
                :class="status('city')",
                @input="$v.formReg.city.$touch()",
                v-model="formReg.city",
                type="text"
              )
              .invalid-feedback(v-if="!$v.formReg.city.alpha") Используйте только символы алфавита

            .form-group
              label(for="phone-input") Телефон
              input#phone-input.form-control(
                v-model="formReg.phone",
                type="tel"
              )
              small Format: 999-999-999

            .form-group
              label(for="birthday-input") Дата рождения
              input#birthday-input.form-control(
                v-model="formReg.birthday",
                type="date"
              )

            button.btn.btn-light.mr-2(type="button", @click="prevStep") назад
            button.btn.btn-primary(type="submit") Зарегистрироваться
</template>

<script>
import { required, email, helpers } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Zа-яА-Я]*$/);

export default {
  data() {
    return {
      step: 1,
      formReg: {
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
  computed: {
    disabledBtn() {
      return (
        this.$v.formReg.name.$invalid ||
        this.$v.formReg.email.$invalid ||
        this.$v.formReg.type.$invalid
      );
    },
  },
  methods: {
    nextStep() {
      this.step++;
    },
    prevStep() {
      this.step--;
    },
    registerUser() {
      let parameters = "";
      for (const item of Object.keys(this.formReg)) {
        parameters += `$${item}=${this.formReg[item]}`;
      }

      async function postData(url = "") {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        return await response.json();
      }

			postData(`http://test.atwinta.ru/api/v1/auth/register/?${parameters}`)
				.then((data) => {
        console.log(data);
        for (const input in this.formReg) {
          this.formReg[input] = "";
        }
        this.$v.$reset();
      });
    },
    status(type) {
      return {
        "is-invalid warning": this.$v.formReg[type].$error,
      };
    },
  },
  validations: {
    formReg: {
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
};
</script>

<style lang="scss" scope>
.warning {
  background: rgba(228, 25, 25, 0.11);
}

.step {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: min-content min-content min-content auto;
  height: 450px;
}

.form-group {
  grid-column: 1/3;
  align-self: start;
}

button {
  align-self: flex-end;
}

.next {
  grid-column: 1/3;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
</style>