angular.module('nodeAngularDemoApp').controller('SuperheroDetailsModalCtrl', ['$scope', '$modalInstance', '$state', 'superhero', function ($scope, $modalInstance, $state, superhero) {

    $scope.superhero = superhero;

    $scope.showSuperheroDetailsPage = function(alias){
        $modalInstance.close('ok');
        $state.go('superhero', {alias : alias});
    }

    $scope.ok = function () {
        $modalInstance.close('ok');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);