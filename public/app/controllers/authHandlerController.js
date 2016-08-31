/**
 * AuthHandlerCtrl - this view gets hit after granting app access to youtube account
 */
(function() {
    angular.module('youtubeSearchApp').controller('AuthHandlerCtrl', [
        '$rootScope', '$scope', '$log', '$http', '$timeout', '$location', 'AuthService', 'toaster',
        function ($rootScope, $scope, $log, $http, $timeout, $location, AuthService, toaster) {

            //add to end of digest loop
            $timeout(function () {
                gapi.auth2.getAuthInstance().currentUser.get().reloadAuthResponse();
                $location.path('/');
            }, 10);

        }]);
})();
