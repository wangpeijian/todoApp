import {BASE_INTERFACE} from '../config'

export default class {
	constructor(Component) {
		this.init(Component);
	}
	
	init(Component) {
		Component.prototype.$post = function (url, data = {}) {
			
			return fetch(`${BASE_INTERFACE}${url}`, {
				method: 'post',
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(data),
			}).then(function (response) {
				return response.json();
			}).then(function (res) {
				console.info(url + "：", data, JSON.parse(JSON.stringify(res)));
				return res;
			}).catch(function (e) {
				console.error(e);
			})
			
		}
	}
}