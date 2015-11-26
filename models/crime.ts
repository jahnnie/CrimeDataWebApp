
/// <reference path='../typings/tsd.d.ts'/>

import M = require('mongoose');

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

<<<<<<< HEAD
export var crimeModel = M.model<ICrime>("crime", crimeSchema);
=======
export var crimeModel = M.model<ICrime>("crime", crimeSchema);

export function removeAll() {
  return crimeModel.remove({}).exec();
}
>>>>>>> 33951212615fdbe46bd57091380d742ac09170b5
