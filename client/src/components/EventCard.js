import React from 'react';
import styled from 'styled-components';
import Button from './Elements/Button';

const EventCard = () => {
	return (
		<EventCardContainer>
			<DateSec>Fdsfsd</DateSec>
			<ImgSec>sdfsdf</ImgSec>
			<DetailsSec>sfsdfsdf</DetailsSec>
			<JoinButton>
				<Button children="Join Event" color='black' />
			</JoinButton>
		</EventCardContainer>
	);
};

export default EventCard;

const EventCardContainer = styled.div`
	display: flex;
	width: 100%;
	max-width: 360px;
	height: 240px;
	background-color: #fff;
	/*border: 1px solid #e6e6e6;*/
	padding: 20px;
	position: relative;
	margin: 0 auto 30px;
	border-radius: 4px;
`;
const DateSec = styled.div``;
const ImgSec = styled.div``;
const DetailsSec = styled.div``;
const JoinButton = styled.div``;
