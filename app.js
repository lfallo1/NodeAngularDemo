var express = require('express'),
    bodyParser = require('body-parser'),
    index = require('./server/routes/index.js'),
    home = require('./server/routes/home.js'),
    superhero = require('./server/routes/superhero.js'),
    superheroes = require('./server/routes/superheroes.js'),
    modals = require('./server/routes/modals.js'),
    superheroAPI = require('./server/routes/api/superheroAPI.js');

var app = express();

// Configuration

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.set('view options', {
 layout: false
});

// --- Routes / Middleware ---

//body-parser middleware (among other things, adds property for directly accessing params on req obj)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//static file routing
app.use('/shimage', express.static(__dirname + '/public/images/')); //images
app.use('/bower', express.static(__dirname + '/public/vendor/')); //bower (client-side) components
app.use('/static', express.static(__dirname + '/public/')); //misc static resources
app.use('/htmlTemplates', express.static(__dirname + '/public/app/htmlTemplates')); //html templates

//custom middleware just because I can
app.use(function(req, res, next){
    console.log('---START NEW REQUEST---');
    for (i in req.headers) {
        console.log(i + ': ' + req.headers[i]);
    }
    console.log('');
    next();
});

//Views
app.use('/', index);
app.use('/partials/modals', modals);
app.use('/partials/home', home);
app.use('/partials/superhero', superhero);
app.use('/partials/superheroes', superheroes);

//API
app.use('/api/superheroes', superheroAPI);

// redirect all other requests to the index
app.get('*', function(req, res){
 res.render('index')
});

// Start server
app.listen(3000, function(){
 console.log("Express server listening");
});
