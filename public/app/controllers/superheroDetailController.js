(function(){
    angular.module('nodeAngularDemoApp').controller('SuperheroDetailController', [
        '$rootScope', '$scope', '$http', '$state', '$stateParams', 'superheroService',
        function($rootScope, $scope, $http, $state, $stateParams, superheroService){

            $scope.myParam;

            $scope.superhero = {};

            $scope.init = function(){
                superheroService.getById($stateParams.id).then(function(res){
                    $scope.superhero = res;
                }, function(err){
                    console.log(err.status);
                })
            };

            //used to initialize values passed from the server
            $scope.initServerValues = function(param){
                $scope.myParam = param === undefined ? 'myParam' : param;
            }

            $scope.linkHome = function(){
                $state.go('home');
            };

            $scope.init();
        }]);
})();
