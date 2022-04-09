import React from 'react';
import { Paper, Container, Card } from '@mui/material';
import Chat from './InsideEvent/Chat';
import Heading from './InsideEvent/Heading';
import SideBar from './InsideEvent/SideBar';
import Activities from './InsideEvent/Activities';

const Event = ({ theme }) => {
	
	console.log(theme);

	return (
		<Container id='container'>
			<Heading theme={theme} />
			<SideBar theme={theme} />
			<Chat theme={theme} />
			<Activities theme={theme} />
		</Container>
	);
};

export default Event;
