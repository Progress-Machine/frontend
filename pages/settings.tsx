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
			<Form
				layout='vertical'
				form={form}
				onFinish={(values) => console.log(values)}
				autoComplete='off'
			>
				<AntdForm.Item
					label='API ключ ozon'
					name='ozonApiKey'
				>
					<Input.Password placeholder='Логин' />
				</AntdForm.Item>
				<AntdForm.Item
					label='API ключ wildberries'
					name='wildberriesApiKey'
				>
					<Input.Password placeholder='Логин' />
				</AntdForm.Item>
				<AntdForm.Item
					label='Логин'
					required
					name='login'
					rules={[{ required: true, message: 'Заполните это поле' }]}
				>
					<Input placeholder='Логин' />
				</AntdForm.Item>
				<AntdForm.Item
					label='Пароль'
					required
					name='password'
					rules={[{ required: true, message: 'Заполните это поле' }]}
				>
					<Input.Password placeholder='Пароль' />
				</AntdForm.Item>
				<AntdForm.Item>
					<Button type='primary' onClick={() => form.submit()}>
						Сохранить
					</Button>
				</AntdForm.Item>
			</Form>
			<Button
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
