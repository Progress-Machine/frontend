import { styled } from 'styled-components';

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Title = styled.h1`
	font-size: 32px;
	font-weight: 800;
`;

export const Content = styled.main`
	margin-top: 40px;
	display: grid;
	grid-template-columns: repeat(auto-fill, 240px);
	gap: 20px;
	justify-content: space-between;
`;
