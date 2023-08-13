import Props from './Tooltip.props';
import { Container, ContainerTitle } from './Tooltip.styles';

const Tooltip: React.FC<Props> = ({ title, content, className, ...props }) => {
	return (
		<Container className={className} { ...props}>
			<ContainerTitle>
				{title}
			</ContainerTitle>
			{Array.isArray(content)
				? content.map((i, num) => (
					<p key={num}>	
						{i}
					</p>
				)) : (
					<p>	
						{content}
					</p>
				)}
		</Container>
	);
};

export default Tooltip;
