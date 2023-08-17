import { ModalProps } from 'antd';

interface Props extends ModalProps {
	onFinish: (url: string) => void;
}

export default Props;
