import { Form as AntdForm, Input } from 'antd';
import { useMutation } from 'react-query';

import withCheckAuthLayout from '@layouts/CheckAuthLayout';
import { login } from '@shared/auth';

import { Form, Button, Logo } from '@styles/pages/LoginPage.style';
import Link from 'next/link';

interface IForm {
	login: string;
	password: string;
}

const LoginPage = () => {
	const [form] = AntdForm.useForm<IForm>();

	const { isLoading, mutate } = useMutation(login, {
		onSuccess: (result) => {
			localStorage.setItem('access_token', result.access_token);
			window.location.reload();
		},
	});

	return (
		<main>
			<Form
				layout='vertical'
				form={form}
				onFinish={(values) => mutate({
					email: (values as any).login,
					password: (values as any).password,
				})}
			>
				<Logo />
				<AntdForm.Item
					label='Почта'
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
					<Button type='primary' onClick={() => form.submit()} loading={isLoading}>
						Войти
					</Button>
				</AntdForm.Item>
				<Link href='/signup' style={{ display: 'block', width: '100%', textAlign: 'center' }}>
					Нет аккаунта? Зарегистрируйтесь
				</Link>
			</Form>
		</main>
	);
};

export default withCheckAuthLayout(LoginPage, false);
