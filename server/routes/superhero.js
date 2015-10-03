var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('partials/superhero');
});

router.get('/create', function(req, res, next){
   res.render('partials/superheroCreate');
});

module.exports = router;