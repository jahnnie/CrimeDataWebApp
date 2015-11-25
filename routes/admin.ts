/// <reference path='../typings/tsd.d.ts'/>

import express = require('express');
import loadData = require('../controllers/loadData');
import users = require('../controllers/user');

class AdminRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/load', function(req, res, next) {
      return loadData.loadData()
      .then(function (inserted) {
        //res.send({ success: true, inserted: inserted });
        res.render('loadedData', {
          title: inserted + " crimes inserted"
        });
      });
    });
    this.router.get('/userlist', function(req, res) {
      users.allUsers()
      .then(function (users) {
        res.render('userlist', {
          title: "List of all users",
          userlist: users
        });
      });
    })
  }
}

var adminRouter = new AdminRouter();
module.exports = adminRouter.router;
