import getResource from './auth_api';
import router from '../../../router';

export default {
	state:{
		loginForm: {
			email: '',
			password: '',
		},
		restoreForm: {
			token: '',
			email: '',
			password: '',
			confirmedPassword: ''
		},
		isLoggedIn: false,
		isLoading: true,
		profileName: ''
	},
	mutations: {
		SET_LOGIN_INDICATOR: (state, indicator) => {
			state.isLoggedIn = indicator;
		},
		SET_PROFILE_NAME: (state, name) => {
			state.profileName = name;
		},
		SET_LOGIN_EMAIL_TO_STATE: (state, email) => {
			state.loginForm.email = email;
		},
		SET_LOGIN_PASSWORD_TO_STATE: (state, password) => {
			state.loginForm.password = password;
		},
		SET_RESTORE_EMAIL_TO_STATE: (state, email) => {
			state.restoreForm.email = email;
		},
		SET_RESTORE_PASSWORD_TO_STATE: (state, password) => {
			state.restoreForm.password = password;
		},
		SET_RESTORE_CONFIRMED_PASSWORD_TO_STATE: (state, password) => {
			state.restoreForm.confirmedPassword = password;
		},
		SET_RECOVER_TOKEN_TO_STATE: (state, token) => {
			state.restoreForm.token = token;
		}
	},
	actions:{
		SWITCH_LOGIN_INDICATOR({ commit }, indicator) {
			commit('SET_LOGIN_INDICATOR', indicator)
		},
		async AUTHORIZATION({ commit, state }) {
			const url = formParameters(state.loginForm);
			const { token, user: { name } } = await getResource('POST', `/auth/login?${url}`);
			localStorage.setItem("accessToken", token);
			commit('SET_LOGIN_INDICATOR', true);
			commit('SET_PROFILE_NAME', name );
			router.push('workers');
		},
		async AUTO_AUTHORIZATION({ commit }) {
			await getResource('POST', '/user')
				.then((response) => {
					commit('SET_LOGIN_INDICATOR', true);
					commit('SET_PROFILE_NAME', response.name);         
				})   
		},
		async SEND_RESTORE_EMAIL({  state }) {
			const obj = {email: state.restoreForm.email}
			const json = JSON.stringify(obj);
			await getResource('POST', `/auth/restore`, json);
		},
		async SEND_RESTORE_PASSWORD({ state}) {
			const obj = {
				token: state.restoreForm.token,
				password: state.restoreForm.password,
				password_confirmation: state.restoreForm.confirmedPassword
			}
			const json = JSON.stringify(obj);
			await getResource('POST', `/auth/restore/confirm`, json);
			router.push('/auth');
		}
	},
	getters: {
		LOGIN_FORM_DATA: state => state.loginForm,
		RESTORE_FORM_DATA: state => state.restoreForm,
		LOGIN_INDICATOR: state => state.isLoggedIn,
		PROFILE_NAME: state => state.profileName,
	}
}


function formParameters(parameters) {
	return Object.keys(parameters)
		.map(item => `&${item}=${parameters[item]}`)
		.join('');
}