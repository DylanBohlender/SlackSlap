var herokuInstanceURL = ''; //Formatted as "http://yourapphere.herokuapp.com"
exports.slackWebhookPath = ''; //Slack Incoming WebHook Path

var http = require('http');
setInterval(function() { // Ping dyno every 5 minutes to keep awake (300000ms)
    http.get(herokuInstanceURL);
}, 300000);
var express = require('express');
var bodyParser = require('body-parser');
var slackslap = require('./slackslap');

var app = express();
var port = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get('/', function (req, res) { res.status(200).send('Hello world!') });

// Error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, function () {
    console.log('SlackSlap listening on port ' + port);
});

// Configure post route - Slack Slash command will POST to slackInstanceURL/slap
app.post('/slap', slackslap);
