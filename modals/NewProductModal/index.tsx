import { Form, Input, Modal } from 'antd';
import Props from './NewProductModal.props';

interface IForm {
	productUrl: string;
}

const NewProductModal: React.FC<Props> = ({ onFinish, ...props }) => {
	const [form] = Form.useForm<IForm>();

	return (
		<Modal
			title='Новый товар'
			cancelText='Отмена'
			okText='Создать'
			onOk={() => form.submit()}
			confirmLoading={false}
			{...props}
		>
			<Form
				layout='vertical'
				form={form}
				onFinish={(data) => onFinish(data.productUrl)}
			>
				<Form.Item
					label='URL товара'
					required
					name='productUrl'
					rules={[{ required: true, message: 'Заполните это поле' }]}
				>
					<Input placeholder='URL товара' />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default NewProductModal;
