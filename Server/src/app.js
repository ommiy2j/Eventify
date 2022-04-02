const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth-route'));
app.use('/api/server', require('./routes/server-route'));
app.use(express.json());
app.get('/yoo', (req, res) => {
	res.send('welcome');
});

module.exports = app;
