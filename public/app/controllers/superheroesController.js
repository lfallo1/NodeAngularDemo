(function(){
    angular.module('nodeAngularDemoApp').controller('SuperheroesCtrl', [
        '$rootScope', '$scope', '$http', '$state', '$modal', '$log', 'superheroService',
        function($rootScope, $scope, $http, $state, $modal, $log, superheroService){

            $scope.superheroes = [];

            $scope.init = function(){
                $scope.pageTitle = 'Welcome to the Info page';
                superheroService.getAll().then(function(data){
                    $scope.superheroes = data;
                }, function(err){
                    $log.error(err);
                })
            };

            $scope.activeCount = function(){
                return $scope.superheroes.filter(function(s){return s.isActive;}).length;
            };

            $scope.openSuperheroDetailsModal = function(alias){
                var modalInstance = $modal.open({
                    templateUrl: 'partials/modals/superheroDetailsModal',
                    controller: 'SuperheroDetailsModalCtrl',
                    resolve: {
                        superhero: function () {
                            return superheroService.getByAlias(alias);
                        }
                    }
                });

                modalInstance.result.then(function (data) {
                    $log.debug('Superhero details modal closed (OK)');
                    //Handle 'success' / ok clicked (maybe handle edited information?)
                }, function (data) {
                    $log.debug('Superhero details modal closed (CANCEL)');
                    //Handle 'failure' / cancel clicked
                });
            }

            $scope.viewDetailsLink = function(alias){
                $state.go('superhero', { alias: alias });
            };

            $scope.linkHome = function(){
                $state.go('home');
            };

            $scope.init();
        }]);
})();