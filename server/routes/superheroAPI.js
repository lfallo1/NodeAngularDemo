var fs = require('fs');
var path = require('path');

var results = {};
fs.readFile(path.join(__dirname, '../json/superhero.json'), 'utf8', function (err, data) {
    if (err) {
        throw err;
    } else {
        results = JSON.parse(data);
    }
});

module.exports.getAll = function (req, res, next) {
    res.json(results);
};

module.exports.getById = function(req,res, next){
    var superhero = {};

    for(var i = 0; i < results.length; i++){
        if(results[i]._id === req.params.id){
            superhero = results[i];
            break;
        }
    }

    res.json(superhero);
};
