var path = require('path');
var http = require('request-promise');
var express = require('express');
var router = express.Router();

var apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyA7mIz_md82p22_U9TDhCsz8PoMRrnt5RI';

var _options = {};

router.post('/translate', function (req, res, next) {
    console.log(req.body.url + '&key=' + apiKey);
    var options = {
        uri: req.body.url + '&key=' + apiKey,
        json: true
    };
    _options = options;
    http(options).then(function (data) {
        res.json(data)
    })
    .catch(function (err) {
        console.log(err);
        err.xtra = _options;
        res.status('500').send(err);
    });
});

module.exports = router;
