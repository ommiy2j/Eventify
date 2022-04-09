import { Card, Box } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Chat = ({ theme }) => {
	return (
		<ChaTContainer>
			<Card
				theme={theme}
				variant='outlined'
				sx={{
					bgcolor: (theme) => (theme === 'dark' ? 'rgb(54, 53, 58)' : '#fff'),
					color: (theme) => (theme === 'dark' ? '#ffff' : '#000')
				}}
			>
				Chat{' '}
			</Card>
		</ChaTContainer>
	);
};

export default Chat;

const ChaTContainer = styled.div`
	position: fixed;
	right: 20vw;
	width: calc(100vw - 45vw);
	height: calc(100vh - 10vh);
`;
