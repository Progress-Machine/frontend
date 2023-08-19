import instance from './axios';

export const getProducts = () => {
	return instance.get('/product').then((res) => res.data);
};

export const getProductById = (data: any) => {
	return instance.get(`/product/${data}`).then((res) => res.data);
};

export const createProducts = (data: any) => {
	return instance.post('/product', null, {
		params: {
			product_url: data,
		},
	}).then((res) => res.data);
};

export const newAlatics = (data: any) => {
	return instance.post('/product/analytics', data).then((res) => res.data);
};
