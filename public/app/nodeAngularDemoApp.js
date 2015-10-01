'use strict';

angular.module('nodeAngularDemoApp', ['apiServices', 'ui.router']).
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
                },
                resolve : {
                    myUsers : function(superheroService){
                        return superheroService.getAll();
                    }
                }
            }).
            state('superheroes', {
                url : '/superheroes',
                templateUrl: 'partials/superheroes',
                controller: 'SuperheroesCtrl'
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