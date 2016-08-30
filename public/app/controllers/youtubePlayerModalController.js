angular.module('youtubeSearchApp').controller('YoutubePlayerModalCtrl', [ '$scope', '$timeout', 'content', '$uibModalInstance', function($scope, $timeout, content, $uibModalInstance){

    var pagination = {};
    var filteredResults = [];
    var autoplay = true;

    $scope.$on('youtube.player.ended', handleYoutubeEnd);
    $scope.$on('youtube.player.error', handleYoutubeEnd);

    function handleYoutubeEnd($event, player) {
      if(autoplay){
        //handle youtube player errors and end of video events - end of digest loop
        $timeout(function(){
          if($scope.nextVideo){
            $scope.currentVideo.playing = false;
            if(($scope.nextVideo % pagination.resultsPerPage) === 0){
              $scope.gotoPage(pagination.currentPage+1);
            }
            $scope.start(filteredResults[$scope.nextVideo], $scope.nextVideo, true);
          }
        },50);
      }
    };

    $scope.youtubePlayerOptions = {
      autoplay : 1
    };

    $scope.goto = function(idx){
      $scope.start(filteredResults[idx], idx);
    };

    $scope.start = function(video, index, isTotalIndex){
      $scope.currentVideo = video;

      if(!isNaN(index)){
        //set the next video to be played, if autoplay is on
        var totalIndex = isTotalIndex ? index : index + (pagination.currentPage-1)*pagination.resultsPerPage;
        $scope.nextVideo = (totalIndex < (filteredResults.length - 1)) ? (totalIndex+1) : undefined;
        $scope.previousVideo = totalIndex > 0 ? (totalIndex-1) : undefined;
      }

    };

    $scope.getIFrameSrc = function (videoId) {
        return 'https://www.youtube.com/embed/' + videoId;
    };

    $scope.close = function(){
      $uibModalInstance.dismiss();
    };

    var init = function(){
      pagination = content.pagination;
      filteredResults = content.filteredResults;
      autoplay = content.autoplay;

      $scope.start(content.video, content.index)
    };

    init();


}]);
