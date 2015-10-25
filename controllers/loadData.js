var fs = require('fs');
var parse = require('csv-parse');
function loadData() {
    var file = fs.readFileSync('assets/crime_2015.csv', 'utf8');
    parse(file, { columns: true }, function (err, output) {
        console.log(output);
    });
}
exports.loadData = loadData;
