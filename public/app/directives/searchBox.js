(function(){
    angular.module('youtubeSearchApp').directive('searchBox', function(){
       return {
           templateUrl: 'partials/directives/searchBox.html',
           restrict: 'E'
       };
    });
})();