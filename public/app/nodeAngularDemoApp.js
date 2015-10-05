'use strict';

angular.module('nodeAngularDemoApp', ['apiServices', 'ui.router', 'ui.bootstrap',]).
    config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {

        var isLoggedIn = function($q, $http, $rootScope, $state){
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in

            $http.get('api/login/isLoggedIn').success(function(user){
                // Authenticated
                if (user)
                    deferred.resolve();
                // Not Authenticated
                else {
                    $rootScope.message = 'You need to log in.';
                    //$timeout(function(){deferred.reject();}, 0);
                    deferred.reject();
                    $state.go('login');
                }
            });

            return deferred.promise;
        };

        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('login', {
                url : '/login',
                templateUrl: 'partials/login',
                controller: 'LoginCtrl'
            }).
            state('home', {
                url : '/',
                templateUrl: 'partials/home',
                controller: 'HomeCtrl',
                myData : {
                    data1 : 'myData',
                    data2 : 'myData2'
                },
                resolve : {
                    isLoggedIn : isLoggedIn
                }

            }).
            state('superheroes', {
                url : '/superheroes',
                templateUrl: 'partials/superheroes',
                controller: 'SuperheroesCtrl',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            }).
            state('superhero', {
                url : '/superheroes/:id',
                templateUrl : 'partials/superhero',
                controller : 'SuperheroDetailController',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            }).
            state('createSuperhero',{
                url : '/superhero/create',
                templateUrl : '/partials/superhero/create',
                controller : 'SuperheroDetailController',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            });
        $locationProvider.html5Mode(true);
    }]).run(['$rootScope', '$location', '$log', function($rootScope, $location, $log){

        //TODO

    }]);