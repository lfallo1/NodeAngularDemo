angular.module('youtubeSearchApp')
    .controller('WatchlistModalCtrl', ["$scope", "$uibModalInstance", "$http", "content", "PlaylistService", function ($scope, $uibModalInstance, $http, content, PlaylistService) {

        $scope.init = function(){
            $scope.watchlist = content.list
        };
        $scope.clear = function(){
            $scope.watchlist = [];
        };

        $scope.remove = function(idx){
            $scope.watchlist.splice(idx, 1);
        };

        $scope.cancel = function(){
            $uibModalInstance.close($scope.watchlist);
        };

        $scope.init();

    }]);