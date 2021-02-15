var socket = io();

            socket.on('connect', function(){
                console.log("connected to the server")
            })

            socket.on('disconnect', function(){
                console.log("disconnected from server..")
            })

            // socket.on('welcomeMessage', function(welcome){
            //     console.log("WelcomeMessage", welcome)
            // })

            socket.on('newMessage', function(message){
                console.log('NewMessage', message)
            })