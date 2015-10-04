(function() {
    angular.module('nodeAngularDemoApp').controller('LoginCtrl', [
        '$rootScope', '$scope', '$http', '$state', 'loginService',
        function ($rootScope, $scope, $http, $state, loginService) {

            $scope.user = {};

            $scope.login = function () {
                loginService.login($scope.user.username, $scope.user.password)
                    .success(function(msg){
                        // No error: authentication OK
                        $scope.errorMsg = false;
                        console.log(msg);
                        $rootScope.message = 'Authentication successful!';
                        $state.go('home');
                    })
                    .error(function(err){
                        // Error: authentication failed
                        console.log(err);
                        $scope.errorMsg = 'Authentication failed.';
                    });
                };
            }]);
})();