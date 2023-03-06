const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors')

app.use(cors())
const dbConfig = require('./config/dbConfig');
app.use(express.json());
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const doctorsRoute = require('./routes/doctorsRoute');

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorsRoute);

const port = process.env.PORT || 7789;

app.listen(port, () => console.log(`Listening to port ${port}`)); 
