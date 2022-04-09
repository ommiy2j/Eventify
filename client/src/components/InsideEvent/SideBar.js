import { Card, Stack,Tabs } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const SideBar = ({ theme }) => {
	return (
		<Sidebar>
			<Card
				variant='outlined'
				theme={theme}
				sx={{
					bgcolor: (theme) => (theme === 'dark' ? 'rgb(54, 53, 58)' : '#fff'),
					color: (theme) => (theme === 'dark' ? '#ffff' : '#000')
				}}
			>
				<AllPeople>
					<Head><Tabs>Members</Tabs></Head>
					<Stack spacing={2}>Amit</Stack>
				</AllPeople>
			</Card>
		</Sidebar>
	);
};

export default SideBar;

const Sidebar = styled.div`
	position: fixed;
	top: 10vh;
	height: calc(100vh - 10vh);
	width: 25vw;
	/* border: 2px solid; */
`;

const AllPeople = styled.div``;

const Head = styled.div`
	font-size: 1.4rem;
	text-align: left;
	margin: 20px;
	border: 2px solid;
`;
