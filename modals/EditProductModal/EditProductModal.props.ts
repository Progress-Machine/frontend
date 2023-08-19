import { ModalProps } from 'antd';
import { IForm } from '.';

interface Props extends ModalProps {
	values: IForm;
	onFinish: (data: IForm) => void;
}

export default Props;
