
export default class atwintaService {

	base_url = 'http://test.atwinta.ru/api/v1';

	getResource = async (method, url, body = null) => {
		const accessToken = localStorage.getItem('accessToken') || null;
		const req_param = {
			method,
			headers: {
				'Authorization': 'Bearer ' + accessToken,
				'Content-Type': 'application/json',
				
			},
			body
		};
		const response = await fetch(
			`${this.base_url}${url}&token=${accessToken}`,
			req_param);

		if (!response.ok) {
			throw new Error(`Could not fetch ${url}` +
				`, received ${response.status}`)
		}

		return await response.json();
	}

	authorization = async (parameters) => {
		const url = this.formParameters(parameters);
		return await this.getResource('POST', `/auth/login?${url}`);
	}

	autoAuthorization = async () => {
		return await this.getResource('POST', `/user`);
	}

	restorePassword = async (parameters) => {
		const url = this.formParameters(parameters);
		console.log(url)
		return await this.getResource('POST', `/auth/restore/confirm?${url}`);
	}

	sendEmail = async(email) => {
		return await this.getResource('POST', `/auth/restore?email=${email}}`);
	}

	getWorkerProfile = async (id) => {
		return await this.getResource('GET', `/workers/${id}`);
	}

	getWorkers = async (page) => {
		return await this.getResource('GET', `/workers?page=${page}`);
	}

	getProfileData = async () => {
		return await this.getResource('GET', '/user');
	}

	setProfileData = async (parameters) => {
		const json = JSON.stringify(parameters)
		return await this.getResource('POST', `/user`, json);
	}

	formParameters = (parameters) => {
		return Object.keys(parameters)
			.map(item => `&${item}=${parameters[item]}`)
			.join('');
	}
}