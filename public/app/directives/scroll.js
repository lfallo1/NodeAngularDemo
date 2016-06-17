angular.module('youtubeSearchApp').directive("scroll", function ($window) {
    return function(scope, element, attrs) {

        angular.element($window).bind("scroll", function() {
            scope.scrollGuess =  0.01155*(this.innerHeight*this.innerHeight) - (17 * (this.innerHeight));
            scope.showSmallFilter = this.pageYOffset >= scope.scrollGuess;
            scope.$apply();
        });
    };
});