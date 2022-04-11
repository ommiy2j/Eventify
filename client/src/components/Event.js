import React from 'react';
import { Paper, Container, Card } from '@mui/material';
import Chat from './InsideEvent/Chat';
import Heading from './InsideEvent/Heading';
import SideBar from './InsideEvent/SideBar';
import Activities from './InsideEvent/Activities';
import { useLocation } from 'react-router-dom';

const Event = ({ theme }) => {
	const location = useLocation();
	console.log();
	const props = location.state.result;
	console.log(theme, props.reference_id);

	return (
		<Container id='container'>
			<Heading theme={theme} />
			<SideBar refId={props.reference_id} theme={theme} />
			<Chat theme={theme} />
			<Activities theme={theme} />
		</Container>
	);
};

export default Event;
