import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Breadcrumb, Button, List } from 'antd';

import MainLayout from '@layouts/MainLayout';
import BarChart from '@components/Charts/BarChart';
import useWindowDemantions from '@hooks/useWindowDemantions';

import { Header, Title } from '@styles/pages/MainPage.styles';
import { CommentsBlock, CommentsBlockP, CommentsBlockTitle } from '@styles/pages/productIdPage.styles';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getProductById, newAlatics } from '@/shared/products';
import { createChartData } from '@/shared/createChartData';
import EditProductModal from '@/modals/EditProductModal';
import EditProductModalResults from '@/modals/EditProductModalResults';

const ProductPage: React.FC = () => {
	const [isReady, setIsReady] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showModalResults, setShowModalResults] = useState(false);

	const windowSizes = useWindowDemantions();

	const router = useRouter();

	const { data, isSuccess } = useQuery(['get_product', router.query?.id], () => getProductById(router.query.id), {
		enabled: !!router.query && !!router.query.id,
	});

	const { mutate, data: newData, isLoading } = useMutation(newAlatics, {
		onSuccess: () => {
			setShowModal(false);
			setShowModalResults(true);
		},
	});

	useEffect(() => {
		setIsReady(true);
	}, []);

	if(!isReady)
		return null;
	
	return (
		<>
			<EditProductModal
				values={{
					price: data?.product.price,
					description: data?.product.description,
					celler_rating: data?.product.celler_rating,
					text_params: data?.product.text_params,
					name: data?.product.name,
				}}
				open={showModal}
				confirmLoading={isLoading}
				onFinish={(newData) => {
					mutate({
						...data.product,
						...newData,
					});
				}}
				onCancel={() => setShowModal(false)} />
			<EditProductModalResults
				data={newData}
				open={showModalResults}
				cancelButtonProps={{ style: { display: 'none' } }}
				onOk={() => setShowModalResults(false)}
				onCancel={() => setShowModalResults(false)} />
			<MainLayout activeMenu={['products']}>
				<Breadcrumb
					style={{
						marginBottom: 10,
					}}
					items={[
						{
							title: (
								<Link href='/'>
									Мои товары
								</Link>
							),
						},
						{
							title: data?.product.name,
						},
					]} />
				<Header>
					<Title>
						{data?.product.name}
					</Title>
					<Button type='primary' onClick={() => setShowModal(true)}>
						Редактировать
					</Button>
				</Header>
				<CommentsBlock>
					<CommentsBlockTitle>
						Цена
					</CommentsBlockTitle>
					<CommentsBlockP>
						{data?.statistic.price_analytic.comment}
					</CommentsBlockP>
				</CommentsBlock>
				<CommentsBlock>
					<CommentsBlockTitle>
						Рекомендации по цене
					</CommentsBlockTitle>
					<CommentsBlockP>
						{data?.statistic.price_analytic.personal_comment}
					</CommentsBlockP>
				</CommentsBlock>
				{isSuccess && (
					<BarChart
						width={windowSizes.width - 400}
						height={500} 
						data={createChartData(data?.statistic.price_analytic.nearest_prices)}
						colors={{
							one: '#F94144',
						}} />
				)}
				<CommentsBlock>
					<CommentsBlockTitle>
						Рейтинг
					</CommentsBlockTitle>
					<CommentsBlockP>
						{data?.statistic.rating_analytic.comment}
					</CommentsBlockP>
				</CommentsBlock>
				{isSuccess && (
					<BarChart
						width={windowSizes.width - 400}
						height={500} 
						data={createChartData(data?.statistic.rating_analytic.nearest_ratings)}
						colors={{
							one: '#F94144',
						}} />
				)}
				<CommentsBlock>
					<CommentsBlockTitle>
						Выручка
					</CommentsBlockTitle>
					<CommentsBlockP>
						{data?.statistic.revenue_analytic.comment}
					</CommentsBlockP>
				</CommentsBlock>
				{isSuccess && (
					<BarChart
						width={windowSizes.width - 400}
						height={500} 
						data={createChartData(data?.statistic.revenue_analytic.nearest_revenues)}
						colors={{
							one: '#F94144',
						}} />
				)}
				<List
					header='Похожие товары'
					bordered
					style={{ marginTop: 30 }}
					dataSource={data?.statistic.urls_nearest}
					renderItem={(item) => (
						<List.Item>
							<Link href={item as string} target='_blank'>
								{item as string}
							</Link>
						</List.Item>
					)} />
			</MainLayout>
		</>
	);
};

export default ProductPage;
