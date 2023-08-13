import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'> {
	title: string;
	content: string | string[];
};

export default Props;
