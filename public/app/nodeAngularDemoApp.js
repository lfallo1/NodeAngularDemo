'use strict';

angular.module('nodeAngularDemoApp', ['apiServices', 'ui.router', 'ui.bootstrap',]).
    config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('home', {
                url : '/',
                templateUrl: 'partials/home',
                controller: 'HomeCtrl',
                myData : {
                    data1 : 'myData',
                    data2 : 'myData2'
                }
            }).
            state('superheroes', {
                url : '/superheroes',
                templateUrl: 'partials/superheroes',
                controller: 'SuperheroesCtrl',
                resolve : {
                    superheroList : function(superheroService){
                        return superheroService.getAll();
                    }
                }
            }).
            state('superhero', {
                url : '/superheroes/:id',
                templateUrl : '/static/app/htmlTemplates/superhero.html',
                controller : 'SuperheroDetailController'
            });
        $locationProvider.html5Mode(true);
    }]).run(['$rootScope', '$location', '$log', function($rootScope, $location, $log){

        //TODO

    }]);