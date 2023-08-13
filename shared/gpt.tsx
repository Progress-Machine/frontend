import instance from './axios';

export const getGPT = (data: any) => {
	return instance.get('/product/gpt', {
		params: data,
	}).then((res) => res.data);
};
