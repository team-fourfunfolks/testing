
var app = require('express')();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var path = require('path');

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/index.css', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.css'));
});

// route test page 
app.get('/test', function(req, res){
  res.send('on test page');
})

app.post('/payload', function(req, res) {
  io.emit('payloadRec', {hello: 'payload'});
	console.log("I got a Payload from your Github Webhook");
  res.end();
});



//#######   socket handling   ############
var users = 0;
io.on('connection', function (socket) {
  users++;
  console.log(users + ' connected with socket');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log('my other event triggered');
  });
  socket.on('disconnect', function(){
    users--;
    console.log('disconnect felt \n');
  });
});
