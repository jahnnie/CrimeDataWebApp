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

    /* GET home Page. */
    this.router.get('/', function(req, res) {
        UserModel.find({}, {}, function(e, docs) {
      console.log(e);
      var user = [];
      var n = docs.length;
      var i = 0;
      while (n>0){
        user[i] = docs[i];
        i++;
        n--;
      }
      res.render('login', {
        title: 'Welcome to GoldmanSachs App',
        users: JSON.stringify(user),
      });
    })
  });

  }
}

var userRouter = new UserRouter();
module.exports = userRouter.router;
