var express = require('express');
var router = express.Router();
var Superhero = require('../../models/superhero');

router.get('/', function (req, res, next) {
    Superhero.getAllSuperheroes(function(err, superheroes) {
        if (err) res.json(err);
        res.json(superheroes);
    })
});

router.get('/:alias', function(req, res, next) {
    Superhero.getSuperheroByAlias(req.params.alias, function (err, superhero) {
        if (err) {
            res.send(err);
        }
        res.json(superhero);
    })
});

module.exports = router;
