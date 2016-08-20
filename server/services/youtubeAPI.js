var path = require('path');
var http = require('request-promise');
var fs = require('fs');
var youtubedl = require('ytdl');
var ffmpeg = require('fluent-ffmpeg');

//var apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyB3v4vF0MIHB00iTr4lAxW2ONwZNmTR0HM';
var apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyC5yjrJfXxhqyjOGC52qlGqXa-fodne9JM';

var ffmpegLocation = process.env.FFMPEG || '/Users/lfallon/youtubeAgent/NodeAngularDemo/server/ffmpeg/mac/ffmpeg_10.6+/ffmpeg';

//var apiKey = 'AIzaSyAY8aVa_oVZya_-a53oyFikvs-RwJfNDuk';

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

module.exports.toMp3 = function(req, res, next){
    var title = req.params.title;
    var id = req.params.id;
    var url = 'https://www.youtube.com/watch?v=' + id;
    res.type('audio/mpeg');
    res.set({
        'Content-Disposition': 'attachment; filename="' + title + '.m4v'
    });

    youtubedl(url, { filter: 'audioonly' })
      .pipe(res);
};

module.exports.toMp4 = function(req, res, next){
  var title = req.params.title;
  var id = req.params.id;
  var url = 'https://www.youtube.com/watch?v=' + id;

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
      res.end()
  });
};
