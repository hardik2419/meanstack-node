var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var logger = require('morgan');
var cors = require('cors')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myproject')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var apiRouter = require('./routes/user');



var app = express()
app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use(bodyParser.json({limit: '5020mb', extended: true}));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
/* app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
}); */

app.listen(3000)
