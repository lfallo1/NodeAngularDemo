/**
 * AuthService.js - handle basic auth management (most of this is handled by the google api itself
 */
(function(){

    angular.module('youtubeSearchApp').service('AuthService', [ '$window', '$log', '$http', '$q', function($window, $log, $http, $q){
        var newToken = undefined;
        var userPlaylists = [];

        var service = {};

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
            // if(newToken){
            //     gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token = newToken;
            // }
            gapi.auth2.getAuthInstance().isSignedIn.listen(authListener);
            loadUserPlaylists();
        };

        service.getAccessToken = function(){
          if(service.isLoggedIn()){
            return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).access_token;
          }
          return '';
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
          }
        };

        //return the users editable playlists
        service.loadEditableUserPlaylists = function(){
          var deferred = $q.defer();
          var token = service.getAccessToken();
          var url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet,id&mine=true&maxResults=50&access_token=' + token;

          //perform request
          $http.get(url).then(function(res){
              $log.info(res);
              deferred.resolve(res);
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
              }
              deferred.reject(err);
          });
          return deferred.promise;

        };

        //load editable / non-editable playlists. runs when user logs in or on app-startup if already logged in
        var loadUserPlaylists = function(){
          userPlaylists = [];
          var token = service.getAccessToken();
          var url = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&access_token=' + token;
          $http.get(url).then(function(res){
            var playlists = res.data.items[0].contentDetails.relatedPlaylists;
            for(prop in playlists){
              userPlaylists.push({
                name:prop.substring(0,1).toUpperCase() + prop.substring(1).replace(/([A-Z])/g, ' $1').trim(),
                val:playlists[prop]
              });
            }
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
            console.log(err);
          });
        };

        return service;
    }])

})();
