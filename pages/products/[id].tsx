import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'antd';

import MainLayout from '@layouts/MainLayout';
import BarChart from '@components/Charts/BarChart';
import useWindowDemantions from '@hooks/useWindowDemantions';

import { Title } from '@styles/pages/MainPage.styles';
import { CommentsBlock, CommentsBlockP, CommentsBlockTitle } from '@styles/pages/productIdPage.styles';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getProductById } from '@/shared/products';
import { createChartData } from '@/shared/createChartData';

const ProductPage: React.FC = () => {
	const [isReady, setIsReady] = useState(false);

	const windowSizes = useWindowDemantions();

	const router = useRouter();

	const { data, isSuccess } = useQuery(['get_product', router.query?.id], () => getProductById(router.query.id), {
		enabled: !!router.query && !!router.query.id,
	});

	useEffect(() => {
		setIsReady(true);
	}, []);

	if(!isReady)
		return null;
	
	return (
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
			<Title>
				{data?.product.name}
			</Title>
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
		</MainLayout>
	);
};

export default ProductPage;
