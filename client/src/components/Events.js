import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '../Loader';
import AddEvent from './AddEvent/AddEvent';
import AddEvents from './AddEvent/AddEvent';
import AddBook from './AddEvent/AddEvent';
import Button from './Elements/Button';
import EventCard from './EventCard';

const Events = ({ theme }) => {
	const [ myEvents, setMyEvents ] = useState([]);
	const [ ongoingEvents, setOngoingEvents ] = useState([]);
	const [ UpcomingEvents, setUpcomingEvents ] = useState([]);
	const [ AllEvent, setAllEvent ] = useState([]);
	const [ addPop, setAddPop ] = useState(false);
	const [ loading, setLoading ] = useState(true);

	const showAddEvent = () => {
		console.log(addPop);
		setAddPop(true);
	};
	const closeAddEvent = () => {
		console.log(addPop);
		setAddPop(false);
	};

	useEffect(() => {
		fetch('http://localhost:8000/api/server/servers', {
			method: 'GET',
			headers: {
				'X-Auth-Token': localStorage.getItem('token')
			}
		})
			.then((res) => {
				if (res.status === 422) {
					throw new Error('Validation failed.');
				}
				if (res.status !== 200 && res.status !== 201) {
					console.log('Error!');
					throw new Error('Could not Fetch  events!');
				}
				return res.json();
			})
			.then((result) => {
				console.log(result);
				setOngoingEvents([ ...result ]);
				console.log(ongoingEvents);
				setLoading(false);
				//filter ongoingevents
				// setOngoingEvents(() => {
				// 	AllEvent.filter((a) => {
				// 		var date = new Date(a.ProductHits);
				// 		return date >= startDate && date <= endDate;
				// 	});
				// });
				// console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<EventCotainer>
			<Cover theme={theme}>
				<EventHEading theme={theme}>Events</EventHEading>
				<Button children='Create Event' color='#fff' bgcolor='#000B49' onClick={showAddEvent} />
			</Cover>
			<AllEvents>
				<OnGoingEvent>
					<Heading theme={theme}>Ongoing Events</Heading>
					<ShowAllEvents>
						{loading ? (
							<Loader />
						) : (
							ongoingEvents.map((event) => (
								<EventCard key={event._id} refId={event.reference_id} id={event._id} name={event.serverName} />
							))
						)}
					</ShowAllEvents>
				</OnGoingEvent>

				<UpcomingEvent>
					<Heading theme={theme}>Upcoming Events</Heading>
					<ShowAllEvents>
						{UpcomingEvents.length > 0 ? (
							UpcomingEvents.map((events) => {
								<EventCard
									id={events._id}
									key={events._id}
									eventName={events.eventName}
									eventDate={events.eventDate}
									eventImg={events.eventImg}
								/>;
							})
						) : (
							<Nothing>Nothing to show</Nothing>
						)}
					</ShowAllEvents>
				</UpcomingEvent>
			</AllEvents>
			<AddEvent closeAddEvent={closeAddEvent} addPop={addPop} />
		</EventCotainer>
	);
};

export default Events;

const EventCotainer = styled.div`
	// padding-top: 50px;
	padding-bottom: 40px;
	font-family: "Varela Round", sans-serif;
	position: relative;
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
	cursor: pointer;
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
	flex-wrap: wrap;
	justify-content: space-around;
`;

const Nothing = styled.div`
	font-size: 1.8rem;
	text-align: center;
	margin: 0 auto;
	width: 300px;
`;
