
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors= require('cors')
var exphbs = require('express-handlebars');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// const upload  =require('express-fileupload')
var logger = require('morgan');
const upload = require('express-fileupload');

var app = express();
require('./dbconnection');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload());
app.use(logger('dev'));
// app.use(Verify.tokenVerify());
app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use(upload());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
