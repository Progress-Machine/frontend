import { styled } from 'styled-components';

export const ImageContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin-top: 20px;
	justify-content: center;
	gap: 180px;
`;

export const ImageContainerTitle = styled.h3`
	font-size: 20px;
	font-weight: 700;
	margin-bottom: 30px;
`;

export const ImageContainerImage = styled.img`
	width: 100%;
	border-radius: 10px;
`;

export const CommentsBlock = styled.div`
	margin: 40px 0;
`;

export const CommentsBlockTitle = styled.h3`
	font-size: 20px;
	font-weight: 700;
	margin-bottom: 20px;
`;

export const CommentsBlockP = styled.p`
	font-size: 16px;
`;
