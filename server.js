var express = require('express');

var app = express();

app.use(express.static('dist'));
app.use('/bower_components', express.static('bower_components'));
app.use('/src', express.static('src'));
app.use('/semantic', express.static('semantic'));

app.listen(1234);
