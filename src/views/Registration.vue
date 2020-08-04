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
								v-model="formReg.name"
								type="text",
								required="true",
								aria-describedby="emailHelp"
							)

						.form-group
							label(for="email-input") Email
							input#email-input.form-control(
								v-model="formReg.email"
								type="email",
								required,
								aria-describedby="emailHelp"
							)

						.form-group
							label(for="type-input", required) Тип задания
							select#type-input.form-control(v-model="formReg.type" required )
								option(disabled value="") Выберите один из вариантов
								option(value="front") Frontend
								option(value="back") Backend

						button.btn.btn-primary(type="submit", @click="nextStep") Следующий шаг

				transition(name="slide-fade")
					.step(v-show="step === 2")
						.form-group
							label(for="github-input") Гитхаб
							input#github-input.form-control(v-model="formReg.github" type="text")

						.form-group
							label(for="city-input") Населённый пункт
							input#city-input.form-control(v-model="formReg.city" type="text")

						.form-group
							label(for="phone-input") Телефон
							input#phone-input.form-control(v-model="formReg.phone" type="tel")
							small Format: 999-999-999

						.form-group
							label(for="birthday-input") Дата рождения
							input#birthday-input.form-control(v-model="formReg.birthday" type="date")

						button.btn.btn-light.mr-2(type="submit", @click="prevStep") назад
						button.btn.btn-primary(type="submit" @click="registerUser") Зарегистрироваться
</template>

<script>
export default {
	data() {
		return {
			step: 1,
			formReg: {
				name: '',
				email: '',
				type: '',
				github: '',
				city: '',
				phone: '',
				birthday: ''
			}
		};
	},
	methods: {
		nextStep() {
			this.step++;
		},
		prevStep() {
			this.step--;
		},
		registerUser() {
			console.log('Reg complete')
			console.log(this.formReg.name)
		},
	},
};
</script>

<style lang="scss" scope>

.slide-fade-enter-active {
	transition: all .3s ease;
}

.slide-fade-enter {
	transform: translateX(10px);
	opacity: 0;
}
</style>