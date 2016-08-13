
var app = require('express')();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var path = require('path');
var bodyParser = require('body-parser');

server.listen(3000);

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/index.css', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.css'));
});

// route test page
app.post('/test', function(req, res){
  if(req.body) {
    io.emit('starred', req.body.repository.stargazers_count);
    console.log(req.body.repository.stargazers_count);
    console.log('Someone starred your repo');
  }
  res.end();
});

app.post('/push', function(req, res){
  if(req.body) {
    io.emit('push', req.body.pusher);
    console.log(req.body.pusher);
    console.log('Someone pushed');
  }
  res.end();
});

app.post('/payload', function(req, res) {
	//console.log(req.body.issue.title, req.body.repository.full_name);
  if(req.body.comment){
    io.emit('payloadRec', req.body.comment.body);
    console.log('comment made to repo');
  } else if(req.body.issue){
    console.log('issue added to repo');
  };
  res.end();
});



//#######   socket handling   ###########
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
