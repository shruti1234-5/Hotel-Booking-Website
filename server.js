const express = require("express"); //init express
const app = express();   //create app
const dbconfig = require('./db')
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')
app.use(express.json())
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute)
const port = process.env.PORT || 5000;
app.listen(port,()=>console.log('node server started using nodemon')); //method to start nodejs server

// const mongoose = require('mongoose');

