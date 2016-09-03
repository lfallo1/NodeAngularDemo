 /**
 * PlaylistService- Handle functionality related to creating / updating playlists
 */
(function(){
    angular.module('youtubeSearchApp').service('PlaylistService', ['$rootScope', '$http', '$q', '$log', '$uibModal', '$timeout', 'toaster', 'AuthService', function($rootScope, $http, $q, $log, $uibModal, $timeout, toaster, AuthService){

        var service = {};

        //generate a playlist item resource for body of request. Format is as specified by youtube api
        var generatePlaylistItemResource = function(video, playlist){
            return {
                'snippet' : {
                    'playlistId' : playlist.id,
                    'resourceId' : {
                        'videoId' : video.videoId,
                        'kind' : 'youtube#video'
                    }
                }
            };
        };

        //generate a playlist resource for body of request. Format is as specified by youtube api
        var generatePlaylistResource = function(playlistName){
          return {
              'snippet' : {
                  'title' : playlistName
              }
          }
        };

        /**
         * load the users playlists. currently only grabbing first 50.
         * In future, could use next page token to get all playlists, but 50 seems like enough for now.
         * @returns {*}
         */
        service.loadPlaylists = function(){
            var deferred = $q.defer();
            AuthService.loadEditableUserPlaylists().then(function(res){
              AuthService.setPendingGoogleActivation(false);
              $log.info(res);
              deferred.resolve(res.data.items);
            }, function(err){
              if(err.status === 401 || err.status === 403){
                toaster.pop({ type : 'info', title : '', body : 'Please click the "Connect YoutubeAgent With Google Account" button at the top to edit your playlist.  If you have already done this, please click signin again to refresh your account.', timeout : 10000});
                AuthService.setPendingGoogleActivation(true);
              }
              else if(err.status === 404){
                toaster.pop('info', '', 'Looks like you haven\'t setup a YouTube channel yet.  Once you get one setup, give this another try');
              }
              deferred.reject();
            });
            return deferred.promise;
        };

        /**
         * Add a new playlist to their channel
         * @param playlistName
         * @returns {*}
         */
        service.addPlaylist = function(playlistName){
            var deferred = $q.defer();
            AuthService.getAccessToken().then(function(token){
              var url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&access_token=' + token;
              var playlistResource = generatePlaylistResource(playlistName);
              $http.post(url, playlistResource).then(function(res){
                  deferred.resolve(res.data);
              }, function(err){
                  $log.error(err);
                  deferred.reject(err);
              });

            }, function(err){
              deferred.reject();
            });
            return deferred.promise;
        };

        /**
         * Add a video to a playlist
         * @param video
         */
        service.addToPlaylist = function(video){

            if(!AuthService.isLoggedIn()){
                return;
            }

            choosePlaylist().then(function(selectedPlaylist){
                saveVideoToPlaylist(video, selectedPlaylist).then(function(){
                    toaster.pop('success', '', 'Awww yea, added to your playlist!');
                }, function(err){
                    toaster.pop('error', '', 'Bummer, something terrible happened and we could not add the video');
                });
            }, function(err){
                $log.error('No playlist selected: ' + err);
            });
        };

        service.addMultipleToPlaylist = function(videos){
            var deferred = $q.defer();
            if(!AuthService.isLoggedIn()){
                deferred.reject();
                return;
            }

            choosePlaylist().then(function(selectedPlaylist){

                //call a wrapper that submits items via youtube api to a playlist.
                //not saving in a promise array, because youtube craps out if you try to submit multiple playlist items without a delay
                addMultipleToPlaylistWrapper(videos, selectedPlaylist).then(function(){
                    toaster.pop('success', '', 'All selected videos have been added to your playlist!');
                    deferred.resolve();
                }, function(err){
                    $log.error(err);
                    toaster.pop('error', '', 'Bummer, something terrible happened and we could not save to your playlist');
                    deferred.reject(err);
                });
            }, function(err){
                deferred.reject();
                $log.error('No playlist selected: ' + err);
            });
            return deferred.promise;
        };

        service.getVideosInPlaylist = function(id, callback, pageToken, deferred){
          var deferred = deferred || $q.defer();
          AuthService.getAccessToken().then(function(token){
            var accessToken = token ? '&access_token=' + token : '';
            var pageToken = pageToken ? '&pageToken=' + pageToken : '';
            var playlistId = '&playlistId=' + id;
            var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50' + playlistId + pageToken + accessToken;

            //make request
            $http.get(url).then(function(res){
              AuthService.setPendingGoogleActivation(false);
              //execute callback / forces ui updates
              callback(new Array(res)).then(function(){

                //if a next page exists
                if(res.data.nextPageToken){
                  service.getVideosInPlaylist(id, callback, res.data.nextPageToken, deferred);
                  return;
                }

                //otherwise resolve
                deferred.resolve();
              }, function(err){

                //if error occurs here, just resolve (i'll write an explanation later)
                deferred.resolve();
              });
            }, function(err){

              if(err.status === 401 || err.status === 403){
                AuthService.setPendingGoogleActivation(true);
              }

              //if error here, it's because the playlist is not available (auth) or does not exist
              deferred.reject(err);
            });
          });
          return deferred.promise;
        };

        var addMultipleToPlaylistWrapper = function(videos, playlist, deferred){
            var deferred = deferred || $q.defer();

            //if no videos, then resolve
              if(videos && videos.length === 0){
                  deferred.resolve();
                  return;
              }

            //save next video to playlist
            saveVideoToPlaylist(videos[0], playlist).then(function(){

                //after item is saved, wait for 1ms (basically add to end of digest loop), then remove first item in list and call wrapper again with trimmed list.
                //must be done this way for youtube to allow submissions of multiple playlist items. cannot use a simple promise array / $q.all approach
                $timeout(function(){
                    videos.splice(0,1);
                    addMultipleToPlaylistWrapper(videos, playlist, deferred);
                }, 1);
            });

            return deferred.promise;
        };

        var choosePlaylist = function(){

            var deferred = $q.defer();

            // load all playlists then open a modal, passing the list of playlists as content
            service.loadPlaylists().then(function(playlists){

                var modalInstance = $uibModal.open({
                    templateUrl: 'partials/playlistModal.html',
                    controller: 'PlaylistModalCtrl',
                    size: 'sm',
                    resolve: {
                        content: function () {
                            return {
                                'playlists' : playlists
                            }
                        }
                    }
                });

                //handle promise resolve/reject. data is the selected playlist
                modalInstance.result.then(function (selectedPlaylist) {
                    deferred.resolve(selectedPlaylist);
                }, function (err) {
                    $log.info('Modal dismissed without saving video to playlist');
                    deferred.reject({msg : 'Modal dismissed without saving video to playlist'});
                });

            }, function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        };

        var saveVideoToPlaylist = function(video, playlist){
          var deferred = $q.defer();
          AuthService.getAccessToken().then(function(token){
            var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&access_token=' + token;
            var playlistItemResource = generatePlaylistItemResource(video, playlist);
            $http.post(url, playlistItemResource).then(function(res){
                $log.info(res);
                deferred.resolve();
            }, function(err){
                $log.error(err);
                deferred.reject();
            });
          });
          return deferred.promise;
        }

        return service;
    }]);
})();
