var express = require('express'),
    bodyParser = require('body-parser'),
    superheroAPI = require('./server/routes/superheroAPI.js');

var app = express();

// Configuration

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.set('view options', {
 layout: false
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/shimage', express.static(__dirname + '/public/images/sh/'));
app.use('/bower', express.static(__dirname + '/public/vendor/'));
app.use('/static', express.static(__dirname + '/public/'));
app.use('/htmlTemplates', express.static(__dirname + '/public/app/htmlTemplates'));

app.use(function(req, res, next){
    console.log('intercepting request...');
    next();
});

// Routes

app.get('/', function(req, res){
 res.render('index');
});

app.get('/partials/modals/:name', function(req, res){
    var name = req.params.name;
    res.render('partials/modals/' + name);
});

app.get('/partials/:name', function(req, res){
 var name = req.params.name;
 res.render('partials/' + name);
});

//API
app.get('/api/superheroes', superheroAPI.getAll);
app.get('/api/superheroes/:id', superheroAPI.getById);

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){
 res.render('index')
});

// Start server

app.listen(3000, function(){
 console.log("Express server listening");
});
