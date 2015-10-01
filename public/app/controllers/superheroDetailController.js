(function(){
    angular.module('nodeAngularDemoApp').controller('SuperheroDetailController', [
        '$rootScope', '$scope', '$http', '$state', '$stateParams',
        function($rootScope, $scope, $http, $state, $stateParams){

            $scope.superhero = {};

            $scope.init = function(){
                $http.get('/api/superheroes/' + $stateParams.id).then(function(res){
                    $scope.superhero = res.data;
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
