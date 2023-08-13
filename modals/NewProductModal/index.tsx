import { Form, Input, Modal, Radio } from 'antd';
import Props from './NewProductModal.props';

interface IForm {
	productUrl: string;
	shop: 'wildberries' | 'ozon';
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
				onFinish={() => onFinish()}
			>
				<Form.Item
					label='Магазин'
					name='shop'
					required
					rules={[{ required: true, message: 'Выберите магазин' }]}
				>
					<Radio.Group>
						<Radio.Button value='ozon'>
							ozon
						</Radio.Button>
						<Radio.Button value='wildberries'>
							wildberries
						</Radio.Button>
					</Radio.Group>
				</Form.Item>
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
