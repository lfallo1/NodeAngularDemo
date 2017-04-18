(function(){

    angular.module('youtubeSearchApp').service('CountriesService', ['$http', '$q', '$log', function($http, $q, $log){
        var service = {};

        var countries = [];

        service.getCountries = function(){
            var deferred = $q.defer();
            if(countries.length > 0){
                deferred.resolve(countries);
                return;
            }
          $http.post('api/youtube/get', {url: 'https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet'}).then(function(res){
              countries = res.data.items;
              deferred.resolve(countries);
          }, function(err){
              $log.error(err);
              deferred.reject();
          });
            return deferred.promise;
        };

        service.getCountryByCode = function(alpha){
          return countries.filter(function(d) {
              if (d.id === alpha) {
                  return d;
              }
          })[0];
        };

        return service;
    }]);

})();
