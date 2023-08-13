import instance from './axios';

export const signup = (data: any) => {
	return instance.post('/user', data).then((res) => res.data);
};

export const login = (data: any) => {
	return instance.get('/auth/login', {
		headers: data,
	}).then((res) => res.data);
};
