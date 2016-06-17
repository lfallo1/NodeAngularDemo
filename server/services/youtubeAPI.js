var path = require('path');
var http = require('request-promise');
var fs = require('fs');
var youtubedl = require('ytdl');
var ffmpeg = require('fluent-ffmpeg');

var apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyB3v4vF0MIHB00iTr4lAxW2ONwZNmTR0HM';
var ffmpegLocation = process.env.FFMPEG || '/Users/lfallon/WebstormProjects/YoutubeAgent/NodeAngularDemo/server/jdownloader/ressourcen/tools/mac/ffmpeg_10.6+/ffmpeg';

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
    var id = req.params.id;
    var ytUrl = 'https://www.youtube.com/watch?v=' + id;
    var stream = youtubedl(ytUrl);
    var timestamp = '_' + new Date().getTime();
    console.log(timestamp);

    var proc = new ffmpeg({source: stream});
    proc.setFfmpegPath(ffmpegLocation);
    proc.withAudioCodec('libmp3lame')
        .toFormat('mp3')
        .output(__dirname + '/' + id + timestamp + '.mp3')
        .run();
    proc.on('end', function() {
        var file = fs.readFileSync(__dirname + '/' + id + timestamp + '.mp3');
        res.setHeader('Content-Length', file.length);
        res.setHeader('Content-disposition', 'attachment; filename=' + id + '.mp3');
        res.setHeader('Content-type', 'audio/mpeg');
        res.write(file);
        res.end('', function(){
            fs.unlinkSync(__dirname + '/' + id + timestamp + '.mp3');
        });
    });
};

