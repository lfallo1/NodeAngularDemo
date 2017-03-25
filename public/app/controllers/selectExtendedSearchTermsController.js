angular.module('youtubeSearchApp')
    .controller('SelectExtendedSearchTermsCtrl', ["$scope", "$uibModalInstance", "content", function ($scope, $uibModalInstance, content) {

        $scope.init = function(){
            $scope.tagsArray = content.tagsArray;
            $scope.tagsArray[0].selected = true;
        };

        $scope.toggle = function(tagObject){
            tagObject.selected = !tagObject.selected;
        };

        $scope.save = function(){
            $uibModalInstance.close($scope.tagsArray.filter(function(t){return t.selected;}).map(function(t){return t.tag;}).toString().replace(/,/g,' ').trim());
        };

        $scope.init();

    }]);
