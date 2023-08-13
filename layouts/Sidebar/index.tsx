import { useRouter } from 'next/router';
import { Layout, Menu, MenuProps } from 'antd';
import { EditOutlined, SettingOutlined, ShoppingOutlined } from '@ant-design/icons';

import Props from './Sidebar.props';
import { Logo } from './Sidebar.styles';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar: React.FC<Props> = ({ activeMenu, ...props }) => {
	const router = useRouter();

	const menuItems: MenuItem[] = [
		{
			key: 'settings',
			icon: <SettingOutlined />,
			label: 'Настройки',
			onClick: () => router.push('/settings'), 
		},
		{
			key: 'products',
			icon: <ShoppingOutlined />,
			label: 'Мои товары',
			onClick: () => router.push('/'), 
		},
		{
			key: 'generate',
			icon: <EditOutlined />,
			label: 'Генерация',
			onClick: () => router.push('/generate'), 
		},
	];

	return (
		<Sider theme='light' width={220} {...props}>
			<Logo />
			<Menu defaultSelectedKeys={activeMenu} items={menuItems} />
		</Sider>
	);
};

export default Sidebar;
