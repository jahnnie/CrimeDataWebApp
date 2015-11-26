
/// <reference path='../typings/tsd.d.ts'/>

import M = require('mongoose');
var Promise = require('promise');

export var crimeSchema:M.Schema = new M.Schema(
  {
    type: String,
    year: Number,
    month: Number,
    address: String
  });

export interface ICrime extends M.Document {
  type: string;
  year: number;
  month: number;
  address: string;
}

export var crimeModel = M.model<ICrime>("crime", crimeSchema);

export function removeAll() {
  return new Promise(function (resolve, reject) {
    crimeModel.remove({}, function (error) {
      if (error)
        return reject(error);
      else resolve();
    })
  });
}
