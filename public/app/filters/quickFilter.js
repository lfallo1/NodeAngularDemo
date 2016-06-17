// Setup the filter
angular.module('youtubeSearchApp').filter('quickFilter', function() {

    // Create the return function and set the required parameter name to **input**
    return function(input, text, negate) {

        var out = [];

        // Using the angular.forEach method, go through the array of data and perform the operation of figuring out if the language is statically or dynamically typed.
        for(var i = 0; i < input.length; i++){
            video = input[i];
            if(!text || text.trim().length === 0){
                out.push(video);
            }
            else{
                if(negate){
                    !(video.title.indexOf(text) > -1 || video.channelTitle.indexOf(text) > -1) ? out.push(video) : '';
                }
                else{
                    video.title.indexOf(text) > -1 || video.channelTitle.indexOf(text) > -1 ? out.push(video) : '';
                }
            }
        };

        return out;
    }

});