var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var indataRouter = require('./routes/intData');
var cors = require('cors');
var app = express();

var mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist/growth-bond')));
console.log(path.join(__dirname, '../dist'));

app.use('/user', usersRouter);
app.use('/intdata', indataRouter);

module.exports = app;
