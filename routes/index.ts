/// <reference path='../typings/tsd.d.ts'/>

class Router {

  constructor() {

    var express = require('express');
    var router = express.Router();

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    /* GET Hello World page. */
    router.get('/helloworld', function(req, res) {
      res.render('helloworld', { title: 'Hello, World!' });
    });

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
