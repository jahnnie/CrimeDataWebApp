/// <reference path='../typings/tsd.d.ts'/>

class Router {

  constructor() {

    var express = require('express');
    var router = express.Router();

    var CrimeModel = require('./../models/crime').crimeModel

    /* GET Commercial Break and Enter page. */
    router.post('/signup1', function(req, res) {
      console.log(req.body);
      res.redirect('/filterCrimeData/form1');
    });

    /* GET Mischief Under $5000 page. */
    router.post('/signup2', function(req, res) {
      console.log(req.body);
      res.redirect('/filterCrimeData/form2');
    });

    /* GET Mischief Over $5000 page. */
    router.post('/signup3', function(req, res) {
      console.log(req.body);
      res.redirect('/filterCrimeData/form3');
    });        

    /* GET Theft From Auto Under $5000 page. */
    router.post('/signup4', function(req, res) {
      console.log(req.body);
      res.redirect('/filterCrimeData/form4');
    });    

    /* GET Theft From Auto Over $5000 page. */
    router.post('/signup5', function(req, res) {
      console.log(req.body);
      res.redirect('/filterCrimeData/form5');
    });    

    /* GET Gmaps. */
    router.get('/gmaps', function(req, res) {
        CrimeModel.find({},{},function(e,docs){
            console.log(e);
            var arr = [];
            for(var i=0;i<10;i++){
                arr[i] = docs[i].address;
            }
            res.render('gmaps',{
                title: 'mapcrimes',
                adds: JSON.stringify(arr)
            });
        })
    });

    router.get('/newpage', function(req, res) {
      CrimeModel.find({},{},function(e,docs){
        console.log(e);
        var arr1 = [];
        for(var i=0;i<10;i++){
            arr1[i] = docs[i];
        }
        res.render('newpage', {
           title: 'tableCrimes',
           crimes: JSON.stringify(arr1)
        });
    })});

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
      CrimeModel.delete(req.param('_id'), function(error, docs) {
        res.redirect('/admincrimedata/crimedata')
      });
    });
    module.exports = router;
  }
}

var adminCrimeDataRouter = new Router();
