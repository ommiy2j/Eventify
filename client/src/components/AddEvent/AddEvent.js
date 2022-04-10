import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TextField from '@mui/material/TextField';

import DateTimePicker from '@mui/lab/DateTimePicker';
import { InputLabel } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import moment from 'moment';
import { IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useRef } from 'react';

const AddEvent = ({ closeAddEvent, addPop }) => {
	const [ fromDate, setFromDate ] = useState(new Date());
	const [ toDate, setToDate ] = useState(new Date());
	const [ serverName, setEventName ] = useState('');
	const [ image, setImage ] = useState('');
	const [ imageUrl, setImageUrl ] = useState('');

	const popRef = useRef(null);

	const URL = '';

	const CreateEvent = () => {
		const formdata = new FormData();
		formdata.append('serverName', serverName);
		formdata.append('fromDate', fromDate);
		formdata.append('toDate', toDate);
		formdata.append('image', image);

		// var date = moment(fromDate).isAfter(toDate);
		// console.log(fromDate, toDate, serverName, date);
		if (!ValidateDate()) {
			alert('Wrong Date And time');
		}

		fetch('http://localhost:8000/api/server/create', {
			method: 'POST',
			body: JSON.stringify({
				serverName,
				fromDate,
				toDate
			}),
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': localStorage.getItem('token')
			}
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				window.flash('Event  Created!', 'success');
			})
			.catch((err) => {
				console.log(err);
				window.flash('Failed!', 'error');
			});
	};

	const onFileChange = (e) => {
		setImage(e.target.files[0]);
		const imgUrl = URL.createObjectURL(e.target.files[0]);
		setImageUrl(imgUrl);
	};

	const ValidateDate = () => {
		if (moment(fromDate).isAfter(toDate)) {
			return false;
		}
		return true;
	};
	useEffect(() => {}, [ serverName, toDate, fromDate ]);

	const Input = styled('input')({
		display: 'none'
	});

	// const TextField = styled('textField')({
	// 	width: '200px'
	// })

	return (
		<Modal addPop={addPop} ref={popRef}>
			<Typography variant='h4' color='#000' mb={3} component='h2'>
				Create Event
			</Typography>
			<EventName>
				<TextField
					id='outlined-basic'
					label='Event Name'
					size='small'
					fullWidth
					margin='dense'
					value={serverName}
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
			<Stack direction='row' justifyContent='center' alignItems='center' spacing={2} mb={4}>
				Upload Image
				<label htmlFor='contained-button-file'>
					<Input
						accept='image/*'
						id='contained-button-file'
						onChange={(e) => onFileChange(e)}
						multiple
						type='file'
					/>
					<IconButton color='primary' aria-label='upload picture' component='span'>
						<PhotoCamera />
					</IconButton>
				</label>
				{!image ? (
					<ImageShow src='https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' />
				) : (
					<ImageShow src={imageUrl} alt='' />
				)}
			</Stack>

			{/* <label htmlFor='icon-button-file'>
				<Input accept='image/*' id='icon-button-file' type='file' />
				<IconButton color='primary' aria-label='upload picture' component='span'>
					<PhotoCamera />
				</IconButton>
			</label> */}

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
	position: fixed;
	top: 50%;
	left: 50%;
	transform: ${(p) => (p.addPop ? 'scale(1) translate(-50%, -50%) ' : 'scale(0) translate(150%, -110%)')};
	/* display: ${(p) => (p.addPop ? 'block ' : 'none')}; */
    z-index: 12;
    height: 600px;
    width: 500px;
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

const ImageShow = styled.img`
	width: 100px;
	height: 100px;
	/* border: 1px solid; */
`;
