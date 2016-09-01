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
var insertVideo = function(req, res, next){

    var video = req.body.video;

    pg.connect("postgres://postgres:admin@localhost:5432/YoutubeAgent", function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var sql = "INSERT INTO video(id, title, safe_title, channel_title, channel_id, created, pct_likes,view_count, likes, dislikes, thumbnail, duration, duration_minutes) VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10, $11, $12, $13);";
        // SQL Query > Insert Data
        client.query(sql, [video.videoId, video.title, video.safeTitle, video.channelTitle, video.channelId, video.created, video.pctLikes, video.viewCount, video.likes, video.dislikes, video.thumbnail.url, video.duration, video.durationMinutes], function(err, result){
          if(err){
            res.status('500').send(err);
          } else{
            res.status('200').send({status : 'inserted'});
          }
        });
    });
};

var getVideoById = function(req, res, next){

  var id = req.params.id;
  var db = pgp(cn); // database instance;

  // select and return user name from id:
  db.one("select * from video where id=$1", id)
      .then(function (video) {
          res.send(video);
      })
      .catch(function (error) {
          res.send({});
      });
};

router.get('/get/:id', getVideoById);
router.post('/add', insertVideo);

module.exports = router;
