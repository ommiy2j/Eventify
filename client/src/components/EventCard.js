import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Elements/Button';
import { Link, Redirect } from 'react-router-dom';
import FormDialog from './Elements/Dialog';

const EventCard = ({ refId, id, result }) => {
	console.log(result);
	const name = result.serverName;
	

	return (
		<EventCardContainer>
			<DateSec>
				<Month>Jan</Month>
				<Date>14</Date>
			</DateSec>
			<ImgSec src='https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' />
			<DetailsSec>{name}</DetailsSec>
			<FormDialog refId={refId} id={id} result={ result} />
			{/* <Link to={'/event/' + id}>
				<JoinButton><Button children='Join' bgcolor='#6ebf8b' color='black' /></JoinButton>
			</Link> */}
		</EventCardContainer>
	);
};

export default EventCard;

const EventCardContainer = styled.div`
	/* display: flex; */
	width: 100%;
	max-width: 360px;
	height: 260px;
	background-color: #fff;
	/*border: 1px solid #e6e6e6;*/

	position: relative;
	margin: 30px;
	border-radius: 4px;
`;
const DateSec = styled.div`
	position: absolute;
	top: -20px;
	left: -20px;
	width: 70px;
	border-radius: 4px;
	padding: 2px;
	background-color: inherit;
	background-color: #6ebf8b;
`;
const Date = styled.div`
	font-size: 40px;
	font-weight: bolder;
	line-height: normal;
	text-align: left;
`;
const Month = styled.div`
	text-transform: uppercase;
	color: #db2d8e;
	font-size: 25px;
	text-align: left;
	font-weight: 800;
	position: relative;
	&::before {
		content: "";
		position: absolute;
		bottom: -10px;
		width: 2vh;
		margin: 1vh 0;
		background-color: #db2d8e;
		height: 5px;
	}
`;
const ImgSec = styled.img`
	width: 100%;
	height: 150px;
	border: 1px solid;
	border-radius: inherit;
	object-fit: cover;
`;
const DetailsSec = styled.div`
	width: 100%;
	height: 30px;
	color: #000;
	margin: 0 0 10px 0;
	font-size: 1.7rem;
	font-weight: 600;
`;
const JoinButton = styled.div`margin-top: 5px;`;
