import { ModalProps } from 'antd';

interface Props extends ModalProps {
	onFinish: () => void;
}

export default Props;
