var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/MyGene2";

router.get('/:id', function(req, res, next){
  var id = req.params.id;
  var client = new pg.Client(conString);
  client.connect();

  var query = client.query("SELECT * FROM video WHERE id = $1 LIMIT 1", id);
  //fired after last row is emitted

  query.on('row', function(row) {
      console.log(row.username);
  });

  query.on('end', function() {
      client.end();
  });
});

router.post('/', function(req, res, next){
  var video = req.body.video;
  console.log(video);
  client.query({
      name: 'insert video',
      text: "INSERT INTO video(id, created, title, safeTitle, channelId, channelTitle, date, duration, pctLikes, dislikes, likes, url, thumbnail, duration, durationMinutes, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
      values: [video.videoId, video.created, video.title, video.safeTitle, video.channelId, video.channelTitle, video.date, video.duration, video.pctLikes, video.dislikes, video.likes, video.url, video.thumbnail.url, video.duration, video.durationMinutes]
  });
});

module.exports = router;
