import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AdapterDate from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

ReactDOM.render(
	<Router>
		<LocalizationProvider dateAdapter={AdapterDate}>
			<Provider store={store}>
				<App />
			</Provider>
		</LocalizationProvider>
	</Router>,
	document.getElementById('root')
);
