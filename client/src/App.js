import React, { useEffect, useState } from 'react';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './utils/Globalstyle';
import { darkTheme, lightTheme } from './utils/Theme';
import Welcome from './components/Welcome';
import { setUserLogin } from './features/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import Events from './components/Events';
import Bus from './utils/Bus';
import { Flash } from './components/Flash';
import Button from './components/Elements/Button';
import AddEvent from './components/AddEvent/AddEvent';

const App = () => {
	window.flash = (message, type = 'success') => Bus.emit('flash', { message, type });

	const [ theme, setTheme ] = useState('light');
	const [ auth, setAuth ] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	

	const responseSuccessGoogle = (response) => {
		console.log(response);
		fetch('http://localhost:8000/api/auth/google', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: response.tokenId
			})
		})
			.then((res) => {
				if (res.status === 422) {
					throw new Error('Validation failed.');
				}
				if (res.status !== 200 && res.status !== 201) {
					throw new Error('Could not authenticate you!');
				}
				return res.json();
			})
			.then((result) => {
				console.log(result);
				dispatch(
					setUserLogin({
						name: result.name,
						token: result.token
					})
				);

				localStorage.setItem('token', result.token);
				localStorage.setItem('username', result.name);
				localStorage.setItem('userId', result.userId);
				const remTime = 60 * 60 * 1000;
				const expiryTime = new Date(new Date().getTime() + remTime);
				localStorage.setItem('expiryTime', expiryTime);

				history.push('/events');
				toast.success('🦄 Logged In Success', {
					position: 'bottom-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
				setAuth(true);
				history.push('/events');
				window.flash('logged In successfully!', 'success');
			})
			.catch((err) => {
				toast.error(`Login failed`, {
					position: 'bottom-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
			});
	};

	const logOutHandler = () => {
		setAuth(false);
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('username');
		localStorage.removeItem('expiryTime');
	};

	const setAutoLogOut = (remTime) => {
		setTimeout(() => {
			history.push('/');
			logOutHandler();
		}, remTime);
	};

	const authListner = () => {
		const token = localStorage.getItem('token');
		if (!token) {
			return;
		}
		setAuth(true);
		history.push('/events');
		setLoading(false);
	};

	useEffect(() => {
		let expiryTime = localStorage.getItem('expiryTime');
		const token = localStorage.getItem('token');
		if (!token || !expiryTime) {
			return;
		}
		// expiryTime = expiryTime.toISOString();
		const remTime = new Date(new Date(expiryTime).getTime() - new Date().getTime());
		setAutoLogOut(remTime);
		authListner();
	});
	const themeToggler = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light');
	};

	return (
		<StyledApp className='App'>
			<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
				<GlobalStyles />
				<DarkToggler onClick={themeToggler}>
					<Bulb src={theme === 'dark' ? './assests/bulb-glow.png' : './assests/lightt.png'} />
				</DarkToggler>

				{auth ? (
					<div>
						<Button
							auth={auth}
							onClick={() => {
								logOutHandler();
								history.push('/');
								window.flash('logged out successfully!', 'success');
							}}
						>
							Logout
						</Button>
						<Switch>
							<Route exact path='/events' component={() => <Events theme={theme} />} />
						</Switch>
					</div>
				) : (
					<div>
						<Switch>
							<Route
								exact
								path='/'
								component={() => <Welcome responseSuccessGoogle={responseSuccessGoogle} />}
							/>
						</Switch>
					</div>
				)}
			</ThemeProvider>
			
		</StyledApp>
	);
};
export default App;

const StyledApp = styled.div`
  /* height:100vh; */
  /* background-color: ${(props) => props.theme.body}; */
`;
const DarkToggler = styled.div`
	position: absolute;
	top: 0px;
	right: 10px;
	width: 50px;
	height: 50px;
	cursor: pointer;
`;
const Bulb = styled.img`
	width: 100%;
	height: 100%;
`;
