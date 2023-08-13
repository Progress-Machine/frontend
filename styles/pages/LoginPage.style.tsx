import { styled } from 'styled-components';

import LogoLg from '@assets/logo_lg.svg';

import { Form as AntdForm, Button as ButtonAntd } from 'antd';

export const Form = styled(AntdForm)`
	margin: 150px auto 0 auto;
	width: 100%;
	max-width: 400px;
`;

export const Logo = styled(LogoLg)`
	display: block;
	margin: 0 auto 30px auto;
`;

export const Button = styled(ButtonAntd)`
	display: block;
	margin: 10px auto 0 auto;
	width: 130px;
`;
