import { Form, List, Modal } from 'antd';
import Props from './EditProductModalResults.props';
import useWindowDemantions from '@/hooks/useWindowDemantions';
import { CommentsBlock, CommentsBlockP, CommentsBlockTitle } from '@/styles/pages/productIdPage.styles';
import { createChartData } from '@/shared/createChartData';
import BarChart from '@/components/Charts/BarChart';
import Link from 'next/link';

export interface IForm {
	price: number;
	description: string;
	celler_rating: number;
	text_params: string;
	name: string;
}

const EditProductModalResults: React.FC<Props> = ({ data, ...props }) => {
	const [form] = Form.useForm<IForm>();

	const windowSizes = useWindowDemantions();

	return (
		<Modal
			title='Результаты'
			okText='Закрыть'
			width={windowSizes.width - 200}
			onOk={() => form.submit()}
			{...props}
		>
			<CommentsBlock>
				<CommentsBlockTitle>
					Цена
				</CommentsBlockTitle>
				<CommentsBlockP>
					{data?.price_analytic.comment}
				</CommentsBlockP>
			</CommentsBlock>
			<CommentsBlock>
				<CommentsBlockTitle>
					Рекомендации по цене
				</CommentsBlockTitle>
				<CommentsBlockP>
					{data?.price_analytic.personal_comment}
				</CommentsBlockP>
			</CommentsBlock>
			{data && (
				<BarChart
					width={windowSizes.width - 400}
					height={500} 
					data={createChartData(data?.price_analytic.nearest_prices)}
					colors={{
						one: '#F94144',
					} as any} />
			)}
			<CommentsBlock>
				<CommentsBlockTitle>
					Рейтинг
				</CommentsBlockTitle>
				<CommentsBlockP>
					{data?.rating_analytic.comment}
				</CommentsBlockP>
			</CommentsBlock>
			{data && (
				<BarChart
					width={windowSizes.width - 400}
					height={500} 
					data={createChartData(data?.rating_analytic.nearest_ratings)}
					colors={{
						one: '#F94144',
					}} />
			)}
			<CommentsBlock>
				<CommentsBlockTitle>
					Выручка
				</CommentsBlockTitle>
				<CommentsBlockP>
					{data?.revenue_analytic.comment}
				</CommentsBlockP>
			</CommentsBlock>
			{data && (
				<BarChart
					width={windowSizes.width - 400}
					height={500} 
					data={createChartData(data?.revenue_analytic.nearest_revenues)}
					colors={{
						one: '#F94144',
					}} />
			)}
			<List
				header='Похожие товары'
				bordered
				style={{ marginTop: 30 }}
				dataSource={data?.urls_nearest}
				renderItem={(item) => (
					<List.Item>
						<Link href={item as string} target='_blank'>
							{item as string}
						</Link>
					</List.Item>
				)} />
		</Modal>
	);
};

export default EditProductModalResults;
