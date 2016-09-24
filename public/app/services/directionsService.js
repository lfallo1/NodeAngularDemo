(function(){

    angular.module('youtubeSearchApp').service('DirectionsService', ['$http', '$q', '$log', function($http, $q, $log){
        var service = {};

        var cursor = -1;

        var directions = [
          {
            title : 'GET STARTED!',
            body : 'Set your <strong><span class="highlight">Pre-Search Filters</span><strong> to help the initial search add relevant parameters to your query, and click <span class="highlight">SEARCH</span>.<br /><div class="sub-direction"><strong>TIP:</strong> <span class="highlight">Extended Search</span> will save a list of related videos during your initial search, and then perform additional searches using those related videos as an extra parameter.</div>',
            element : 'date-filter-wrapper'
          },
          {
            title : 'FILTER YOUR RESULTS',
            body : 'Here’s where you can filter out all those garbage videos.  In your <span class="highlight">Post Search Sorts / Filters</span>, decide exactly which videos to display.<br /><div class="sub-direction">For example, you can sort by <strong>rating</strong>, but only show videos with more than </strong>2,000 views</strong> and are <strong>at least 1 minute long</strong>.</div>',
            element : 'filter-options-container'
          },
          {
            title : 'FILTER EVEN MORE!',
            body : 'Filtering doesn’t have to stop there.  Using the <span class="highlight">advanced text filter</span> that will appear on the bottom right, you can include or exclude terms and phrases.  Surround a multi-word phrase with quotes, and negate terms by preceding with a bang (!) symbol<br /><div class="sub-direction">(i.e., “!college football” “nfl hits” excludes any video with the phrase college football in the title or description while including videos with “nfl hits.”<img class="directions-image" src="images/advancedFilter.png" /></div>'
          },
          {
            title : 'EXTRA TOOLS',
            body : '<div class="direction-list-item">Click <span class="highlight">Search Results Summary</span> after a search to view a report of your searches organized by channel results.  Clicking a channel in the summary adds a filter to only show videos in your selected channels.</div><div class="direction-list-item">Click <span class="highlight">download results as JSON</span> to save your search results, and upload later without needing to perform any search at all.<img class="directions-image" src="images/downloadJson.png" /></div><div class="direction-list-item"><span class="highlight">Download</span> any result as an audio or video file.<img class="directions-image" src="images/downloadVideo.png" /></div><div class="direction-list-item"><span class="highlight">Sign in to your google account</span> to add videos to your youtube playlists.<img class="directions-image" src="images/signin.png" /></div>'
          }
        ];

        service.reset = function(){
          cursor = -1;
        };

        service.getNext = function(){
          if(cursor < directions.length){
            cursor++;
            var ret = directions[cursor];
            return ret;
          }
          return null;
        };

        service.goBack = function(){
          if(cursor > 0){
            cursor--;
            return directions[cursor];
          }
          return null;
        };

        service.hasNext = function(){
          return cursor < (directions.length - 1);
        };

        service.hasPrev = function(){
          return cursor > 0;
        };

        return service;
    }]);

})();
