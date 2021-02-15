var socket = io();

            socket.on('connect', function(){
                console.log("connected to the server")

                socket.emit('createMessage', {
                    from:"Caleb",
                    text:"Hey, this' Awesome!"
                })
            })

            socket.on('disconnect', function(){
                console.log("disconnected from server..")
            })

            socket.on('newMessage', function(message){
                console.log('NewMessage', message)
            })