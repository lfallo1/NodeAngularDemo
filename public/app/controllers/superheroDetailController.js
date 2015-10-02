(function(){
    angular.module('nodeAngularDemoApp').controller('SuperheroDetailController', [
        '$rootScope', '$scope', '$http', '$state', '$stateParams', 'superheroService',
        function($rootScope, $scope, $http, $state, $stateParams, superheroService){

            $scope.superhero = {};

            $scope.init = function(){
                superheroService.getById($stateParams.id).then(function(res){
                    $scope.superhero = res;
                }, function(err){
                    console.log(err.status);
                })
            };

            $scope.linkHome = function(){
                $state.go('home');
            };

            $scope.init();
        }]);
})();
