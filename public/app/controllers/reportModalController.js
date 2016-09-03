(function(){
    angular.module('youtubeSearchApp').controller('ReportModalCtrl', ['$scope', '$timeout', '$q', 'content', '$uibModalInstance', function($scope, $timeout, $q, content, $uibModalInstance){

        var sortDirection = 1;

        var init = function(){
            $scope.limit = '';
            $scope.hashedResults = content.hashedResults;
            $scope.channelFilter = content.channelFilter;
            $scope.loadingTable = true;
            $timeout(function(){
                $scope.prepareTableData();
                $scope.loadingTable = false;
            },0);
        };

        var sum = function(items, prop){
            return items.reduce( function(a, b){
                return a + b[prop];
            }, 0);
        };

        $scope.close = function(){
            $uibModalInstance.close();
        };

        $scope.prepareTableData = function(){
            $scope.tableData = [];
            Object.keys($scope.hashedResults).forEach(function(v,i){

                //calculate average rating
                var averageRating = 0;
                for(var i = 0; i < $scope.hashedResults[v].videos.length; i++){
                    averageRating += ($scope.hashedResults[v].videos[i].viewCount / $scope.hashedResults[v].views) * $scope.hashedResults[v].videos[i].pctLikes;
                }
                $scope.hashedResults[v].averageRating = averageRating;

                $scope.hashedResults[v].avgViewsPerVideo = ($scope.hashedResults[v].views / $scope.hashedResults[v].count);

                //add hash entry to array for use in ng-repeat
                $scope.tableData.push({'title' : v, 'channelSummary' : $scope.hashedResults[v]});
            });

            //default sort is views, and then count of videos by channel desc
            $scope.tableData = $scope.tableData.sort(function(a,b){
                return a.channelSummary['views'] < b.channelSummary['views'] ? 1 : a.channelSummary['views'] > b.channelSummary['views'] ? -1 : 0;
            });

            $scope.tableData = $scope.tableData.sort(function(a,b){
                return a.channelSummary['count'] < b.channelSummary['count'] ? 1 : a.channelSummary['count'] > b.channelSummary['count'] ? -1 : 0;
            });

            $scope.limit = Math.min($scope.tableData.length, 200);
            $scope.tableData = $scope.tableData.splice(0,$scope.limit);
        };

          /**
         * sort the filtered list by the current property in the pagination object
         */
        $scope.sort = function(prop){
          //split property by period
          prop = prop.split('.');
            var len = prop.length;

            $scope.tableData = $scope.tableData.sort(function (a, b) {

                //find property to sort by
                var i = 0;
                while( i < len ) {
                  a = a[prop[i]]; b = b[prop[i]]; i++;
                }

                //perform sort
                return a > b ? sortDirection : a < b ? -sortDirection : 0;
            });
            sortDirection = sortDirection*-1;
        };

        $scope.sortTable = function(key){
            return function(a,b){
                return a.channelSummary[key] > b.channelSummary[key] ? 1 : a.channelSummary[key] < b.channelSummary[key] ? -1 : 0;
            }
        };

        $scope.inChannelFilter = function(channelTitle){
            return $scope.channelFilter.indexOf(channelTitle.toLowerCase()) > -1;
        };

        $scope.addChannelFilter = function(channelTitle){
            if($scope.channelFilter.indexOf(channelTitle) < 0){
                $scope.channelFilter.push(channelTitle.toLowerCase());
            }
        };

        $scope.removeChannelFilter = function(channelTitle){
            var idx = $scope.channelFilter.indexOf(channelTitle);
            $scope.channelFilter.splice(idx, 1);
        };

        init();

    }]);
})();
