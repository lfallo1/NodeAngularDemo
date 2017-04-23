var path = require('path');
var http = require('request-promise');
var express = require('express');
var router = express.Router();

var AUTOCOMPLETE_BASE = 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=';

var _options = {};

router.get('', function (req, res, next) {

    var options = {
        uri: AUTOCOMPLETE_BASE + req.query.q,
        json: true,
        headers: {
          'Content-Type': 'application/json'
        }
    };
    _options = options;
    http(options).then(function (data) {
        var response = {results: []};
        if(data && data.length > 0){
          for(var i = 0; i < data[1].length; i++){
            response.results.push({'title': data[1][i]});
          }
          // data.data = response;
        }
        res.json(response);
    })
    .catch(function (err) {
        console.log(err);
        err.xtra = _options;
        res.status('500').send(err);
    });
});

module.exports = router;
