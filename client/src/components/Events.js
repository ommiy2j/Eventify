import React from 'react';
import styled from 'styled-components';
import Button from './Elements/Button';
import EventCard from './EventCard';

const Events = ({ theme }) => {
	return (
		<EventCotainer>
			<Cover theme={theme}>
				<EventHEading theme={theme}>Events</EventHEading>
				<Button children='Create Event' color='#fff' />
			</Cover>
			<AllEvents>
				<OnGoingEvent>
					<Heading theme={theme}>Ongoing Events</Heading>
					<ShowAllEvents>
						<EventCard />
						<EventCard />
						<EventCard />
					</ShowAllEvents>
				</OnGoingEvent>

				<UpcomingEvent>
					<Heading theme={theme}>Upcoming Events</Heading>
					<ShowAllEvents>
						<EventCard />
						<EventCard />
						<EventCard />
					</ShowAllEvents>
				</UpcomingEvent>
			</AllEvents>
		</EventCotainer>
	);
};

export default Events;

const EventCotainer = styled.div`
	// padding-top: 50px;
	padding-bottom: 40px;
	font-family: "Varela Round", sans-serif;
`;
const UpcomingEvent = styled.div``;
const OnGoingEvent = styled.div``;
const EventHEading = styled.div`
	font-family: 'Telefon Black';
	font-size: 243px;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	text-align: center;
	// padding-top: 20vh;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: ${(props) => (props.theme === 'dark' ? '#f7f7f7' : '#f7f7f7')};
	transition: font-size 0.3s;

	&::first-letter {
		color: ${(props) => (props.theme === 'light' ? '#6EBF8B' : '#6EBF8B')};
	}
`;
const Cover = styled.div`
	background-color: ${(props) => (props.theme === 'dark' ? 'rgb(54, 53, 58)' : '#35858B')};
	height: 360px;
	/* background-image: url('https://images.unsplash.com/photo-1510130315046-1e47cc196aa0?auto=format&fit=crop&w=1050&q=80'); */
	background-position: center center;
	background-size: cover;
`;

const AllEvents = styled.div``;
const Heading = styled.div`
	text-align: left;
	padding: 2vh 1.2vw;
	border-bottom: 1px solid #ccc;
	font-size: 30px;
	font-weight: 600;
	color: ${(p) => (p.theme === 'light' ? '#000' : '#fff')};
`;
const ShowAllEvents = styled.div`
	margin-top: 40px;
	display: flex;
`;
