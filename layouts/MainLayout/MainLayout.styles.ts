import { styled } from 'styled-components';
import { Layout as AntdLayout } from 'antd';

const { Content: AntdContent } = AntdLayout;

export const Layout = styled(AntdLayout)`
	min-height: 100vh;
`;

export const Content = styled(AntdContent)`
	padding: 60px 120px 50px 60px;
`;
