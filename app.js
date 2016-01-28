require('dotenv').config(); // .env

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;

var mongoose = require('mongoose');
var db       = mongoose.connect('mongodb://localhost/bookAPI');

var bodyParser = require('body-parser');


/*----------------------------------------
| Models
|----------------------------------------*/
var Book = require('./app/models/bookModel');

/*----------------------------------------
| Routes
|----------------------------------------*/
var bookRouter = require('./app/routes/bookRouter')(express, Book);


/*----------------------------------------
| Middlewares
|----------------------------------------*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/books', bookRouter);



app.listen(port, function() {
	console.log("Listening on port "+ port);
});
