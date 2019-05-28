const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
	const name = req.query.name || 'World';
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/api/toggle', (req, res) => {
	console.log(req);
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ greeting: "alkjshflkjashfdlkjs" }));
});

app.listen(3001, () =>
	console.log('Express server is running on localhost:3001')
);
