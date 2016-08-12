const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/payload', function(req, res) {
	const push = req.body.read;
	res.send('Payload page POST method');
});


app.listen(4567, function () {
  console.log('Example app listening on port 4567!');
});