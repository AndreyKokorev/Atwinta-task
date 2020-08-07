
export default class atwintaService {

	base_url = 'http://test.atwinta.ru/api/v1';

	getResource = async (method, url, body = null) => {
		const accessToken = localStorage.getItem('accessToken');
		const req_param = {
			method,
			headers: {
				'Authorization': 'Bearer ' + accessToken,
				"Content-Type": "application/json",
			},
			body
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
		return await this.getResource('POST', `/user`);
	}

	restorePassword = async (email) => {
		return await this.getResource('POST', `/auth/restore?email=${email}`);
	}

	getWorkers = async () => {
		return await this.getResource('GET', `/workers?page=1&per_page=12`);
	}

	getProfileData = async () => {
		return await this.getResource('GET', '/user');
	}

	setProfileData = async (parameters) => {
		const json = JSON.stringify(parameters)
		return await this.getResource('POST', `/user`, json);
	}

	formUrl= (parameters) => {
		return Object.keys(parameters)
			.map(item => `&${item}=${parameters[item]}`)
			.join('');
	}
}