var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res, next){
    var name = req.params.name;
    res.render('partials/modals/' + name);
});

module.exports = router;