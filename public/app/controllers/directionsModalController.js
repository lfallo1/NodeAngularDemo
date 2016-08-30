angular.module('youtubeSearchApp')
    .controller('DirectionsModalCtrl', ["$scope", "$uibModalInstance", "$sce", "content", "DirectionsService", function ($scope, $uibModalInstance, $sce, content, DirectionsService) {

        $scope.init = function(){
            $scope.title = $sce.trustAsHtml(content.direction.title);
            $scope.body = $sce.trustAsHtml(content.direction.body);
            $scope.hasNext = DirectionsService.hasNext();
            $scope.hasPrev = DirectionsService.hasPrev();
        };

        $scope.getNext = function(){
          $uibModalInstance.close(DirectionsService.getNext());
        };

        $scope.goBack = function(){
          $uibModalInstance.close(DirectionsService.goBack());
        };

        $scope.cancel = function(){
            $uibModalInstance.close();
        };

        $scope.init();

    }]);
