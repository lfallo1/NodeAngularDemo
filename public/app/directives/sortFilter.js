(function(){
    angular.module('youtubeSearchApp').directive('sortFilter', function(){
       return {
           templateUrl: 'partials/directives/sortFilter.html',
           restrict: 'E'
       };
    });
})();