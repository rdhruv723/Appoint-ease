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

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 7789;

app.listen(port, () => console.log(`Listening to port ${port}`)); 