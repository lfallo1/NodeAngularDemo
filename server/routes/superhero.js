var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('partials/superhero', {
        myParam1 : 'My param1',
        myParam2 : 'My param2'
    });
});

router.get('/create', function(req, res, next){
   res.render('partials/superheroCreate');
});

module.exports = router;