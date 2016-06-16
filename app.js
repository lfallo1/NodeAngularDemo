var express = require('express'),
    bodyParser = require('body-parser');

var countriesAPI = require('./server/services/countriesAPI.js');
var youtubeAPI = require('./server/services/youtubeAPI.js');

var app = express();

var port = process.env.PORT || 3000;

// Configuration
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/server/views');
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/bower', express.static(__dirname + '/public/vendor/'));
app.use('/static', express.static(__dirname + '/public/'));
app.use('/css', express.static(__dirname + '/public/app/css/'));
app.use('/images', express.static(__dirname + '/public/app/images/'));

// Routes

app.get('/', function(req, res){
 res.render('index.html');
});

app.get('/partials/:name', function(req, res){
    var name = req.params.name;
    res.render('partial/' + name);
});

//Endpoints
app.use('/api/countries', countriesAPI.getAll);
app.use('/api/youtube/get', youtubeAPI.get);
app.use('/api/youtube/mp3/:id', youtubeAPI.toMp3);

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){
 res.render('index.html')
});

// Start server

app.listen(port, function(){
 console.log("Express server listening");
});
