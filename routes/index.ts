/// <reference path='../typings/tsd.d.ts'/>

class Router {

  constructor() {

    var express = require('express');
    var router = express.Router();

    var CrimeModel = require('./../models/crime').crimeModel

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    /* GET Hello World page. */
    router.get('/helloworld', function(req, res) {
      res.render('helloworld', { title: 'Hello, World!' });
    });

    /* GET Userlist page. */
    router.get('/userlist', function(req, res) {
      var db = req.db;
      var collection = db.get('usercollection');
      collection.find({},{},function(e,docs){
        console.log(e);
        res.render('userlist', {
          "userlist" : docs
        });
      });
    });

    /* GET Check page. */
    router.get('/check', function(req, res) {
        CrimeModel.find({}, {}, function(e, docs) {
            console.log(e);
            var comm = [];
            var mu5 = [];
            var mo5 = [];
            var tau5 = [];
            var tao5 = [];
            var all = [];
            for (var i = 0; i < 10; i++) {
                comm[i] = docs[i];
            }
            for (var i = 233; i < 243; i++) {
                mu5[i - 233] = docs[i];
            }
            for (var i = 227; i < 233; i++) {
                mo5[i - 227] = docs[i];
            }

            for (var i = 1689; i < 1693; i++) {
                mo5[i - 1683] = docs[i];
            }
            for (var i = 2025; i < 2035; i++) {
                tau5[i - 2025] = docs[i];
            }
            for (var i = 2013; i < 2023; i++) {
                tao5[i - 2013] = docs[i];
            }
            all[0] = docs[0];
            all[1] = docs[1];
            all[2] = docs[233];
            all[3] = docs[244];
            all[4] = docs[227];
            all[5] = docs[228];
            all[6] = docs[2025];
            all[7] = docs[2026];
            all[8] = docs[2013];
            all[9] = docs[2014];


            //need one for ALL
            res.render('check', {
                title: 'filtered',
                comms: JSON.stringify(comm),
                mu5s: JSON.stringify(mu5),
                mo5s: JSON.stringify(mo5),
                tau5s: JSON.stringify(tau5),
                tao5s: JSON.stringify(tao5),
                errthang: JSON.stringify(all)
            });
        })

    });

    /* GET New User page. */
    router.get('/newuser', function(req, res) {
      res.render('newuser', { title: 'Add New User' });
    });

    
    /* POST to Add User Service */
    router.post('/adduser', function(req, res) {

      // Set our internal DB variable
      var db = req.db;

      // Get our form values. These rely on the "name" attributes
      var userName = req.body.username;
      var userEmail = req.body.useremail;

      //inserted new code
      var user = new User(userName, userEmail);

      // Set our collection
      var collection = db.get('usercollection');

      // Submit to the DB (edited)
      collection.insert({
        "username" : user.getName(),
        "email" : user.getEmail()
      }, function (err, doc) {
        if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
        }
        else {
          // And forward to success page
          res.redirect("userlist");
        }
      });
    });


    module.exports = router;

  }
}

var route = new Router();

interface UserInterface {
  getName();
  getEmail();

}

class User implements UserInterface {
  private name : string;
  private email : string;

  constructor(name : string, email : string) {
    this.name = name;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

}
