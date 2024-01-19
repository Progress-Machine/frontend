import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button, Card } from 'antd';

import withCheckAuthLayout from '@layouts/CheckAuthLayout';
import MainLayout from '@layouts/MainLayout';

import { Content, Header, Title, Spin } from '@styles/pages/MainPage.styles';
import NewProductModal from '@modals/NewProductModal';
import { useMutation, useQuery } from 'react-query';
import { createProducts, getProducts } from '@shared/products';

const { Meta } = Card;

const MainPage = () => {	
	const [showModal, setShowModal] = useState(false);

	const { data, refetch, isLoading: isGetProductsLoading } = useQuery(['get_products'], () => getProducts());

	const { mutate, isLoading } = useMutation(createProducts, {
		onSuccess: () => {
			setShowModal(false);
			refetch();
		},
		onError: () => {
			setShowModal(false);
			refetch();
		},
	});

	const router = useRouter();

	return (
		<>
			<NewProductModal
				open={showModal}
				confirmLoading={isLoading}
				onFinish={(data) => {
					mutate(data);
				}}
				onCancel={() => setShowModal(false)} />
			<MainLayout activeMenu={['products']}>
				<Header>
					<Title>
						Мои товары
					</Title>
					<Button type='primary' onClick={() => setShowModal(true)}>
						Создать новый
					</Button>
				</Header>
				<Content>
					{isGetProductsLoading ? (
						<Spin size='large' tip='Идёт загрузка...'>
							<div />
						</Spin>
					) : (data as Array<any>)?.map((i, key) => (
						<Card
							key={key}
							hoverable
							onClick={() => router.push(`/products?id=${i.id}`)}
							style={{ width: 240 }}
							cover={(
								<Image
									width={240}
									height={214}
									style={{
										objectFit: 'cover',
									}}
									alt='img'
									src={i.img_link} />
							)}
						>
							<Meta title={i.name} description={`${i.price} ₽`} />
						</Card>
					))}
				</Content>
			</MainLayout>
		</>
	);
};

export default withCheckAuthLayout(MainPage, true);
