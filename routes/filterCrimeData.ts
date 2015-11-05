/// <reference path='../typings/tsd.d.ts'/>

class FilterCrimeDataRouter {

  constructor() {

    var express = require('express');
    var router = express.Router();

    var CrimeModel = require('./../models/crime').crimeModel

    /* GET Commercial Break and Enter page. */
    router.get('/form1', function(req, res) {
      CrimeModel.find({}, {}, function(e, docs) {
        console.log(e);
        res.render('form1', {
          crimes: docs
        });
      });
    });

    /* GET Mischief Under $5000 page. */
    router.get('/form2', function(req, res) {
    CrimeModel.find({}, {}, function(e, docs) {
      console.log(e);
      res.render('form2', {
        crimes: docs
      });
    });
    });

    /* GET Mischief Over $5000 page. */
    router.get('/form3', function(req, res) {
    CrimeModel.find({}, {}, function(e, docs) {
      console.log(e);
      res.render('form3', {
        crimes: docs
      });
    });
    });

    /* GET Theft From Auto Under $5000 page. */
    router.get('/form4', function(req, res) {
    CrimeModel.find({}, {}, function(e, docs) {
      console.log(e);
      res.render('form4', {
        crimes: docs
      });
    });
    });

    /* GET Theft From Auto Over $5000 page. */
    router.get('/form5', function(req, res) {
    CrimeModel.find({}, {}, function(e, docs) {
      console.log(e);
      res.render('form5', {
        crimes: docs
      });
    });
    });
  
    router.get('/checkbox', function(req, res) {
      res.render('checkbox', { title: 'Filter Settings' });
    });

    module.exports = router;
  }
}

var filterCrimeDataRouter = new FilterCrimeDataRouter();
