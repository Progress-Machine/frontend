import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.tradeboost.pro',
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use((req) => {
	const withAuthorization: any = localStorage && localStorage.getItem('access_token')
		? {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
		}
		: {};

	req.headers = {
		...req.headers,
		...withAuthorization,
	};

	return req;
});

instance.interceptors.response.use((data) => data, (error) => {
	if(error.response.status === 403 && error.config.headers.Authorization) {
		localStorage.removeItem('access_token');
		document.location.reload();
	}

	return Promise.reject(error);
});

export default instance;
