require('dotenv').config({ path: './config/config.env' });
const app = require('./src/app');
const connectDB = require('./config/db');
const port = process.env.PORT;


connectDB();
app.listen(port, () => {
    console.log(`port running on port ${port}`);
});
