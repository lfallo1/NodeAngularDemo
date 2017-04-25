var path = require('path');
var http = require('request-promise');
var express = require('express');
var router = express.Router();

// var AUTOCOMPLETE_BASE = 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=';
var AUTOCOMPLETE_BASE = 'https://www.google.com/complete/search?client=hp&hl=en&xhr=t&q=';
var REGEX_STRIP_TAGS = /(<([^>]+)>)|(&lt;([^>]+)&gt;)/ig;

var _options = {};

router.get('', function (req, res, next) {

    var options = {
        uri: AUTOCOMPLETE_BASE + req.query.q.replace(/#/g,''),
        json: true,
        headers: {
          'Content-Type': 'application/json'
        }
    };
    _options = options;
    http(options).then(function (data) {
        var response = {results: []};
        if(data && data.length > 1){
          // res.json(data[1].map(function(d){return d[0];}));
          var responseArray = data[1].map(function(d){return d[0] ? d[0].replace(REGEX_STRIP_TAGS,'') : '';})
          res.json(responseArray.filter(function(d){return d}));
        } else{
          res.json([]);
        }
    })
    .catch(function (err) {
        console.log(err);
        err.xtra = _options;
        res.status('500').send(err);
    });
});

module.exports = router;
