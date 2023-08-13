import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'antd';

import MainLayout from '@layouts/MainLayout';
import BubbleChart from '@components/Charts/BubbleChart';
import BarChart from '@components/Charts/BarChart';
import useWindowDemantions from '@hooks/useWindowDemantions';

import { Title } from '@styles/pages/MainPage.styles';
import { CommentsBlock, CommentsBlockP, CommentsBlockTitle, ImageContainer, ImageContainerImage,
	ImageContainerTitle } from '@styles/pages/productIdPage.styles';

//DEV ONLY
let chartData: any[] = [];

for(let i = 0; i < 160; i++) {
	chartData.push({
		x: Math.floor(Math.random() * 100),
		y: Math.floor(Math.random() * 100),
		z: Math.floor(Math.random() * 100),
		color: ['#F94144', '#F3722C', '#F8961E'][Math.floor(Math.random() * 3)],
		title: 'Product ' + Math.floor(Math.random() * 10),
		keywords: ['Собака', 'Кошка', 'Лягкушка', 'Животные', 'Птицы', 'Ежи'],
	});
}

let chartData3: any[] = [];

for(let i = 0; i < 10; i++) {
	chartData3.push({
		name: 'Product ' + i,
		one: Math.floor(Math.random() * 100),
		keywords: ['котик', 'собачка', 'крабик'],
	});
}
//DEV ONLY

const ProductPage: React.FC = () => {
	const [isReady, setIsReady] = useState(false);
	const [selectedCluster, setSelectedCluster] = useState();

	const windowSizes = useWindowDemantions();

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
						title: 'iPhone 13 Pro',
					},
				]} />
			<Title>
				iPhone 13 Pro
			</Title>
			<ImageContainer>
				<div>
					<ImageContainerTitle>
						Было
					</ImageContainerTitle>
					<ImageContainerImage alt='image before' src='/assets/demo.webp' />
				</div>
				<div>
					<ImageContainerTitle>
						Стало
					</ImageContainerTitle>
					<ImageContainerImage alt='image after' src='/assets/demo.webp' />
				</div>
			</ImageContainer>
			<CommentsBlock>
				<CommentsBlockTitle>
					Комментарии
				</CommentsBlockTitle>
				<CommentsBlockP>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quasi earum mollitia
					qui quas nisi deleniti neque dolor explicabo itaque commodi maxime totam beatae ratione numquam
					impedit aut, nemo quibusdam.
				</CommentsBlockP>
			</CommentsBlock>
			<BubbleChart
				onClickBubble={setSelectedCluster}
				width={windowSizes.width - 400}
				height={400}
				data={chartData} />
			<BarChart
				width={windowSizes.width - 400}
				height={500}
				data={chartData3}
				colors={{
					one: '#F94144',
				}} />
		</MainLayout>
	);
};

export default ProductPage;
