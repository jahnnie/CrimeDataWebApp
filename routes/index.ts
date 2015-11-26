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
    /*
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
    });*/


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
//mu5
    router.get('/mu5', function(req, res) {
        CrimeModel.find({}, {}, function(e, docs) {
            console.log(e);
            var mu5 = [];
            for (var i = 233; i < 243; i++) {
                mu5[i - 233] = docs[i];
            }
            res.render('mu5', {
                title: 'tableCrimes',
                mu5: JSON.stringify(mu5)
            });
        })
    });
//mo5
    router.get('/mo5', function(req, res) {
        CrimeModel.find({}, {}, function(e, docs) {
            console.log(e);
            var mo5 = [];
            for (var i = 227; i < 233; i++) {
                mo5[i - 227] = docs[i];
            }

            for (var i = 1689; i < 1693; i++) {
                mo5[i - 1683] = docs[i];
            }
            res.render('mo5', {
                title: 'tableCrimes',
                mo5: JSON.stringify(mo5)
            });
        })
    });
//taU
    router.get('/taU', function(req, res) {
        CrimeModel.find({}, {}, function(e, docs) {
            console.log(e);
            var taU5 = [];
            for (var i = 2025; i < 2035; i++) {
                taU5[i - 2025] = docs[i];
            }
            res.render('taU', {
                title: 'tableCrimes',
                tau5: JSON.stringify(taU5)
            });
        })
    });
//taO
    router.get('/taO', function(req, res) {
        CrimeModel.find({}, {}, function(e, docs) {
            console.log(e);
            var tao5 = [];
            for (var i = 2013; i < 2023; i++) {
                tao5[i - 2013] = docs[i];
            }
            res.render('taO', {
                title: 'tableCrimes',
                tao5: JSON.stringify(tao5)
            });
        })
    });
//displayAll
    router.get('/dAll', function(req, res) {
        CrimeModel.find({}, {}, function(e, docs) {
            console.log(e);
            var all = [];
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
            res.render('dAll', {
                title: 'tableCrimes',
                dAll: JSON.stringify(all)
            });
        })
    });

    router.get('/gmaps', function(req, res) {
        CrimeModel.find({}, {}, function(e, docs) {
            console.log(e);
            var arr = [];
            for (var i = 0; i < 10; i++) {
                arr[i] = docs[i].address;
            }
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
                mu5[i-233] = docs[i];
            }
            for (var i = 227; i < 233; i++) {
                mo5[i-227] = docs[i];
            }
            
            for (var i = 1689; i < 1693; i++) {
                mo5[i - 1683] = docs[i];
            }
            for (var i = 2025; i < 2035; i++) {
                tau5[i - 2025] = docs[i];
            }
            for (var i = 2013; i < 2023; i++) {
                tao5[i-2013] = docs[i];
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
            res.render('gmaps', {
                title: 'mapcrimes',
                comms: JSON.stringify(comm),
                mu5s: JSON.stringify(mu5),
                mo5s: JSON.stringify(mo5),
                tau5s: JSON.stringify(tau5),
                tao5s: JSON.stringify(tao5),
                errthang: JSON.stringify(all),
                adds: JSON.stringify(arr)
            });
        })
    });

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

    router.get('/check', function(req, res) {
        res.render('check', { title: 'Filter Settings' });
    });

    
    module.exports = router;
  }
}

var adminCrimeDataRouter = new Router();
