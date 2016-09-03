/**
 * AuthService.js - handle basic auth management (most of this is handled by the google api itself
 */
(function(){

    angular.module('youtubeSearchApp').service('AuthService', [ '$window', '$log', '$http', '$q', '$rootScope', function($window, $log, $http, $q, $rootScope){
        var newToken = undefined;
        var userPlaylists = [];
        var watchHistory = [];
        var pendingGoogleActivation = false;

        var service = {};

        service.setPendingGoogleActivation = function(val){
          pendingGoogleActivation = val;
        };

        service.getPendingGoogleActivation = function(){
          return pendingGoogleActivation;
        };

        service.connectWithGoogle = function(){
          location.href = "https://accounts.google.com/o/oauth2/auth?client_id=" + $rootScope.clientId + "&redirect_uri=" + $rootScope.authCallbackUrl + "&scope=https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner&response_type=token";
        };

        /**
         * helper method returning if user is logged in (certain elements are hidden if not logged in)
         * @returns {boolean|*}
         */
        service.isLoggedIn = function(){
            return typeof gapi !== 'undefined' && gapi.auth2 && gapi.auth2.getAuthInstance().isSignedIn.get();
        };

        /**
         * handle gapi onSignIn event
         * @param user
         */
        service.onSignIn = function(){
          gapi.auth2.getAuthInstance().then(function(auth){
            auth.isSignedIn.listen(authListener);
            pendingGoogleActivation = true;
            auth.currentUser.get().reloadAuthResponse().then(function(){
              pendingGoogleActivation = false;
              auth.isSignedIn.listen(authListener);
              if(userPlaylists.length === 0){
                loadUserPlaylists();
              }
            }, function(err){
              console.log(err);
              $rootScope.$apply();
            });
          });
        };

        service.getAccessToken = function(){
          var deferred = $q.defer();
          if(service.isLoggedIn()){
            gapi.auth2.getAuthInstance().then(function(auth){
              deferred.resolve(auth.currentUser.get().getAuthResponse(true).access_token);
            }, function(err){
              deferred.resolve('');
            });
          } else{
            deferred.resolve('');
          }
          return deferred.promise;
        };

        /**
         * set a "new" token.
         * in the onSignIn handler, the access_token may be updated to the current access_token
         * @param token
         */
        service.setNewToken = function(token){
          newToken = token;
        };

        service.getName = function(){
          if(service.isLoggedIn()){
            return gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getGivenName();
          }
          return '';
        };

        service.getAuthorizedPlaylists = function(){
          if(service.isLoggedIn()){
            return userPlaylists;
          }
          return [];
        };

        var authListener = function(signedIn){
          if(!signedIn && typeof gapi !== 'undefined'){
              gapi.auth2.getAuthInstance().signOut();
              watchHistory = [];
              userPlaylists = [];
          }
        };

        //return the users editable playlists
        service.loadEditableUserPlaylists = function(){
          var deferred = $q.defer();
          service.getAccessToken().then(function(token){
            var url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet,id&mine=true&maxResults=50&access_token=' + token;

            //perform request
            $http.get(url).then(function(res){
                pendingGoogleActivation = false;
                $log.info(res);
                deferred.resolve(res);
            }, function(err){
              handleAuthError(err, deferred);
            });
          });
          return deferred.promise;

        };

        var handleAuthError = function(err, deferred){
          if(err.status === 401 || err.status === 403){
              pendingGoogleActivation = true;
          }
          $log.error(err);
          if(deferred){
            deferred.reject(err);
          }
        }

        service.hasWatched = function(id){
          return watchHistory.indexOf(id) > -1;
        };

        //load editable / non-editable playlists. runs when user logs in or on app-startup if already logged in
        var loadUserPlaylists = function(){
          userPlaylists = [];
          service.getAccessToken().then(function(token){
            var url = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&access_token=' + token;
            $http.get(url).then(function(res){
              var playlists = res.data.items[0].contentDetails.relatedPlaylists;
              for(prop in playlists){
                userPlaylists.push({
                  name:prop.substring(0,1).toUpperCase() + prop.substring(1).replace(/([A-Z])/g, ' $1').trim(),
                  val:playlists[prop]
                });
              }

              //populate the videos in their watch history
              getVideosInPlaylist(playlists.watchHistory);

              //load the rest of their playlists (just playlists, not playlist videos)
              service.loadEditableUserPlaylists().then(function(res){
                $log.info(res);
                for(var i = 0; i < res.data.items.length; i++){
                  //add if playlist id is not already in the list
                  if(userPlaylists.filter(function(p){return res.data.items[i].id == p.val}).length === 0){
                    userPlaylists.push({
                      name : res.data.items[i].snippet.title,
                      val : res.data.items[i].id
                    });
                  }
                }
              }, function(err){
                console.log("Unable to load playlists: " + err);
              });

            }, function(err){
              handleAuthError(err);
            });
          });
        };

        var getVideosInPlaylist = function(id, pageToken){
          service.getAccessToken().then(function(token){
            var accessToken = token ? '&access_token=' + token : '';
            var pageToken = pageToken ? '&pageToken=' + pageToken : '';
            var playlistId = '&playlistId=' + id;
            var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50' + playlistId + pageToken + accessToken;
            //make request
            $http.get(url).then(function(res){
                watchHistory = watchHistory.concat(res.data.items.map(function(video){return video.contentDetails.videoId}));
                if(res.data.nextPageToken){
                  getVideosInPlaylist(id, res.data.nextPageToken);
                }
            }, function(err){
              console.log(err);
            });
          })
        };

        return service;
    }])

})();
