import Sidebar from '@layouts/Sidebar';

import Props from './MainLayout.props';
import { Content, Layout } from './MainLayout.styles';

const MainLayout: React.FC<Props> = ({ children, activeMenu, ...props }) => {
	return (
		<Layout {...props}>
			<Sidebar activeMenu={activeMenu} />
			<Layout>
				<Content>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
