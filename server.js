var express = require('express');

var app = express();

app.use(express.static('.'));
// app.use(express.static('bower_components'));
// app.use(express.static('release'));
// app.use(express.static('demo'));


app.listen(1234);
