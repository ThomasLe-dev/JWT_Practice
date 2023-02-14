const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./Backend/Routes/auth')
dotenv.config();

app.get('/', (req, res) => {
    res.send('hello mother fkers')
})

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URL, (req, res) => {
    console.log('successfully connected to Mongo DB');
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Route
app.use('/v1/auth', authRoute);

app.listen(process.env.PORT, (req, res) => {
    console.log('listening on port ' + process.env.PORT);
});

