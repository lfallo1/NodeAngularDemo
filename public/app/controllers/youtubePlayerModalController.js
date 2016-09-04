angular.module('youtubeSearchApp').controller('YoutubePlayerModalCtrl', [ '$rootScope', '$scope', '$timeout', 'content', '$uibModalInstance', 'PlaylistService', '$location', function($rootScope, $scope, $timeout, content, $uibModalInstance, PlaylistService, $location){

    var pagination = {};
    var filteredResults = [];
    $scope.autoplay = true;

    $scope.$on('youtube.player.ended', handleYoutubeEnd);
    $scope.$on('youtube.player.error', handleYoutubeEnd);

    function handleYoutubeEnd($event, player) {
      if($scope.autoplay){
        //handle youtube player errors and end of video events - end of digest loop
        $timeout(function(){
          if($scope.nextVideo >= 0){
            $scope.currentVideo.playing = false;
            $scope.start(filteredResults[$scope.nextVideo], $scope.nextVideo);
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

    $scope.start = function(video, index){
      $scope.currentVideo = video;
      $scope.currIndex = index || 0;

      $rootScope.currentPageTitle = video.title;
      // $location.path('/' + video.videoId, true).search({q:null, m:null});

      if(!isNaN(index)){
        //set the next video to be played, if $scope.autoplay is on
        $scope.nextVideo = (index < (filteredResults.length - 1)) ? (index+1) : $scope.repeat ? 0 : undefined;
        $scope.previousVideo = index > 0 ? (index-1) : undefined;

        $scope.nextDetails = $scope.nextVideo >= 0 ? filteredResults[$scope.nextVideo] : {};
        $scope.prevDetails = $scope.previousVideo >= 0 ? filteredResults[$scope.previousVideo] : {};
      }
    };

    $scope.updateNextPrevious = function(){
      var index = $scope.currIndex;
      $scope.nextVideo = (index < (filteredResults.length - 1)) ? (index+1) : $scope.repeat ? 0 : undefined;
      $scope.previousVideo = index > 0 ? (index-1) : undefined;

      $scope.nextDetails = $scope.nextVideo >= 0 ? filteredResults[$scope.nextVideo] : {};
      $scope.prevDetails = $scope.previousVideo >= 0 ? filteredResults[$scope.previousVideo] : {};
    };

    $scope.getIFrameSrc = function (videoId) {
        return 'https://www.youtube.com/embed/' + videoId;
    };

    $scope.close = function(){
      $uibModalInstance.dismiss($scope.currIndex);
    };

    $scope.getImageByIndex = function(idx){
      if(!isNaN(idx)){
          return filteredResults[idx].thumbnail.url;
      }
    };

    $scope.getVideoPosition = function(){
      return ($scope.currIndex + 1) + ' of ' + filteredResults.length;
    }

    $scope.playlistService = PlaylistService;

    var init = function(){

      $scope.popoverTemplate = {
          prevVideo : 'partials/previousVideoDetailsPopover.html',
          nextVideo : 'partials/nextVideoDetailsPopover.html'
      };

      pagination = content.pagination;
      filteredResults = content.filteredResults.length > 0 ? content.filteredResults : new Array(content.video);
      $scope.autoplay = content.autoplay;
      $scope.start(content.video, content.index);
    };

    init();


}]);
