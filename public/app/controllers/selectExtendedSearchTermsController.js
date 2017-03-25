angular.module('youtubeSearchApp')
    .controller('SelectExtendedSearchTermsCtrl', ["$scope", "$uibModalInstance", "content", function ($scope, $uibModalInstance, content) {

      var MAX_ITEMS = 8;

        $scope.init = function(){
            $scope.tagsArray = content.tagsArray;
            var limit = Math.min($scope.tagsArray.length, MAX_ITEMS);
            for(var i = 0; i < limit; i++){
              $scope.tagsArray[i].selected = true;
            }
        };

        $scope.toggle = function(tagObject){
            if(!tagObject.selected){
              if($scope.tagsArray.filter(function(d){return d.selected;}).length < MAX_ITEMS){
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
