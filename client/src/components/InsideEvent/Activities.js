import { Card } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Activities = ({ theme }) => {
	return (
		<AllAct>
			<Card
				variant='outlined'
				theme={theme}
				
                sx={{
                    bgcolor: (theme) => (theme === 'dark' ? 'rgb(54, 53, 58)' : '#fff'),
                    color: (theme) => (theme === 'dark' ? '#ffff' : '#000')    }}
			>
				Activities
			</Card>
		</AllAct>
	);
};

export default Activities;

const AllAct = styled.div`
	position: fixed;
	width: 20vw;
	right: 0;
	height: calc(100vh - 10vh);
`;
