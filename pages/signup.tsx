import { Form as AntdForm, Input } from 'antd';
import { useMutation } from 'react-query';

import withCheckAuthLayout from '@layouts/CheckAuthLayout';
import { signup } from '@shared/auth';

import { Form, Button, Logo } from '@styles/pages/LoginPage.style';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface IForm {
	login: string;
	password: string;
}

const SignupPage = () => {
	const [form] = AntdForm.useForm<IForm>();

	const router = useRouter();

	const { isLoading, mutate, isError } = useMutation(signup, {
		onSuccess: () => {
			router.push('/login');
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
						Регистрация
					</Button>
				</AntdForm.Item>
				<Link href='/login' style={{ display: 'block', width: '100%', textAlign: 'center' }}>
					Уже есть аккаунт? Войдите
				</Link>
				{isError && (
					<p style={{ textAlign: 'center', color: 'red', marginTop: 15 }}>
						Ой. Что-то пошло не так. Возможно пользователь с таким email уже существует
					</p>
				)}
			</Form>
		</main>
	);
};

export default withCheckAuthLayout(SignupPage, false);
