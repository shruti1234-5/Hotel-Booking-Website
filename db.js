const mongoose = require('mongoose');  //init mongoose
var mongoURL = 'mongodb+srv://shruti:shruti@cluster0.hgprq.mongodb.net/mern-rooms'
mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser:true})
var connection = mongoose.connection
connection.on('error',()=>{
    console.log('mongodb connection failed')
})
connection.on('connected',()=>{
    console.log('mongodb connection successful')
})
module.exports = mongoose

