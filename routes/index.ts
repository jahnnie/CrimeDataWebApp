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
        });
    });

    router.get
    module.exports = router;
  }
}

var adminCrimeDataRouter = new AdminCrimeDataRouter();
