/// <reference path='../typings/tsd.d.ts'/>

var loadData = require('./../controllers/loadData');
var crimeModel = require('./../models/crime').crimeModel;
var Promise = require('promise');
var specHelper = require('./utils/specHelper');
import chai = require('chai');
var expect = chai.expect;
import chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Load data', function () {
  it('should load all data into the database', function () {
    return expect(loadData.loadData()).to.eventually.equal(4117);
  });
});
