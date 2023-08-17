import { CartesianGrid, BarChart as BarReChart, XAxis, YAxis, Bar } from 'recharts';
import Props from './BarChart.props';

const BarChart: React.FC<Props> = ({ width, height, data, colors }) => {
	return (
		<BarReChart
			width={width}
			height={height}
			data={data}
			layout='horizontal'
			margin={{
				left: 10,
			}}
		>
			<CartesianGrid strokeDasharray='3 3' />
			<YAxis type='number' />
			<XAxis type='category' dataKey='name' />
			{Object.keys(data[0])
				.filter((i) => i !== 'keywords' && i !== 'name')
				.map((i, num) => <Bar key={num} dataKey={i} fill={colors[i]} />)}
		</BarReChart>
	);
};

export default BarChart;
