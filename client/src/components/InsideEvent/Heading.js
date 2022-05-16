import { Card } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Heading = ({ theme, name }) => {
	return (
		<HeadIng>
			<Card
				variant='outlined'
				theme={theme}
				sx={{
					bgcolor: (theme) => (theme === 'dark' ? 'rgb(54, 53, 58)' : '#fff'),
					color: (theme) => (theme === 'dark' ? '#ffff' : '#000')
				}}
			>
				<EventName>{name}</EventName>
			</Card>
		</HeadIng>
	);
};

export default Heading;

const HeadIng = styled.div`
	height: 10vh;
	width: 100vw;
	display: flex;
	justify-content: space-around;
`;

const EventName = styled.h2`
	font-size: 1.8rem;
	text-align: center;
	line-height: 1.8rem;
	margin-left: 20px;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
