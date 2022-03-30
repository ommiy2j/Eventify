const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors());
app.use('/api/auth', require('./routes/auth-route'));
app.use(express.json());
app.get('/yoo', (req, res) => {
	res.send('welcome');
});

module.exports = app;
