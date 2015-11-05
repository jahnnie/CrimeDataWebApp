/// <reference path='../models/crime.ts'/>

var fs = require('fs');
var parse = require('csv-parse');
var Promise = require('promise');

var CrimeModel = require('./../models/crime').crimeModel

export function loadData(callback) {

  var file = fs.readFileSync('assets/crime_2015.csv', 'utf8');

  parsePromise(file, { columns: true })
  .then(function (results) {
    return formatResults(results);
  })
  .then(function (data) {
    return insertCrimes(data);
  })
  .then(function (inserted) {
    callback(inserted.length);
  });
}

// Promise wrapper for parsing CSV
var parsePromise = function (file, options) {
  return new Promise(function (fulfill, reject) {
    parse(file, options, function (err, output) {
      if (err) reject(err);
      else fulfill(output);
    });
  });
}

// format results from CSV
var formatResults = function (results) {
  var newArray = [];
  for (var i = 0; i < results.length; i++) {
    var crimeObject = {
      "type": results[i].TYPE,
      "year": results[i].YEAR,
      "month": results[i].MONTH,
      "address": results[i].HUNDRED_BLOCK
    };
    newArray.push(crimeObject);

  }
  return newArray;
}

// insert Crimes into mongo
var insertCrimes = function (crimes) {
  return new Promise(function (fulfill, reject) {
    CrimeModel.collection.insert(crimes, function (err, docs) {
      if (err) reject(err);
      else {
        console.log('inserted %d crimes', docs.length);
        fulfill(docs);
      }
    });
  })
}
