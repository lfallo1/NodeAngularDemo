(function(){
    angular.module('nodeAngularDemoApp').controller('SuperheroDetailController', [
        '$rootScope', '$scope', '$http', '$state', '$stateParams', 'superheroService',
        function($rootScope, $scope, $http, $state, $stateParams, superheroService){

            //server paramaters
            $scope.myParam1;
            $scope.myParam2;

            $scope.superhero = {};

            $scope.init = function(){
                superheroService.getById($stateParams.id).then(function(res){
                    $scope.superhero = res;
                }, function(err){
                    console.log(err.status);
                })
            };

            //used to initialize values passed from the server
            $scope.initServerValues = function(param1, param2){
                $scope.myParam1 = param1 === undefined ? 'param1 placeholder' : param1;
                $scope.myParam2 = param2 === undefined ? 'param2 placeholder' : param2;
            }

            $scope.linkHome = function(){
                $state.go('home');
            };

            $scope.init();
        }]);
})();
