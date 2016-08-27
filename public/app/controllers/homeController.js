/**
 * HomeCtrl.js - Primvary controller. Handles the loading of videos, sorting and filtering.
 */
(function(){
    angular.module('youtubeSearchApp').controller('HomeCtrl', [
        '$rootScope', '$scope', '$http', '$q', '$log', '$timeout', '$location', 'TimeService', 'toaster', '$window', '$uibModal', 'AuthService', 'PlaylistService', '$sce', 'CountriesService', '$anchorScroll', '$cookies',
        function($rootScope, $scope, $http, $q, $log, $timeout, $location, TimeService, toaster, $window, $uibModal, AuthService, PlaylistService, $sce, CountriesService, $anchorScroll, $cookies){

            var youtubeSearchBase = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=';
            var youtubeVideoBase = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=';
            var popularByCountryBase = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&maxResults=50&chart=mostPopular&regionCode=';
            var youtubeVideoCategoriesBase = 'https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=';
            var generalSearch = "site:youtube.com";

            $scope.dateIntervalTypes = {
                'BIENNIAL' : 2,
                'ANNUAL' : 1,
                'BIANNUAL' : 0.5
            };

            $scope.quickFilterModes = {
              'ALL' : 0,
              'ANY' : 1
            };

            var millisConstants = {
              YEAR : 1000*60*60*24*365,
              WEEK : 1000*60*60*24*7,
              DAY :  1000*60*60*24,
              HOUR : 1000*60*60
            };

            $scope.mostViewedSearchClick = function(){
              var date = new Date(new Date().getTime() - millisConstants.DAY*30)
              $scope.preSearchMinDate = date;
              $scope.preSearchMaxDate = new Date();
              $scope.searchParam = '';
            };

            //define search interval for most viewed youtube video searches
            var defineInterval = function(){

                //check situation where no date is supplied
                if(!checkDate($scope.preSearchMaxDate) && !checkDate($scope.preSearchMinDate) ){
                  return {
                    maxDate : new Date(),
                    minDate : new Date('04-01-2005'),
                    intervalSize : (new Date().getTime() - new Date('04-01-2005').getTime())/15,
                    intervalFrequency : 20
                  }
                }

                var maxDate = checkDate($scope.preSearchMaxDate) ? new Date($scope.preSearchMaxDate).getTime() : new Date().getTime();
                var minDate = checkDate($scope.preSearchMinDate) ? new Date($scope.preSearchMinDate).getTime() : new Date('04-01-2005').getTime();

                var time = maxDate - minDate;
                var mostViewedSearchInterval = -1;

                if(time > 4 * millisConstants.YEAR){
                  mostViewedSearchInterval = 25;
                }
                else if(time > 2 * millisConstants.YEAR){
                  mostViewedSearchInterval = 20;
                }
                else if(time > 180*millisConstants.DAY){
                  //15x time hard coded for ranges > than 180 days
                  mostViewedSearchInterval = 15;
                }
                else if(time > 30*millisConstants.DAY){
                  //10x time hard coded for ranges > than 30 days and < 180 days
                  mostViewedSearchInterval = 10;
                } else if(time > millisConstants.WEEK){
                  //1x per day
                  mostViewedSearchInterval = time / millisConstants.DAY;
                } else if(time > millisConstants.DAY){
                  //2x per day
                  mostViewedSearchInterval = time / (millisConstants.DAY / 2);
                } else{
                  //4x per day
                  mostViewedSearchInterval = 4;
                }

                return {
                  minDate : minDate,
                  maxDate : maxDate,
                  intervalSize : time / mostViewedSearchInterval,
                  intervalFrequency : mostViewedSearchInterval
                }
            };

            var resetPagination = function(){
                $scope.pagination = {
                    currentPage : 1,
                    resultsPerPage : 50
                };
            };

            $scope.getPages = function(){
              return new Array(Math.ceil($scope.filteredResults.length / $scope.pagination.resultsPerPage));
            };

            $scope.paginate = function(){
                var currIndex = ($scope.pagination.currentPage-1) * $scope.pagination.resultsPerPage;
                if(currIndex > $scope.filteredResults.length){
                  currIndex = 0;
                  $scope.pagination.currentPage = 1;
                }
                var startIndex =  currIndex;
                var endIndex = Math.min(startIndex + $scope.pagination.resultsPerPage, $scope.filteredResults.length);
                $scope.displayList = $scope.filteredResults.filter(function(d,i){
                   if(i >= startIndex && i < endIndex){
                       return d;
                   }
                });
            };

            $scope.gotoPage = function(page){
                if((page-1) * $scope.pagination.resultsPerPage > $scope.filteredResults.length){
                  $scope.pagination.currentPage = Math.ceil($scope.filteredResults.length / $scope.pagination.resultsPerPage);
                }
                else if(page < 1){
                    $scope.pagination.currentPage = 1;
                }
                else{
                    $scope.pagination.currentPage = page;
                }
                $scope.paginate();
            };

            $scope.nextPage = function(){
                $scope.pagination.currentPage += 1;
                $scope.gotoPage($scope.pagination.currentPage);
            };

            $scope.previousPage = function(){
                $scope.pagination.currentPage -= 1;
                $scope.gotoPage($scope.pagination.currentPage);
            };

            /**
             * set playlistService scope variable so the view can access service methods directly instead of creating redundant
             * intermediary methods
             * @type {PlaylistService|*}
             */
            $scope.playlistService = PlaylistService;

            var apikey = $rootScope.apiKey;
            var sortOrders = [];
            $scope.TEXT_SEARCH = 1;
            $scope.POPULAR_SEARCH = 2;
            $scope.PLAYLIST_SEARCH = 3;
            $scope.MOST_VIEWED_SEARCH = 4;
            $scope.WATCHLIST_MODAL_CTRL = 'WatchlistModalCtrl';
            $scope.BULK_PLAYLIST_MODAL_CTRL = 'BulkPlaylistModalCtrl';
            $scope.quickFilterType = "0";
            $scope.quickFilterTerms = [];
            var ALL_CATEGORIES = {'id' : '-1', 'snippet' : {'title' : 'Search All Categories'}};
            var relatedPending = false;

            var regionCode = '';
            var related= '';
            var videoDuration= '';
            var videoCategoryId= '';
            var safeSearch= '';

            $scope.videoDurationOptions = ['any','long','medium','short'];
            $scope.safeSearchOptions = ['moderate', 'none', 'strict'];

            $scope.quickFilterVisible = true;

            $scope.toggleQuickFilter = function(){
              $scope.quickFilterVisible = !$scope.quickFilterVisible;
            };

            $scope.isVideoInList = function(video, list){
                return list.filter(function(d){
                    if(d.videoId === video.videoId){
                        return d;
                    }
                }).length > 0;
            };

            $scope.toggleVideoInList = function(video, list){
                for(var i = 0; i < list.length; i++){
                    if(list[i].videoId === video.videoId){
                        list.splice(i,1);
                        return;
                    }
                }
                list.push(video);
            };

            $scope.openListManagerModal = function(list, controller, template){
                var modalInstance = $uibModal.open({
                    templateUrl: 'partials/' + template,
                    controller: controller,
                    backdrop: 'static',
                    size: 'md',
                    resolve: {
                        content: function () {
                            return {
                                'list' : list
                            }
                        }
                    }
                });

                //handle promise resolve/reject. data is the selected playlist
                modalInstance.result.then(function (newList) {
                    if(controller === $scope.WATCHLIST_MODAL_CTRL){
                        $scope.watchlist = newList;
                    }
                    else if(controller === $scope.BULK_PLAYLIST_MODAL_CTRL){
                        $scope.selectedVideos = newList;
                    }
                });
            };

            /**
             * SortOption object
             * @param value
             * @param direction
             * @param glyph
             * @param displayName
             * @constructor
             */
            function SortOption(value, direction, glyph, displayName){
                this.value = value;
                this.direction = direction;
                this.glyph = glyph;
                this.displayName = displayName;
            };

            /**
             * setup view
             */
            var init = function(){

                $scope.autoplay = true;

                resetPagination();

                //reset quick filter
                $scope.quickFilterType = "0";
                $scope.quickFilterTerms = [];

                $scope.selectedIntervalType = $scope.dateIntervalTypes.BIENNIAL;
                $scope.intervalSearch = false;
                $scope.extendedSearch = false;

                $scope.videoDuration = $scope.videoDurationOptions[0];
                $scope.safeSearch = $scope.safeSearchOptions[0];
                $scope.preSearchFiltersVisible = $scope.sortVisible = $scope.filterVisible = true;

                $scope.watchlist = [];
                $scope.selectedVideos = [];
                $scope.hashedResults = {};

                $scope.sortField = {'value' : 'viewCount'};

                CountriesService.getCountries().then(function(countries){
                    $scope.countries = countries;
                    $scope.selectedCountry = $scope.countries.filter(function(d){
                        if(d['alpha-2'] === 'US'){
                            return d;
                        }
                    })[0];
                    $scope.updateCategories().then(function(){
                        $scope.selectedCategory = $scope.videoCategories && $scope.videoCategories.length > 0 ? $scope.videoCategories[$scope.videoCategories.length - 1] : ALL_CATEGORIES;
                    });
                });

                $scope.searchMode = $scope.TEXT_SEARCH;
                $scope.totalResults = 0;
                $scope.searchParam = '';
                $scope.searchResults = $scope.filteredResults = [];

                //setup sort options (each sort option will be used for a search). different sort options
                //are used to increate search results
                $scope.sortOptions = [
                    new SortOption('viewCount', -1, 'user', 'Views'),
                    new SortOption('likes', -1, 'thumbs-up', 'Likes'),
                    new SortOption('dislikes', 1, 'thumbs-down', 'Dislikes'),
                    new SortOption('pctLikes', -1, 'star', 'Rating')
                ];
                $scope.sortField.value = $scope.sortOptions[0].value;

                $scope.enableChannelFilter = true;

                checkCookies();
            };

            $scope.reset = function(){
                $scope.searchResults = [];
                $scope.filteredResults = [];
                $scope.hashedResults = {};
                $scope.channelFilter = [];
                $scope.pagination = {
                    currentPage : 1,
                    resultsPerPage : 50,
                    totalPages : 0
                };
            };

            $scope.$on('youtube.player.ended', handleYoutubeEnd);
            $scope.$on('youtube.player.error', handleYoutubeEnd);

            function handleYoutubeEnd($event, player) {
              if($scope.autoplay){
                //handle youtube player errors and end of video events - end of digest loop
                $timeout(function(){
                  if($scope.nextVideo){
                    $scope.currentVideo.playing = false;
                    if(($scope.nextVideo % $scope.pagination.resultsPerPage) === 0){
                      $scope.gotoPage($scope.pagination.currentPage+1);
                    }
                    $scope.setPlaying($scope.filteredResults[$scope.nextVideo], true, $scope.nextVideo, true);
                  }
                },0);
              }
            };

            $scope.youtubePlayerOptions = {
              autoplay : 1
            };

            $scope.setPlaying = function(video, val, index, isTotalIndex){
                video.playing = val;
                if(video.playing){

                  //if a video was already open, then close it
                  if($scope.currentVideo){
                    $scope.currentVideo.playing = false;
                  }

                  //set the current video to the selected option
                  $scope.currentVideo = video;

                  //set the next video to be played, if autoplay is on
                  var totalIndex = isTotalIndex ? index : index + ($scope.pagination.currentPage-1)*$scope.pagination.resultsPerPage;
                  $scope.nextVideo = $scope.autoplay && (totalIndex < ($scope.filteredResults.length - 1)) ? (totalIndex+1) : undefined;
                } else{

                  //if closing a video, just set the current video and next video to undefined
                  $scope.currentVideo = undefined;
                  $scope.nextVideo = undefined;
                }

                //when video player expands, it can cause page to scroll away from desired / expanded video.
                //this adds the scroll to method to end of digest loop, so that once video loads / expands, the page will correctly set its posision
                $timeout(function(){
                    $scope.scrollToElement(video.videoId);
                },0);
            };

            $scope.getIFrameSrc = function (videoId) {
                return 'https://www.youtube.com/embed/' + videoId;
            };

            $scope.sortOptionChanged = function(option){
                $scope.sortField.value = option.value;
                $scope.sort();
            };

            /**
             * Interrupt a search
             */
            $scope.interrupt = function(){
                $scope.alerts = [];
                relatedPending = false;
                $scope.related = undefined;
                $scope.checkRelated = false;
                $scope.checkRelated = false;
                $scope.wasInterrupted = true;
                $scope.fetching = false;
                toaster.pop('info', '', 'Search stopped');
                $scope.setSaveUrl();
            };

            /**
             * Handle a finished search
             * @param msg
             * @param toasterType
             */
            var stopSearch = function(msg, toasterType){
                $scope.alerts = [];
                $scope.fetching = false;
                toaster.pop(toasterType, '', msg);
                $scope.setSaveUrl();
            };

            /**
             * reset sort order objects (main purpose of this is to reset the tokens)
             */
            var resetSortOrders = function(){
              sortOrders = $scope.searchMode === $scope.MOST_VIEWED_SEARCH ? [{order : 'viewCount', token : ''}] :
                [
                    {order : 'relevance', token : ''},
                    {order : 'rating', token : ''},
                    {order : 'date', token : ''},
                    {order : 'viewCount', token : ''},
                    {order : 'title', token : ''}
                ];
            };

            var resetAll = function(){

              mostViewedSearchInterval = 0;
              $scope.saveUrl = undefined;

              $scope.alerts = [];

              resetPagination();

              $scope.related = undefined;
              $scope.nextRelated = [];
              $scope.checkRelated = false;
              relatedPending = true;

              resetSortOrders();
              $scope.searchResults = [];
              $scope.hashedResults = {};
              $scope.displayList = [];
              $scope.channelFilter = [];
              $scope.tableData = [];

              $scope.wasInterrupted = undefined;
            };

            /**
             * perform a new search
             */
            $scope.doSearch = function(){

                //if already searching, just return immediately
                $scope.searchParam = $scope.searchMode === $scope.MOST_VIEWED_SEARCH ? generalSearch : $scope.searchParam.trim();
                if($scope.fetching || !$scope.searchParam){
                    return;
                }

                resetAll();

                if($scope.searchMode === $scope.TEXT_SEARCH || $scope.searchMode === $scope.MOST_VIEWED_SEARCH){

                    setSortOptionCookies();

                    $scope.fetching = true;

                    videoDuration = $scope.videoDuration ? '&videoDuration=' + $scope.videoDuration : '';
                    safeSearch = $scope.safeSearch ? '&safeSearch=' + $scope.safeSearch : '';

                    regionCode = $scope.selectedCountry ? '&regionCode=' + $scope.selectedCountry['alpha-2'] : '';
                    videoCategoryId = ($scope.selectedCategory && $scope.selectedCategory.id && $scope.selectedCategory.id > 0) ? '&videoCategoryId=' + $scope.selectedCategory.id : '';
                    if(!regionCode || !videoCategoryId){
                        regionCode = videoCategoryId = '';
                    }

                    //setup warning
                    if($scope.intervalSearch){
                        $scope.alerts = [{type:'danger', msg:'Warning!  With the Interval option selected, results take considerably longer to retrieve.  Please click STOP and uncheck the option if you wish to perform a faster search.'}];
                    }

                    //call the wrapper
                    fetchResultsWrapper();
                }
                else if($scope.searchMode === $scope.PLAYLIST_SEARCH){
                  getVideosInPlaylist().then(function(res){
                    console.log('playlist retrieved');
                  }, function(){
                    console.log('playlist not found, trying video id search');
                    getVideoById();
                  })
                }
            };

            /**
             * method that accepts whether or not to cancel the search.
             * The method calls fetch results, then waits for all requests to finish.
             * @param cancel
             */
            var fetchResultsWrapper = function(cancel){

                //if cancel passed in (used if errors occur, and we want to the search to end
                if(cancel){
                    return;
                }

                var dateLarge = $scope.preSearchMaxDate ? "&publishedBefore=" + $scope.preSearchMaxDate.toISOString() : '';
                var dateSmall = $scope.preSearchMinDate ? "&publishedAfter=" + $scope.preSearchMinDate.toISOString() : '';

                //fetch results, passing the date range (the date ranges can be empty)
                fetchResults(dateSmall, dateLarge).then(handleFetchIterationComplete, handleFetchIterationComplete);
            };

            /**
             * fetches the actual results
             * performs in a recursive manner, until the next page tokens crap out.  at that point, the promise rejects
             *
             * @param dateSmall (can be an empty string)
             * @param dateLarge (can be an empty string)
             * @param promise (optional)
             * @returns {*}
             */
            var fetchResults = function(dateSmall, dateLarge, promise){

                var deferred = promise || $q.defer();

                if($scope.wasInterrupted){
                    deferred.reject(true);
                    return;
                }

                var promises = [];

                related = $scope.checkRelated && $scope.related ? '&relatedToVideoId=' + $scope.related : '';

                //check if date interval searching is turned on
                if($scope.searchMode === $scope.MOST_VIEWED_SEARCH || $scope.intervalSearch){
                  var intervalObj = defineInterval();
                  for(var j = 0; j < intervalObj.intervalFrequency; j++){

                    var date = new Date(intervalObj.maxDate);
                    var large = new Date(date.getTime()-j*intervalObj.intervalSize);
                    var small = new Date(large.getTime() - intervalObj.intervalSize);

                    dateSmall = "&publishedAfter=" + small.toISOString();
                    dateLarge = "&publishedBefore=" + large.toISOString();

                    //for each sort order type, execute the GET request.  doing this so that more results are returned.
                    for (var i = 0; i < sortOrders.length; i++) {
                        var token = sortOrders[i].token ? '&pageToken=' + sortOrders[i].token : '';

                        promises.push($http.post('api/youtube/get', {'url' : youtubeSearchBase + $scope.searchParam + "&type=video&maxResults=50" +
                        dateSmall + dateLarge + regionCode + videoDuration + videoCategoryId + safeSearch +
                        "&order=" + sortOrders[i].order + related  + token}));
                    }
                  }
                }
                else{
                    //for each sort order type, execute the GET request.  doing this so that more results are returned.
                    for (var i = 0; i < sortOrders.length; i++) {
                        var token = sortOrders[i].token ? '&pageToken=' + sortOrders[i].token : '';

                        promises.push($http.post('api/youtube/get', {'url' : youtubeSearchBase + $scope.searchParam + "&type=video&maxResults=50" +
                        dateSmall + dateLarge + regionCode + videoDuration + videoCategoryId + safeSearch +
                        "&order=" + sortOrders[i].order + related  + token}));
                    }
                }

                //wait for all requests to complete
                $q.all(promises).then(function (res) {

                    //no results, then check how many warningss (after no results for two consecutive passes, then bail).
                    //otherwise, try again
                    if (!res || res.length === 0) {
                        deferred.resolve();
                        return;
                    }

                    //otherwise there are items
                    var nonDuplicates = getNonDuplicates(res);

                    //send requests / store promises
                    var promises = createBatchVideoRequest(nonDuplicates);

                    if(promises.length === 0){
                        deferred.resolve();
                        return;
                    }

                    //wait for request to finish
                    $q.all(promises).then(function (res) {

                        var data = [];
                        for (var i = 0; i < res.length; i++) {
                            data = data.concat(res[i].data.items);
                        }

                        //populated related video id's (for now, only populating during first pass)
                        if(relatedPending && $scope.nextRelated.length === 0){
                            getRelatedVideos(data);
                        }

                        addVideosToList(data);

                        $scope.sort();

                        fetchResults(dateSmall, dateLarge, deferred);
                    }, function (err) {
                        deferred.reject();
                        stopSearch('Service unavailable', 'error');
                    })

                }, function (err) {
                    deferred.reject();
                    stopSearch('Service unavailable', 'error');
                });

                return deferred.promise;
            };

            /**
             * upddate categories.
             * different countries have different categories.  when a new country is selected, this method gets
             * called to refresh the categories list
             * @returns {*}
             */
            $scope.updateCategories = function(){
                var deferred = $q.defer();
                var payload = {url : youtubeVideoCategoriesBase + $scope.selectedCountry['alpha-2']};
                $http.post('api/youtube/get', payload).then(function(res){
                    $scope.videoCategories = res.data.items.filter(function(d){
                        if(d.snippet.assignable){
                            return d;
                        }
                    });
                    $scope.videoCategories.push(ALL_CATEGORIES);
                    $scope.selectedCategory = $scope.videoCategories[0];
                    deferred.resolve();
                });
                return deferred.promise;
            };

            /**
             * Perform search in popular videos mode
             */
            $scope.searchPopular = function(){
                resetSortOrders();
                $scope.searchResults = [];
                $scope.wasInterrupted = undefined;
                $scope.saveUrl = undefined;
                $scope.fetching = true;
                if($scope.selectedCategory && $scope.selectedCategory.id && $scope.selectedCategory.id > 0){
                    $scope.fetchPopularByCountryAndCategory($scope.selectedCountry['alpha-2'], $scope.selectedCategory.id);
                }
                else{
                    $scope.fetchPopularByCountryAll($scope.selectedCountry['alpha-2']);
                }
            };

            /**
             * get popular by country (loop through each assignable category))
             * @param countryAlphaCode
             * @param token
             */
            $scope.fetchPopularByCountryAll = function(countryAlphaCode, token){

                if($scope.wasInterrupted){
                    return;
                }

                token = token ? '&pageToken=' + token : '';

                var promises = [];
                var payload = {url : popularByCountryBase + countryAlphaCode + token};
                promises.push($http.post('api/youtube/get', payload));
                for(var i = 0; i < $scope.videoCategories.length - 1; i++){
                    payload = {url : popularByCountryBase + countryAlphaCode + '&videoCategoryId=' + $scope.videoCategories[i].id + token};
                    promises.push($http.post('api/youtube/get',payload));
                }

                //wait for all requests to complete
                $q.all(promises).then(function (res) {

                    //no results, then finish
                    if (!res || res.length === 0) {
                        stopSearch('Finished', 'info');
                        return;
                    }

                    //no items in any results, then finish
                    var sum = 0;
                    res.forEach(function (d) {
                        if (d.data && d.data.items) {
                            sum += d.data.items.length;
                        }
                    });
                    if (sum === 0) {
                        stopSearch('Finished', 'info');
                        return;
                    }

                    //set next page tokens
                    var nextPageToken = res[0].data.nextPageToken;

                    //otherwise there are items
                    var nonDuplicates = getNonDuplicates(res);

                    //query the statistics for each video
                    var promises = createBatchVideoRequest(nonDuplicates);

                    if(promises.length === 0){
                        stopSearch('Finished search', 'info');
                        return;
                    }

                    //wait for request to finish
                    $q.all(promises).then(function (res) {

                        var data = [];
                        for (var i = 0; i < res.length; i++) {
                            data = data.concat(res[i].data.items);
                        }

                        addVideosToList(data);

                        $scope.sort();

                        $scope.fetchPopularByCountryAll(countryAlphaCode, nextPageToken);
                    }, function (err) {
                        stopSearch('Service unavailable', 'error');
                    });
                });
            };

            /**
             * get most popular by category (and country - required for now)
             * @param countryAlphaCode
             * @param category
             * @param token
             */
            $scope.fetchPopularByCountryAndCategory = function(countryAlphaCode, category, token){

                if($scope.wasInterrupted){
                    return;
                }

                token = token ? '&pageToken=' + token : '';
                category = category || '';

                var payload = {'url' : popularByCountryBase + countryAlphaCode + '&videoCategoryId=' + category + token};
                $http.post('api/youtube/get', payload).then(function(res){
                    var nextPageToken = res.data.nextPageToken;

                    if(res.data.items.length > 0){

                        var nonDuplicates = getUniqueItemsFromResponse(res.data.items);

                        //query the statistics for each video
                        var promises = createBatchVideoRequest(nonDuplicates);

                        if(promises.length === 0){
                            stopSearch('Finished search', 'info');
                            return;
                        }

                        //wait for request to finish
                        $q.all(promises).then(function (res) {

                            var data = [];
                            for (var i = 0; i < res.length; i++) {
                                data = data.concat(res[i].data.items);
                            }

                            addVideosToList(data);

                            $scope.sort();

                            $scope.fetchPopularByCountryAndCategory(countryAlphaCode, category, nextPageToken);
                        }, function (err) {
                            stopSearch('Service unavailable', 'error');
                        });
                    }
                    else{
                        stopSearch('Finished search', 'info');
                    }
                });
            };

            /**
             * given data object in form of youtube api response, add videos to list
             * @param data
             */
            var addVideosToList = function(data){
                //for each video, add to the list
                for (var i = 0; i < data.length; i++) {
                    var datastats = data[i];
                    if (datastats) {
                        var title = datastats.snippet.title;
                        var channelTitle = datastats.snippet.channelTitle;
                        var channelId = datastats.snippet.channelId;
                        var created = new Date(datastats.snippet.publishedAt);
                        var id = datastats.id;

                        //format the pct likes
                        var pctLikes;
                        if (datastats.statistics.likeCount) {
                            pctLikes = (Number(datastats.statistics.likeCount) / (Number(datastats.statistics.likeCount) + Number(datastats.statistics.dislikeCount))) * 100
                        }
                        else if (datastats.statistics.dislikeCount) {
                            pctLikes = 0;
                        }
                        else {
                            pctLikes = undefined;
                        }

                        var viewCount = datastats.statistics.viewCount;
                        var likes = datastats.statistics.likeCount;
                        var dislikes = datastats.statistics.dislikeCount;

                        //extract duration from ISO 8601 (PT#H#M#S)
                        var duration = {};
                        if (datastats.contentDetails) {
                            duration = TimeService.isoToDuration(datastats.contentDetails.duration);
                        }

                        var videoObject = {
                            "title": title,
                            "safeTitle": title.substring(0,60).trim().replace(/\W+/g, "_"),
                            "channelTitle": channelTitle,
                            "channelId": channelId,
                            "created": created,
                            "videoId": id,
                            "pctLikes": pctLikes || 0,
                            "viewCount": Number(viewCount),
                            "likes": Number(likes) || 0,
                            "dislikes": Number(dislikes) || 0,
                            "thumbnail": datastats.snippet.thumbnails.medium,
                            "duration": duration.formatted || null,
                            "durationMinutes": duration.approxMinutes || null
                        };

                        //add object to search results
                        $scope.searchResults.push(videoObject);

                        if(!$scope.hashedResults[channelTitle]){
                            $scope.hashedResults[channelTitle] = {count : 0, views : 0, videos : []};
                        }
                        $scope.hashedResults[channelTitle].videos.push(videoObject);
                        $scope.hashedResults[channelTitle].views += videoObject.viewCount;
                        $scope.hashedResults[channelTitle].count++;
                    }
                }
            };

            /**
             * Given a youtube api data response, check each video to see if it is related to the original search
             * @param data
             */
            var getRelatedVideos = function(data){
                //split search term(s) into array
                var parts = $scope.searchParam.toLowerCase().split(' ' );

                //loop over each returned video
                for(var count = data.length - 1; count >= 0; count--){

                    //if the video has tags
                    if(data[count].snippet.tags){

                        //get the tags
                        var terms = data[count].snippet.tags.toString().toLowerCase();

                        var isRelevant = true;

                        //check if tags match what we searched for
                        for(var i = 0; i < parts.length; i++){

                            //if for any term in our search, it does NOT exist in the videos's tags, then we consider it not a relevant match
                            if(terms.toLowerCase().indexOf(parts[i]) < 0){
                                isRelevant = false;
                                break;
                            }
                        }

                        if(!isRelevant){
                            terms = data[count].snippet.title.toString().toLowerCase();
                            for(var i = 0; i < parts.length; i++){

                                //if for any term in our search, it does NOT exist in the videos's tags, then we consider it not a relevant match
                                if(terms.toLowerCase().indexOf(parts[i]) < 0){
                                    isRelevant = false;
                                    break;
                                }
                            }
                        }

                        //if relevant (terms are similar), then add to related list
                        if(isRelevant){
                            $scope.nextRelated.push(data[count].id);
                        }
                    }
                }

                //nextRelated gets spliced and does not retain its initial size.
                //in order to easily track progress of the extended search progress, I am saving the
                //total number of related videos in a variable that will not be altered
                $scope.nextRelatedInitialLength = $scope.nextRelated.length;
            };

            /**
             * return list of videos that do not already exist in searchResult array
             * @param res
             * @returns {Array}
             */
            var getNonDuplicates = function(res){
                var nonDuplicates = [];
                for (var i = 0; i < res.length; i++) {

                    //set next page tokens
                    for (var j = 0; j < sortOrders.length; j++) {
                        sortOrders[j].token = res[0].data.nextPageToken;
                    }

                    //get all items from response
                    var currentNonDuplicates = nonDuplicates.slice(0);
                    nonDuplicates = nonDuplicates.concat(getUniqueItemsFromResponse(res[i].data.items, currentNonDuplicates));
                }
                return nonDuplicates;
            };

            var getUniqueItemsFromResponse = function(items, currentNonDuplicates){

              var nonDuplicates = currentNonDuplicates || [];
              var newVideos = [];

              //loop through all items in response
              for (var j = 0; j < items.length; j++) {

                  var itemVideoId = items[j].id.videoId || items[j].id;

                  //check if already exists in main array or temp nonDuplicates array
                  if ($scope.searchResults.filter(function (d) {
                          if (d.videoId == itemVideoId) {
                              return d;
                          }
                      }).length === 0 && nonDuplicates.filter(function (d) {

                          if (d.id.videoId === itemVideoId) {
                              return d;
                          }
                      }).length === 0) {
                      newVideos.push(items[j]);
                      nonDuplicates.push(items[j]);
                  }
              }

              return newVideos;
            }

            /**
             * send batch requests (50 per)
             * @param nonDuplicates
             * @returns {Array} of promises
             */
            var createBatchVideoRequest = function(nonDuplicates){
                var promises = [];
                for (var i = 0; i < nonDuplicates.length; i++) {

                    //create list of video id's (max list size of 50).
                    var count = 0;
                    var idList = [];
                    while (count < 50 && i < nonDuplicates.length) {
                        var videoId = null;
                        if(nonDuplicates[i].contentDetails && nonDuplicates[i].contentDetails.videoId){
                            videoId = nonDuplicates[i].contentDetails.videoId;
                        } else{
                            videoId = nonDuplicates[i].id.videoId || nonDuplicates[i].id;
                        }
                        idList.push(videoId);
                        i++;
                        count++;
                    }

                    //create a promise with list of video id's for the batch request
                    var payload = {'url' : youtubeVideoBase + idList.toString()};
                    promises.push($http.post('api/youtube/get', payload));
                }
                return promises;
            };

            var handleFetchIterationComplete = function(){

                //if the related videos is empty, or search related videos is turned off then finish the search
                if($scope.nextRelated.length == 0 || !$scope.extendedSearch || $scope.wasInterrupted){
                    relatedPending = false;
                    stopSearch('Finished search', 'info');
                    return;
                }
                resetSortOrders();
                relatedPending = false;
                $scope.related = $scope.nextRelated[0];
                $scope.nextRelated.splice(0,1);
                $scope.checkRelated = true;
                fetchResultsWrapper(false);
            };

            /**
             * ---------------------------------------------------
             * -------------- SORT & FILTER methods --------------
             * ---------------------------------------------------
             */

            /**
             * opens the, well... report modal
             */
            $scope.openReportModal = function(){
                var modalInstance = $uibModal.open({
                    templateUrl: 'partials/reportModal.html',
                    controller: 'ReportModalCtrl',
                    size: 'lg',
                    windowClass : 'report-modal',
                    resolve: {
                        content: function () {
                            return {
                                'hashedResults' : $scope.hashedResults,
                                'channelFilter' : $scope.channelFilter
                            }
                        }
                    }
                });

                //on resolution or dismiss call filterByChannel
                modalInstance.result.then(function () {
                    $scope.filterByChannel();
                }, function () {
                    $scope.filterByChannel();
                });
            };

            var addQuickFilterTerm = function(term){
              if(!term || !term.trim()){
                return;
              }

              $scope.quickFilterTerms.push({
                'value' : term.trim().replace("!",""),
                'negate': term.startsWith('!')
              });
            }

            $scope.updateQuickFilter = function(){

              if(!$scope.filterText || $scope.filterText.trim().length === 0){
                  $scope.quickFilterTerms = [];
                  return;
              }

              var searchText = $scope.filterText.toLowerCase().trim();
              $scope.quickFilterTerms = [];

              var terms = [];
              var temp = '';
              for(var i = 0; i < searchText.length; i++){
                 if(searchText.charAt(i) === ' ' || i === (searchText.length - 1)){
                   if(temp.length > 0){
                     temp += searchText.charAt(i) === '"' ? '' : searchText.charAt(i);
                     addQuickFilterTerm(temp);
                     temp = '';
                   }
                 }
                 else if(searchText.charAt(i) === '"'){
                   //if temp is not empty, then the quote occurred after a non-space, so add current temp string to term list
                   if(temp.length > 0){
                     addQuickFilterTerm(temp);
                     temp = '';
                   }

                  //if quote occurs as last character and is not a closing quote, then break
                   if(i === (searchText.length - 1)){
                     break;
                   }

                  //find the closing quote
                   var closeQuoteIndex = searchText.substring(i+1).indexOf('"');

                   //if no closing quote, then split on spaces and bail
                   if(closeQuoteIndex < 0){
                     searchText.substring(i+1).replace('"','').split(" ").forEach(function(str){
                       addQuickFilterTerm(str);
                     });
                     break;
                   } else{
                     closeQuoteIndex = i + searchText.substring(i+1).indexOf('"') + 1;
                     //otherwise push the quote wrapped string to end of array
                     var newTerm = searchText.substring(i+1, closeQuoteIndex).trim();
                     if(newTerm){
                        addQuickFilterTerm(newTerm);
                     }

                     //place iterator after closing quote
                     i = closeQuoteIndex;
                   }
                 }
                 else{
                    //not a space or quote,then add character to temp string
                     temp += searchText.charAt(i);
                 }
              }

            };

            /**
             * filter by text in quick filter text box
             * @param video
             * @returns {boolean}
             */
            var quickFilter = function(video){
                if($scope.quickFilterTerms.length === 0){
                    return true;
                }
                else{

                  //get video & channel title
                  var videoTitle = video.title.toLowerCase();
                  var channelTitle = video.channelTitle.toLowerCase();

                  //exact mode
                  if($scope.quickFilterType == 0){
                    for(var i = 0; i < $scope.quickFilterTerms.length; i++){
                      if(!isTextInVideo(videoTitle, channelTitle, $scope.quickFilterTerms[i])){
                        return false;
                      }
                    }
                    return true;
                  }
                  else {
                    for(var i = 0; i < $scope.quickFilterTerms.length; i++){
                      if(isTextInVideo(videoTitle, channelTitle, $scope.quickFilterTerms[i])){
                        return true;
                      }
                    }
                    return false
                  }
                }
            };

            var isTextInVideo = function(videoTitle, videoChannelTitle, searchText){
              if(searchText.negate){
                  return !((videoTitle.indexOf(searchText.value) > -1) || (videoChannelTitle.indexOf(searchText.value) > -1));
              }
              return (videoTitle.indexOf(searchText.value) > -1) || (videoChannelTitle.indexOf(searchText.value) > -1);
            };

            $scope.removeQuickFilterTerm = function(term){
              for(var i = $scope.quickFilterTerms.length -1; i >= 0; i--){
                if($scope.quickFilterTerms[i] === term){
                  $scope.quickFilterTerms.splice(i,1);
                }
              }
              $scope.filter();
            }

            /**
             * Filter by the selected channel(s).
             * When this method is called, it ignores the other filters.
             * If, however, the channelList array is empty, then standard filter is called.  This is because the user
             * can clear out all channel filters in the channel filter / summary modal.  When they resolve the modal, this
             * method is invoked regardless.  So if they clear out all channel filter entries, then normal filter is called.
             */
            $scope.filterByChannel = function(){
                if($scope.channelFilter.length === 0 || !$scope.enableChannelFilter){
                    $scope.filter();
                    return;
                }

                $scope.isChannelFilterEnabled = true;
                $scope.filteredResults = $scope.searchResults.filter(function(d){
                 if(!$scope.channelFilter || $scope.channelFilter.length === 0){
                     $scope.isChannelFilterEnabled = false;
                     return d;
                 }
                  for(var i = 0; i < $scope.channelFilter.length; i++){
                      if(d.channelTitle.toLowerCase() === $scope.channelFilter[i]){
                          return d;
                      }
                  }
                 });
                $scope.paginate();
            };

            $scope.removeChannelFilter = function(channelTitle){
                var idx = $scope.channelFilter.indexOf(channelTitle);
                $scope.channelFilter.splice(idx, 1);
                $scope.channelFilter.length > 0 ? $scope.filterByChannel() : $scope.filter();
            };

            $scope.sort = function(){
                var sortObject = $scope.sortOptions.filter(function(d){if(d.value === $scope.sortField.value){return d;}})[0];
                $scope.searchResults = $scope.searchResults.sort(function(a,b){
                    if(a[sortObject.value] > b[sortObject.value]){
                        return sortObject.direction;
                    } else if(a[sortObject.value] < b[sortObject.value]){
                        return -sortObject.direction;
                    }
                    return 0;
                });
                $scope.filter();
            };

            var checkDate = function(date){
              var timestamp=Date.parse(date)
              return(isNaN(timestamp)==false);
            }

            var checkCookies = function(){
              if($cookies.get("youtubeagent_hasCookies") == 'true'){
                $scope.sortField.value = $cookies.get('youtubeagent_sortField');
                $scope.minViews = $cookies.get('youtubeagent_minViews') ? Number($cookies.get('youtubeagent_minViews')) : null;
                $scope.minDislikes = $cookies.get('youtubeagent_minDislikes') ? Number($cookies.get('youtubeagent_minDislikes')) : null;
                $scope.minDate = checkDate($cookies.get('youtubeagent_minDate')) ? new Date($cookies.get('youtubeagent_minDate')) : null;
                $scope.maxDate = checkDate($cookies.get('youtubeagent_maxDate')) ? new Date($cookies.get('youtubeagent_maxDate')) : null;
                $scope.minRating = $cookies.get('youtubeagent_minRating') ? Number($cookies.get('youtubeagent_minRating')) : null;
                $scope.shorterThanFilter = $cookies.get('youtubeagent_shorterThanFilter') ? Number($cookies.get('youtubeagent_shorterThanFilter')) : null;
                $scope.longerThanFilter = $cookies.get('youtubeagent_longerThanFilter') ? Number($cookies.get('youtubeagent_longerThanFilter')) : null;
                $scope.preSearchMaxDate = checkDate($cookies.get('youtubeagent_preSearchMaxDate')) ? new Date($cookies.get('youtubeagent_preSearchMaxDate')) : null;
                $scope.preSearchMinDate = checkDate($cookies.get('youtubeagent_preSearchMinDate')) ? new Date($cookies.get('youtubeagent_preSearchMinDate')) : null;
                $scope.safeSearch = $cookies.get('youtubeagent_safeSearch');
                $scope.extendedSearch = $cookies.get('youtubeagent_extendedSearch') === 'true';
              }
            };

            var setSortOptionCookies = function(){
                $cookies.put('youtubeagent_hasCookies',true);
                $cookies.put('youtubeagent_searchResults',$scope.searchResults);
                $cookies.put('youtubeagent_sortField',$scope.sortField.value);
                $cookies.put('youtubeagent_minViews',$scope.minViews);
                $cookies.put('youtubeagent_minDislikes',$scope.minDislikes);
                $cookies.put('youtubeagent_minDate',$scope.minDate || null);
                $cookies.put('youtubeagent_maxDate',$scope.maxDate || null);
                $cookies.put('youtubeagent_minRating',$scope.minRating);
                $cookies.put('youtubeagent_shorterThanFilter',$scope.shorterThanFilter);
                $cookies.put('youtubeagent_longerThanFilter',$scope.longerThanFilter);
                $cookies.put('youtubeagent_preSearchMaxDate',$scope.preSearchMaxDate || null);
                $cookies.put('youtubeagent_preSearchMinDate',$scope.preSearchMinDate || null);
                $cookies.put('youtubeagent_safeSearch',$scope.safeSearch);
                $cookies.put('youtubeagent_extendedSearch',$scope.extendedSearch);
            };

            var createJsonObjectForFile = function(){
              return {
                'searchResults':$scope.searchResults,
                'sortField': $scope.sortField.value,
                'filterText': $scope.filterText,
                'minViews': $scope.minViews,
                'minDislikes': $scope.minDislikes,
                'minDate': $scope.minDate,
                'maxDate': $scope.maxDate,
                'minRating': $scope.minRating,
                'shorterThanFilter': $scope.shorterThanFilter,
                'longerThanFilter': $scope.longerThanFilter,
                'quickFilterTerms': $scope.quickFilterTerms,
                'searchParam': $scope.searchParam,
                'quickFilterType': $scope.quickFilterType,
                'searchMode' : $scope.searchMode,
                'hashedResults' : $scope.hashedResults
              }
            };

            var setupJsonObjectsFromFile = function(json){

              if(!json.searchResults){
                toaster.pop('error', '', 'Unable to read file');
                return;
              }

              $scope.reset();

              $scope.searchResults = json.searchResults;
              $scope.sortField.value = json.sortField;
              $scope.filterText = json.filterText;
              $scope.minViews = json.minViews;
              $scope.minDislikes = json.minDislikes;
              $scope.minDate = json.minDate ? new Date(json.minDate) : null;
              $scope.maxDate = json.maxDate ? new Date(json.maxDate) : null;
              $scope.minRating = json.minRating;
              $scope.shorterThanFilter = json.shorterThanFilter;
              $scope.longerThanFilter = json.longerThanFilter;
              $scope.quickFilterTerms = json.quickFilterTerms;
              $scope.quickFilterType = json.quickFilterType;
              $scope.searchParam = json.searchParam;
              $scope.searchMode = json.searchMode || $scope.TEXT_SEARCH;
              $scope.hashedResults = json.hashedResults;

              //convert date properties (they come back as strings) on search results back to date objects
              $scope.searchResults.forEach(function(video){
                video.created = new Date(video.created);
              });

              $scope.quickFilterReadonly = true;
              $scope.updateQuickFilter();

              //backwards compatible hashed results
              if(!$scope.hashedResults){
                $scope.hashedResults = {};
                for(var i = 0; i < $scope.searchResults.length; i++){
                  var channelTitle = $scope.searchResults[i].channelTitle;
                  if(!$scope.hashedResults[channelTitle]){
                      $scope.hashedResults[channelTitle] = {count : 0, views : 0, videos : []};
                  }
                  $scope.hashedResults[channelTitle].videos.push($scope.searchResults[i]);
                  $scope.hashedResults[channelTitle].views += $scope.searchResults[i].viewCount;
                  $scope.hashedResults[channelTitle].count++;
                }
              }
            }

            $scope.filter = function(){
                if((!$scope.filterText || $scope.filterText.trim().length === 0) && !$scope.minViews && (!$scope.minDislikes && $scope.minDislikes !== 0) && !$scope.minDate && !$scope.shorterThanFilter && !$scope.longerThanFilter && !$scope.minRating){
                    $scope.filteredResults = $scope.searchResults;
                }
                else{
                    $scope.filteredResults = $scope.searchResults.filter(function(d){
                        if(((!$scope.minDislikes && $scope.minDislikes !== 0) || d.dislikes <= $scope.minDislikes) &&
                            (!$scope.minViews || d.viewCount >= $scope.minViews) &&
                            (!$scope.minRating || d.pctLikes >= $scope.minRating) &&
                            (!$scope.maxDate || d.created <= $scope.maxDate) &&
                            (!$scope.minDate || d.created >= $scope.minDate) && durationFilter(d) && quickFilter(d)){
                            return d;
                        }
                    });
                }
                $scope.setSaveUrl();
                $scope.paginate();
            };

            var durationFilter = function(video){
                //for clarity split up statements
                //1. if video.durationMinutes is not defined, then return true immediately
                //2. otherwise check the filters
                if(isNaN(video.durationMinutes) || !video.durationMinutes){
                    return true;
                }

                if($scope.longerThanFilter >= $scope.shorterThanFilter || $scope.shorterThanFilter < 0){
                    $scope.shorterThanFilter = '';
                }

                if($scope.longerThanFilter < 0){
                    $scope.longerThanFilter = 0;
                }

                return (isNaN($scope.longerThanFilter) || video.durationMinutes >= $scope.longerThanFilter) &&
                    (isNaN($scope.shorterThanFilter) || !$scope.shorterThanFilter || video.durationMinutes <= $scope.shorterThanFilter)
            };

            $scope.setPreSearchFiltersVisible = function(val){
                $scope.preSearchFiltersVisible = val;
            };

            $scope.setFilterVisible = function(val){
                $scope.filterVisible = val;
            };

            $scope.setSortVisible = function(val){
                $scope.sortVisible = val;
            };

            $scope.disableAudioDownload = function(video){
              video.downloadAudioDisabled = true;
            };

            $scope.disableVideoDownload = function(video){
              video.downloadVideoDisabled = true;
            };

            var getVideoById = function(){
              $http.post('api/youtube/get', {url : youtubeVideoBase + $scope.searchParam}).then(function(res){
                if(res.data.items.length > 0){
                    addVideosToList(res.data.items);
                    $scope.sort();
                    $scope.fetching = false;
                    return;
                }
                stopSearch('Could not find playlist or video', 'warning');
              }, function(err){
                stopSearch('Could not find playlist or video', 'warning');
              });
            };

            var getVideosInPlaylist = function(){
              var deferred = $q.defer();
              $scope.fetching = true;
              PlaylistService.getVideosInPlaylist($scope.searchParam).then(function(videos){
                var nonDups = getNonDuplicates(videos);

                var promises = createBatchVideoRequest(nonDups);

                $q.all(promises).then(function (res) {
                    var data = [];
                    for (var i = 0; i < res.length; i++) {
                        data = data.concat(res[i].data.items);
                    }

                    addVideosToList(data);
                    $scope.sort();

                    $scope.fetching = false;

                    deferred.resolve();
                }, function (err) {
                    deferred.resolve();
                    stopSearch('Service unavailable', 'error');
                })
              }, function(err){
                deferred.reject();
              });

              return deferred.promise;
            }

            $scope.setSelectedIntervalType = function(value){
                $scope.selectedIntervalType = value;
            };

            $scope.closeAlert = function(idx){
                $scope.alerts.splice(idx,1);
            };

            $scope.setSaveUrl = function(){
              var data = createJsonObjectForFile();
              var json = JSON.stringify(data);
              var blob = new Blob([json], {type: "application/json"});
              $scope.saveUrl  = URL.createObjectURL(blob);
              $scope.saveName = $scope.searchParam.replace(" ","_") + new Date().getTime().toString() + ".json";
            };

            $scope.uploadFile = function(files) {

              if(files.length > 1){

                //must select only one file
                toaster.pop('error','','Please select only one file');
                return;
              } else {

                //get the file, and validate
                var file = files[0];

                if(file.size > 26214400 || file.type !== 'application/json'){
                  //max file size 25mb and must be json
                  toaster.pop('error','','Please upload a json file less than 15mb')
                  return;
                }

                //upload the file
                readAsDataURL(files[0], $scope).then(function(res){
                  $http.get(res).then(function(json){
                    setupJsonObjectsFromFile(json.data);
                    $scope.sort();
                  }, function(err){
                    toaster.pop('error', '', 'Unable to read file');
                    console.log(err);
                  })
                });
              }
            };

            var onLoad = function(reader, deferred, scope) {
                return function () {
                    scope.$apply(function () {
                        deferred.resolve(reader.result);
                    });
                };
            };

            var onError = function (reader, deferred, scope) {
                return function () {
                    scope.$apply(function () {
                        deferred.reject(reader.result);
                    });
                };
            };

            var onProgress = function(reader, scope) {
                return function (event) {
                    scope.$broadcast("fileProgress",
                        {
                            total: event.total,
                            loaded: event.loaded
                        });
                };
            };

            var getReader = function(deferred, scope) {
                var reader = new FileReader();
                reader.onload = onLoad(reader, deferred, scope);
                reader.onerror = onError(reader, deferred, scope);
                reader.onprogress = onProgress(reader, scope);
                return reader;
            };

            var readAsDataURL = function (file, scope) {
                var deferred = $q.defer();

                var reader = getReader(deferred, scope);
                reader.readAsDataURL(file);

                return deferred.promise;
            };

            $scope.scrollToElement = function(elementId, endOfDigest){
              if(endOfDigest){
                  $timeout(function(){
                    var id = elementId || '';
                    $anchorScroll(id);
                  },0);
              } else{
                var id = elementId || '';
                $anchorScroll(id);
              }
            };

            $scope.checkDisablePostFilter = function(){
              if($scope.preSearchMinDate || $scope.preSearchMaxDate){
                $scope.disablePostDateFilters = true;
                $scope.maxDate = $scope.preSearchMaxDate;
                $scope.minDate = $scope.preSearchMinDate;
              } else{
                $scope.disablePostDateFilters = false;
              }
            };

            $scope.getSearchBoxPlaceholder = function(){
              if($scope.searchMode === $scope.TEXT_SEARCH){
                return 'Enter search terms';
              } else if($scope.searchMode === $scope.PLAYLIST_SEARCH){
                return 'Enter a youtube playlist id or video id';
              } else if($scope.searchMode === $scope.MOST_VIEWED_SEARCH){
                return 'Search most viewed videos on Youtube';
              }
            };

            init();

        }]);
})();
