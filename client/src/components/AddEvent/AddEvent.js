import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TextField from '@mui/material/TextField';

import DateTimePicker from '@mui/lab/DateTimePicker';
import { InputLabel } from '@mui/material';
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import moment from 'moment';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';

const AddEvent = ({ closeAddEvent, addPop }) => {
	const [ fromDate, setFromDate ] = useState(new Date());
	const [ toDate, setToDate ] = useState(new Date());
	const [ eventName, setEventName ] = useState('');

    const URL=''

	const CreateEvent = () => {
		var date = moment(fromDate).isAfter(toDate);
		console.log(fromDate, toDate, eventName, date);
		if (!ValidateDate()) {
			alert('Wrong Date And time');
        }
        fetch()
	};

	const ValidateDate = () => {
		if (moment(fromDate).isAfter(toDate)) {
			return false;
		}
		return true;
	};

	useEffect(() => {}, [ eventName, toDate, fromDate ]);
	return (
		<Modal addPop={addPop}>
			<Typography variant='h4' color='#6EBF8B' mb={3} component='h2'>
				Add Event
			</Typography>
			<EventName>
				<TextField
					id='outlined-basic'
					label='Event Name'
					size='small'
					fullWidth
					margin='dense'
					value={eventName}
					onChange={(e) => setEventName(e.target.value)}
					variant='outlined'
					required
				/>
			</EventName>
			<EventDate>
				<From>
					<InputLabel color='warning'>From</InputLabel>
					<DateTimePicker
						renderInput={(props) => <TextField {...props} />}
						label='DateTimePicker'
						value={fromDate}
						required
						onChange={(newValue) => {
							setFromDate(newValue);
						}}
					/>
				</From>
				<To>
					<InputLabel>To</InputLabel>
					<DateTimePicker
						renderInput={(props) => <TextField {...props} />}
						label='DateTimePicker'
						value={toDate}
						onChange={(newValue) => {
							setToDate(newValue);
						}}
					/>
				</To>
			</EventDate>
			{/* <ImageUpload cardName="Input Image" imageGallery={galleryImageList} /> */}
			<Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
				<Button variant='outlined' color='primary' onClick={CreateEvent}>
					Create
				</Button>
				<Button
					variant='outlined'
					color='error'
					onClick={() => {
						closeAddEvent();
						setToDate(new Date());
						setFromDate(new Date());
						setEventName('');
					}}
				>
					Close
				</Button>
			</Stack>
		</Modal>
	);
};

export default AddEvent;

const In = keyframes`
	0% {
		opacity: 0;
		top: 0%;
	}
	50% {
		opacity: 0.5;
	}
	100% {
		opacity: 1;
		top: 50%;
	}
`;

const out = keyframes`
	0% {
		top: 50%;
    opacity: 1
	}
	100% {
		top: 100%;
    opacity: 0;
	}
`;

const Modal = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: ${(p) => (p.addPop ? 'scale(1) translate(-50%, -50%) ' : 'scale(0) translate(150%, -110%)')};
	/* display: ${(p) => (p.addPop ? 'block ' : 'none')}; */
    z-index: 12;
    height: 450px;
    width: 400px;
    transition: 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95)  ;
    border-radius: 6px;
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    padding: 24px;
`;

const EventName = styled.div`margin-bottom: 20px;`;
// const EventAddress = styled.div``;
const EventDate = styled.div`margin-top: 30px;`;
const To = styled.div`margin: 30px 0 40px;`;
const From = styled.div``;
