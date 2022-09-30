require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


const db = require('./config/database.js');
const User = require("./models/User.js");

const authRoute = require('./routes/authRoute');

const app = express();

// connect db
const connectDB = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectDB();

// set up for server
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoute);

app.listen(5000, () => {
    console.log('server listen on port 5000')
});