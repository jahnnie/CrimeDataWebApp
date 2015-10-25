/// <reference path="../types/DefinitelyTyped/mongoose/mongoose.d.ts" />
var M = require('mongoose');
exports.crimeSchema = new M.Schema({
    type: String,
    year: Number,
    month: Number,
    address: String
});
exports.crimeModel = M.model("crime", exports.crimeSchema);
