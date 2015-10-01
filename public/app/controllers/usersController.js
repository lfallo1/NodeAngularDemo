(function(){
    angular.module('nodeAngularDemoApp').controller('UsersCtrl', [
        '$rootScope', '$scope', '$http', '$state', 'superheroService',
        function($rootScope, $scope, $http, $state, superheroService){

            $scope.users = [];

            $scope.init = function(){
                $scope.pageTitle = 'Welcome to the Users info page';
                superheroService.getAll().then(function(res){
                    $scope.users = res;
                }, function(err){
                    console.log(err.status);
                })
            };

            $scope.viewDetails = function(id){
                //$location.path('/user/' + name);
                $state.go('user', { id: id });
            };

            $scope.linkHome = function(){
                $state.go('home');
            };

            $scope.init();
        }]);
})();