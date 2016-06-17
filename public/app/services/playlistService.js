 /**
 * PlaylistService- Handle functionality related to creating / updating playlists
 */
(function(){
    angular.module('youtubeSearchApp').service('PlaylistService', ['$http', '$q', '$log', '$uibModal', '$timeout', 'toaster', 'AuthService', function($http, $q, $log, $uibModal, $timeout, toaster, AuthService){

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

            //get token & create url
            var token = gapi.auth2.getAuthInstance().currentUser.get().hg.access_token;
            var url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet,id&mine=true&maxResults=50&access_token=' + token;

            //perform request
            $http.get(url).then(function(res){
                $log.info(res);
                deferred.resolve(res.data.items);
            }, function(err){
                $log.error(err);

                //if no auth error, it means the user has not granted access to their youtube account.  Redirect to page, requesting
                //them allow access.
                if(err.status === 401 || err.status === 403){
                    location.href = "https://accounts.google.com/o/oauth2/auth?client_id=" + $rootScope.clientId + "&redirect_uri=" + $rootScope.authCallbackUrl + "&scope=https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner&response_type=token";
                }
                else if(err.status === 404){
                    //404 means they haven't setup a youtube channel / page yet.  just show a basic message asking them to do so
                    //if they want to use the playlist feature
                    toaster.pop('info', '', 'Looks like you haven\'t setup a YouTube channel yet.  Once you get one setup, give this another try');
                    ;                }
                deferred.reject();
            });
            return deferred.promise
        };

        /**
         * Add a new playlist to their channel
         * @param playlistName
         * @returns {*}
         */
        service.addPlaylist = function(playlistName){
            var deferred = $q.defer();
            var token = gapi.auth2.getAuthInstance().currentUser.get().hg.access_token;
            var url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&access_token=' + token;
            var playlistResource = generatePlaylistResource(playlistName);
            $http.post(url, playlistResource).then(function(res){
                deferred.resolve(res.data);
            }, function(err){
                $log.error(err);
                deferred.reject(err);
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

        var addMultipleToPlaylistWrapper = function(videos, playlist, deferred){
            var deferred = deferred || $q.defer();
              if(videos && videos.length === 0){
                  deferred.resolve();
                  return;
              }

            saveVideoToPlaylist(videos[0], playlist).then(function(){
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
                toaster.pop('error', '', 'Having trouble loading your playlists. Try clicking the google signin button in the upper right and give it another shot.');
                deferred.reject(err);
            });

            return deferred.promise;
        }

        var saveVideoToPlaylist = function(video, playlist){
            var deferred = $q.defer();
            var token = gapi.auth2.getAuthInstance().currentUser.get().hg.access_token;
            var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&access_token=' + token;
            var playlistItemResource = generatePlaylistItemResource(video, playlist);
            $http.post(url, playlistItemResource).then(function(res){
                $log.info(res);
                deferred.resolve();
            }, function(err){
                $log.error(err);
                deferred.reject();
            });
            return deferred.promise;
        }

        return service;
    }]);
})();