var express = require('express'),
    bodyParser = require('body-parser');

//test

var countriesAPI = require('./server/services/countriesAPI.js');
var youtubeAPI = require('./server/services/youtubeAPI.js');
var videoApi = require('./server/services/videoApi.js');
var translateAPI = require('./server/services/translateApi.js');
var autocompleteAPI = require('./server/services/autocompleteApi.js');

var app = express();

var port = process.env.PORT || 3000;
var clientId = process.env.CLIENT_ID || "232820042865-5jhlraag8ku4s0i5a7fh3q51nnvngaqh.apps.googleusercontent.com";
var authCallbackUrl = process.env.AUTH_CALLBACK_URL || "http://localhost:3000/oauthcallback";

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

app.get('/partials/directives/:name', function(req, res){
    var name = req.params.name;
    res.render('partial/directives/' + name);
});

//Endpoints
app.use('/api/autocomplete', autocompleteAPI);
app.use('/api/translation', translateAPI);
app.use('/api/countries', countriesAPI.getAll);
app.use('/api/youtube', youtubeAPI);
app.use('/api/config', function(req,res,next){
    res.json({'clientId' : clientId, 'authCallbackUrl' : authCallbackUrl});
});
// app.use('/api/video', videoApi);

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){
 res.render('index.html')
});

// Start server

app.listen(port, function(){
 console.log("Express server listening");
});
