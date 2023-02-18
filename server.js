const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors')

app.use(cors())
const dbConfig = require('./config/dbConfig');
app.use(express.json());
const userRoute = require('./routes/userRoute');

app.use('/api/user', userRoute);

const port = process.env.PORT || 7789;

app.listen(port, () => console.log(`Listening to port ${port}`)); 