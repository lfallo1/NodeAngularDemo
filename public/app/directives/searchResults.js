(function(){
    angular.module('youtubeSearchApp').directive('searchResults', function(){
       return {
           templateUrl: 'partials/directives/searchResults.html',
           restrict: 'E'
       };
    });
})();