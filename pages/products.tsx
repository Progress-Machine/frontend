import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Breadcrumb, Button, List } from 'antd';
import Markdown from 'markdown-to-jsx';

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

	console.log(data);

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
						Общая аналитика
					</CommentsBlockTitle>
					<CommentsBlockP>
						{data?.statistic.summary_analysis && (
							<Markdown className='markdown-container'>
								{data?.statistic.summary_analysis}
							</Markdown>
						)}
					</CommentsBlockP>
				</CommentsBlock>
				<CommentsBlock>
					<CommentsBlockTitle>
						Аналитика тэгов и концепции
					</CommentsBlockTitle>
					<CommentsBlockP>
						{data?.statistic.description_main_tags && (
							<Markdown className='markdown-container'>
								{data?.statistic.description_main_tags}
							</Markdown>
						)}
					</CommentsBlockP>
				</CommentsBlock>
				<CommentsBlock>
					<CommentsBlockTitle>
						Распределение цен
					</CommentsBlockTitle>
					<CommentsBlockP>
						Ваша цена:
						{` ${data?.statistic.item_data.price} ₽`}
					</CommentsBlockP>
				</CommentsBlock>
				{isSuccess && (
					<BarChart
						width={windowSizes.width - 400}
						height={500} 
						data={createChartData(data?.statistic.competitors_stats.prices)}
						colors={{
							one: '#F94144',
						}} />
				)}
				<CommentsBlock>
					<CommentsBlockTitle>
						Распределение рейтинга
					</CommentsBlockTitle>
					<CommentsBlockP>
						Ваш рейтинг:
						{` ${data?.statistic.item_data.celler_rating}`}
					</CommentsBlockP>
				</CommentsBlock>
				{isSuccess && (
					<BarChart
						width={windowSizes.width - 400}
						height={500} 
						data={createChartData(data?.statistic.competitors_stats.salers_rating)}
						colors={{
							one: '#F94144',
						}} />
				)}
				<CommentsBlock>
					<CommentsBlockTitle>
						Распределение продаж
					</CommentsBlockTitle>
					<CommentsBlockP>
						Ваши продажи:
						{` ${data?.statistic.item_data.celler_sold}`}
					</CommentsBlockP>
				</CommentsBlock>
				{isSuccess && (
					<BarChart
						width={windowSizes.width - 400}
						height={500} 
						data={createChartData(data?.statistic.competitors_stats.sales)}
						colors={{
							one: '#F94144',
						}} />
				)}
				{isSuccess && (
					<List
						header='Похожие товары'
						bordered
						style={{ marginTop: 30 }}
						dataSource={Object.entries(data?.statistic.competitors_stats.links as Record<string, string>)}
						renderItem={(item, key) => (
							<List.Item key={key}>
								<Link href={item[1]} target='_blank'>
									{item[0]}
								</Link>
							</List.Item>
						)} />
				)}
			</MainLayout>
		</>
	);
};

export default ProductPage;
