(function(){
    angular.module('youtubeSearchApp').controller('ReportModalCtrl', ['$scope', '$timeout', '$q', 'content', '$uibModalInstance', function($scope, $timeout, $q, content, $uibModalInstance){

        var init = function(){
            $scope.limit = '';
            $scope.hashedResults = content.hashedResults;
            $scope.channelFilter = content.channelFilter;
            $scope.loadingTable = true;
            $timeout(function(){
                $scope.prepareTableData();
                $scope.loadingTable = false;
            },0);
            $scope.prepareChart().then(function(){
                console.log('prepare chart finished');
            });
            console.log('after prepare chart');
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

        $scope.sortTable = function(key){
            return function(a,b){
                return a.channelSummary[key] > b.channelSummary[key] ? 1 : a.channelSummary[key] < b.channelSummary[key] ? -1 : 0;
            }
        };

        $scope.prepareChart = function(){
            var deferred = $q.defer();
            $timeout(function(){
                var chartData = [];
                Object.keys($scope.hashedResults).forEach(function(v,i){
                    if(chartData.length < 20 && sum($scope.hashedResults[v].videos, 'pctLikes') > 0){
                        chartData.push($scope.hashedResults[v]);
                        chartData = chartData.sort(function(a,b){return a.views < b.views ? 1 : a.views > b.views ? -1 : 0;});
                        chartData = chartData.sort(function(a,b){return a.count < b.count ? 1 : a.count > b.count ? -1 : 0;});
                    }
                    else{
                        var counter = chartData.length - 1;
                        var inserted = false;
                        while(counter >= 0 && !inserted){
                            if($scope.hashedResults[v].count > chartData[counter].count || ($scope.hashedResults[v].count === chartData[counter].count &&
                                $scope.hashedResults[v].views > chartData[counter].views)){
                                chartData.splice(counter,1,$scope.hashedResults[v]);
                                chartData.splice(chartData.length-1, 1);
                                chartData = chartData.sort(function(a,b){return a.views < b.views ? 1 : a.views > b.views ? -1 : 0;});
                                chartData = chartData.sort(function(a,b){return a.count < b.count ? 1 : a.count > b.count ? -1 : 0;});
                                inserted = true;
                            }
                            counter--;
                        }
                    }
                });

                $scope.labels = [];
                $scope.data = [ [],[] ];
                $scope.series = ['View Count (unit: 100,000)', 'Rating'];
                for(var i = 0; i < chartData.length; i++){
                    $scope.labels.push(chartData[i].videos[0].channelTitle + ' ('+ chartData[i].count +')');
                    $scope.data[0].push((sum(chartData[i].videos, 'viewCount') / 100000) / chartData[i].count);
                    $scope.data[1].push((sum(chartData[i].videos, 'pctLikes')) / chartData[i].count);
                }

                $scope.onClick = function (points, evt) {
                    //TODO maybe implement something later...

                    //var channelTitle = points[0].label.substring(0, points[0].label.indexOf('(')).trim().toLowerCase();
                    //$scope.addChannelFilter(channelFilter);
                };

                deferred.resolve();

            },3000);

            return deferred.promise;
        };

        $scope.inChannelFilter = function(channelTitle){
            return $scope.channelFilter.indexOf(channelTitle.toLowerCase()) > -1;
        }

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