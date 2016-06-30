/**
 * HomeCtrl.js - Primvary controller. Handles the loading of videos, sorting and filtering.
 */
(function(){
    angular.module('youtubeSearchApp').controller('HomeCtrl', [
        '$rootScope', '$scope', '$http', '$q', '$log', '$timeout', '$location', 'TimeService', 'toaster', '$window', '$uibModal', 'AuthService', 'PlaylistService', '$sce', 'CountriesService',
        function($rootScope, $scope, $http, $q, $log, $timeout, $location, TimeService, toaster, $window, $uibModal, AuthService, PlaylistService, $sce, CountriesService){

            var youtubeSearchBase = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=';
            var youtubeVideoBase = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=';
            var popularByCountryBase = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&maxResults=50&chart=mostPopular&regionCode=';
            var youtubeVideoCategoriesBase = 'https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=';

            $scope.dateIntervalTypes = {
                'BIENNIAL' : 2,
                'ANNUAL' : 1,
                'BIANNUAL' : 0.5
            };

            var resetPagination = function(){
                $scope.pagination = {
                    currentPage : 1,
                    resultsPerPage : 100
                };
            };

            $scope.getPages = function(){
              return new Array(Math.ceil($scope.filteredResults.length / $scope.pagination.resultsPerPage));
            };

            $scope.paginate = function(){
                var startIndex = ($scope.pagination.currentPage-1) * $scope.pagination.resultsPerPage;
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
            $scope.WATCHLIST_MODAL_CTRL = 'WatchlistModalCtrl';
            $scope.BULK_PLAYLIST_MODAL_CTRL = 'BulkPlaylistModalCtrl';
            var ALL_CATEGORIES = {'id' : '-1', 'snippet' : {'title' : 'Search All Categories'}};
            var relatedPending = false;
            var iteration = 0;

            var regionCode = '';
            var related= '';
            var videoDuration= '';
            var videoCategoryId= '';
            var safeSearch= '';

            $scope.videoDurationOptions = ['any','long','medium','short'];
            $scope.safeSearchOptions = ['moderate', 'none', 'strict'];

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
                resetPagination();

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

            $scope.setPlaying = function(video, val){
                video.playing = val;
            };

            $scope.getIFrameSrc = function (videoId) {
                return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId);
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
            };

            /**
             * reset sort order objects (main purpose of this is to reset the tokens)
             */
            var resetSortOrders = function(){
                sortOrders = [
                    {order : 'relevance', token : ''},
                    {order : 'rating', token : ''},
                    {order : 'date', token : ''},
                    {order : 'viewCount', token : ''},
                    {order : 'title', token : ''}
                ];
            };

            /**
             * perform a new search
             */
            $scope.doSearch = function(){

                //if already searching, just return immediately
                if($scope.fetching){
                    return;
                }

                //if a search term exists
                $scope.searchParam = $scope.searchParam.trim();
                if($scope.searchParam){

                    $scope.alerts = [];

                    resetPagination();

                    iteration = 0;
                    $scope.related = undefined;
                    $scope.nextRelated = [];
                    $scope.checkRelated = false;
                    relatedPending = true;

                    resetSortOrders();
                    $scope.searchResults = [];
                    $scope.hashedResults = {};
                    $scope.channelFilter = [];
                    $scope.tableData = [];

                    $scope.wasInterrupted = undefined;
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
                    fetchResultsWrapper(0);
                }
            };

            /**
             * method that accepts an iteration number, and whether or not to cancel the search.
             * The method calls fetch results, then waits for all requests to finish.
             * If the yearlySearch is on, it will perform 5 additional searches between date spans to help improve results
             * @param iteration
             * @param cancel
             */
            var fetchResultsWrapper = function(iteration, cancel){

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
                //if($scope.intervalSearch && !related){
                //
                //    for(var j = 0; j < 10 / $scope.selectedIntervalType; j++){
                //        var date = new Date();
                //        var large = new Date(date.getTime()-j*$scope.selectedIntervalType*1000*60*60*24*365);
                //        var small = new Date(large.getTime() - 1000*60*60*24*365*$scope.selectedIntervalType);
                //
                //        dateSmall = "&publishedAfter=" + small.toISOString();
                //        dateLarge = "&publishedBefore=" + large.toISOString();
                //        for (var i = 0; i < sortOrders.length; i++) {
                //            var token = sortOrders[i].token ? '&pageToken=' + sortOrders[i].token : '';
                //
                //            promises.push($http.post('api/youtube/get', {'url' : youtubeSearchBase + $scope.searchParam + "&type=video&maxResults=50" +
                //            dateSmall + dateLarge + regionCode + videoDuration + videoCategoryId + safeSearch +
                //            "&order=" + sortOrders[i].order + related  + token}));
                //        }
                //    }
                //}
                //else{
                    //for each sort order type, execute the GET request.  doing this so that more results are returned.
                    for (var i = 0; i < sortOrders.length; i++) {
                        var token = sortOrders[i].token ? '&pageToken=' + sortOrders[i].token : '';

                        promises.push($http.post('api/youtube/get', {'url' : youtubeSearchBase + $scope.searchParam + "&type=video&maxResults=50" +
                        dateSmall + dateLarge + regionCode + videoDuration + videoCategoryId + safeSearch +
                        "&order=" + sortOrders[i].order + related  + token}));
                    }
                //}

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
                $scope.searchResults = [];
                $scope.wasInterrupted = undefined;
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
                    var items = res[i].data.items;

                    //loop through all items in response
                    for (var j = 0; j < items.length; j++) {

                        //check if already exists in main array or temp nonDuplicates array
                        if ($scope.searchResults.filter(function (d) {
                                if (d.videoId == items[j].id.videoId) {
                                    return d;
                                }
                            }).length === 0 && nonDuplicates.filter(function (d) {
                                if (d.id.videoId === items[j].id.videoId) {
                                    return d;
                                }
                            }).length === 0) {
                            nonDuplicates.push(items[j]);
                        }
                    }
                }
                return nonDuplicates;
            };

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
                        idList.push(nonDuplicates[i].id.videoId);
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
                iteration++;
                resetSortOrders();
                relatedPending = false;
                $scope.related = $scope.nextRelated[0];
                $scope.nextRelated.splice(0,1);
                $scope.checkRelated = true;
                fetchResultsWrapper(0,false);
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

            /**
             * filter by text in quick filter text box
             * @param video
             * @returns {boolean}
             */
            var quickFilter = function(video){
                if(!$scope.filterText || $scope.filterText.trim().length === 0){
                    return true;
                }
                else{
                    $scope.filterText = $scope.filterText.toLowerCase().trim();
                    if($scope.negateFilter){
                        if(!(video.title.toLowerCase().indexOf($scope.filterText) > -1 || video.channelTitle.toLowerCase().indexOf($scope.filterText) > -1)){
                            return true;
                        }
                    }
                    else{
                        if(video.title.toLowerCase().indexOf($scope.filterText) > -1 || video.channelTitle.toLowerCase().indexOf($scope.filterText) > -1){
                            return true;
                        }
                    }
                }
            };

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

            $scope.filter = function(){
                if((!$scope.filterText || $scope.filterText.trim().length === 0) && !$scope.minViews && (!$scope.minDislikes && $scope.minDislikes !== 0) && !$scope.minDate && !$scope.shorterThanFilter && !$scope.longerThanFilter && !$scope.minRating){
                    $scope.filteredResults = $scope.searchResults;
                }
                else{
                    $scope.filteredResults = $scope.searchResults.filter(function(d){
                        if(((!$scope.minDislikes && $scope.minDislikes !== 0) || d.dislikes <= $scope.minDislikes) &&
                            (!$scope.minViews || d.viewCount >= $scope.minViews) &&
                            (!$scope.minRating || d.pctLikes >= $scope.minRating) &&
                            (!$scope.maxDate || d.created >= $scope.maxDate) &&
                            (!$scope.minDate || d.created >= $scope.minDate) && durationFilter(d) && quickFilter(d)){
                            return d;
                        }
                    });
                }
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

            $scope.disableDownload = function(video){
              video.downloadDisabled = true;
            };

            $scope.setSelectedIntervalType = function(value){
                $scope.selectedIntervalType = value;
            };

            $scope.closeAlert = function(idx){
                $scope.alerts.splice(idx,1);
            };

            init();

        }]);
})();