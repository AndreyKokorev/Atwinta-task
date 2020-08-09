<template lang="pug">
.container.mt-4
	.row
		.col-sm-6.mx-auto
			form(@submit.prevent="sendEmail()", novalidate)
				.form-group
					label.form-group__label(for="email-input") Пароль
					input#email-input.form-group__input.form-control(
						:class="status()",
						@blur="$v.formRest.email.$touch()",
						v-model.trim="formRest.email",
						type="email",
						aria-describedby="passwordHelp"
					)

					.form-group__feedback(
						v-if="!$v.formRest.email.email && $v.formRest.email.$dirty"
					) Поле должно быть email адресом

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
import { email, required } from "vuelidate/lib/validators";

export default {
	props: {
		service: Object,
	},
	data() {
		return {
			formRest: {
				email: "",
			},
		};
	},
	methods: {
		sendEmail: async function () {
			const res = await this.service.sendEmail(this.formRest);
			console.log(res);
		},
		status() {
			if (this.$v.formRest.email.$dirty) {
				if (!this.$v.formRest.email.email) {
					return "is-invalid warning";
				} else if (this.$v.formRest.email.email && this.$v.formRest.email.required) {
					return "is-valid";
				}
			}
		},
	},
	validations: {
		formRest: {
			email: {
				email,
				required
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