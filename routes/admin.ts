/// <reference path='../typings/tsd.d.ts'/>

import express = require('express');
import loadData = require('../controllers/loadData');

class AdminRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/load', function(req, res, next) {
      loadData.loadData(function (inserted) {
        //res.send({ success: true, inserted: inserted });
        res.render('loadedData', {
          title: inserted + " crimes inserted"

        });
      });
    });
  }
}

var adminRouter = new AdminRouter();
module.exports = adminRouter.router;
