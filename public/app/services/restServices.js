(function() {

    var restServices = angular.module('apiServices', ['ngResource']);

    restServices.factory('superheroService', ['$http', '$q', '$log', '$timeout', function($http, $q, $log, $timeout) {
        return {
            getAll : getAll
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
        }
    }]);

})();