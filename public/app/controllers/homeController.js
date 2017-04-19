/**
 * HomeCtrl.js - Primvary controller. Handles the loading of videos, sorting and filtering.
 */
(function(){
    angular.module('youtubeSearchApp').controller('HomeCtrl', [
        '$rootScope', '$scope', '$http', '$q', '$routeParams', '$log', '$timeout', '$location', 'TimeService', 'toaster', '$window', '$uibModal', 'AuthService', 'PlaylistService', '$sce', 'CountriesService', '$anchorScroll', '$cookies', 'DirectionsService', 'FileSaver', 'Blob', 'NgMap',
        function($rootScope, $scope, $http, $q, $routeParams, $log, $timeout, $location, TimeService, toaster, $window, $uibModal, AuthService, PlaylistService, $sce, CountriesService, $anchorScroll, $cookies, DirectionsService, FileSaver, Blob, NgMap){


            //*********** START LANGUAGE / MAP LOGIC ****************

            //map variables
            $scope.googleMapsUrl={
              url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDE3EI_Yy2IKmN7aL0tVug3w-sR1tVnGwY',
            };

            // $scope.googleMapsUrl={
            //   url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA7mIz_md82p22_U9TDhCsz8PoMRrnt5RI',
            // };

            var MILE = 1609.34;             //set constant for meter to mile conversions
            $scope.locationDiameter = 625; //set initial diameter
            $scope.pos = {lat:40, lng:-95}; //default location to ~center of US
            $scope.circleRadius = $scope.locationDiameter/2 * MILE; //set default radius
            NgMap.getMap(); //initialize the map

            //language variables
            $scope.lang = {
              fromLanguage: 'en',
              toLanguage: ''
            };
            $scope.languages = [];
            var TRANSLATE_URL_BASE = 'https://translation.googleapis.com/language/translate/v2?format=text&q=';

            //on map clicks, update the lon/lat values
            $scope.mapClick = function(evt){
              $scope.pos = {
                lat: evt.latLng.lat(),
                lng: evt.latLng.lng()
              };
            };

            //on map drag events, update lon/lat values
            $scope.mapDrag = function(evt){
              $scope.pos = {
                lat: evt.latLng.lat(),
                lng: evt.latLng.lng()
              };
            }

            //handle rzSlider event by updating size of circle (method returns radius in meters)
            $scope.updateScale = function(){
              $scope.circleRadius = ($scope.locationDiameter/2) * MILE;
            };

            //toggle map visibility. additionally, if showing the map then also refresh the slider
            $scope.toggleMap = function(){
              $scope.searchLocation = !$scope.searchLocation;
              if($scope.searchLocation){
                $scope.refreshSlider();
              }
            }

            //handle refreshing the slider to prevent ui issues
            $scope.refreshSlider = function () {
              $timeout(function () {
                  $scope.$broadcast('rzSliderForceRender');
              });
            };

            //load all supported languages via youtube api
            $scope.loadLanguages = function(){
              $http.post('api/youtube/get', {url: 'https://www.googleapis.com/youtube/v3/i18nLanguages?part=snippet'}).then(function(res){
                $scope.languages = res.data.items;
                $scope.languages.sort(function(a,b){
                  return a.snippet.name > b.snippet.name ? 1 : a.snippet.name < b.snippet.name ? -1 : 0;
                });
                $scope.lang.toLanguage = $scope.languages.filter(function(d){
                  return d.id === 'de';
                })[0];
              });
            };

            //translate text
            $scope.translate = function(obj, isSearchParam, searchParam){
              var deferred = $q.defer();
              var term = obj ? obj.term : searchParam;
              if($scope.shouldTranslate && $scope.lang.toLanguage && term){
                var translateUrl = TRANSLATE_URL_BASE + encodeURI(term) + '&target=' + $scope.lang.toLanguage.id;
                $http.post('api/translation/translate', {url: translateUrl}).then(function(res){
                  var translation = res.data.data.translations.length > 0 ? res.data.data.translations[0].translatedText : '';
                  if(translation){
                    if(isSearchParam){
                      $scope.searchParam = translation;
                    } else{
                      obj.term = translation;
                    }
                  }
                  deferred.resolve();
                });
              } else{
                deferred.resolve();
              }

              return deferred.promise;
            };

            //explicitly, check translation for the search parameter
            //since the translation is asynchronous, this is to handle cases when search is clicked prior
            //to clicking away from the search box.
            $scope.checkTranslation = function(){
              var deferred = $q.defer();
              if($scope.shouldTranslate){
                return $scope.translate(null, true, $scope.searchParam)
              }
              deferred.resolve();
              return deferred.promise;
            }

            //*********** END LANGUAGE / MAP LOGIC ****************

            $scope.userPlaylist = {};

            //Datepicker
            $scope.openDatepicker = function (prop) {
                $scope.datepicker[prop] = true;
                  return;
            };

            $scope.datepickerOptions = {
                formatYear: 'yyyy',
                startingDay: 1
            };

            $rootScope.showTutorial = function(start, direction){
              if(start){
                DirectionsService.reset();
              }
              var direction = direction || DirectionsService.getNext();
              if(direction.element){
                  $scope.scrollToElement(direction.element);
              }
              var modalInstance = $uibModal.open({
                  templateUrl: 'partials/directionsModal.html',
                  controller: 'DirectionsModalCtrl',
                  size: 'lg',
                  resolve: {
                      content: function () {
                          return {
                              'direction' : direction
                          }
                      }
                  }
              });

              modalInstance.result.then(function(data){
                if(data){
                  $rootScope.showTutorial(false, data);
                  return;
                }
                $scope.scrollToElement('title-text');
              }, function(){
                $scope.scrollToElement('title-text');
                console.log('tut ended');
              });
            };

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

            var RelatedThreshold = {
              WEAK : 25,
              MEDIUM : 40,
              STRICT: 65
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
              $scope.checkDisablePostFilter();
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
            var ALL_CATEGORIES = {'id' : '-1', 'snippet' : {'title' : 'Search All Categories'}};
            var relatedPending = false;

            var regionCode = '';
            var related= '';
            var videoDuration= '';
            var videoCategoryId= '';
            var safeSearch= '';
            var latlng= '';

            $scope.videoDurationOptions = ['any','long','medium','short'];
            $scope.safeSearchOptions = ['moderate', 'none', 'strict'];

            $scope.quickFilterVisible = false;

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
            function SortOption(id, value, direction, glyph, displayName){
                this.id = id;
                this.value = value;
                this.direction = direction;
                this.glyph = glyph;
                this.displayName = displayName;
            };

            var SortModeTypes = {
              RANDOM : 'Random'
            };

            $scope.quickFilterType = {
              MUST_HAVE : 1,
              ONE_OF : 2,
              EXCLUDE : 3
            };

            /**
             * setup view
             */
            var init = function(){

                $scope.tags = {};
                $scope.tagsArray = [];

                $scope.quickFilterObjects = [
                  {id:1, type:$scope.quickFilterType.MUST_HAVE, quickfilterType:'Must have', terms : [{id:1,term:""}]},
                  {id:2, type:$scope.quickFilterType.ONE_OF, quickfilterType:'Atleast One', terms : [{id:1,term:""}]},
                  {id:3, type:$scope.quickFilterType.EXCLUDE, quickfilterType:'Exclude', terms : [{id:1,term:""}]}
                ];

                $scope.removedVideos = [];

                $scope.autoplay = true;

                resetPagination();

                $scope.datepicker = {};

                $scope.selectedIntervalType = $scope.dateIntervalTypes.BIENNIAL;
                $scope.intervalSearch = false;
                $scope.extendedSearch = false;

                $scope.videoDuration = $scope.videoDurationOptions[0];
                $scope.safeSearch = $scope.safeSearchOptions[0];
                $scope.preSearchFiltersVisible = $scope.sortVisible = $scope.filterVisible = true;

                $scope.watchlist = [];
                $scope.selectedVideos = [];
                $scope.hashedResults = {};

                $scope.sortField = {};
                // $scope.sortField = {'id' : 1};

                CountriesService.getCountries().then(function(countries){
                    $scope.countries = countries;
                    var defaultCountry = $scope.countries.filter(function(d){
                        if(d.id === 'US'){
                            return d;
                        }
                    })[0];
                    $scope.updateCategories(defaultCountry).then(function(){
                        $scope.selectedCategory = $scope.videoCategories && $scope.videoCategories.length > 0 ? $scope.videoCategories[$scope.videoCategories.length - 1] : ALL_CATEGORIES;
                    });
                });

                $scope.loadLanguages();

                $scope.searchMode = $scope.TEXT_SEARCH;
                $scope.totalResults = 0;
                $scope.searchParam = '';
                $scope.searchResults = $scope.filteredResults = [];

                //setup sort options (each sort option will be used for a search). different sort options
                //are used to increate search results
                $scope.sortOptions = [
                    new SortOption(1, 'viewCount', -1, 'user', 'Views'),
                    new SortOption(2, 'likes', -1, 'thumbs-up', 'Likes'),
                    new SortOption(3, 'dislikes', 1, 'thumbs-down', 'Dislikes'),
                    new SortOption(4, 'pctLikes', -1, 'star', 'Rating'),
                    new SortOption(5, 'created', 1, 'calendar', 'Date Asc'),
                    new SortOption(6, 'created', -1, 'calendar', 'Date Desc'),
                    new SortOption(7, 'durationMinutes', -1, 'time', 'Length'),
                    new SortOption(8, 'index', 1, 'random', SortModeTypes.RANDOM)
                ];
                // $scope.sortField = $scope.sortOptions[0];

                $scope.enableChannelFilter = true;

                // else if($routeParams.id){
                //   getVideoById($routeParams.id).then(function(res){
                //       resetPostFilters();
                //       $scope.sort();
                //       $scope.playVideo($scope.searchResults[0]);
                //   }, function(err){
                //     $scope.alerts = [];
                //     $scope.fetching = false;
                //   })
                // } else if($routeParams.m && $routeParams.q && !isNaN($routeParams.m) && ( Number($routeParams.m) <= 4 && Number($routeParams.m) >= 1)){
                //   $scope.searchMode = Number($routeParams.m);
                //   $scope.searchParam = $routeParams.q;
                //   $scope.doSearch();
                // }
            };

            var resetPostFilters = function(){
              $scope.minViews = undefined;
              $scope.minDislikes = undefined;
              $scope.minDate = undefined;
              $scope.maxDate = undefined;
              $scope.minRating = undefined;
              $scope.shorterThanFilter = undefined;
              $scope.longerThanFilter = undefined;
            }

            $scope.reset = function(){
                $scope.tags = {};
                $scope.tagsArray = [];
                $scope.searchResults = [];
                $scope.filteredResults = [];
                $scope.hashedResults = {};
                $scope.channelFilter = [];
                $scope.pagination = {
                    currentPage : 1,
                    resultsPerPage : 50,
                    totalPages : 0
                };
                // $location.path('/', true).search({q:null, m:null});
            };

            var resetRandomIndexes = function(){
              for(var i = 0; i < $scope.searchResults.length; i++){
                $scope.searchResults[i].index = Math.ceil(Math.random()*1000000);
              }
            };

            $scope.sortOptionChanged = function(option){
                if(option.displayName === SortModeTypes.RANDOM){
                  resetRandomIndexes();
                }
                $scope.sortField.id = option.id;
                $scope.sort();
            };

            $scope.playVideo = function(video, val, index){
              var index = ($scope.pagination.currentPage - 1) * $scope.pagination.resultsPerPage + index;
              // $location.path('/' + video.videoId, true).search({q:null, m:null});
              var modalInstance = $uibModal.open({
                  templateUrl: 'partials/playerModal.html',
                  controller: 'YoutubePlayerModalCtrl',
                  backdrop : 'static',
                  size: 'lg',
                  resolve: {
                      content: function () {
                          return {
                              'autoplay' : $scope.autoplay,
                              'pagination' : $scope.pagination,
                              'filteredResults' : $scope.filteredResults,
                              'video' : video,
                              'val' : val,
                              'index' : index
                          }
                      }
                  }
              });

              modalInstance.result.then(function(data){
                $scope.gotoPage(Math.floor(data / $scope.pagination.resultsPerPage) + 1);
                $scope.scrollToElement($scope.filteredResults[data].videoId, true);
                // $location.path('/', true).search({q:null, m:null});
                $rootScope.currentPageTitle = 'Youtube Agent - Sort, Filter, Download, Analyze - Your Ultimate Youtube Search Tool';
              }, function(data){
                $scope.gotoPage(Math.floor(data / $scope.pagination.resultsPerPage) + 1);
                $scope.scrollToElement($scope.filteredResults[data].videoId, true);
                // $location.path('/', true).search({q:null, m:null});
                $rootScope.currentPageTitle = 'Youtube Agent - Sort, Filter, Download, Analyze - Your Ultimate Youtube Search Tool';
              })
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

              $scope.tags = {};
              $scope.tagsArray = [];

              $scope.removedVideos = [];
              mostViewedSearchInterval = 0;
              $scope.blob = undefined;
              $scope.saveName = '';

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

              // $location.path('/', true).search({q:null, m:null});
            };

            $scope.hasWatched = AuthService.hasWatched;

            $scope.loadUserPlaylist = function(){
              if($scope.userPlaylist.selectedPlaylist && $scope.userPlaylist.selectedPlaylist.val){
                  resetAll();
                  getVideosInPlaylist($scope.userPlaylist.selectedPlaylist.val).then(function(){

                  }, function(err){
                    toaster.pop({type : 'error', title: '', body : 'Unable to load playlist. Please make sure you have connected your account to YoutubeAgent using the red button below', timeout : 10000});
                  });
              }
            };

            /**
             * perform a new search
             */
            $scope.doSearch = function(){

                //if already searching, just return immediately
                $scope.searchParam = $scope.searchMode === $scope.MOST_VIEWED_SEARCH && !$scope.searchParam ? generalSearch : $scope.searchParam.trim();
                if($scope.fetching || !$scope.searchParam){
                    return;
                }

                resetAll();

                // $location.path('', true).search({m : $scope.searchMode, q : $scope.searchParam});

                if($scope.searchMode === $scope.TEXT_SEARCH || $scope.searchMode === $scope.MOST_VIEWED_SEARCH){

                    setSortOptionCookies();

                    $scope.fetching = true;

                    videoDuration = $scope.videoDuration ? '&videoDuration=' + $scope.videoDuration : '';
                    safeSearch = $scope.safeSearch ? '&safeSearch=' + $scope.safeSearch : '';

                    latlng = ($scope.pos.lat && $scope.searchLocation) ? '&location=' + $scope.pos.lat + "," + $scope.pos.lng + '&locationRadius=' + $scope.locationDiameter/2 + 'mi': '';

                    regionCode = $scope.selectedCountry ? '&regionCode=' + $scope.selectedCountry.id : '';
                    videoCategoryId = ($scope.selectedCategory && $scope.selectedCategory.id && $scope.selectedCategory.id > 0) ? '&videoCategoryId=' + $scope.selectedCategory.id : '';
                    // if(!regionCode || !videoCategoryId){
                    //     regionCode = videoCategoryId = '';
                    // }

                    //setup warning
                    if($scope.intervalSearch){
                        $scope.alerts = [{type:'danger', msg:'Warning!  With the Interval option selected, results take considerably longer to retrieve.  Please click STOP and uncheck the option if you wish to perform a faster search.'}];
                    }

                    if($scope.searchMode == $scope.MOST_VIEWED_SEARCH){
                      $scope.extendedSearch = false;
                    }

                    //check for translation, and then call the wrapper
                    $scope.checkTranslation().then(function(){
                      fetchResultsWrapper();
                    });

                }
                else if($scope.searchMode === $scope.PLAYLIST_SEARCH){
                  getVideosInPlaylist().then(function(res){
                    console.log('playlist retrieved');
                  }, function(){
                    //handle rejection in get video playlist and try to search by video
                    getVideoById().then(function(){

                    }, function(err){
                      //if also errored out here, then neither video nor playlist was retrieved
                      stopSearch('Could not find playlist or video', 'warning');
                    })
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
                        dateSmall + dateLarge + regionCode + videoDuration + videoCategoryId + latlng + safeSearch +
                        "&order=" + sortOrders[i].order + related  + token}));
                    }
                  }
                }
                else{
                    //for each sort order type, execute the GET request.  doing this so that more results are returned.
                    for (var i = 0; i < sortOrders.length; i++) {
                        var token = sortOrders[i].token ? '&pageToken=' + sortOrders[i].token : '';

                        promises.push($http.post('api/youtube/get', {'url' : youtubeSearchBase + $scope.searchParam + "&type=video&maxResults=50" +
                        dateSmall + dateLarge + regionCode + videoDuration + videoCategoryId + latlng + safeSearch +
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
                    console.log("Search results update: " + nonDuplicates.length + " NEW records found - " + new Date().toString());
                    console.log(nonDuplicates);

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

                        addVideosToList(data);

                        $scope.sort();

                        //update the related tags array and hash obj
                        updateTags();
                        //populated related video id's (for now, only populating during first pass)
                        if($scope.extendedSearch && relatedPending){
                            getRelatedVideos(data);
                        }

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

            //update the tags hash with new count of tags
            var updateTags = function(){
              $scope.tagsArray = [];
              $scope.tags = {};

              //first generate the tags object. each object contains the name of the tag, and the number of videos in which is occured
              for(var i = 0; i < $scope.filteredResults.length; i++){
                var video = $scope.filteredResults[i];
                if(video.tags && video.tags.length){
                  for(var j = 0; j < video.tags.length; j++){
                    var currentValue = $scope.tags[video.tags[j].toLowerCase()];
                    $scope.tags[video.tags[j].toLowerCase()] = currentValue ? currentValue + 1 : 1;
                  }
                }
              }

              //get top 30 tags (tags which appear in the most videos), and save into an array.
              //array is ordered by most frequent tags
              Object.keys($scope.tags).forEach(function(v){

                //if the tags array is less than 30, then always add it
                if($scope.tagsArray.length < 30){
                  $scope.tagsArray.push({'tag' : v, 'count' : $scope.tags[v]});
                  $scope.tagsArray = $scope.tagsArray.sort(function(a,b){
                    return a.count < b.count ? 1 : a.count > b.count ? -1 : 0;
                  });
                }
                //if not less than thirty, then see if the tag has a higher count than the most infrequent tag
                else if($scope.tagsArray[29].count < $scope.tags[v]){
                  $scope.tagsArray[29] = {'tag' : v, 'count' : $scope.tags[v]};
                  $scope.tagsArray = $scope.tagsArray.sort(function(a,b){
                    return a.count < b.count ? 1 : a.count > b.count ? -1 : 0;
                  });
                }

              });
              console.log($scope.tagsArray);
            }

            /**
             * upddate categories.
             * different countries have different categories.  when a new country is selected, this method gets
             * called to refresh the categories list
             * @returns {*}
             */
            $scope.updateCategories = function(country){
                var deferred = $q.defer();
                var countryId = $scope.selectedCountry ? $scope.selectedCountry.id : country ? country.id : '';
                if(countryId){
                  var payload = {url : youtubeVideoCategoriesBase + countryId};
                  $http.post('api/youtube/get', payload).then(function(res){
                      $scope.videoCategories = res.data.items.filter(function(d){
                          if(d.snippet.assignable){
                              return d;
                          }
                      });
                      $scope.videoCategories.push(ALL_CATEGORIES);
                      $scope.selectedCategory = $scope.videoCategories[$scope.videoCategories.length - 1];
                      deferred.resolve();
                  });
                }
                else{
                  deferred.resolve();
                }
                return deferred.promise;
            };

            /**
             * Perform search in popular videos mode
             */
            $scope.searchPopular = function(){
                resetSortOrders();
                $scope.searchResults = [];
                $scope.wasInterrupted = undefined;
                $scope.blob = undefined;
                $scope.saveName = '';
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

                latlng = ($scope.pos.lat && $scope.searchLocation) ? '&location=' + $scope.pos.lat + "," + $scope.pos.lng + '&locationRadius=' + $scope.locationDiameter/2 + 'mi': '';

                var promises = [];
                var payload = {url : popularByCountryBase + countryAlphaCode + token};
                promises.push($http.post('api/youtube/get', payload));
                for(var i = 0; i < $scope.videoCategories.length - 1; i++){
                    payload = {url : popularByCountryBase + countryAlphaCode + '&videoCategoryId=' + $scope.videoCategories[i].id + latlng + token};
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
                latlng = ($scope.pos.lat && $scope.searchLocation) ? '&location=' + $scope.pos.lat + "," + $scope.pos.lng + '&locationRadius=' + $scope.locationDiameter/2 + 'mi': '';

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

            $scope.removeVideoFromList = function(video){
              for(var i = 0; i < $scope.searchResults.length; i++){
                if($scope.searchResults[i].videoId === video.videoId){
                  $scope.removedVideos.push($scope.searchResults.splice(i,1)[0]);
                  $scope.filter();
                  return;
                }
              }
            };

            $scope.restoreRemovedItems = function(){
              for(var i = 0; i < $scope.removedVideos.length; i++){
                $scope.searchResults.push($scope.removedVideos[i]);
              }
              $scope.removedVideos = [];
              $scope.sort();
              $scope.filter();
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
                        var viewCount = 0;
                        var likes = 0;
                        var dislikes = 0;

                        if(datastats.statistics){
                          var pctLikes = 0;
                          if (datastats.statistics.likeCount) {
                              pctLikes = (Number(datastats.statistics.likeCount) / (Number(datastats.statistics.likeCount) + Number(datastats.statistics.dislikeCount))) * 100
                          }
                          else if (datastats.statistics.dislikeCount) {
                              pctLikes = 0;
                          }
                          else {
                              pctLikes = undefined;
                          }

                          viewCount = datastats.statistics.viewCount;
                          likes = datastats.statistics.likeCount;
                          dislikes = datastats.statistics.dislikeCount;
                        }

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
                            "durationMinutes": duration.approxMinutes || null,
                            "description" : datastats.snippet.description,
                            "tags" : datastats.snippet.tags,
                            "index" : Math.ceil(Math.random()*1000000)
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
                // var parts = $scope.searchParam.toLowerCase().split(' ' );
                var parts = $scope.tagsArray;

                //create an array with only the tags count
                var totalTagsCountMap = $scope.tagsArray
                  .map(function(a){
                    return a.count;
                  });

                //sum the tags
                var totalTagCount = (totalTagsCountMap && Object.keys(totalTagsCountMap).length > 0) ? totalTagsCountMap.reduce(function(a,b){
                    return a + b;
                  }) : 0;

                //if no tags, just return
                if(!totalTagCount){
                  return;
                }

                //loop over each returned video
                for(var count = data.length - 1; count >= 0; count--){

                    //if the video has tags
                    if(data[count].snippet.tags){

                        //get the tags
                        var terms = data[count].snippet.tags;

                        var isRelevant = true;

                        var totalMatches = 0;

                        //loop over each tag in the saved tagsArray object
                        for(var i = 0; i < parts.length; i++){

                            //loop over each tag for the current video
                            for(var j = 0; j < terms.length; j++){
                              if(terms[j].toLowerCase() === parts[i].tag.toLowerCase()){
                                  totalMatches += parts[i].count;
                              }
                            }
                        }

                        //get the match percentage value.
                        //this is a weighted average, based on the video's tag matches, and how the tag ranks in terms of overall popularity.
                        var matchPercentage = (totalMatches / totalTagCount) * 100;

                        //if less than 100 are in the nextRelated list, then only check that the matchPercentage is greater than the min threshold
                        if($scope.nextRelated.length < 100){
                          //if meets minimum requirement needed to be considered a related video
                          if(matchPercentage >= RelatedThreshold.WEAK){
                            $scope.nextRelated.push({id:data[count].id, matchPercentage:matchPercentage});
                            $scope.nextRelated = $scope.nextRelated.sort(function(a,b){
                              return a.matchPercentage < b.matchPercentage ? 1 : a.matchPercentage > b.matchPercentage ? -1 : 0;
                            });
                          }
                        //otherwise, compare its match percentage to that of the lowest match percentage in the list
                        } else if(matchPercentage > $scope.nextRelated[99].matchPercentage){
                          $scope.nextRelated[99] = {id:data[count].id, matchPercentage:matchPercentage};
                          $scope.nextRelated = $scope.nextRelated.sort(function(a,b){
                            return a.matchPercentage < b.matchPercentage ? 1 : a.matchPercentage > b.matchPercentage ? -1 : 0;
                          });
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

                setNewSearchParams().then(function(){
                  resetSortOrders();
                  relatedPending = false;
                  $scope.related = $scope.nextRelated[0].id;
                  $scope.nextRelated.splice(0,1);
                  $scope.checkRelated = true;
                  fetchResultsWrapper(false);
                })

            };

            var setNewSearchParams = function(){

              //save into new array to avoid modifying initial array
              var selectableTags = [];
              for(var i = 0; i < $scope.tagsArray.length; i++){
                selectableTags.push({tag:$scope.tagsArray[i].tag});
              }
              selectableTags.unshift({tag:$scope.searchParam}); //add original search as first element
              var deferred = $q.defer();
              //if hitting the extended search for the first time, prompt user to select search terms
              if(relatedPending){
                $uibModal.open({
                    templateUrl: 'partials/selectExtendedSearchTerms.html',
                    controller: 'SelectExtendedSearchTermsCtrl',
                    size: 'md',
                    windowClass : 'select-terms-modal',
                    backdrop: 'static',
                    resolve: {
                        content: function () {
                            return {
                                'tagsArray' : selectableTags
                            }
                        }
                    }
                }).result.then(function (terms) {
                    if(terms && terms.length > 0){
                      $scope.searchParam = terms;
                    }
                    deferred.resolve();
                }, function () {
                  $scope.enableChannelFilter = $scope.channelFilter && $scope.channelFilter.length > 0;
                    deferred.resolve();
                });
              } else{
                  deferred.resolve();
              }
              return deferred.promise;
            }

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
                    $scope.enableChannelFilter = $scope.channelFilter && $scope.channelFilter.length > 0;
                    $scope.filter();
                }, function () {
                  $scope.enableChannelFilter = $scope.channelFilter && $scope.channelFilter.length > 0;
                    $scope.filter();
                });
            };

            //------------ start quick filter -----------------

            //add a "ONE_OF" category quickfilter
            $scope.addQuickFilterCategory = function(){
              var nextId = $scope.quickFilterObjects.sort(function(a,b){
                return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
              })[0].id + 1;
              $scope.quickFilterObjects.push({id:nextId, type:$scope.quickFilterType.ONE_OF, quickfilterType:'Atleast one', terms : [{id:1,term:""}]});
              $scope.quickFilterObjects = $scope.quickFilterObjects.sort(function(a,b){
                return a.type > b.type ? 1 : a.type < b.type ? -1 : 0;
              })
            };

            //remove a "ONE_OF" category quick filter
            $scope.removeCategory = function(filter){
              if($scope.hasMultipleFiltersByType($scope.quickFilterType.ONE_OF)){
                for(var i = 0; i < $scope.quickFilterObjects.length; i++){
                  if($scope.quickFilterObjects[i].id === filter.id && $scope.quickFilterObjects[i].type===$scope.quickFilterType.ONE_OF){
                      $scope.quickFilterObjects.splice(i,1);
                  }
                }
              }
            };

            //given a type, return if the there is atleast one term defined for that quickfilter
            $scope.hasMultipleFiltersByType = function(type){
              return $scope.quickFilterObjects.filter(function(d){
                return d.type === type;
              }).length > 1;
            };

            //determine if atleast one term is defined in one of the quickfilter objects
            var hasQuickFilter = function(){
              for(var i =0; i < $scope.quickFilterObjects.length; i++){
                for(var j = 0; j < $scope.quickFilterObjects[i].terms.length; j++){
                  if($scope.quickFilterObjects[i].terms[j].term){
                    return true;
                  }
                }
              };
              return false;
            };

            //remove an item from an array
            $scope.removeFilterTerm = function(terms, index){
              if(terms.length > 1){
                terms.splice(index, 1);
              }
            };

            //add a new term to the passed in quickfilter object
            $scope.addFilterTerm = function(quickfilterObject){
              var nextId = quickfilterObject.terms.sort(function(a,b){
                return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
              })[0].id + 1;
              quickfilterObject.terms.push({id:nextId,term:''});
            };

            //return if the quickfilter object has atleast one term
            var hasQuickFilterTerm = function(quickFilter){
              return quickFilter.terms.filter(function(d){return d.term;}).length > 0
            };

            //return quick filter objects by type
            var getQuickFilterByType = function(type){
              return $scope.quickFilterObjects.filter(function(d){
                return d.type === type;
              });
            };

            /**
             * filter by text in quick filter text box
             * @param video
             * @returns {boolean}
             */
            var quickFilter = function(video){
                if(!hasQuickFilter()){
                    return true;
                }
                else{

                  //get video & channel title
                  var videoTitle = video.title.toLowerCase();
                  var channelTitle = video.channelTitle.toLowerCase();
                  var videoDescription = video.description ? video.description.toLowerCase() : "";
                  var tags = (video.tags && video.tags.length > 0) ? video.tags.toString().toLowerCase().replace(/,/g,' ') : "";

                  var mustHave = getQuickFilterByType($scope.quickFilterType.MUST_HAVE)[0];
                  var exclude = getQuickFilterByType($scope.quickFilterType.EXCLUDE)[0];
                  var oneOf = getQuickFilterByType($scope.quickFilterType.ONE_OF);

                  //must have
                  if(hasQuickFilterTerm(mustHave)){
                    for(var i = 0; i < mustHave.terms.length; i++){
                      if(!isTextInVideo(videoTitle, channelTitle, videoDescription, tags, mustHave.terms[i].term)){
                        return false;
                      }
                    }
                  }

                  //cannot have
                  if(hasQuickFilterTerm(exclude)){
                    for(var i = 0; i < exclude.terms.length; i++){
                      if(isTextInVideo(videoTitle, channelTitle, videoDescription, tags, exclude.terms[i].term)){
                        return false;
                      }
                    }
                  }

                  //atleast one
                  for(var i = 0; i < oneOf.length; i++){
                    if(hasQuickFilterTerm(oneOf[i])){
                      var found = false;
                      for(var j = 0; j < oneOf[i].terms.length; j++){
                        if(isTextInVideo(videoTitle, channelTitle, videoDescription, tags, oneOf[i].terms[j].term)){
                          found = true;
                          break;
                        }
                      }
                      if(!found){
                        return false;
                      }
                    }
                  }
                  return true;
                }
            };

            //given a video / channel title, determine if it contains the corresponding searchText
            var isTextInVideo = function(videoTitle, videoChannelTitle, videoDescription, tags, searchText){
              return (videoTitle.toLowerCase().indexOf(searchText.toLowerCase().trim()) > -1) ||
              (videoChannelTitle.toLowerCase().indexOf(searchText.toLowerCase().trim()) > -1) ||
              (videoDescription.toLowerCase().indexOf(searchText.toLowerCase().trim()) > -1) ||
              (tags && tags.toLowerCase().indexOf(searchText.toLowerCase().trim()) > -1);
            };

            //------------ end quick filter -------------------

            var performChannelFilter = function(video){
              if(!$scope.enableChannelFilter || !$scope.channelFilter || $scope.channelFilter.length === 0){
                  return true;
              }
               for(var i = 0; i < $scope.channelFilter.length; i++){
                   if(video.channelTitle.toLowerCase() === $scope.channelFilter[i]){
                       return true;
                   }
               }
            }

            $scope.removeChannelFilter = function(channelTitle){
                var idx = $scope.channelFilter.indexOf(channelTitle);
                $scope.channelFilter.splice(idx, 1);
                $scope.filter();
            };

            $scope.sort = function(){

                //backwards compatible
                var sortObject = $scope.sortOptions[0];
                if(isNaN($scope.sortField.id)){
                  sortObject = $scope.sortOptions.filter(function(d){if(d.value === $scope.sortField.id){return d;}})[0];
                } else{
                    sortObject = $scope.sortOptions.filter(function(d){if(d.id === $scope.sortField.id){return d;}})[0];
                }
                if(!sortObject){
                  sortObject = $scope.sortOptions[0];
                  $scope.sortField = {id : 1};
                }

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
                var sortField = null;
                var cookieSortField = $cookies.get('youtubeagent_sortField');
                if(!cookieSortField){
                  sortField = $scope.sortOptions[0];
                }
                else if(isNaN(cookieSortField)){
                  sortField = $scope.sortOptions.filter(function(d){if(d.value == cookieSortField){return d;}})[0];
                } else{
                  sortField = $scope.sortOptions.filter(function(d){if(d.id == cookieSortField){return d;}})[0];
                }
                $scope.sortField.id = sortField.id;
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
                $cookies.put('youtubeagent_sortField',$scope.sortField.id);
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
                'sortField': $scope.sortField ? $scope.sortField.id : $scope.sortOptions[0].id,
                'filterText': $scope.filterText,
                'minViews': $scope.minViews,
                'minDislikes': $scope.minDislikes,
                'minDate': $scope.minDate,
                'maxDate': $scope.maxDate,
                'minRating': $scope.minRating,
                'shorterThanFilter': $scope.shorterThanFilter,
                'longerThanFilter': $scope.longerThanFilter,
                'searchParam': $scope.searchParam,
                'searchMode' : $scope.searchMode,
                'hashedResults' : $scope.hashedResults,
                'quickFilterObjects' : $scope.quickFilterObjects,
                'tagsArray' : $scope.tagsArray
              }
            };

            var setupJsonObjectsFromFile = function(json){

              if(!json.searchResults){
                toaster.pop('error', '', 'Unable to read file');
                return;
              }

              $scope.reset();

              var sortField = null;
              var jsonSortField = json.sortField;
              if(!jsonSortField){
                sortField = $scope.sortOptions[0];
              }
              else if(isNaN(jsonSortField)){
                sortField = $scope.sortOptions.filter(function(d){if(d.value == jsonSortField){return d;}})[0];
              } else{
                sortField = $scope.sortOptions.filter(function(d){if(d.id == jsonSortField){return d;}})[0];
              }

              $scope.searchResults = json.searchResults;
              $scope.sortField.id = sortField.id;
              $scope.filterText = json.filterText;
              $scope.minViews = json.minViews;
              $scope.minDislikes = json.minDislikes;
              $scope.minDate = json.minDate ? new Date(json.minDate) : null;
              $scope.maxDate = json.maxDate ? new Date(json.maxDate) : null;
              $scope.minRating = json.minRating;
              $scope.shorterThanFilter = json.shorterThanFilter;
              $scope.longerThanFilter = json.longerThanFilter;
              $scope.searchParam = json.searchParam;
              $scope.searchMode = json.searchMode || $scope.TEXT_SEARCH;
              $scope.hashedResults = json.hashedResults;

              if(json.quickFilterObjects){
                $scope.quickFilterObjects = json.quickFilterObjects;
              }

              //convert date properties (they come back as strings) on search results back to date objects
              $scope.searchResults.forEach(function(video){
                video.created = new Date(video.created);
              });

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
                if((!$scope.enableChannelFilter || !$scope.channelFilter || $scope.channelFilter.length === 0) && !hasQuickFilter() && !$scope.minViews && (!$scope.minDislikes && $scope.minDislikes !== 0) && !$scope.minDate && !$scope.shorterThanFilter && !$scope.longerThanFilter && !$scope.minRating){
                    $scope.filteredResults = $scope.searchResults;
                }
                else{
                    $scope.filteredResults = $scope.searchResults.filter(function(d){
                        if(((!$scope.minDislikes && $scope.minDislikes !== 0) || d.dislikes <= $scope.minDislikes) &&
                            (!$scope.minViews || d.viewCount >= $scope.minViews) &&
                            (!$scope.minRating || d.pctLikes >= $scope.minRating) &&
                            (!$scope.maxDate || d.created <= $scope.maxDate) &&
                            (!$scope.minDate || d.created >= $scope.minDate) && durationFilter(d) && quickFilter(d) && performChannelFilter(d)){
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

            var getVideoById = function(id){
              var deferred = $q.defer();
              var id = id || $scope.searchParam;
              $http.post('api/youtube/get', {url : youtubeVideoBase + id}).then(function(res){
                if(res.data.items.length > 0){
                    addVideosToList(res.data.items);
                    $scope.sort();
                    $scope.fetching = false;
                    deferred.resolve();
                    return;
                }
                deferred.reject();
              }, function(err){
                deferred.reject();
              });
              return deferred.promise;
            };

            var getVideosInPlaylistCallback = function(videos){
              var deferred = $q.defer();
              var nonDups = getNonDuplicates(videos);

              var promises = createBatchVideoRequest(nonDups);

              $q.all(promises).then(function (res) {
                  var data = [];
                  for (var i = 0; i < res.length; i++) {
                      data = data.concat(res[i].data.items);
                  }

                  addVideosToList(data);
                  $scope.sort();
                  deferred.resolve();
              }, function(err){
                deferred.reject();
              });
              return deferred.promise;
            };

            var getVideosInPlaylist = function(searchParam){
              var searchParam = searchParam || $scope.searchParam;
              var deferred = $q.defer();
              $scope.fetching = true;
              PlaylistService.getVideosInPlaylist(searchParam, getVideosInPlaylistCallback).then(function(){

                //search finished
                $scope.fetching = false;
                deferred.resolve();
              }, function(err){

                //if rejects here, it's because playlist does not exist or not accessible by user
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
              $scope.blob = new Blob([json], {type: "application/json"});
              $scope.saveName = $scope.searchParam.replace(" ","_") + new Date().getTime().toString() + ".json";
            };

            $scope.saveJson = function(){
              FileSaver.saveAs($scope.blob, $scope.saveName);
            };

            $scope.uploadFile = function(files) {

              if(files.length > 1){

                //must select only one file
                toaster.pop('error','','Please select only one file');
                return;
              } else {

                //get the file, and validate
                var file = files[0];

                if(file.size > 26214400){
                  //max file size 25mb and must be json
                  toaster.pop('error','','Please upload a json file less than 15mb')
                  return;
                }

                //upload the file
                readAsDataURL(files[0], $scope).then(function(res){
                  $http.get(res).then(function(json){
                    setupJsonObjectsFromFile(json.data);
                    $scope.sort();

                    //check tags after sorting / filtering
                    if(json.data.tagsArray){
                      $scope.tagsArray = json.data.tagsArray
                    } else{
                      updateTags();
                    }

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
              $scope.maxDate = $scope.preSearchMaxDate;
              $scope.minDate = $scope.preSearchMinDate;
              if($scope.preSearchMinDate || $scope.preSearchMaxDate){
                $scope.disablePostDateFilters = true;
              } else{
                $scope.disablePostDateFilters = false;
              }

              $scope.filter()
            };

            $scope.getSearchBoxPlaceholder = function(){
              if($scope.searchMode === $scope.TEXT_SEARCH){
                return 'Enter search terms';
              } else if($scope.searchMode === $scope.PLAYLIST_SEARCH){
                return 'Enter a youtube playlist id or video id';
              } else if($scope.searchMode === $scope.MOST_VIEWED_SEARCH){
                return 'Search term (optional)';
              }
            };

            init();

        }]);
})();
