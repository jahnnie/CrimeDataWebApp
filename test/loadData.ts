/// <reference path='../typings/tsd.d.ts'/>

var loadData = require('./../controllers/loadData');
var fs = require('fs');
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

  it('should parse data into array of objects', function() {
    var file = fs.readFileSync('assets/crime_2015.csv', 'utf8')
    return expect(loadData.parsePromise(file, { columns: true })
    .then(function (results) {
      return results[0];
    }))
    .to.eventually.eql(
      {
        TYPE: 'Commercial Break and Enter',
        YEAR: "2015",
        MONTH: "01",
        HUNDRED_BLOCK: "49XX CARTIER ST"
      }
    );
  });
});
