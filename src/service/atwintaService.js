import router from '../router/index';

export default class atwintaService {

	base_url = 'http://test.atwinta.ru/api/v1';
	accessToken = localStorage.getItem('accessToken');

	getResource = async (method, url) => {
		const req_param = {
			method,
			headers: {
				"Content-Type": "application/json",
			}
		};
		const response = await fetch(
			`${this.base_url}${url}`,
			req_param);

		if (!response.ok) {
			throw new Error(`Could not fetch ${url}` +
				`, received ${response.status}`)
		}

		return await response.json();
	}

	authorization = async (parameters) => {
		const url = this.formUrl(parameters);
		return await this.getResource('POST', `/auth/login?${url}`);
	}

	autoAuthorization = async () => {
		return await this.getResource('POST', `/user?token=${this.accessToken}`)
	}

	restorePassword = async (email) => {
		return await this.getResource('POST', `/auth/restore?email=${email}`)
	}

	getWorkers = async () => {
		return await this.getResource('GET', `/workers?page=1&per_page=12`)
	}

	leaveProfile = () => {
		localStorage.removeItem('accessToken');
		router.push('login');
	}

	setProfileData = async (parameters) => {
		const url = this.formUrl(parameters);
		return await this.getResource('POST', `/user?${url}`)
	}

	formUrl= (parameters) => {
		return Object.keys(parameters)
			.map(item => `&${item}=${parameters[item]}`)
			.join('');
	}
}