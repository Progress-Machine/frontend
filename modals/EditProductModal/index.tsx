import { Form, Input, Modal } from 'antd';
import Props from './EditProductModal.props';

export interface IForm {
	price: number;
	description: string;
	celler_rating: number;
	text_params: string;
	name: string;
}

const { TextArea } = Input;

const EditProductModal: React.FC<Props> = ({ onFinish, values, ...props }) => {
	const [form] = Form.useForm<IForm>();

	return (
		<Modal
			title='Редактировать товар'
			cancelText='Отмена'
			okText='Редактировать'
			onOk={() => form.submit()}
			confirmLoading={false}
			{...props}
		>
			<Form
				layout='vertical'
				form={form}
				initialValues={values}
				onFinish={(data) => onFinish({
					price: +data.price,
					description: data.description,
					celler_rating: +data.celler_rating,
					text_params: data.text_params,
					name: data.name,
				})}
			>
				<Form.Item
					label='Цена'
					required
					name='price'
					rules={[{ required: true, message: 'Некорректное заполнение поля' }]}
				>
					<Input type='number' step='1' placeholder='Цена' />
				</Form.Item>
				<Form.Item
					label='Описание'
					name='description'
				>
					<TextArea placeholder='Описание' />
				</Form.Item>
				<Form.Item
					label='Дополнительное описание'
					name='text_params'
				>
					<TextArea placeholder='Дополнительное описание' />
				</Form.Item>
				<Form.Item
					label='Название товара'
					required
					rules={[{ required: true, message: 'Некорректное заполнение поля' }]}
					name='name'
				>
					<Input placeholder='Название товара' />
				</Form.Item>
				<Form.Item
					label='Рейтинг'
					required
					rules={[{ required: true, message: 'Некорректное заполнение поля', type: 'number', min: 0.1 }]}
					name='celler_rating'
				>
					<Input type='number' step='0.1' placeholder='Рейтинг' />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default EditProductModal;
