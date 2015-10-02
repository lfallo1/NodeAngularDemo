(function(){
    angular.module('nodeAngularDemoApp').controller('SuperheroesCtrl', [
        '$rootScope', '$scope', '$http', '$state', '$modal', '$log', 'superheroService', 'superheroList',
        function($rootScope, $scope, $http, $state, $modal, $log, superheroService, superheroList){

            $scope.superheroes = superheroList;

            $scope.init = function(){
                $scope.pageTitle = 'Welcome to the Superhero info page';
            };

            $scope.activeCount = function(){
                return $scope.superheroes.filter(function(s){return s.isActive;}).length;
            };

            $scope.openSuperheroDetailsModal = function(id){
                var modalInstance = $modal.open({
                    templateUrl: 'partials/modals/superheroDetailsModal',
                    controller: 'SuperheroDetailsModalCtrl',
                    resolve: {
                        superhero: function () {
                            return superheroService.getById(id);
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

            $scope.viewDetailsLink = function(id){
                $state.go('superhero', { id: id });
            };

            $scope.linkHome = function(){
                $state.go('home');
            };

            $scope.init();
        }]);
})();