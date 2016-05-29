const
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Send the foundation css file
app.get('/stylesheets/foundation/css/foundation.min.css', function (req, res) {
    res.sendFile(__dirname + '/stylesheets/foundation/css/foundation.min.css');
});
// Send the custom css file
app.get('/stylesheets/style.css', function (req, res) {
    res.sendFile(__dirname + '/stylesheets/style.css');
});
app.get('/public/images/banner.svg', function (req, res) {
    res.sendFile(__dirname + '/public/images/banner.svg');
});

io.on('connection', function(socket) {
    console.log('A user has conected to server');

    socket.on('disconnect', function() {
        console.log('A user has been disconected');
    });
    socket.on('client send', function(msg) {
        io.emit('server send', msg);
    });

});

http.listen(3000, function() {
    console.log('Listening on *:3000');
});
