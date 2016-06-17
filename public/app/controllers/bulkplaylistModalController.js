angular.module('youtubeSearchApp')
    .controller('BulkPlaylistModalCtrl', ["$scope", "$uibModalInstance", "$http", "content", "PlaylistService", function ($scope, $uibModalInstance, $http, content, PlaylistService) {

        $scope.init = function(){
            $scope.selectedVideos = content.list;
        };
        $scope.clear = function(){
            $scope.selectedVideos = [];
        };

        $scope.remove = function(idx){
            $scope.selectedVideos.splice(idx, 1);
        };

        $scope.save = function(){
            if($scope.selectedVideos.length === 0){
                return;
            }
            $scope.savingToPlaylist = true;
            PlaylistService.addMultipleToPlaylist($scope.selectedVideos).then(function(){
                $scope.savingToPlaylist = false;
                $scope.selectedVideos = [];
            }, function(err){
                $scope.savingToPlaylist = false;
            });
        };

        $scope.cancel = function(){
            $uibModalInstance.close($scope.selectedVideos);
        };

        $scope.init();

    }]);