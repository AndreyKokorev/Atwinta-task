export default class atwintaService {
	base_url = 'http://test.atwinta.ru/api/v1';

	getResource = async (method, url) => {
		const req_param = {
			method,
			headers: {
				"Content-Type": "application/json",
			}
		};
		console.log(`${this.base_url}${url}`)
		const response = await fetch(
			`${this.base_url}${url}`,
			req_param);

		return await response.json();
	}

	authorization = async (parameters) => {
		const par = Object.keys(parameters)
			.map( item => `&${item}=${parameters[item]}`)
			.join('')
			
		return await this.getResource('POST', `/auth/login?${par}`);
	}
}