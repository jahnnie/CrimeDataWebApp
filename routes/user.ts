/// <reference path='../typings/tsd.d.ts'/>

import express = require('express');
import userData = require('../controllers/user');

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

  }
}

var userRouter = new UserRouter();
module.exports = userRouter.router;
