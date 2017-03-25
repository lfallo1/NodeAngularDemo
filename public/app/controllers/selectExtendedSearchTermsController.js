angular.module('youtubeSearchApp')
    .controller('SelectExtendedSearchTermsCtrl', ["$scope", "$uibModalInstance", "content", function ($scope, $uibModalInstance, content) {

        $scope.init = function(){
            $scope.tagsArray = content.tagsArray;
            var limit = Math.min($scope.tagsArray.length, 6);
            for(var i = 0; i < limit; i++){
              $scope.tagsArray[i].selected = true;
            }
        };

        $scope.toggle = function(tagObject){
            if(!tagObject.selected){
              if($scope.tagsArray.filter(function(d){return d.selected;}).length < 6){
                tagObject.selected = true;
              }
            } else{
              tagObject.selected = false;
            }
        };

        $scope.save = function(){
            $uibModalInstance.close($scope.tagsArray.filter(function(t){return t.selected;}).map(function(t){return t.tag;}).toString().replace(/,/g,' ').trim());
        };

        $scope.init();

    }]);
