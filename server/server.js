const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT||5000

var app= express();
var server = http.createServer(app);
var io =socketIO(server);

app.use(express.static(publicPath));

//register an event listener...Listening o connection event
io.on('connection', (socket)=>{
    console.log("New user connected")

    socket.on('disconnect', ()=>{
        console.log("User was disconnected..")
    })
})


server.listen(5000, ()=>{
    console.log(`Server is up on port ${port}`)
})