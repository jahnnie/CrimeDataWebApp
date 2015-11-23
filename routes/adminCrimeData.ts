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

    /* GET New Crime Page. */
    router.get('/addnewcrimepage', function(req, res) {
      res.render('addnewcrimepage', { title: 'New Crime' });
    });  
    
    /* POST to Add New Crime. */
    router.post('/addcrime', function(req, res) {
      var newCrime = {
        "type": req.body.type,
        "year": req.body.year,
        "month": req.body.month,
        "address": req.body.address
      };
      CrimeModel.collection.insert(newCrime, function(err, doc) {
        if (err) {
          res.send("There was a problem adding the new crime.");
        }
        else {
          res.redirect('/admincrimedata/crimedata');
        }
      });
    });

    /* Delete a crime. */
    router.post('/delete', function(req, res) {
      CrimeModel.remove({ _id: req.param('_id') }, function(err, doc) {
        if (err) {
          res.send("There was a problem deleting the crime.");
        }
        else {
          res.redirect('/admincrimedata/crimedata');
        }
      });
    });

    module.exports = router;
  }
}

var adminCrimeDataRouter = new AdminCrimeDataRouter();
