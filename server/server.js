const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { text } = require('express');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT||5000

var app= express();
var server = http.createServer(app);
var io =socketIO(server);
const {generateMessage} = require('./utils/message')
app.use(express.static(publicPath));

//register an event listener...Listening o connection event
io.on('connection', (socket)=>{
    console.log("New user connected")

  socket.emit('newMessage', generateMessage("Admin","Hey, welcome to our chat group"));
 
  socket.broadcast.emit('newMessage', generateMessage("Admin","New user Joined the chatroom"));


    socket.on('createMessage', (message, callback)=>{
        console.log("Message received:", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from server')
        //BROADCAST
        //  text:message.text,
        //    socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('disconnect', ()=>{
        console.log("User was disconnected..")
    })
})


server.listen(5000, ()=>{
    console.log(`Server is up on port ${port}`)
})