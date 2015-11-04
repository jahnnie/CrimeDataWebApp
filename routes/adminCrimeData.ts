/// <reference path='../typings/tsd.d.ts'/>

class AdminCrimeDataRouter {

  constructor() {

  	var express = require('express');
  	var router = express.Router();

    var CrimeModel = require('./../models/crime').crimeModel

    /* GET Crime Data page. */
    router.get('/crimedata', function(req, res) {
      CrimeModel.find({},{},function(e,docs){
        console.log(e);
        res.render('crimedata', {
           crimes : docs
        });
    	});
    });
    module.exports = router;
  }
}

var adminCrimeDataRouter = new AdminCrimeDataRouter();
