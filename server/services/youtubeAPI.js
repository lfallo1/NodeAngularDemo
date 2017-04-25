var path = require('path');
var http = require('request-promise');
var fs = require('fs');
var youtubedl = require('ytdl');
var ffmpeg = require('fluent-ffmpeg');
var express = require('express');
var router = express.Router();

//var apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyB3v4vF0MIHB00iTr4lAxW2ONwZNmTR0HM';
// var apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyC5yjrJfXxhqyjOGC52qlGqXa-fodne9JM';
var apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyAdvomXbhYg3GeBGymbPVBg-aRJeIOfFyQ';

var ffmpegLocation = process.env.FFMPEG || '/Users/lancefallon/Documents/angularProjects/NodeAngularDemo/server/ffmpeg/mac/ffmpeg_10.6+/ffmpeg';

var YOUTUBE_BASE = 'https://www.youtube.com/watch?v=';

//var apiKey = 'AIzaSyAY8aVa_oVZya_-a53oyFikvs-RwJfNDuk';

var _options = {};

router.get('/mp3/:id/:title', function(req, res, next){
    var id = req.params.id;
    var title = req.params.title;
    var ytUrl = YOUTUBE_BASE + id;
    var stream = youtubedl(ytUrl);
    // var timestamp = '_' + new Date().getTime();
    // console.log(timestamp);

    res.setHeader('Content-disposition', 'attachment; filename=' + title + '.mp3');
    res.setHeader('Content-type', 'audio/mpeg');

    var proc = new ffmpeg({source: stream});
    proc.setFfmpegPath(ffmpegLocation);
    proc.withAudioCodec('libmp3lame')
        .toFormat('mp3')
        .output(res)
        .run();
    proc.on('end', function() {
        console.log('finished downloading ' + ytUrl);
    });
    proc.on('error', function(err){
      console.log(err);
      res.end();
    });
    stream.on('error', function(err){
      console.log(err);
      res.end();
    });
});

router.get('/mp4/:id/:title', function(req, res, next){
  var title = req.params.title;
  var id = req.params.id;
  var url = YOUTUBE_BASE + id;

  res.type('video/mp4');

  var video = youtubedl(url, '', ['--max-quality=18']);
  video.on('info', function (info) {
      res.set({
          'Content-Disposition': 'attachment; filename="' + title + '.mp4'
      })
  });
  video.on('data', function (data) {
      res.write(data);
  });
  video.on('end', function () {
      console.log('finished downloading ' + url);
      res.end()
  });
  video.on('error', function(err){
    console.log(err);
    res.end();
  })
});

router.post('/get',function (req, res, next) {

    var options = {
        uri: req.body.url.replace(/#/g,'') + '&key=' + apiKey,
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
});

module.exports = router;
