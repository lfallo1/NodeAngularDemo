(function(){
    angular.module('nodeAngularDemoApp').controller('HomeCtrl', [
        '$rootScope', '$scope', '$state', '$log',
        function($rootScope, $scope, $state, $log){

            $scope.init = function(){
                $scope.pageTitle = 'Justice Agency Official Home';
                $scope.welcomeText = 'Welcome to the home of the Justice Agency, our world\'s mighty protectors and upholders of justice'
                $log.debug($state.current.myData.data1 + ' ' + $state.current.myData.data2);
            };

            $scope.linkMembers = function(){
                $state.go('superheroes');
            };

            $scope.init();
        }]);
})();
