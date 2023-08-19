import { Button, Form as AntdForm, Input } from 'antd';

import withCheckAuthLayout from '@layouts/CheckAuthLayout';
import MainLayout from '@layouts/MainLayout';

import { Title } from '@styles/pages/MainPage.styles';
import { Form } from '@styles/pages/SettingsPage.styles';

interface IForm {
	ozonApiKey?: string;
	wildberriesApiKey?: string;
	login: string;
	password: string;
}

const SettingsPage = () => {	
	const [form] = AntdForm.useForm<IForm>();
	
	return (
		<MainLayout activeMenu={['settings']}>
			<Title>
				Настройки аккаунта
			</Title>
			<Button
				style={{ marginTop: 50 }}
				type='primary'
				danger
				onClick={() => {
					localStorage.removeItem('access_token');
					window.location.reload();
				}}
			>
				Выйти из аккаунта
			</Button>
		</MainLayout>
	);
};

export default withCheckAuthLayout(SettingsPage, true);
