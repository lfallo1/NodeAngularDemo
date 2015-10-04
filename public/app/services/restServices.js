(function() {

    var restServices = angular.module('apiServices', ['ngResource']);

    restServices.factory('superheroService', ['$http', '$q', '$log', '$timeout', function($http, $q, $log, $timeout) {
        return {
            getAll : getAll,
            getByAlias : getByAlias
        };

        function getAll() {
            var deferred = $q.defer();

            $http.get('api/superheroes').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                $log.error(response.statusText);
                return $q.reject('Error retrieving superheroes');
            });

            return deferred.promise;
        };

        function getByAlias(alias){
            var deferred = $q.defer();

            $http.get('api/superheroes/' + alias).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                $log.error(response.statusText);
                return $q.reject('Error retrieving superheroes');
            });

            return deferred.promise;
        };
    }]);

    restServices.factory('loginService', ['$http', '$q', '$log', '$timeout', '$state', function($http, $q, $log, $timeout, $state) {
        return {
            login : login,
            logout : logout,
            isLoggedIn : isLoggedIn,
            register : register
        };

        function login(username, password) {
            return $http.post('api/login', {
                username: username,
                password: password
            });
        };

        function logout(){
            //TODO
        };

        function isLoggedIn(){
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

        function register(){
            //TODO
        };
    }]);

})();