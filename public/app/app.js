'use strict';

angular.module('youtubeSearchApp', ['ui.router', 'youtube-embed', 'ngCookies', 'ngRoute', 'ngAnimate', 'toaster', 'ui.bootstrap', 'chart.js']).
    config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$routeProvider', '$httpProvider', 'ChartJsProvider', '$compileProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $routeProvider, $httpProvider, ChartJsProvider, $compileProvider) {

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob|mailto|chrome-extension):/);

        //$httpProvider.interceptors.push('httpRequestInterceptor');
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        delete $httpProvider.defaults.headers.common['X-Frame-Options'];

        ChartJsProvider.setOptions({
            colours: ['#0D47A1', '#00ADF9'],
            text : 'Video Summary',
            responsive: false
        });

        $routeProvider.
            when('/', {
                templateUrl : 'partials/home',
                controller: 'HomeCtrl'
            }).
            when('/oauthcallback', {
               templateUrl : 'partials/authHandler',
                controller : 'AuthHandlerCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }]).run(['$rootScope', '$log', '$http', 'AuthService', function($rootScope, $log, $http, AuthService){

        $http.get('api/config').then(function(res){
            $log.info('config loaded');
            $rootScope.clientId = res.data.clientId;
            $rootScope.authCallbackUrl = res.data.authCallbackUrl;
        }, function(err){
            $log.error(err);
        });
        //set AuthService on rootScope for convenience (still placing AuthService in its service for modularity)
        $rootScope.AuthService = AuthService;

        $rootScope.aboutYoutubeAgent = {
          templateUrl : 'partials/aboutYoutubeAgent'
        };

        //set the onSignIn event on the window object
        window.onSignIn = AuthService.onSignIn;

    }]);
