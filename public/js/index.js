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

            socket.emit('createMessage', {
                from:"Micah",
                text:"Hi there,"
            }, function(data){
                console.log('Received', data)
            })

            //display messages in the list
            socket.on('newMessage', function (message) {
                console.log('newMessage', message);
                var li = jQuery('<li></li>');
                li.text(`${message.from}: ${message.text}`);
              
                jQuery('#messages').append(li);
              });

              //location
              socket.on('newLocationMessage', function (message) {
                var li = jQuery('<li></li>');
                var a = jQuery('<a target="_blank">My current location</a>');
              
                li.text(`${message.from}: `);
                a.attr('href', message.url);
                li.append(a);
                jQuery('#messages').append(li);
              });

              //form onsubmit
            jQuery('#message-form').on('submit', function (e) {
                e.preventDefault();
              
                socket.emit('createMessage', {
                  from: 'User',
                  text: jQuery('[name=message]').val()
                }, function () {
              
                });
              });

              var locationButton = jQuery('#send-location');
              locationButton.on('click', function () {

                if (!navigator.geolocation) {

                    return alert('Geolocation not supported by your browser.');

                }


                navigator.geolocation.getCurrentPosition(function (position) {

                    socket.emit('createLocationMessage', {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                    });  }, function () {

                        alert('Unable to fetch location.');
                      });
                    });
