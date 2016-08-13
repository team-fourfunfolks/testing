const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/payload', function(req, res) {
	const push = JSON.parse(req.body.read);
	// res.send('Payload page POST method');
	console.log("I got some JSON: " + push.inspect);
});


app.listen(4567, function () {
  console.log('Example app listening on port 4567!');
});