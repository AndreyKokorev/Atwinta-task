<template lang="pug">
.container.mt-4
	.row
		.col-sm-6.mx-auto
			form(@submit.prevent="authUser", novalidate)
				.auth
					.form-group
						label.form-group__label(for="email-input") Email
						input.form-group__input.form-control#email-input(
							:class="status('email')",
							@blur="$v.formLog.email.$touch()",
							v-model.trim="formLog.email",
							type="email",
							aria-describedby="emailHelp"
						)
						.form-group__feedback(v-if="!$v.formLog.email.required") Обязательное поле
						.form-group__feedback(v-if="!$v.formLog.email.email") Поле должно быть email адресом

					.form-group
						label.form-group__label(for="password-input") Пароль
						input.form-group__input.form-control#password-input(
							:class="status('password')",
							@blur="$v.formLog.password.$touch()",
							v-model.trim="formLog.password",
							type="password",
							aria-describedby="passwordHelp"
						)
						.form-group__feedback(v-if="!$v.formLog.password.required") Обязательное поле
						.form-group__feedback(
							v-if="!$v.formLog.password.minLength && formLog.password.length > 0"
						) Пароль должен быть не меньше {{ $v.formLog.password.$params.minLength.min }} символов

					.btn-container
						button.btn.btn-primary(:disabled="$v.$invalid", type="submit") Войти
						button.btn.btn-secondary(@click="restorePassword", type="button") Забыли пароль?
</template>

<script>

import { required, email, minLength } from "vuelidate/lib/validators";

export default {
	props: {
		service: Object,
		onLogin: Function,
		displayPopup: Function,
		isLoggedIn: Boolean
	},
	data() {
		return {
			restore: false,
			formLog: {
				email: "andrey.kokorev.w.dev@gmail.com",
				password: "I7ExBEs4YZ",
			},
		};
	},
	created() {
		if (this.isLoggedIn === true) {
			this.$router.push("workers");
		}
	},
	methods: {
		authUser: async function () {
			const { token, user: { name } } = await this.service.authorization(this.formLog);
			localStorage.setItem("accessToken", token);
			
			this.onLogin(name);
			this.displayPopup('вы успешно авторизировались')
			this.$router.push("workers");
		},
		restorePassword: async () => {
			this.restore = true;
			const response = await this.service.restorePassword(this.formLog.email);
			console.log(response);
		},
		status(type) {
			if (this.$v.formLog[type].$error && this.$v.formLog[type].$dirty) {
				return "is-invalid warning";
			} else if (
				this.$v.formLog[type].$dirty &&
				!this.$v.formLog[type].$error
			) {
				return "is-valid";
			}
		},
	},
	validations: {
		formLog: {
			email: {
				required,
				email,
			},
			password: {
				required,
				minLength: minLength(6),
			},
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