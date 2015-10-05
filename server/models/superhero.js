var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var db = mongoose.connection;

// User Schema
var SuperheroSchema = mongoose.Schema({
    isActive: {
        type: Boolean
    },
    picture:{
        type: String
    },
    age: {
        type:Number
    },
    eyeColor:{
        type: String
    },
    name:{
        type: String
    },
    gender:{
        type: String
    },
    company:{
        type: String
    },
    about:{
        type: String
    },
    alias:{
        type: String
    }
});

var Superhero = module.exports = mongoose.model('Superhero', SuperheroSchema);

module.exports.getAllSuperheroes = function(callback){
    Superhero.find(callback);
};

module.exports.getSuperheroById = function(id, callback){
    Superhero.findById(id, callback);
}

module.exports.getSuperheroByAlias = function(alias, callback){
    var query = {alias : alias};
    Superhero.findOne(query, callback);
};

module.exports.createSuperhero = function(newSuperhero, callback) {
    newSuperhero.save(callback);
};