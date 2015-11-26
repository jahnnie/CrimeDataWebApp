/// <reference path='../typings/tsd.d.ts'/>

import express = require('express');
import userData = require('../controllers/user');
var User = require('./../models/users');
var UserModel = User.userModel;

class UserRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();

    /* GET Sign Up Page. */
    this.router.get('/newuser', function(req, res) {
      res.render('newuser', { title: 'Sign Up' });
    });

    /* POST Signed Up Page. */
    this.router.post('/signedUpPage', function(req, res) {
      userData.addUser(req.body)
      .then(function() {
        res.render('signedUpPage', {
          title: 'Confirm sign up.'
        });
      },
      function (err) {
        res.render('userErrorPage', {
          title: err
        });
      });
    });

  // /* GET home page. */
  //   this.router.get('/', function(req, res) {
  //     res.render('login', { title: 'Welcome to GoldmanSachs App' });
  //   });

  //   /* Post home page. */
  //   this.router.post('/login', function(req, res) {
  //   var userName = req.params.username;
  //   var passWord = req.params.password;
    
  //   UserModel.collection.findOne({ username: userName }, {},
  //    function(err, doc) {
  //     if (err) {
  //       res.send("There was a problem with logging in.");
  //     }
  //     else {
  //       res.redirect('/gmaps');
  //     }
  //   });
  //   });

    /* GET home Page. */
    this.router.get('/login', function(req, res) {
        UserModel.find({}, {}, function(e, docs) {
      console.log(e);
      var username = [];
      // var password = [];
      var n = docs.length;
      var i = 0;
      while (n>0){
        username[i] = docs[i];
        // password[i] = docs[i].password;
        i++;
        n--;
      }
      res.render('login', {
        title: 'Welcome to GoldmanSachs App',
        usernames: JSON.stringify(username),
      // passwords: JSON.stringify(password)
      });
    })
  });

  }
}

var userRouter = new UserRouter();
module.exports = userRouter.router;
