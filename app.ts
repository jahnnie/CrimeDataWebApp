/// <reference path='typings/tsd.d.ts'/>

interface Error {

  status?: number;

}

class Application {

  constructor() {

    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');

    var routes = require('./routes/index');
    var adminRoutes = require('./routes/admin');
    var users = require('./routes/user');

    // US#4
    var filterCrimeDataRoutes = require('./routes/filterCrimeData');
    // US#2
    var adminCrimeDataRoutes = require('./routes/adminCrimeData');

    var app = express();

    // OpenShift deployment settings
    var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
    var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
    var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost/crimesDB";
    var mongoURLLabel = "";
    if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
      var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
      var mongoHost = process.env[mongoServiceName + "_SERVICE_HOST"];
      var mongoPort = process.env[mongoServiceName + "_SERVICE_PORT"];
      var mongoUser = process.env.MONGODB_USER
      if (mongoHost && mongoPort && process.env.MONGODB_DATABASE) {
        mongoURLLabel = mongoURL = 'mongodb://';
        if (process.env.MONGODB_USER && process.env.MONGODB_PASSWORD) {
          mongoURL += process.env.MONGODB_USER + ':' + process.env.MONGODB_PASSWORD + '@';
        }
        // Provide UI label that excludes user id and pw

        mongoURLLabel += mongoHost + ':' + mongoPort + '/' + process.env.MONGODB_DATABASE;
        mongoURL += mongoHost + ':' + mongoPort + '/' + process.env.MONGODB_DATABASE;
      }
    }
    // END OpenShift deployment settings

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    var dbConnect = function () {
      mongoose.connect(mongoURL);
    };
    dbConnect();
    mongoose.connection.on('error', console.log);
    mongoose.connection.on('connected', function () {
      console.log('Connected to mongo');
    });

    app.use('/', routes);
    app.use('/admin', adminRoutes);
    app.use('/user', users);

    // US#4
    app.use('/filtercrimedata', filterCrimeDataRoutes);
    // US#2
    app.use('/admincrimedata', adminCrimeDataRoutes);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });


    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });

    app.listen(port, ip);

    module.exports = app;

  }

}

var app = new Application();
