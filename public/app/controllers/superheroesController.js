(function(){
    angular.module('nodeAngularDemoApp').controller('SuperheroesCtrl', [
        '$rootScope', '$scope', '$http', '$state', 'superheroService',
        function($rootScope, $scope, $http, $state, superheroService){

            $scope.superheroes = [];

            $scope.init = function(){
                $scope.pageTitle = 'Welcome to the Superhero info page';
                superheroService.getAll().then(function(res){
                    $scope.superheroes = res;
                }, function(err){
                    console.log(err.status);
                })
            };

            $scope.viewDetails = function(id){
                $state.go('superhero', { id: id });
            };

            $scope.linkHome = function(){
                $state.go('home');
            };

            $scope.init();
        }]);
})();