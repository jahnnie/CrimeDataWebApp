/// <reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var express = require('express');
var loadData = require('../controllers/loadData');
var AdminRouter = (function () {
    function AdminRouter() {
        this.router = express.Router();
        this.router.get('/load', function (req, res, next) {
            loadData.loadData();
            res.send("done");
        });
    }
    return AdminRouter;
})();
var adminRouter = new AdminRouter();
module.exports = adminRouter.router;
