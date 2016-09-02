var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')(/*options*/);
var pg = require('pg');
var cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'YoutubeAgent',
    user: 'postgres',
    password: 'admin'
};

var dbFormat = function(val, excludeComma){
  var endComma = excludeComma ? "" : ",";
  if(isNaN(val)){
    var re = new RegExp("'", 'g');
    val = val.replace(re, '');
    return "'" + val.toString() + "'" + endComma;
  }
  return val + endComma;
};

var getValues = function(videos){
  return videos.map(function(video){
    return "("+ dbFormat(video.videoId) + dbFormat(video.title) + dbFormat(video.safeTitle) + dbFormat(video.channelTitle) + dbFormat(video.channelId) + dbFormat(video.created) + dbFormat(video.pctLikes) + dbFormat(video.viewCount) + dbFormat(video.likes) + dbFormat(video.dislikes) + dbFormat(video.thumbnail.url) + dbFormat(video.duration) + dbFormat(video.durationMinutes, true) +")"
  }).join(",");
};

var insertVideo = function(req, res, next){
    var videos = req.body.videos;

    pg.connect("postgres://postgres:admin@localhost:5432/YoutubeAgent", function(err, client, done) {
            // Handle connection errors
      if(err) {
        done();
        console.log(err);
        res.send({});
        res.end();
      }

      // var sql = "INSERT INTO video(id, title, safe_title, channel_title, channel_id, created, pct_likes,view_count, likes, dislikes, thumbnail, duration, duration_minutes) VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10, $11, $12, $13);";
      var sql = "INSERT INTO video(id, title, safe_title, channel_title, channel_id, created, pct_likes,view_count, likes, dislikes, thumbnail, duration, duration_minutes) VALUES "+ getValues(videos) +";";
      // SQL Query > Insert Data
      client.query(sql, function(err, result){
        if(err){
          res.send({});
          res.end();
        } else{
          res.send({});
          res.end();
        }
      });
  });
};

var getVideos = function(req, res, next){

  var db = pgp(cn); // database instance;

  var videoIds = req.body.videos.map(function(v){return "'" + v + "'"}).join(",")
console.log(videoIds);
  var sql = "select * from video where id in ("+ videoIds +")";
  // select and return user name from id:
  db.query(sql)
      .then(function (videos) {
        var ids = videos.map(function(video){return video.id});
        console.log(ids);
          res.send(ids);
      })
      .catch(function (error) {
          res.send(error);
      });
};

router.post('/get', getVideos);
router.post('/add', insertVideo);

module.exports = router;
