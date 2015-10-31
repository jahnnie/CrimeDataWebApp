/// <reference path='../typings/tsd.d.ts'/>

import express = require('express');
import loadData = require('../controllers/loadData');

class AdminRouter {

  router: express.Router;

  constructor() {

    this.router = express.Router();
    this.router.get('/load', function(req, res, next) {
      loadData.loadData();
      res.send("done");
    });

  }
}

var adminRouter = new AdminRouter();
module.exports = adminRouter.router;
