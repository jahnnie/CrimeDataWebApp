/// <reference path="../types/DefinitelyTyped/mongoose/mongoose.d.ts" />

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

export var crimeModel = M.model<ICrime>("crime", crimeSchema);
