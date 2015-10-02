(function(){
    angular.module('nodeAngularDemoApp').controller('HomeCtrl', [
        '$rootScope', '$scope', '$state', '$log',
        function($rootScope, $scope, $state, $log){

            $scope.init = function(){
                $scope.pageTitle = 'Website Official Home';
                $scope.welcomeText = 'This is where some cool subtext might go'
                $log.debug($state.current.myData.data1 + ' ' + $state.current.myData.data2);
            };

            $scope.linkMembers = function(){
                $state.go('superheroes');
            };

            $scope.init();
        }]);
})();
