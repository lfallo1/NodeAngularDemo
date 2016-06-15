var path = require('path');
var http = require('request-promise');

//var apiKey = process.env.PORT ? 'AIzaSyAdvomXbhYg3GeBGymbPVBg-aRJeIOfFyQ' : 'AIzaSyB3v4vF0MIHB00iTr4lAxW2ONwZNmTR0HM';

var apiKey = 'AIzaSyAdvomXbhYg3GeBGymbPVBg-aRJeIOfFyQ';

module.exports.get = function (req, res, next) {

    var options = {
        uri: req.body.url + '&key=' + apiKey,
        json: true // Automatically parses the JSON string in the response
    };

    http(options).then(function (data) {
        res.json(data)
    })
    .catch(function (err) {
        res.status('500').send('Unable to retrieve data');
    });
};

