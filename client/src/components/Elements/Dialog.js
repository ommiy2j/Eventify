import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from 'react-router-dom';
import Bus from '../../utils/Bus';
import { useRef } from 'react';

export default function FormDialog ({ refId, id, result }) {
	const reference_id = refId;

	window.flash = (message, type = 'success') => Bus.emit('flash', { message, type });
	const history = useHistory();
	const [ open, setOpen ] = React.useState(false);
	const [ value, setValue ] = React.useState('');
	const inputRef = useRef();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const verify = () => {
		if (reference_id === value) {
			history.push('/event/' + reference_id, { result });
			fetch('http://localhost:8000/api/server/join', {
				method: 'POST',
				body: JSON.stringify({
					reference_id
				}),
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': localStorage.getItem('token')
				}
			})
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
			
			window.flash('Welcome', 'success');
		} else {
			window.flash('Faild to Join ', 'error');
			alert('invalid Key');
		}
	};

	return (
		<div>
			<Button variant='outlined' onClick={handleClickOpen}>
				Join Event
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Join Event</DialogTitle>
				<DialogContent>
					<DialogContentText>Enter Aceess Key To Join Event</DialogContentText>
					<TextField
						ref={inputRef}
						autoFocus
						margin='dense'
						id='name'
						label='Room Id'
						type='text'
						fullWidth
						onChange={(e) => setValue(e.target.value)}
						variant='standard'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={verify}>Join</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
