var path = require('path');
var http = require('request-promise');

//var apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyB3v4vF0MIHB00iTr4lAxW2ONwZNmTR0HM';

var apiKey = 'AIzaSyAY8aVa_oVZya_-a53oyFikvs-RwJfNDuk';

var _options = {};

module.exports.get = function (req, res, next) {

    var options = {
        uri: req.body.url + '&key=' + apiKey,
        json: true
    };
_options = options;
    http(options).then(function (data) {
        res.json(data)
    })
    .catch(function (err) {
            err.xtra = _options;
        res.status('500').send(err);
    });
};

