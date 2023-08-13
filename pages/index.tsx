import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button, Card } from 'antd';

import withCheckAuthLayout from '@layouts/CheckAuthLayout';
import MainLayout from '@layouts/MainLayout';

import { Content, Header, Title } from '@styles/pages/MainPage.styles';
import NewProductModal from '@/modals/NewProductModal';

const { Meta } = Card;

const MainPage = () => {	
	const [showModal, setShowModal] = useState(false);

	const router = useRouter();

	return (
		<>
			<NewProductModal
				open={showModal}
				onFinish={() => setShowModal(false)}
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
					{Array(10).fill((
						<Card
							hoverable
							onClick={() => router.push('/1')}
							style={{ width: 240 }}
							cover={(
								<Image
									width={240}
									height={214}
									objectFit='cover'
									alt='img'
									src='/assets/demo.webp' />
							)}
						>
							<Meta title='iPhone 13 Pro' description='ozon' />
						</Card>
					))}
				</Content>
			</MainLayout>
		</>
	);
};

export default withCheckAuthLayout(MainPage, true);
