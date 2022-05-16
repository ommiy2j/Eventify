const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'image');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype == 'image/jpg' ||
		file.mimetype == 'image/png' ||
		file.mimetype == 'image/jpeg' ||
		file.mimetype == 'image/wbep'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};


app.use(cors());
app.use(express.json());
app.use(multer({ fileFilter: fileFilter, storage: storage }).single('image'));
app.use('/image', express.static('image'));
app.use('/api/auth', require('./routes/auth-route'));
app.use('/api/server', require('./routes/server-route'));
app.use(express.json());


module.exports = app;
