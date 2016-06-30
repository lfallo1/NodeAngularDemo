(function(){
    angular.module('youtubeSearchApp').directive('quickFilter', function(){
       return {
           templateUrl: 'partials/directives/quickFilter.html',
           restrict: 'E'
       };
    });
})();