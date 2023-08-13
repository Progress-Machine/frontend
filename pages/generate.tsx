import { Input, Form, Radio, Button } from 'antd';

import withCheckAuthLayout from '@layouts/CheckAuthLayout';
import MainLayout from '@layouts/MainLayout';

import { Title } from '@styles/pages/MainPage.styles';
import { useMutation } from 'react-query';
import { getGPT } from '@shared/gpt';

const { TextArea } = Input;

interface IForm {
	mode: 'comment' | 'description';
	description: string;
}

const GeneratePage = () => {	
	const [form] = Form.useForm<IForm>();

	const { data, isSuccess, isLoading, mutate } = useMutation(getGPT);

	return (
		<>
			<MainLayout activeMenu={['generate']}>
				<Title>
					Генерация комментария и описания
				</Title>
				<Form
					style={{ maxWidth: 500, marginTop: 30 }}
					layout='vertical'
					form={form}
					onFinish={(values) => mutate(values as any)}
				>
					<Form.Item
						label='Режим'
						name='mode'
						required
						rules={[{ required: true, message: 'Выберите режим' }]}
					>
						<Radio.Group>
							<Radio.Button value='comment'>
								Комментарий
							</Radio.Button>
							<Radio.Button value='description'>
								Описание
							</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						label='Характеристики товара'
						required
						name='description'
						rules={[{ required: true, message: 'Заполните это поле' }]}
					>
						<TextArea rows={5} placeholder='Характеристики товара' />
					</Form.Item>
					<Form.Item>
						<Button type='primary' onClick={() => form.submit()} loading={isLoading}>
							Сгенерировать
						</Button>
					</Form.Item>
				</Form>
				{isSuccess && (
					<>
						<h2 style={{ fontWeight: 700, fontSize: 24 }}>
							Результат
						</h2>
						<p style={{ marginTop: 15, fontSize: 16 }}>
							{data}
						</p>
					</>
				)}
			</MainLayout>
		</>
	);
};

export default withCheckAuthLayout(GeneratePage, true);
