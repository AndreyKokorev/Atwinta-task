export default class atwintaService {

	base_url = 'http://test.atwinta.ru/api/v1';

	getResource = async (method, url, body) => {
		const accessToken = localStorage.getItem('accessToken');
		const req_param = {
			method,
			headers: {
				'Authorization': 'Bearer ' + accessToken,
				'Content-Type': 'application/json'
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



	restorePassword = async (parameters) => {
		const url = this.formParameters(parameters);
		console.log(url)
		return await this.getResource('POST', `/auth/restore?${url}`);
	}

	sendEmail = async (email) => {
		const json =  await JSON.stringify(email);
		const obj = await JSON.parse(json)
		console.log('json: ', json);
		console.log('parsed: ', obj);
		return await this.getResource('POST', `/auth/restore`, json);
	}

	formParameters = (parameters) => {
		return Object.keys(parameters)
			.map(item => `&${item}=${parameters[item]}`)
			.join('');
	}
}