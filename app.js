var express = require('express');
var path = require('path');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var multer = require('multer');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

//routes
var login = require('./server/routes/login.js');
var index = require('./server/routes/index.js');
var home = require('./server/routes/home.js');
var superhero = require('./server/routes/superhero.js');
var superheroes = require('./server/routes/superheroes.js');
var modals = require('./server/routes/modals.js');
var superheroAPI = require('./server/routes/api/superheroAPI.js');
var loginAPI = require('./server/routes/api/loginAPI.js');

var app = express();

//Connect to db
mongoose.connect('mongodb://localhost/superherodb');

var conn = mongoose.connection;
conn.once('open', function(){
   console.log('connected to mongo succesfully');
});

// Configuration

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.set('view options', {
 layout: false
});

// --- Routes / Middleware ---
//Handle Express Sessions
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave:true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

//body-parser middleware (among other things, adds property for directly accessing params on req obj)
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//static file routing
app.use('/shimage', express.static(__dirname + '/public/imgs/')); //img
app.use('/bower', express.static(__dirname + '/public/vendor/')); //bower (client-side) components
app.use('/static', express.static(__dirname + '/public/')); //misc static resources
app.use('/htmlTemplates', express.static(__dirname + '/public/app/htmlTemplates')); //html templates

//custom middleware
//app.use(function(req, res, next){
//    console.log('---START NEW REQUEST---');
//    for (i in req.headers) {
//        console.log(i + ': ' + req.headers[i]);
//    }
//    console.log('');
//    next();
//});

//Views
app.use('/', index);
app.use('/partials/modals', modals);
app.use('/partials/login', login);
app.use('/partials/home', home);
app.use('/partials/superhero', superhero);
app.use('/partials/superheroes', superheroes);

//API
app.use('/api/superheroes', superheroAPI);
app.use('/api/login', loginAPI);

// redirect all other requests to the index
app.get('*', function(req, res){
 res.render('index')
});

// Start server
app.listen(3000, function(){
 console.log("Express server listening");
});
