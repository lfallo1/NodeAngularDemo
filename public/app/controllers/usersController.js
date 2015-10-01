(function(){
    angular.module('nodeAngularDemoApp').controller('UsersCtrl', [
        '$rootScope', '$scope', '$location', '$http', 'userStats', 'addlUserStuff',
        function($rootScope, $scope, $location, $http, userStats, addlUserStuff){

            $scope.users = [];

            $scope.init = function(){
                $scope.pageTitle = 'Welcome to the Users info page';
                $http.get('/api/users').then(function(res){
                    $scope.users = res.data;
                }, function(err){
                    console.log(err.status);
                })
            };

            $scope.viewDetails = function(name){
                $location.path('/user/' + name);
            }

            $scope.linkHome = function(){
                $location.path('/');
            };

            $scope.userStatsMain = userStats.statsMain();
            $scope.userStatsExtra = userStats.statsExtra();

            $scope.addlInfo = addlUserStuff.names + ' <--> ' + addlUserStuff.location;

            $scope.init();
        }]);
})();
