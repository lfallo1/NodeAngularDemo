'use strict';

angular.module('youtubeSearchApp', ['ui.router', 'youtube-embed', 'ngCookies', 'ngRoute', 'ngAnimate', 'toaster', 'ui.bootstrap', 'toggle-switch']).
    config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$routeProvider', '$httpProvider', '$compileProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $routeProvider, $httpProvider, $compileProvider) {

        //enable json file downloading through href tag
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob|mailto|chrome-extension):/);

        //$httpProvider.interceptors.push('httpRequestInterceptor');
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        delete $httpProvider.defaults.headers.common['X-Frame-Options'];

        //configure routing
        $routeProvider.
            when('/oauthcallback', {
               templateUrl : 'partials/authHandler',
                controller : 'AuthHandlerCtrl'
            }).
            when('/:id?', {
                templateUrl : 'partials/home',
                controller: 'HomeCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }]).run(['$rootScope', '$log', '$http', '$location','$route', 'AuthService', function($rootScope, $log, $http, $location, $route, AuthService){

        $http.get('api/config').then(function(res){
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

        var original = $location.path;
        $location.path = function (path, preventReload) {
            if (preventReload) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };

    }]);
