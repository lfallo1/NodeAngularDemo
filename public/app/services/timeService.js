/**
 * TimeService.js - handle converting of iso 8601 time
 */
(function() {
    angular.module('youtubeSearchApp').service('TimeService', ['$log', function timeService($log) {

        var service = {};

        /**
         * Time Object - takes an hour, minute, second.
         * contains two functions. one returns a formatted duration string, and the other returns the duration in minutes
         * @param h
         * @param m
         * @param s
         * @constructor
         */
        function MyTime(h,m,s){
            this.h = h;
            this.m = m;
            this.s = s;

            this.formatted = function(){
                var hours = !this.h ? '00' : Number(this.h) < 10 ? '0' + this.h : this.h;
                var minutes = !this.m ? '00' : Number(this.m) < 10 ? '0' + this.m : this.m;
                var seconds = !this.s ? '00' : Number(this.s) < 10 ? '0' + this.s : this.s;
                return hours + ':' + minutes + ':' + seconds;
            };

            this.minutes = function(){
                var hours = this.h || 0;
                var minutes = this.m || 0;
                var seconds = this.s || 0;
                return (Number(hours) * 60) + Number(minutes) + (Number(seconds) / 60);
            };
        }

        /**
         * convert time from iso 8601 to a duration in minutes and formatted duration string (hh:mm:ss)
         * iso 8601 comes in form PT#H#M#S, where the # represents the numerical value of each duration part.
         * i.e., PT4H13M59S represents a video 4hours 13mins 59secs
         * @param duration
         * @returns {{formatted, approxMinutes}}
         */
        service.isoToDuration = function(duration) {
            var hours, minutes, seconds = null;
            var stripped = duration.replace("PT","");
            var number = '';
            var char = '';
            for(var i = 0; i < stripped.length; i++) {
                char = stripped.substring(i, i + 1);
                if (isNaN(char)) {
                    switch (char) {
                        case 'H':
                            hours = number;
                            break;
                        case 'M':
                            minutes = number;
                            break;
                        case 'S':
                            seconds = number;
                            break;
                        default:
                            break;
                    }
                    number = '';
                }
                else{
                    number = number.toString() + char.toString();
                }
            }
            time = new MyTime(hours, minutes, seconds);
            return {
                'formatted' : time.formatted(),
                'approxMinutes' : time.minutes()
            }
        };
        
        service.loadDummyData = function(){
            return {
                "The Highlight Factory": {
                    "count": 2,
                    "views": 23230812,
                    "videos": [
                        {
                            "title": "Biggest Football Hits Ever",
                            "channelTitle": "The Highlight Factory",
                            "channelId": "UCsEXpx8Ew8lQZYTMWu1Ep5g",
                            "created": "2015-08-04T16:25:46.000Z",
                            "videoId": "v-1MQ0Cnbhs",
                            "pctLikes": 96.69692039284105,
                            "viewCount": 13893452,
                            "likes": 49328,
                            "dislikes": 1685,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/v-1MQ0Cnbhs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333,
                            "$$hashKey": "object:328"
                        },
                        {
                            "title": "Best Jukes In Football History",
                            "channelTitle": "The Highlight Factory",
                            "channelId": "UCsEXpx8Ew8lQZYTMWu1Ep5g",
                            "created": "2015-05-23T16:34:26.000Z",
                            "videoId": "du5SopfbML0",
                            "pctLikes": 96.29424778761062,
                            "viewCount": 9337360,
                            "likes": 29597,
                            "dislikes": 1139,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/du5SopfbML0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:30",
                            "durationMinutes": 3.5,
                            "$$hashKey": "object:5207"
                        }
                    ]
                },
                "BeastModeHighlights": {
                    "count": 2,
                    "views": 731194,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits!! HD Compilation",
                            "channelTitle": "BeastModeHighlights",
                            "channelId": "UCZVhyqi9QA74rDYhheS9U-A",
                            "created": "2016-03-31T04:34:30.000Z",
                            "videoId": "6FwOEhkHilw",
                            "pctLikes": 97.0954356846473,
                            "viewCount": 499174,
                            "likes": 1872,
                            "dislikes": 56,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/6FwOEhkHilw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:16",
                            "durationMinutes": 4.266666666666667,
                            "$$hashKey": "object:357"
                        },
                        {
                            "title": "NFL Hardest Hits!! Part 2 HD Compilation",
                            "channelTitle": "BeastModeHighlights",
                            "channelId": "UCZVhyqi9QA74rDYhheS9U-A",
                            "created": "2016-05-06T02:31:27.000Z",
                            "videoId": "df8CHdC9iqk",
                            "pctLikes": 96.71052631578947,
                            "viewCount": 232020,
                            "likes": 882,
                            "dislikes": 30,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/df8CHdC9iqk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:49",
                            "durationMinutes": 4.816666666666666,
                            "$$hashKey": "object:374"
                        }
                    ]
                },
                "TwoKalbs -": {
                    "count": 3,
                    "views": 1247288,
                    "videos": [
                        {
                            "title": "NFL HARDEST HITS AND TRUCKS OF THE 2014/2015 SEASON",
                            "channelTitle": "TwoKalbs -",
                            "channelId": "UCciTchVz8EnfCY0Iwccuu9w",
                            "created": "2015-07-03T03:43:17.000Z",
                            "videoId": "eQsCP9vm2rc",
                            "pctLikes": 88.76994122586062,
                            "viewCount": 1019015,
                            "likes": 4229,
                            "dislikes": 535,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/eQsCP9vm2rc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:07",
                            "durationMinutes": 3.1166666666666667,
                            "$$hashKey": "object:348"
                        },
                        {
                            "title": "NFL  hardest hits 15-16",
                            "channelTitle": "TwoKalbs -",
                            "channelId": "UCciTchVz8EnfCY0Iwccuu9w",
                            "created": "2016-02-28T17:51:12.000Z",
                            "videoId": "zXNKIYq-lZE",
                            "pctLikes": 88.56885688568858,
                            "viewCount": 227663,
                            "likes": 984,
                            "dislikes": 127,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/zXNKIYq-lZE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:30",
                            "durationMinutes": 3.5,
                            "$$hashKey": "object:375"
                        },
                        {
                            "title": "Copy of NFL HARDEST HITS AND TRUCKS OF THE 2014/2015 SEASON",
                            "channelTitle": "TwoKalbs -",
                            "channelId": "UCciTchVz8EnfCY0Iwccuu9w",
                            "created": "2015-09-28T04:30:01.000Z",
                            "videoId": "hZ4UFlUt4jE",
                            "pctLikes": 50,
                            "viewCount": 610,
                            "likes": 5,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/hZ4UFlUt4jE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:14",
                            "durationMinutes": 6.233333333333333
                        }
                    ]
                },
                "Dezman Productions": {
                    "count": 1,
                    "views": 252787,
                    "videos": [
                        {
                            "title": "NFL Biggest Hits of the 2015-2016 Season ᴴᴰ || \"Bone Crushing\"",
                            "channelTitle": "Dezman Productions",
                            "channelId": "UCAP4uRmG1HsaiVUXX5ZtKkg",
                            "created": "2016-01-27T12:19:03.000Z",
                            "videoId": "bXuP5yGD0SU",
                            "pctLikes": 89.5774647887324,
                            "viewCount": 252787,
                            "likes": 954,
                            "dislikes": 111,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/bXuP5yGD0SU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:31",
                            "durationMinutes": 2.5166666666666666,
                            "$$hashKey": "object:372"
                        }
                    ]
                },
                "Zane Kennedy": {
                    "count": 1,
                    "views": 2953577,
                    "videos": [
                        {
                            "title": "College Football's Biggest Hits and Best Plays Compilation - 2015",
                            "channelTitle": "Zane Kennedy",
                            "channelId": "UCEuWfYHrFxOgaZgkDFguzug",
                            "created": "2015-04-13T10:28:22.000Z",
                            "videoId": "llUtLaklAR4",
                            "pctLikes": 93.09632079371642,
                            "viewCount": 2953577,
                            "likes": 9008,
                            "dislikes": 668,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/llUtLaklAR4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:27",
                            "durationMinutes": 7.45,
                            "$$hashKey": "object:334"
                        }
                    ]
                },
                "NFL": {
                    "count": 38,
                    "views": 12523224,
                    "videos": [
                        {
                            "title": "Best Dances: Beckham Jr. \"Swags\" & Kelce \"Hits The Quan\" | Celebration Station (Week 12) | NFL Now",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-11-30T19:48:24.000Z",
                            "videoId": "2fsrDTYsivc",
                            "pctLikes": 95.50134288272157,
                            "viewCount": 956762,
                            "likes": 4267,
                            "dislikes": 201,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/2fsrDTYsivc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:41",
                            "durationMinutes": 2.6833333333333336,
                            "$$hashKey": "object:349"
                        },
                        {
                            "title": "Top 10 Worst Plays of All Time! | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-10-20T18:29:50.000Z",
                            "videoId": "_J6hGcU1j5Q",
                            "pctLikes": 95.16302806918061,
                            "viewCount": 4428064,
                            "likes": 16782,
                            "dislikes": 853,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/_J6hGcU1j5Q/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:08",
                            "durationMinutes": 5.133333333333334,
                            "$$hashKey": "object:332"
                        },
                        {
                            "title": "Aaron Rodgers' Amazing Hail Mary: The Miracle in Motown! | Packers vs. Lions | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-12-04T04:55:02.000Z",
                            "videoId": "r0vVqStvh_8",
                            "pctLikes": 94.53559608478275,
                            "viewCount": 2781563,
                            "likes": 13425,
                            "dislikes": 776,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/r0vVqStvh_8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:25",
                            "durationMinutes": 1.4166666666666667,
                            "$$hashKey": "object:335"
                        },
                        {
                            "title": "Super Bowl 50 Highlights | Panthers vs. Broncos | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2016-02-08T04:45:48.000Z",
                            "videoId": "DR0qOk_pcyg",
                            "pctLikes": 92.73673056545613,
                            "viewCount": 2008411,
                            "likes": 9627,
                            "dislikes": 754,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/DR0qOk_pcyg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:59",
                            "durationMinutes": 3.9833333333333334,
                            "$$hashKey": "object:341"
                        },
                        {
                            "title": "Steelers vs. Bengals | AFC Wild Card Highlights | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2016-01-10T06:20:41.000Z",
                            "videoId": "g3vcdYNwQ6k",
                            "pctLikes": 94.72661670829864,
                            "viewCount": 1405646,
                            "likes": 6826,
                            "dislikes": 380,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/g3vcdYNwQ6k/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:38",
                            "durationMinutes": 7.633333333333333,
                            "$$hashKey": "object:345"
                        },
                        {
                            "title": "Alex Smith Hits Chris Conley for 9-yard TD | Chiefs vs. Texans | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2016-01-10T00:00:17.000Z",
                            "videoId": "McJbxkZnHOU",
                            "pctLikes": 97.72727272727273,
                            "viewCount": 9188,
                            "likes": 86,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/McJbxkZnHOU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:51",
                            "durationMinutes": 0.85,
                            "$$hashKey": "object:423"
                        },
                        {
                            "title": "Alex Smith Hits Albert Wilson for a Beautiful 44-Yard TD! | Charger vs. Chiefs | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-12-13T19:25:17.000Z",
                            "videoId": "GwLUdIa8pI8",
                            "pctLikes": 95.31772575250837,
                            "viewCount": 32072,
                            "likes": 285,
                            "dislikes": 14,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/GwLUdIa8pI8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:00",
                            "durationMinutes": 1,
                            "$$hashKey": "object:401"
                        },
                        {
                            "title": "Amari Cooper Goes Deep for 68-Yard TD | Ravens vs. Raiders | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-09-20T20:22:11.000Z",
                            "videoId": "f6Bx8B6k71o",
                            "pctLikes": 95.01385041551247,
                            "viewCount": 116627,
                            "likes": 1029,
                            "dislikes": 54,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/f6Bx8B6k71o/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:50",
                            "durationMinutes": 0.8333333333333334,
                            "$$hashKey": "object:383"
                        },
                        {
                            "title": "Andre Williams Runs Over Redskins Defender | Redskins vs. Giants | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-09-25T02:36:16.000Z",
                            "videoId": "i2W8jIpdUrA",
                            "pctLikes": 98.42105263157895,
                            "viewCount": 19852,
                            "likes": 187,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/i2W8jIpdUrA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:42",
                            "durationMinutes": 0.7,
                            "$$hashKey": "object:415"
                        },
                        {
                            "title": "Andrew Luck Hits TE Dwayne Allen for TD | Colts vs. Bills | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-09-13T20:33:36.000Z",
                            "videoId": "C_zrqD1S8WU",
                            "pctLikes": 98.46153846153847,
                            "viewCount": 5122,
                            "likes": 64,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/C_zrqD1S8WU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:43",
                            "durationMinutes": 0.7166666666666667,
                            "$$hashKey": "object:434"
                        },
                        {
                            "title": "Bengals QB AJ McCarron Hits Marvin Jones for Big Gain! | Ravens vs. Bengals | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2016-01-03T19:01:03.000Z",
                            "videoId": "WYPmpJiqwW0",
                            "pctLikes": 88.57142857142857,
                            "viewCount": 8823,
                            "likes": 62,
                            "dislikes": 8,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/WYPmpJiqwW0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:36",
                            "durationMinutes": 0.6,
                            "$$hashKey": "object:424"
                        },
                        {
                            "title": "Philip Rivers Hits Malcom Floyd for a 40-Yard TD | Chargers vs. Bengals | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-09-20T20:00:41.000Z",
                            "videoId": "fi7yLZRnPE4",
                            "pctLikes": 100,
                            "viewCount": 4244,
                            "likes": 37,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/fi7yLZRnPE4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:18",
                            "durationMinutes": 0.3,
                            "$$hashKey": "object:5282"
                        },
                        {
                            "title": "Panthers Keep Pounding: Cam Newton Hits Devin Funchess for Late TD! | Cardinals vs. Panthers | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2016-01-25T02:44:01.000Z",
                            "videoId": "xAGq616-D-M",
                            "pctLikes": 97.03196347031964,
                            "viewCount": 30517,
                            "likes": 425,
                            "dislikes": 13,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/xAGq616-D-M/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:57",
                            "durationMinutes": 0.95,
                            "$$hashKey": "object:5258"
                        },
                        {
                            "title": "Big Ben Hits Antonio Brown for 7-Yard TD | 49ers vs. Steelers | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-09-20T20:03:02.000Z",
                            "videoId": "6UXrJldJIQI",
                            "pctLikes": 96.46017699115043,
                            "viewCount": 8340,
                            "likes": 109,
                            "dislikes": 4,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/6UXrJldJIQI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:50",
                            "durationMinutes": 0.8333333333333334,
                            "$$hashKey": "object:5271"
                        },
                        {
                            "title": "Travis Kelce Grabs 15-Yard TD & 'Hits the Quan'! | Bills vs. Chiefs | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-11-29T21:19:02.000Z",
                            "videoId": "y1d0pRqhQoI",
                            "pctLikes": 98.88682745825604,
                            "viewCount": 78907,
                            "likes": 533,
                            "dislikes": 6,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/y1d0pRqhQoI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:45",
                            "durationMinutes": 0.75
                        },
                        {
                            "title": "Matthew Stafford Hits Tim Wright for 9-Yard TD! | Lions vs. Bears | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2016-01-03T18:22:25.000Z",
                            "videoId": "Ia_8EDHAiCs",
                            "pctLikes": 85.98130841121495,
                            "viewCount": 12100,
                            "likes": 92,
                            "dislikes": 15,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Ia_8EDHAiCs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:45",
                            "durationMinutes": 0.75
                        },
                        {
                            "title": "David Johnson Sprints 14 Yards & Hits the Pylon For the TD! | Packers vs. Cardinals | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-12-28T00:57:17.000Z",
                            "videoId": "EqFiwnlTffc",
                            "pctLikes": 100,
                            "viewCount": 2090,
                            "likes": 32,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/EqFiwnlTffc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:44",
                            "durationMinutes": 0.7333333333333333
                        },
                        {
                            "title": "Drew Brees Hits 60,000 career pass yards on 27-yard TD | Lions vs. Saints | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-12-22T04:54:25.000Z",
                            "videoId": "34N4Tyh1IUw",
                            "pctLikes": 97.10144927536231,
                            "viewCount": 8583,
                            "likes": 67,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/34N4Tyh1IUw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:13",
                            "durationMinutes": 1.2166666666666668
                        },
                        {
                            "title": "Johnny Manziel & Gary Barnidge Strike First! | Browns vs. Seahawks | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-12-20T21:33:27.000Z",
                            "videoId": "Js4Z1b9ndLU",
                            "pctLikes": 88.49557522123894,
                            "viewCount": 46268,
                            "likes": 300,
                            "dislikes": 39,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Js4Z1b9ndLU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:44",
                            "durationMinutes": 0.7333333333333333
                        },
                        {
                            "title": "Derek Carr Hits TE Mychal Rivera for Big 4th-Quarter TD! | Raiders vs. Broncos | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-12-14T00:24:38.000Z",
                            "videoId": "b0oO7Io4DDs",
                            "pctLikes": 90.02493765586036,
                            "viewCount": 58435,
                            "likes": 361,
                            "dislikes": 40,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/b0oO7Io4DDs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:45",
                            "durationMinutes": 0.75
                        },
                        {
                            "title": "Brock Osweiler Hits TE Vernon Davis for a 23-Yard Gain | Raiders vs. Broncos | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-12-13T22:32:26.000Z",
                            "videoId": "4BScYfpm3F8",
                            "pctLikes": 89.30041152263375,
                            "viewCount": 29302,
                            "likes": 217,
                            "dislikes": 26,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/4BScYfpm3F8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:34",
                            "durationMinutes": 0.5666666666666667
                        },
                        {
                            "title": "Russell Wilson Hits Tyler Lockett for a Red Zone TD! | Seahawks vs. Ravens | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-12-13T18:34:02.000Z",
                            "videoId": "CqOtF6TeESg",
                            "pctLikes": 94.83568075117371,
                            "viewCount": 29348,
                            "likes": 202,
                            "dislikes": 11,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/CqOtF6TeESg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:45",
                            "durationMinutes": 0.75
                        },
                        {
                            "title": "Matt Hasselbeck Hits T.Y. Hilton for Huge 57-Yard Play! | Colts vs. Jaguars | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-12-13T18:28:30.000Z",
                            "videoId": "VBsVOcgLvtI",
                            "pctLikes": 94.04761904761905,
                            "viewCount": 8847,
                            "likes": 79,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/VBsVOcgLvtI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:44",
                            "durationMinutes": 0.7333333333333333
                        },
                        {
                            "title": "Blake Bortles Hits Allen Robinson for Huge 45-Yard Play! | Jaguars vs. Titans | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-12-06T21:19:11.000Z",
                            "videoId": "uRGQ4cARMyA",
                            "pctLikes": 93.47826086956522,
                            "viewCount": 5948,
                            "likes": 43,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/uRGQ4cARMyA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:37",
                            "durationMinutes": 0.6166666666666667
                        },
                        {
                            "title": "Larry Fitzgerald Records His 1,000th Career Catch! | Cardinals vs. Rams | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-12-06T21:17:55.000Z",
                            "videoId": "kocyPqYnUkY",
                            "pctLikes": 97.2972972972973,
                            "viewCount": 4995,
                            "likes": 72,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/kocyPqYnUkY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:42",
                            "durationMinutes": 0.7
                        },
                        {
                            "title": "Russell Wilson Hits Doug Baldwin for a 16-yard Touchdown | Steelers vs. Seahawks | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-11-29T22:14:39.000Z",
                            "videoId": "6u4inqc6Ipk",
                            "pctLikes": 81.69014084507043,
                            "viewCount": 43551,
                            "likes": 232,
                            "dislikes": 52,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/6u4inqc6Ipk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:38",
                            "durationMinutes": 0.6333333333333333
                        },
                        {
                            "title": "Derek Carr Hits Seth Roberts for Game-Winning TD | Ravens vs. Raiders | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-09-20T23:32:10.000Z",
                            "videoId": "6rXfFCY5P0w",
                            "pctLikes": 97.43589743589743,
                            "viewCount": 51517,
                            "likes": 608,
                            "dislikes": 16,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/6rXfFCY5P0w/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:55",
                            "durationMinutes": 0.9166666666666666
                        },
                        {
                            "title": "Jameis Winston Hits TE Cameron Brate for a Big TD | Buccaneers vs. Falcons | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-11-01T19:44:07.000Z",
                            "videoId": "cVg4ELHTpoM",
                            "pctLikes": 90.7928388746803,
                            "viewCount": 49768,
                            "likes": 355,
                            "dislikes": 36,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/cVg4ELHTpoM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:49",
                            "durationMinutes": 0.8166666666666667
                        },
                        {
                            "title": "Blake Bortles Hits Allen Robinson for a 10-Yard TD | Bills vs. Jaguars | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-10-25T14:23:13.000Z",
                            "videoId": "BSFDqtNtKFA",
                            "pctLikes": 88.3495145631068,
                            "viewCount": 48615,
                            "likes": 182,
                            "dislikes": 24,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/BSFDqtNtKFA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:46",
                            "durationMinutes": 0.7666666666666667
                        },
                        {
                            "title": "Jimmy Graham's First TD as a Seahawk | Seahawks vs. Rams | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-09-13T19:38:18.000Z",
                            "videoId": "kP43OAlEhbQ",
                            "pctLikes": 95.63953488372093,
                            "viewCount": 48409,
                            "likes": 329,
                            "dislikes": 15,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/kP43OAlEhbQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:23",
                            "durationMinutes": 1.3833333333333333
                        },
                        {
                            "title": "Tom Brady Hits Gronkowski for 2nd Touchdown | Steelers vs. Patriots | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-09-11T01:51:52.000Z",
                            "videoId": "5uLcq-wtiL8",
                            "pctLikes": 85.87570621468926,
                            "viewCount": 42904,
                            "likes": 304,
                            "dislikes": 50,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/5uLcq-wtiL8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:59",
                            "durationMinutes": 0.9833333333333333
                        },
                        {
                            "title": "Blake Bortles Hits Allen Robinson in Stride for a 46-Yard TD | Dolphins vs. Jaguars | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-09-20T21:16:00.000Z",
                            "videoId": "fzuN15OhIHk",
                            "pctLikes": 87.6923076923077,
                            "viewCount": 26105,
                            "likes": 114,
                            "dislikes": 16,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/fzuN15OhIHk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:04",
                            "durationMinutes": 1.0666666666666667
                        },
                        {
                            "title": "Cam Newton Hits Philly Brown for a 36-Yard TD | Texans vs. Panthers | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-09-20T20:11:26.000Z",
                            "videoId": "9UHFDVnV5rI",
                            "pctLikes": 98.4126984126984,
                            "viewCount": 15408,
                            "likes": 186,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/9UHFDVnV5rI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:49",
                            "durationMinutes": 0.8166666666666667
                        },
                        {
                            "title": "Carson Palmer Pump Fakes, Tosses Quick TD Pass | Cardinals vs. Browns | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-11-01T18:24:08.000Z",
                            "videoId": "_n8E5e-hPS8",
                            "pctLikes": 89.16256157635468,
                            "viewCount": 25918,
                            "likes": 181,
                            "dislikes": 22,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/_n8E5e-hPS8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:33",
                            "durationMinutes": 0.55
                        },
                        {
                            "title": "Carson Palmer Hits TE Darren Fells for 17-Yard TD | Saints vs. Cardinals | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-09-13T22:47:40.000Z",
                            "videoId": "gtst2kxoaJc",
                            "pctLikes": 93.65079365079364,
                            "viewCount": 6550,
                            "likes": 59,
                            "dislikes": 4,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/gtst2kxoaJc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:13",
                            "durationMinutes": 0.21666666666666667
                        },
                        {
                            "title": "Cutler Hits Jeffery for 21-Yard TD | Vikings vs. Bears | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-11-01T19:26:15.000Z",
                            "videoId": "li21L-G24G8",
                            "pctLikes": 97.61904761904762,
                            "viewCount": 10780,
                            "likes": 82,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/li21L-G24G8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:09",
                            "durationMinutes": 1.15
                        },
                        {
                            "title": "Derek Carr Hits Andre Holmes for the Red Zone TD! | Jets vs. Raiders | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-11-01T21:37:15.000Z",
                            "videoId": "FwdfCi2LHEg",
                            "pctLikes": 95.28023598820059,
                            "viewCount": 37430,
                            "likes": 323,
                            "dislikes": 16,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/FwdfCi2LHEg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:37",
                            "durationMinutes": 0.6166666666666667
                        },
                        {
                            "title": "Emmanuel Sanders Hits 21 MPH on 64-yard TD | Broncos vs. Colts | NFL",
                            "channelTitle": "NFL",
                            "channelId": "UCDVYQ4Zhbm3S2dlz7P1GBDg",
                            "created": "2015-11-09T00:31:08.000Z",
                            "videoId": "IHqjTcfcAyk",
                            "pctLikes": 96.1038961038961,
                            "viewCount": 16215,
                            "likes": 222,
                            "dislikes": 9,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/IHqjTcfcAyk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:27",
                            "durationMinutes": 0.45
                        }
                    ]
                },
                "Lup Da Lup": {
                    "count": 1,
                    "views": 1841108,
                    "videos": [
                        {
                            "title": "NFL | College Football || Hardest Hits ᴴᴰ",
                            "channelTitle": "Lup Da Lup",
                            "channelId": "UCVXb1B9yJdvwPYpe0YqCJ6A",
                            "created": "2014-07-23T18:06:46.000Z",
                            "videoId": "L4wyU6GTCPE",
                            "pctLikes": 96.57805044308112,
                            "viewCount": 1841108,
                            "likes": 7084,
                            "dislikes": 251,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/L4wyU6GTCPE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:12",
                            "durationMinutes": 3.2,
                            "$$hashKey": "object:343"
                        }
                    ]
                },
                "Super Bowl Commercials 2016": {
                    "count": 1,
                    "views": 22904,
                    "videos": [
                        {
                            "title": "NFL - Hardest Hits | Hardest Football Hits Ever",
                            "channelTitle": "Super Bowl Commercials 2016",
                            "channelId": "UCCuw5OQUihGo2unza1587EQ",
                            "created": "2016-06-25T10:40:48.000Z",
                            "videoId": "ZaDs9dLPv_Q",
                            "pctLikes": 100,
                            "viewCount": 22904,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ZaDs9dLPv_Q/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:29",
                            "durationMinutes": 4.483333333333333,
                            "$$hashKey": "object:411"
                        }
                    ]
                },
                "SonyDony Games": {
                    "count": 1,
                    "views": 2038163,
                    "videos": [
                        {
                            "title": "Here comes the Boom - NFL ,College football, hits and runs",
                            "channelTitle": "SonyDony Games",
                            "channelId": "UC1r0NwH06HTOVVtCvsX77zQ",
                            "created": "2015-09-01T20:58:56.000Z",
                            "videoId": "XGA6pWS4p0I",
                            "pctLikes": 96.10047023741255,
                            "viewCount": 2038163,
                            "likes": 8379,
                            "dislikes": 340,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/XGA6pWS4p0I/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:58",
                            "durationMinutes": 3.966666666666667,
                            "$$hashKey": "object:340"
                        }
                    ]
                },
                "TJ Brinker": {
                    "count": 1,
                    "views": 10575347,
                    "videos": [
                        {
                            "title": "Big Football Hits Compilation",
                            "channelTitle": "TJ Brinker",
                            "channelId": "UCMx-iEdBiwlYMkq9iaOjT2A",
                            "created": "2013-11-17T20:18:28.000Z",
                            "videoId": "gtCgquOsXeo",
                            "pctLikes": 90.74567243675101,
                            "viewCount": 10575347,
                            "likes": 32712,
                            "dislikes": 3336,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/gtCgquOsXeo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:59",
                            "durationMinutes": 3.9833333333333334,
                            "$$hashKey": "object:329"
                        }
                    ]
                },
                "Broncos Vkb": {
                    "count": 1,
                    "views": 71948,
                    "videos": [
                        {
                            "title": "nfl 2015-16 highlights and biggest hits",
                            "channelTitle": "Broncos Vkb",
                            "channelId": "UCVjrMimmeH0rJB_huIUiIYg",
                            "created": "2015-12-24T14:48:22.000Z",
                            "videoId": "kg1EPo9ufRs",
                            "pctLikes": 79.90430622009569,
                            "viewCount": 71948,
                            "likes": 167,
                            "dislikes": 42,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/kg1EPo9ufRs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:47",
                            "durationMinutes": 4.783333333333333,
                            "$$hashKey": "object:390"
                        }
                    ]
                },
                "SportsVines & BestVinesCompilations": {
                    "count": 3,
                    "views": 1299945,
                    "videos": [
                        {
                            "title": "FOOTBALL VINES COMPILATION: Best Football Vines December 2015 - NFL Vines Big Hits",
                            "channelTitle": "SportsVines & BestVinesCompilations",
                            "channelId": "UCB79qPMDr9jtBp6LoAxePPg",
                            "created": "2015-12-14T17:50:38.000Z",
                            "videoId": "1imy_YEnzeM",
                            "pctLikes": 92.24489795918367,
                            "viewCount": 96478,
                            "likes": 452,
                            "dislikes": 38,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/1imy_YEnzeM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:11:41",
                            "durationMinutes": 11.683333333333334,
                            "$$hashKey": "object:386"
                        },
                        {
                            "title": "Best Football Vines Jukes Compilation 2015 - NFL Vines Best Big Hits with Beat Drops",
                            "channelTitle": "SportsVines & BestVinesCompilations",
                            "channelId": "UCB79qPMDr9jtBp6LoAxePPg",
                            "created": "2015-11-12T16:29:10.000Z",
                            "videoId": "Aoh6L8aiKs4",
                            "pctLikes": 90.69767441860465,
                            "viewCount": 34442,
                            "likes": 156,
                            "dislikes": 16,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Aoh6L8aiKs4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:28",
                            "durationMinutes": 3.466666666666667,
                            "$$hashKey": "object:5256"
                        },
                        {
                            "title": "Football Vines Celebrations: Best NFL Touchdown Dance Celebrations Vines Compilation",
                            "channelTitle": "SportsVines & BestVinesCompilations",
                            "channelId": "UCB79qPMDr9jtBp6LoAxePPg",
                            "created": "2015-11-30T18:10:21.000Z",
                            "videoId": "pO2igkE9Yz0",
                            "pctLikes": 92.91168983747798,
                            "viewCount": 1169025,
                            "likes": 4745,
                            "dislikes": 362,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/pO2igkE9Yz0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:10:14",
                            "durationMinutes": 10.233333333333333
                        }
                    ]
                },
                "EndlessFootball": {
                    "count": 1,
                    "views": 4666565,
                    "videos": [
                        {
                            "title": "LFL (Lingerie Football) Big Hits, Fights, and Funny Moments",
                            "channelTitle": "EndlessFootball",
                            "channelId": "UC34VJywGNC7KPdCbqVh3sdQ",
                            "created": "2014-12-04T09:03:34.000Z",
                            "videoId": "XUI5NdGVVlw",
                            "pctLikes": 93.0093035388227,
                            "viewCount": 4666565,
                            "likes": 10697,
                            "dislikes": 804,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/XUI5NdGVVlw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:30",
                            "durationMinutes": 2.5,
                            "$$hashKey": "object:331"
                        }
                    ]
                },
                "Helping Main Channel": {
                    "count": 4,
                    "views": 406133,
                    "videos": [
                        {
                            "title": "NFL Big hits Here comes the boom",
                            "channelTitle": "Helping Main Channel",
                            "channelId": "UC6gpr6VuDH0jFVZsvVpITqg",
                            "created": "2014-03-14T03:28:18.000Z",
                            "videoId": "w3w8Mwb0K7o",
                            "pctLikes": 84.06940063091483,
                            "viewCount": 386361,
                            "likes": 1066,
                            "dislikes": 202,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/w3w8Mwb0K7o/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:08",
                            "durationMinutes": 4.133333333333334,
                            "$$hashKey": "object:362"
                        },
                        {
                            "title": "NFL Hardest Hits 2011 2012",
                            "channelTitle": "Helping Main Channel",
                            "channelId": "UC6gpr6VuDH0jFVZsvVpITqg",
                            "created": "2014-03-14T03:43:08.000Z",
                            "videoId": "A2WWEnbkeWQ",
                            "pctLikes": 100,
                            "viewCount": 5249,
                            "likes": 19,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/A2WWEnbkeWQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:09:24",
                            "durationMinutes": 9.4,
                            "$$hashKey": "object:433"
                        },
                        {
                            "title": "HD NFL's Hardest Hits All Time",
                            "channelTitle": "Helping Main Channel",
                            "channelId": "UC6gpr6VuDH0jFVZsvVpITqg",
                            "created": "2014-03-14T03:25:51.000Z",
                            "videoId": "hBYDKGO5tA0",
                            "pctLikes": 88.13559322033898,
                            "viewCount": 12942,
                            "likes": 52,
                            "dislikes": 7,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/hBYDKGO5tA0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:20",
                            "durationMinutes": 4.333333333333333,
                            "$$hashKey": "object:5266"
                        },
                        {
                            "title": "NFL Crazy Insane Hard football Hits and Tackles",
                            "channelTitle": "Helping Main Channel",
                            "channelId": "UC6gpr6VuDH0jFVZsvVpITqg",
                            "created": "2014-03-14T03:30:01.000Z",
                            "videoId": "Bn03OdpwdQE",
                            "pctLikes": 100,
                            "viewCount": 1581,
                            "likes": 4,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Bn03OdpwdQE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:49",
                            "durationMinutes": 3.8166666666666664
                        }
                    ]
                },
                "High Game": {
                    "count": 1,
                    "views": 87137,
                    "videos": [
                        {
                            "title": "NFL GANGSTA HITS",
                            "channelTitle": "High Game",
                            "channelId": "UCw1pMb-U20GiY1q7fOgUSUQ",
                            "created": "2012-09-05T23:40:54.000Z",
                            "videoId": "uTp5dISP7Bg",
                            "pctLikes": 90.93851132686083,
                            "viewCount": 87137,
                            "likes": 281,
                            "dislikes": 28,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/uTp5dISP7Bg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:00",
                            "durationMinutes": 6,
                            "$$hashKey": "object:388"
                        }
                    ]
                },
                "blake dixon": {
                    "count": 1,
                    "views": 571689,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits",
                            "channelTitle": "blake dixon",
                            "channelId": "UC9xGgkaHggJ0tyGSSN2XRVg",
                            "created": "2012-12-05T04:51:27.000Z",
                            "videoId": "xOainLT1THQ",
                            "pctLikes": 87.33273862622659,
                            "viewCount": 571689,
                            "likes": 979,
                            "dislikes": 142,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/xOainLT1THQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:35",
                            "durationMinutes": 3.5833333333333335,
                            "$$hashKey": "object:355"
                        }
                    ]
                },
                "TheMagicMan": {
                    "count": 2,
                    "views": 2826092,
                    "videos": [
                        {
                            "title": "TSN - Top 10 Unexpected Hits",
                            "channelTitle": "TheMagicMan",
                            "channelId": "UCQI7W6ikLs9sz3Z4LuPw6RQ",
                            "created": "2015-08-27T02:19:14.000Z",
                            "videoId": "jY6_G4OrVQk",
                            "pctLikes": 97.60592817784534,
                            "viewCount": 2317692,
                            "likes": 5137,
                            "dislikes": 126,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/jY6_G4OrVQk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:41",
                            "durationMinutes": 3.6833333333333336,
                            "$$hashKey": "object:338"
                        },
                        {
                            "title": "TSN - Top 10 Kicker Moments",
                            "channelTitle": "TheMagicMan",
                            "channelId": "UCQI7W6ikLs9sz3Z4LuPw6RQ",
                            "created": "2015-08-25T00:51:53.000Z",
                            "videoId": "Rxy7GKvB5J4",
                            "pctLikes": 97.20826353992183,
                            "viewCount": 508400,
                            "likes": 1741,
                            "dislikes": 50,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Rxy7GKvB5J4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:49",
                            "durationMinutes": 3.8166666666666664,
                            "$$hashKey": "object:5208"
                        }
                    ]
                },
                "Jay Edwards": {
                    "count": 1,
                    "views": 32445,
                    "videos": [
                        {
                            "title": "NFL hardest hits **EPIC MUSIC**",
                            "channelTitle": "Jay Edwards",
                            "channelId": "UCL0zIAlb7ejWOaa4WzVU1nQ",
                            "created": "2014-12-10T18:43:55.000Z",
                            "videoId": "G1kdz_TGAv0",
                            "pctLikes": 88.05970149253731,
                            "viewCount": 32445,
                            "likes": 118,
                            "dislikes": 16,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/G1kdz_TGAv0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:15:32",
                            "durationMinutes": 15.533333333333333,
                            "$$hashKey": "object:400"
                        }
                    ]
                },
                "Brian Sanchez": {
                    "count": 1,
                    "views": 253627,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits!",
                            "channelTitle": "Brian Sanchez",
                            "channelId": "UCT8z6Lf58PSX21MsUqPPZhQ",
                            "created": "2012-03-24T05:03:15.000Z",
                            "videoId": "-2SXSRWyjFQ",
                            "pctLikes": 88.48920863309353,
                            "viewCount": 253627,
                            "likes": 615,
                            "dislikes": 80,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/-2SXSRWyjFQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:26",
                            "durationMinutes": 3.4333333333333336,
                            "$$hashKey": "object:371"
                        }
                    ]
                },
                "SPEEX": {
                    "count": 1,
                    "views": 1418608,
                    "videos": [
                        {
                            "title": "NFL & NCAA - Hardest Hits & Highlights [HD]",
                            "channelTitle": "SPEEX",
                            "channelId": "UCZlpAi_g-9QrI2vLei7qlHg",
                            "created": "2013-04-14T13:16:52.000Z",
                            "videoId": "cimTwLHvGrA",
                            "pctLikes": 91.66492146596859,
                            "viewCount": 1418608,
                            "likes": 4377,
                            "dislikes": 398,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/cimTwLHvGrA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:41",
                            "durationMinutes": 3.6833333333333336,
                            "$$hashKey": "object:344"
                        }
                    ]
                },
                "WildMan Productionz": {
                    "count": 1,
                    "views": 131320,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits of All Time",
                            "channelTitle": "WildMan Productionz",
                            "channelId": "UCkj4pWh1dRUJWUfjSRlQTLA",
                            "created": "2014-09-06T08:34:14.000Z",
                            "videoId": "oV7BRMg9zIk",
                            "pctLikes": 75.72559366754618,
                            "viewCount": 131320,
                            "likes": 287,
                            "dislikes": 92,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/oV7BRMg9zIk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:21:59",
                            "durationMinutes": 21.983333333333334,
                            "$$hashKey": "object:380"
                        }
                    ]
                },
                "Damalk82": {
                    "count": 1,
                    "views": 298533,
                    "videos": [
                        {
                            "title": "▶ NFL Hardest Hits 2010 2011",
                            "channelTitle": "Damalk82",
                            "channelId": "UCiqlX3ZTqNxos_ldTXQr_Sw",
                            "created": "2013-08-04T04:27:56.000Z",
                            "videoId": "bXHfqaWHWAg",
                            "pctLikes": 86.13303269447576,
                            "viewCount": 298533,
                            "likes": 764,
                            "dislikes": 123,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/bXHfqaWHWAg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:54",
                            "durationMinutes": 4.9,
                            "$$hashKey": "object:366"
                        }
                    ]
                },
                "Taran Swinney": {
                    "count": 2,
                    "views": 321049,
                    "videos": [
                        {
                            "title": "NFL Hard Hits",
                            "channelTitle": "Taran Swinney",
                            "channelId": "UCIOiUc1Mxb6--aN1ULpdY1g",
                            "created": "2011-01-15T08:12:25.000Z",
                            "videoId": "a-iVbw458UA",
                            "pctLikes": 94.3109987357775,
                            "viewCount": 281170,
                            "likes": 746,
                            "dislikes": 45,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/a-iVbw458UA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:09",
                            "durationMinutes": 7.15,
                            "$$hashKey": "object:367"
                        },
                        {
                            "title": "NFL Hard Hits Part 2",
                            "channelTitle": "Taran Swinney",
                            "channelId": "UCIOiUc1Mxb6--aN1ULpdY1g",
                            "created": "2011-02-11T03:55:40.000Z",
                            "videoId": "OVOKE3FeiYE",
                            "pctLikes": 97.82608695652173,
                            "viewCount": 39879,
                            "likes": 135,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/OVOKE3FeiYE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:56",
                            "durationMinutes": 3.9333333333333336
                        }
                    ]
                },
                "Swift Snipez": {
                    "count": 1,
                    "views": 1048,
                    "videos": [
                        {
                            "title": "NFL hardest hits with Panda",
                            "channelTitle": "Swift Snipez",
                            "channelId": "UCh43tPG2a3uDwrckF4bDZ4g",
                            "created": "2016-05-04T12:38:03.000Z",
                            "videoId": "NwORr-0T2Eg",
                            "pctLikes": 84.61538461538461,
                            "viewCount": 1048,
                            "likes": 11,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/NwORr-0T2Eg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:09",
                            "durationMinutes": 4.15,
                            "$$hashKey": "object:454"
                        }
                    ]
                },
                "RIXXSMusic": {
                    "count": 1,
                    "views": 44310,
                    "videos": [
                        {
                            "title": "NFL Hard Hits Brutal Revolution",
                            "channelTitle": "RIXXSMusic",
                            "channelId": "UCeDjeI3Wj9mJaMVSN1wubzg",
                            "created": "2013-03-30T22:09:41.000Z",
                            "videoId": "waxYKm-9WV0",
                            "pctLikes": 98.1651376146789,
                            "viewCount": 44310,
                            "likes": 214,
                            "dislikes": 4,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/waxYKm-9WV0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:04",
                            "durationMinutes": 4.066666666666666,
                            "$$hashKey": "object:396"
                        }
                    ]
                },
                "FootballVinesNation": {
                    "count": 2,
                    "views": 121836,
                    "videos": [
                        {
                            "title": "Best American Football Vines - Best NFL Vines - Hits & Tackles [ Best New Vines ] Jan. 2014 Part 2",
                            "channelTitle": "FootballVinesNation",
                            "channelId": "UCyM__1RcefVy4Gj70dzMOng",
                            "created": "2015-01-19T16:42:45.000Z",
                            "videoId": "9ltGk2xY314",
                            "pctLikes": 93.82470119521913,
                            "viewCount": 117070,
                            "likes": 471,
                            "dislikes": 31,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/9ltGk2xY314/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:19",
                            "durationMinutes": 3.3166666666666664,
                            "$$hashKey": "object:382"
                        },
                        {
                            "title": "Best Football Vines Compilation March 2016 - NFL Vines Big Hits, Football Highlights & Celebrations",
                            "channelTitle": "FootballVinesNation",
                            "channelId": "UCyM__1RcefVy4Gj70dzMOng",
                            "created": "2016-03-08T02:14:57.000Z",
                            "videoId": "bIJuv31zhCY",
                            "pctLikes": 97.1830985915493,
                            "viewCount": 4766,
                            "likes": 69,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/bIJuv31zhCY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:36",
                            "durationMinutes": 3.6,
                            "$$hashKey": "object:5279"
                        }
                    ]
                },
                "The Ankle Breaker": {
                    "count": 1,
                    "views": 31688,
                    "videos": [
                        {
                            "title": "NFL Sacks and Big Hits of 2015-16",
                            "channelTitle": "The Ankle Breaker",
                            "channelId": "UCTH89DmGxOi6aP17wJbyAfA",
                            "created": "2016-04-17T07:08:37.000Z",
                            "videoId": "_I4_kaa6pco",
                            "pctLikes": 69.6551724137931,
                            "viewCount": 31688,
                            "likes": 202,
                            "dislikes": 88,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/_I4_kaa6pco/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:26",
                            "durationMinutes": 5.433333333333334,
                            "$$hashKey": "object:402"
                        }
                    ]
                },
                "TaylorMadeBoi": {
                    "count": 1,
                    "views": 13079,
                    "videos": [
                        {
                            "title": "NFL Hits Vs Rugby Hits REACTION!!!",
                            "channelTitle": "TaylorMadeBoi",
                            "channelId": "UCv60fJWoAEt1Lpcan6JFFKA",
                            "created": "2016-04-06T00:18:20.000Z",
                            "videoId": "VID4WmTBlh8",
                            "pctLikes": 96.18320610687023,
                            "viewCount": 13079,
                            "likes": 126,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/VID4WmTBlh8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:08:20",
                            "durationMinutes": 8.333333333333334,
                            "$$hashKey": "object:419"
                        }
                    ]
                },
                "Tyra F": {
                    "count": 1,
                    "views": 2196253,
                    "videos": [
                        {
                            "title": "LFL Legends football league GIRLS ATTACK : hits and fights !",
                            "channelTitle": "Tyra F",
                            "channelId": "UCvSLz6cA3zlEJXHSIzvEGCQ",
                            "created": "2015-07-10T01:22:11.000Z",
                            "videoId": "A6Ox6s1GTSk",
                            "pctLikes": 90.96936442615456,
                            "viewCount": 2196253,
                            "likes": 3979,
                            "dislikes": 395,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/A6Ox6s1GTSk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:35",
                            "durationMinutes": 3.5833333333333335,
                            "$$hashKey": "object:339"
                        }
                    ]
                },
                "Papa Longlegs": {
                    "count": 1,
                    "views": 32646,
                    "videos": [
                        {
                            "title": "NFL Hits Vs Rugby Hits Reaction",
                            "channelTitle": "Papa Longlegs",
                            "channelId": "UC23g9BGC-MrGhRVEnkPYZXw",
                            "created": "2016-01-02T03:29:25.000Z",
                            "videoId": "qPuaQxHAPKM",
                            "pctLikes": 83.46774193548387,
                            "viewCount": 32646,
                            "likes": 207,
                            "dislikes": 41,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/qPuaQxHAPKM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:34",
                            "durationMinutes": 6.566666666666666,
                            "$$hashKey": "object:399"
                        }
                    ]
                },
                "Yolo Fovea": {
                    "count": 1,
                    "views": 179139,
                    "videos": [
                        {
                            "title": "Biggest illegal nfl hits",
                            "channelTitle": "Yolo Fovea",
                            "channelId": "UClsAy_veBcpWzYVEY3C-Xsw",
                            "created": "2014-04-03T16:53:44.000Z",
                            "videoId": "rfEgQHqpZgo",
                            "pctLikes": 59.64912280701754,
                            "viewCount": 179139,
                            "likes": 272,
                            "dislikes": 184,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/rfEgQHqpZgo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:23",
                            "durationMinutes": 4.383333333333334,
                            "$$hashKey": "object:379"
                        }
                    ]
                },
                "49erstudios2": {
                    "count": 1,
                    "views": 28240,
                    "videos": [
                        {
                            "title": "NFL HUGE HITS!!!! MUST WATCH!!!!",
                            "channelTitle": "49erstudios2",
                            "channelId": "UC1XZNpLkd1MqQMP781NWRkw",
                            "created": "2012-05-24T00:31:05.000Z",
                            "videoId": "t1CWlAu1nMk",
                            "pctLikes": 87.65432098765432,
                            "viewCount": 28240,
                            "likes": 71,
                            "dislikes": 10,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/t1CWlAu1nMk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:57",
                            "durationMinutes": 3.95,
                            "$$hashKey": "object:404"
                        }
                    ]
                },
                "Xplicit Nation": {
                    "count": 1,
                    "views": 213012,
                    "videos": [
                        {
                            "title": "NFL College Football Craziest Plays WOW MOMENTS Hardest Hits 2014 ᴴᴰ ✔",
                            "channelTitle": "Xplicit Nation",
                            "channelId": "UCWsKvApTxGHGJKtr5RVSC2w",
                            "created": "2014-11-13T08:17:44.000Z",
                            "videoId": "S4wQlkeQK9M",
                            "pctLikes": 90.1360544217687,
                            "viewCount": 213012,
                            "likes": 530,
                            "dislikes": 58,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/S4wQlkeQK9M/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:57",
                            "durationMinutes": 2.95,
                            "$$hashKey": "object:377"
                        }
                    ]
                },
                "Jan Steinhöfer": {
                    "count": 1,
                    "views": 53957,
                    "videos": [
                        {
                            "title": "Hardest American Football Hits Ever! (College & NFL) 2014-2015",
                            "channelTitle": "Jan Steinhöfer",
                            "channelId": "UCtVHXjCU2S1MZDCgupEY3TA",
                            "created": "2015-03-22T18:56:06.000Z",
                            "videoId": "aGG5OOjuYq4",
                            "pctLikes": 84.5303867403315,
                            "viewCount": 53957,
                            "likes": 153,
                            "dislikes": 28,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/aGG5OOjuYq4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:18",
                            "durationMinutes": 4.3,
                            "$$hashKey": "object:394"
                        }
                    ]
                },
                "SwagFoulNation": {
                    "count": 1,
                    "views": 16411,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits and Trucks Ever REACTION!!!",
                            "channelTitle": "SwagFoulNation",
                            "channelId": "UCkLrYpXjoZo380zsD9ftkUA",
                            "created": "2015-08-21T01:24:30.000Z",
                            "videoId": "RkJGrNp_hdc",
                            "pctLikes": 94.94163424124513,
                            "viewCount": 16411,
                            "likes": 244,
                            "dislikes": 13,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/RkJGrNp_hdc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:08",
                            "durationMinutes": 5.133333333333334,
                            "$$hashKey": "object:418"
                        }
                    ]
                },
                "Steve Czaban": {
                    "count": 1,
                    "views": 107639,
                    "videos": [
                        {
                            "title": "The NFL's \"Blurred Lines\" on Dirty Hits",
                            "channelTitle": "Steve Czaban",
                            "channelId": "UCsczlRw_c6J-Ln62UGy6gig",
                            "created": "2013-10-20T21:05:12.000Z",
                            "videoId": "O6bOBgbjRUU",
                            "pctLikes": 81.77966101694916,
                            "viewCount": 107639,
                            "likes": 193,
                            "dislikes": 43,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/O6bOBgbjRUU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:17",
                            "durationMinutes": 4.283333333333333,
                            "$$hashKey": "object:385"
                        }
                    ]
                },
                "FootballJunkie": {
                    "count": 1,
                    "views": 1960,
                    "videos": [
                        {
                            "title": "NFL Greatest Hits",
                            "channelTitle": "FootballJunkie",
                            "channelId": "UCu1gusO3oJwFaHrCyr7IyIg",
                            "created": "2016-01-27T20:42:14.000Z",
                            "videoId": "lEOjyFyxYx8",
                            "pctLikes": 100,
                            "viewCount": 1960,
                            "likes": 25,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/lEOjyFyxYx8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:51:48",
                            "durationMinutes": 51.8,
                            "$$hashKey": "object:445"
                        }
                    ]
                },
                "MrBhS88": {
                    "count": 1,
                    "views": 81735,
                    "videos": [
                        {
                            "title": "NFL Hits Vs Rugby Hits",
                            "channelTitle": "MrBhS88",
                            "channelId": "UCNEnjWqCvMcwzh_W7HExAyA",
                            "created": "2014-09-15T11:30:11.000Z",
                            "videoId": "cLln6Gd4Uww",
                            "pctLikes": 88.88888888888889,
                            "viewCount": 81735,
                            "likes": 176,
                            "dislikes": 22,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/cLln6Gd4Uww/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:59",
                            "durationMinutes": 5.983333333333333,
                            "$$hashKey": "object:389"
                        }
                    ]
                },
                "Rico": {
                    "count": 1,
                    "views": 10438,
                    "videos": [
                        {
                            "title": "NFL vs Rugby Hits",
                            "channelTitle": "Rico",
                            "channelId": "UClMcLeqZr5yw1vXjQO7PGWw",
                            "created": "2014-02-26T14:47:18.000Z",
                            "videoId": "y5RzMTrEyE0",
                            "pctLikes": 98.71794871794873,
                            "viewCount": 10438,
                            "likes": 154,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/y5RzMTrEyE0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:09:17",
                            "durationMinutes": 9.283333333333333,
                            "$$hashKey": "object:422"
                        }
                    ]
                },
                "XzSantiagozX": {
                    "count": 1,
                    "views": 31435,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits From 2008 to 2010 (D-Ham Production)",
                            "channelTitle": "XzSantiagozX",
                            "channelId": "UCNPoQeawAulnTbgUg1x0iTw",
                            "created": "2011-10-26T19:11:31.000Z",
                            "videoId": "nA6_6bVmSxg",
                            "pctLikes": 94.65648854961832,
                            "viewCount": 31435,
                            "likes": 124,
                            "dislikes": 7,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/nA6_6bVmSxg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:09:25",
                            "durationMinutes": 9.416666666666666,
                            "$$hashKey": "object:403"
                        }
                    ]
                },
                "tacoterorist": {
                    "count": 1,
                    "views": 23947,
                    "videos": [
                        {
                            "title": "Hardest Ray Lewis hits NFL.com",
                            "channelTitle": "tacoterorist",
                            "channelId": "UCzbZ07d2FWZCfeq7XRnET2w",
                            "created": "2015-09-27T21:19:00.000Z",
                            "videoId": "EzpJbQO8fqQ",
                            "pctLikes": 97.10144927536231,
                            "viewCount": 23947,
                            "likes": 67,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/EzpJbQO8fqQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:40",
                            "durationMinutes": 3.6666666666666665,
                            "$$hashKey": "object:409"
                        }
                    ]
                },
                "The Sean Perspective #TSPNation": {
                    "count": 1,
                    "views": 24713,
                    "videos": [
                        {
                            "title": "Biggest Rugby Hits Compilation (TSP Reactions) | NFL Players vs Rugby Players",
                            "channelTitle": "The Sean Perspective #TSPNation",
                            "channelId": "UCOThO2cf5ujpjwO6kKafDQg",
                            "created": "2016-02-05T14:05:23.000Z",
                            "videoId": "nWV0S6yXUag",
                            "pctLikes": 91.17647058823529,
                            "viewCount": 24713,
                            "likes": 186,
                            "dislikes": 18,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/nWV0S6yXUag/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:09:23",
                            "durationMinutes": 9.383333333333333,
                            "$$hashKey": "object:408"
                        }
                    ]
                },
                "blueicekings1": {
                    "count": 1,
                    "views": 92501,
                    "videos": [
                        {
                            "title": "NHL vs NFL Hits",
                            "channelTitle": "blueicekings1",
                            "channelId": "UCKITV_G4zTYQHxhKLM7XeWw",
                            "created": "2009-04-20T22:21:15.000Z",
                            "videoId": "3UkcWuuNNKw",
                            "pctLikes": 95.75971731448763,
                            "viewCount": 92501,
                            "likes": 271,
                            "dislikes": 12,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/3UkcWuuNNKw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:58",
                            "durationMinutes": 3.966666666666667,
                            "$$hashKey": "object:387"
                        }
                    ]
                },
                "thomas mcmanus": {
                    "count": 1,
                    "views": 109212,
                    "videos": [
                        {
                            "title": "Football's Hardest Hits & Trucks   College & NFL",
                            "channelTitle": "thomas mcmanus",
                            "channelId": "UC_McCLXW1QzmNBUQMlI_4Ag",
                            "created": "2014-11-30T04:05:30.000Z",
                            "videoId": "TDNsxFMUG8U",
                            "pctLikes": 95.53903345724906,
                            "viewCount": 109212,
                            "likes": 514,
                            "dislikes": 24,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/TDNsxFMUG8U/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:00",
                            "durationMinutes": 4,
                            "$$hashKey": "object:384"
                        }
                    ]
                },
                "CRAZYWHITEKID2013": {
                    "count": 1,
                    "views": 26447,
                    "videos": [
                        {
                            "title": "NFL and NCAA hits touchdowns and fights",
                            "channelTitle": "CRAZYWHITEKID2013",
                            "channelId": "UCMku3t2RsbY15hAJ8vVVWeA",
                            "created": "2015-09-17T01:03:38.000Z",
                            "videoId": "XssWliatesM",
                            "pctLikes": 87.05882352941177,
                            "viewCount": 26447,
                            "likes": 74,
                            "dislikes": 11,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/XssWliatesM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:25",
                            "durationMinutes": 4.416666666666667,
                            "$$hashKey": "object:405"
                        }
                    ]
                },
                "FAAMAUSILI": {
                    "count": 2,
                    "views": 102642,
                    "videos": [
                        {
                            "title": "NFL VS RUGBY HITS",
                            "channelTitle": "FAAMAUSILI",
                            "channelId": "UCZAMiyc9AzwLauPKKTIvJJw",
                            "created": "2013-10-14T06:21:51.000Z",
                            "videoId": "elYorwkiEbU",
                            "pctLikes": 92.93478260869566,
                            "viewCount": 65300,
                            "likes": 171,
                            "dislikes": 13,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/elYorwkiEbU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:21",
                            "durationMinutes": 4.35,
                            "$$hashKey": "object:391"
                        },
                        {
                            "title": "POLYNESIAN NFL PLAYERS [BIG HITS AND PLAYS]",
                            "channelTitle": "FAAMAUSILI",
                            "channelId": "UCZAMiyc9AzwLauPKKTIvJJw",
                            "created": "2013-01-21T12:29:46.000Z",
                            "videoId": "pQqwNcfbrJ0",
                            "pctLikes": 96.15384615384616,
                            "viewCount": 37342,
                            "likes": 75,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/pQqwNcfbrJ0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:15",
                            "durationMinutes": 4.25,
                            "$$hashKey": "object:5255"
                        }
                    ]
                },
                "Record323": {
                    "count": 1,
                    "views": 125535,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits 2011-2012",
                            "channelTitle": "Record323",
                            "channelId": "UC_3k1OHYb6qwwBFTi6NPm-Q",
                            "created": "2012-12-11T06:03:48.000Z",
                            "videoId": "Zzu2Swny5Yk",
                            "pctLikes": 90.66339066339066,
                            "viewCount": 125535,
                            "likes": 369,
                            "dislikes": 38,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Zzu2Swny5Yk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:27",
                            "durationMinutes": 3.45,
                            "$$hashKey": "object:381"
                        }
                    ]
                },
                "Chrisolacka": {
                    "count": 1,
                    "views": 411546,
                    "videos": [
                        {
                            "title": "NFL's Tops hit Ever",
                            "channelTitle": "Chrisolacka",
                            "channelId": "UCUFhE_cWgTa-ZGPTT6Yyt6g",
                            "created": "2008-05-10T20:02:28.000Z",
                            "videoId": "CKksdy4ClUk",
                            "pctLikes": 94.26751592356688,
                            "viewCount": 411546,
                            "likes": 444,
                            "dislikes": 27,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/CKksdy4ClUk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:07",
                            "durationMinutes": 4.116666666666666,
                            "$$hashKey": "object:361"
                        }
                    ]
                },
                "Keith Clark": {
                    "count": 1,
                    "views": 1739,
                    "videos": [
                        {
                            "title": "NFL Most Deadliest Hits EVER",
                            "channelTitle": "Keith Clark",
                            "channelId": "UCtNVmVF2Itf8eTyzpQEtrfg",
                            "created": "2015-09-02T05:37:19.000Z",
                            "videoId": "VADV_L-BKos",
                            "pctLikes": 100,
                            "viewCount": 1739,
                            "likes": 4,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/VADV_L-BKos/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333,
                            "$$hashKey": "object:448"
                        }
                    ]
                },
                "The Multitasker": {
                    "count": 1,
                    "views": 98,
                    "videos": [
                        {
                            "title": "NFL/College Football Jukes, Runs, and Hits.",
                            "channelTitle": "The Multitasker",
                            "channelId": "UCg5VODZMFiU9f9_H-NxLVBA",
                            "created": "2016-02-05T18:20:09.000Z",
                            "videoId": "yrT-AlyVJ5o",
                            "pctLikes": 100,
                            "viewCount": 98,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/yrT-AlyVJ5o/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:10",
                            "durationMinutes": 2.1666666666666665,
                            "$$hashKey": "object:499"
                        }
                    ]
                },
                "EliteBeast679": {
                    "count": 1,
                    "views": 68,
                    "videos": [
                        {
                            "title": "Football HARD HITS and TRUCKS college and NFL",
                            "channelTitle": "EliteBeast679",
                            "channelId": "UCFkWSLaROXbeceuTd4nmKog",
                            "created": "2016-04-28T17:02:06.000Z",
                            "videoId": "ovxkE7LcLHE",
                            "pctLikes": 100,
                            "viewCount": 68,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ovxkE7LcLHE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:44",
                            "durationMinutes": 3.7333333333333334,
                            "$$hashKey": "object:504"
                        }
                    ]
                },
                "HOLD FAST FILM": {
                    "count": 1,
                    "views": 116,
                    "videos": [
                        {
                            "title": "NFL - BIG HITS + Remember the Titans (NEW VIDEO 2016)",
                            "channelTitle": "HOLD FAST FILM",
                            "channelId": "UCQz-oHw6b4UsN15tkM3mwLg",
                            "created": "2016-02-03T13:45:05.000Z",
                            "videoId": "NwGdRzW38II",
                            "pctLikes": 100,
                            "viewCount": 116,
                            "likes": 6,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/NwGdRzW38II/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:21",
                            "durationMinutes": 1.35,
                            "$$hashKey": "object:492"
                        }
                    ]
                },
                "Cardsmiths Breaks": {
                    "count": 13,
                    "views": 4217,
                    "videos": [
                        {
                            "title": "NFL Sunday Night 36+ Hits 8 Box Mixer Spectra Contenders Inception",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2015-10-26T02:28:41.000Z",
                            "videoId": "N-LVY66RDys",
                            "pctLikes": 100,
                            "viewCount": 317,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/N-LVY66RDys/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:22:22",
                            "durationMinutes": 22.366666666666667,
                            "$$hashKey": "object:475"
                        },
                        {
                            "title": "NFL Sunday Night 36+ Hits 8 Box Mixer Spectra Contenders Inception Hit Recap",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2015-10-12T03:15:36.000Z",
                            "videoId": "RxJc3yF4xns",
                            "pctLikes": 100,
                            "viewCount": 123,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/RxJc3yF4xns/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:24",
                            "durationMinutes": 4.4,
                            "$$hashKey": "object:491"
                        },
                        {
                            "title": "NFL Sunday Night 32+ Hits 6 Box Mixer Prizm Super Break Spectra Finest Contenders",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2015-11-18T00:47:20.000Z",
                            "videoId": "lHZn2-ZfHIE",
                            "pctLikes": 100,
                            "viewCount": 331,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/lHZn2-ZfHIE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:23:48",
                            "durationMinutes": 23.8,
                            "$$hashKey": "object:474"
                        },
                        {
                            "title": "NFL Draft Special 2011 2016 14 Box 59+ Hits Football Mixer",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2016-04-29T13:22:10.000Z",
                            "videoId": "WnEykM3Gv2g",
                            "pctLikes": 100,
                            "viewCount": 551,
                            "likes": 11,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/WnEykM3Gv2g/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:47:49",
                            "durationMinutes": 47.81666666666667,
                            "$$hashKey": "object:465"
                        },
                        {
                            "title": "2011-15 Henry VIII 8 Box 38+ Hits NFL Mixer",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2016-02-13T04:35:33.000Z",
                            "videoId": "G_PmKJmyFOU",
                            "pctLikes": 77.77777777777779,
                            "viewCount": 391,
                            "likes": 7,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/G_PmKJmyFOU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:26:09",
                            "durationMinutes": 26.15,
                            "$$hashKey": "object:469"
                        },
                        {
                            "title": "2011-14-15 Lockett Down 8 Box 29+ Hits NFL Mixer",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2016-02-01T03:51:45.000Z",
                            "videoId": "Q5KqB4GRL8g",
                            "pctLikes": 100,
                            "viewCount": 266,
                            "likes": 4,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Q5KqB4GRL8g/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:27:11",
                            "durationMinutes": 27.183333333333334,
                            "$$hashKey": "object:481"
                        },
                        {
                            "title": "2013 NFL Mixer 78+ Hits Dual Half Case Spectra and Contenders Hit Recap",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2015-10-24T06:18:08.000Z",
                            "videoId": "unpxvdn3NlQ",
                            "pctLikes": 100,
                            "viewCount": 163,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/unpxvdn3NlQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:01",
                            "durationMinutes": 6.016666666666667,
                            "$$hashKey": "object:487"
                        },
                        {
                            "title": "2013 NFL Mixer 78+ Hits Dual Half Case Spectra and Contenders",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2015-10-24T07:06:38.000Z",
                            "videoId": "tTeIZ8Kq6e0",
                            "pctLikes": 100,
                            "viewCount": 361,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/tTeIZ8Kq6e0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:41:49",
                            "durationMinutes": 41.81666666666667,
                            "$$hashKey": "object:472"
                        },
                        {
                            "title": "2013-14-15 NFL Football 7 Box 34+ Hits Mixer",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2016-01-24T22:33:17.000Z",
                            "videoId": "KYawKAAX0rw",
                            "pctLikes": 100,
                            "viewCount": 354,
                            "likes": 8,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/KYawKAAX0rw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:24:48",
                            "durationMinutes": 24.8,
                            "$$hashKey": "object:473"
                        },
                        {
                            "title": "NFL Sunday Night 36+ Hits 8 Box Mixer Spectra Contenders Inception",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2015-10-12T03:24:19.000Z",
                            "videoId": "E-AmE4lQNnA",
                            "pctLikes": 100,
                            "viewCount": 239,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/E-AmE4lQNnA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:27:34",
                            "durationMinutes": 27.566666666666666,
                            "$$hashKey": "object:5316"
                        },
                        {
                            "title": "Christmas Eve Eve NFL 51+ Hits 14 Box Mixer",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2015-12-24T05:15:42.000Z",
                            "videoId": "BKsoEaFcxjk",
                            "pctLikes": 100,
                            "viewCount": 503,
                            "likes": 15,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/BKsoEaFcxjk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:38:07",
                            "durationMinutes": 38.11666666666667,
                            "$$hashKey": "object:5310"
                        },
                        {
                            "title": "NFL Thursday Night 61+ Hits 11 Box Mixer Spectra Contenders Inception Hit Recap",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2015-09-18T02:38:10.000Z",
                            "videoId": "AY8UGAXJJXE",
                            "pctLikes": 100,
                            "viewCount": 197,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/AY8UGAXJJXE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:07",
                            "durationMinutes": 6.116666666666666
                        },
                        {
                            "title": "NFL Kickoff Monster 98+ Hits Quad Half Case 2014 NT Contenders 2015 Inception Spectra",
                            "channelTitle": "Cardsmiths Breaks",
                            "channelId": "UC8sf22Nz5jPXWuKcSpRbduQ",
                            "created": "2015-09-11T04:34:50.000Z",
                            "videoId": "mNolLjy0uKA",
                            "pctLikes": 100,
                            "viewCount": 421,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/mNolLjy0uKA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:45:08",
                            "durationMinutes": 45.13333333333333
                        }
                    ]
                },
                "BoomXsEntertaiment": {
                    "count": 1,
                    "views": 20688,
                    "videos": [
                        {
                            "title": "NFL NCAA Hardest Hits 2006-2010",
                            "channelTitle": "BoomXsEntertaiment",
                            "channelId": "UCesj0hCgnORZguvaKGPHL2g",
                            "created": "2010-09-02T14:37:46.000Z",
                            "videoId": "4ckvaXSc9QA",
                            "pctLikes": 100,
                            "viewCount": 20688,
                            "likes": 54,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/4ckvaXSc9QA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:34",
                            "durationMinutes": 2.5666666666666664,
                            "$$hashKey": "object:413"
                        }
                    ]
                },
                "Parker Holbrook": {
                    "count": 1,
                    "views": 809,
                    "videos": [
                        {
                            "title": "NFL Football hits and plays",
                            "channelTitle": "Parker Holbrook",
                            "channelId": "UCZhUcnJG_q8yu9kE_QiE-zg",
                            "created": "2010-01-13T23:16:53.000Z",
                            "videoId": "Ia88lCvlC58",
                            "pctLikes": 100,
                            "viewCount": 809,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Ia88lCvlC58/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:01",
                            "durationMinutes": 2.0166666666666666,
                            "$$hashKey": "object:459"
                        }
                    ]
                },
                "YourRugbyWorld": {
                    "count": 1,
                    "views": 175,
                    "videos": [
                        {
                            "title": "Rugby League Vs  American Football NFL BIG HITS Montage",
                            "channelTitle": "YourRugbyWorld",
                            "channelId": "UC3V5MRhY62gmivoF9V-RT4w",
                            "created": "2015-03-14T12:52:45.000Z",
                            "videoId": "S9UFXmLYv7U",
                            "pctLikes": 100,
                            "viewCount": 175,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/S9UFXmLYv7U/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:53",
                            "durationMinutes": 4.883333333333333,
                            "$$hashKey": "object:486"
                        }
                    ]
                },
                "Angus Sarafian": {
                    "count": 1,
                    "views": 150,
                    "videos": [
                        {
                            "title": "NFL Vines Big Hits 🏈🏈🏈 - Best NFL Vines ✅ - Best Football Vines - NCAA Vines - New NFL Vin",
                            "channelTitle": "Angus Sarafian",
                            "channelId": "UCVYW-RCOSjw7cmtui9nPXsA",
                            "created": "2015-07-18T19:32:26.000Z",
                            "videoId": "XfzmPuBESJ8",
                            "pctLikes": 100,
                            "viewCount": 150,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/XfzmPuBESJ8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:07",
                            "durationMinutes": 0.11666666666666667,
                            "$$hashKey": "object:490"
                        }
                    ]
                },
                "All Football Highlights": {
                    "count": 1,
                    "views": 518,
                    "videos": [
                        {
                            "title": "Hardest Football Hits- Ncaa and NFL",
                            "channelTitle": "All Football Highlights",
                            "channelId": "UCirDwtl32PuAO7X67i8iqIA",
                            "created": "2015-08-25T20:32:13.000Z",
                            "videoId": "sU67QZxQSs8",
                            "pctLikes": 100,
                            "viewCount": 518,
                            "likes": 6,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/sU67QZxQSs8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:35",
                            "durationMinutes": 3.5833333333333335,
                            "$$hashKey": "object:468"
                        }
                    ]
                },
                "Imran Ali": {
                    "count": 2,
                    "views": 958,
                    "videos": [
                        {
                            "title": "2015 NFL , College Football , High School Football (Hurdles , Hits , catches ) All in One!!",
                            "channelTitle": "Imran Ali",
                            "channelId": "UCIi0vN3W7-JL1z38DaOThjA",
                            "created": "2015-11-26T02:39:30.000Z",
                            "videoId": "Es69MUGUM_Y",
                            "pctLikes": 100,
                            "viewCount": 157,
                            "likes": 4,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Es69MUGUM_Y/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:43",
                            "durationMinutes": 5.716666666666667,
                            "$$hashKey": "object:489"
                        },
                        {
                            "title": "NFL / College Football - Crazy Plays /Crazy Hits / Insane Catches .",
                            "channelTitle": "Imran Ali",
                            "channelId": "UCIi0vN3W7-JL1z38DaOThjA",
                            "created": "2016-01-23T17:21:35.000Z",
                            "videoId": "0ZgP2JXMIDw",
                            "pctLikes": 100,
                            "viewCount": 801,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/0ZgP2JXMIDw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:22",
                            "durationMinutes": 7.366666666666666
                        }
                    ]
                },
                "FizzBomb Bros.": {
                    "count": 1,
                    "views": 21,
                    "videos": [
                        {
                            "title": "NFL HITS 2016",
                            "channelTitle": "FizzBomb Bros.",
                            "channelId": "UC9GC7wfbUJZsa0xT4RTeIHA",
                            "created": "2016-02-06T03:02:29.000Z",
                            "videoId": "Nc-8YG2CaNo",
                            "pctLikes": 100,
                            "viewCount": 21,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Nc-8YG2CaNo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:49",
                            "durationMinutes": 1.8166666666666667,
                            "$$hashKey": "object:516"
                        }
                    ]
                },
                "andre cassama": {
                    "count": 1,
                    "views": 2981,
                    "videos": [
                        {
                            "title": "nfl  HARD HITS  liNKIN PARK-bURN IT DOWN",
                            "channelTitle": "andre cassama",
                            "channelId": "UCwSNNw-nk15uw-nA6OBqFhw",
                            "created": "2012-10-19T18:41:20.000Z",
                            "videoId": "vZZ2t-_UiOA",
                            "pctLikes": 100,
                            "viewCount": 2981,
                            "likes": 11,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/vZZ2t-_UiOA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:54",
                            "durationMinutes": 3.9,
                            "$$hashKey": "object:440"
                        }
                    ]
                },
                "Yevgeniy Litvinov": {
                    "count": 1,
                    "views": 309,
                    "videos": [
                        {
                            "title": "NFL Hits VS NHL Hits",
                            "channelTitle": "Yevgeniy Litvinov",
                            "channelId": "UCZknxua_PgSD7ALFRvYoIrQ",
                            "created": "2014-09-20T07:27:37.000Z",
                            "videoId": "9Ccziam7lGE",
                            "pctLikes": 100,
                            "viewCount": 309,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/9Ccziam7lGE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:55",
                            "durationMinutes": 5.916666666666667,
                            "$$hashKey": "object:478"
                        }
                    ]
                },
                "Vincent Tio": {
                    "count": 1,
                    "views": 6170,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits Ever",
                            "channelTitle": "Vincent Tio",
                            "channelId": "UCfL1B_vHhdgElb0W1mS_jCA",
                            "created": "2010-11-11T18:57:24.000Z",
                            "videoId": "pdD791W1PRM",
                            "pctLikes": 100,
                            "viewCount": 6170,
                            "likes": 6,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/pdD791W1PRM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:51",
                            "durationMinutes": 3.85,
                            "$$hashKey": "object:429"
                        }
                    ]
                },
                "Chan The Man": {
                    "count": 1,
                    "views": 1036,
                    "videos": [
                        {
                            "title": "Nfl hardest hits and trucks part 1",
                            "channelTitle": "Chan The Man",
                            "channelId": "UCcF8VbJAcZcJ6sFrZy2oogA",
                            "created": "2015-08-01T01:08:09.000Z",
                            "videoId": "gnLiv8HsmcA",
                            "pctLikes": 100,
                            "viewCount": 1036,
                            "likes": 9,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/gnLiv8HsmcA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:00",
                            "durationMinutes": 3,
                            "$$hashKey": "object:455"
                        }
                    ]
                },
                "westfesttv": {
                    "count": 1,
                    "views": 17958,
                    "videos": [
                        {
                            "title": "Snoop Dogg live on WestFestTV before he hits tha stage for NFL Network Super Bowl Weekend",
                            "channelTitle": "westfesttv",
                            "channelId": "UC-OO324clObi3H-U0bP77dw",
                            "created": "2009-04-09T18:38:58.000Z",
                            "videoId": "Rm1nNhWp158",
                            "pctLikes": 100,
                            "viewCount": 17958,
                            "likes": 16,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Rm1nNhWp158/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:17",
                            "durationMinutes": 1.2833333333333332,
                            "$$hashKey": "object:416"
                        }
                    ]
                },
                "DeathVessel": {
                    "count": 1,
                    "views": 282,
                    "videos": [
                        {
                            "title": "NFL Big hits - Here comes the boom",
                            "channelTitle": "DeathVessel",
                            "channelId": "UCLzXAgN8lOkvvUifjWtEuuA",
                            "created": "2015-02-24T06:23:50.000Z",
                            "videoId": "MdY6EMsbY8k",
                            "pctLikes": 100,
                            "viewCount": 282,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/MdY6EMsbY8k/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:08",
                            "durationMinutes": 4.133333333333334,
                            "$$hashKey": "object:480"
                        }
                    ]
                },
                "🏈 New Vines ⚽": {
                    "count": 1,
                    "views": 248,
                    "videos": [
                        {
                            "title": "NFL Vines Big Hits 2015 Episode 18| NFL Vines Celebrations | Best NFL Vines Compilation 2015",
                            "channelTitle": "🏈 New Vines ⚽",
                            "channelId": "UCJuMF3ed4svoN4NnF2ZP6qg",
                            "created": "2015-07-03T16:02:07.000Z",
                            "videoId": "duM1IpbrRYo",
                            "pctLikes": 100,
                            "viewCount": 248,
                            "likes": 7,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/duM1IpbrRYo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:13",
                            "durationMinutes": 3.216666666666667,
                            "$$hashKey": "object:482"
                        }
                    ]
                },
                "LAST KINGZ": {
                    "count": 1,
                    "views": 23,
                    "videos": [
                        {
                            "title": "Hardest hits NFL and college",
                            "channelTitle": "LAST KINGZ",
                            "channelId": "UCiIQjeMi36ixZs7ZizWOy4w",
                            "created": "2016-01-09T16:30:02.000Z",
                            "videoId": "VWNANyWijIU",
                            "pctLikes": 100,
                            "viewCount": 23,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/VWNANyWijIU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:12",
                            "durationMinutes": 3.2,
                            "$$hashKey": "object:513"
                        }
                    ]
                },
                "Thomas Kallesøe": {
                    "count": 1,
                    "views": 694,
                    "videos": [
                        {
                            "title": "Super NFL Hits",
                            "channelTitle": "Thomas Kallesøe",
                            "channelId": "UC1HjWf4RJ9XyDYPknaOfDnQ",
                            "created": "2009-09-17T09:30:40.000Z",
                            "videoId": "GuqEZ-r3PaU",
                            "pctLikes": 100,
                            "viewCount": 694,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/GuqEZ-r3PaU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:25",
                            "durationMinutes": 2.4166666666666665,
                            "$$hashKey": "object:463"
                        }
                    ]
                },
                "Matt Schraenkler": {
                    "count": 1,
                    "views": 367,
                    "videos": [
                        {
                            "title": "NFL Helmet to Helmet Hits",
                            "channelTitle": "Matt Schraenkler",
                            "channelId": "UC1w72U5zLX8M53Hjd10kSWg",
                            "created": "2013-11-12T03:34:47.000Z",
                            "videoId": "5RGnUpgL1D0",
                            "pctLikes": 100,
                            "viewCount": 367,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/5RGnUpgL1D0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:22",
                            "durationMinutes": 0.36666666666666664,
                            "$$hashKey": "object:471"
                        }
                    ]
                },
                "olovjaa": {
                    "count": 1,
                    "views": 1775,
                    "videos": [
                        {
                            "title": "NFL - Big Hits самый жёсткий вид спорта",
                            "channelTitle": "olovjaa",
                            "channelId": "UCdGLFMD90D2bG6RczaXLmog",
                            "created": "2013-02-13T16:34:42.000Z",
                            "videoId": "40_NgMJfpqM",
                            "pctLikes": 100,
                            "viewCount": 1775,
                            "likes": 7,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/40_NgMJfpqM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:54",
                            "durationMinutes": 3.9,
                            "$$hashKey": "object:447"
                        }
                    ]
                },
                "Joseph Dawson": {
                    "count": 1,
                    "views": 66,
                    "videos": [
                        {
                            "title": "NFL Hits feat Powerman 5000",
                            "channelTitle": "Joseph Dawson",
                            "channelId": "UCpOBzPZVfYi78XC_sQBE0WA",
                            "created": "2014-09-01T01:26:06.000Z",
                            "videoId": "-4Ss90GcQ_c",
                            "pctLikes": 100,
                            "viewCount": 66,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/-4Ss90GcQ_c/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:55",
                            "durationMinutes": 2.9166666666666665,
                            "$$hashKey": "object:505"
                        }
                    ]
                },
                "booli1989": {
                    "count": 1,
                    "views": 1929,
                    "videos": [
                        {
                            "title": "NFL's Greatest Hits",
                            "channelTitle": "booli1989",
                            "channelId": "UCTvhx3ZINg8TbSws-jc28wQ",
                            "created": "2010-04-17T11:56:26.000Z",
                            "videoId": "BLd0_-6qrcg",
                            "pctLikes": 100,
                            "viewCount": 1929,
                            "likes": 12,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/BLd0_-6qrcg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:58",
                            "durationMinutes": 2.966666666666667,
                            "$$hashKey": "object:446"
                        }
                    ]
                },
                "Meteleco": {
                    "count": 1,
                    "views": 4877,
                    "videos": [
                        {
                            "title": "The Who - Greatest Hits - Live at Miami NFL Super Bowl XLIV - Half Time Concert",
                            "channelTitle": "Meteleco",
                            "channelId": "UCfW73hEEoPyrYjFpseBOIcA",
                            "created": "2010-02-09T00:29:55.000Z",
                            "videoId": "dplSYlzkUE4",
                            "pctLikes": 100,
                            "viewCount": 4877,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/dplSYlzkUE4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:09:54",
                            "durationMinutes": 9.9,
                            "$$hashKey": "object:436"
                        }
                    ]
                },
                "No More": {
                    "count": 1,
                    "views": 724,
                    "videos": [
                        {
                            "title": "** MOTIVATIONAL **  NFL football COMPILATION and HARD hits! ** compilation ** of scenes",
                            "channelTitle": "No More",
                            "channelId": "UCSTLFKifLgwWzzhGDpkbw0Q",
                            "created": "2015-02-25T02:27:54.000Z",
                            "videoId": "8gHFbQfJgUg",
                            "pctLikes": 100,
                            "viewCount": 724,
                            "likes": 10,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/8gHFbQfJgUg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:32",
                            "durationMinutes": 5.533333333333333,
                            "$$hashKey": "object:461"
                        }
                    ]
                },
                "Twiggy_giles9": {
                    "count": 1,
                    "views": 108,
                    "videos": [
                        {
                            "title": "NFL Massive Hits 2014-2015",
                            "channelTitle": "Twiggy_giles9",
                            "channelId": "UCJ3vhDuZz9HW7KpLjvckfTQ",
                            "created": "2015-10-08T17:49:17.000Z",
                            "videoId": "vmdDfJ4wWKA",
                            "pctLikes": 100,
                            "viewCount": 108,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/vmdDfJ4wWKA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:26",
                            "durationMinutes": 2.4333333333333336,
                            "$$hashKey": "object:496"
                        }
                    ]
                },
                "Top Five Everything": {
                    "count": 1,
                    "views": 843,
                    "videos": [
                        {
                            "title": "Top Five NFL Hits [HD]",
                            "channelTitle": "Top Five Everything",
                            "channelId": "UCzoxmQ1JTvuCzydWK1zl7bQ",
                            "created": "2014-10-15T01:07:58.000Z",
                            "videoId": "rOTsNqsNfwk",
                            "pctLikes": 100,
                            "viewCount": 843,
                            "likes": 7,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/rOTsNqsNfwk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:51",
                            "durationMinutes": 2.85,
                            "$$hashKey": "object:458"
                        }
                    ]
                },
                "eddyronk66": {
                    "count": 1,
                    "views": 707,
                    "videos": [
                        {
                            "title": "NFL s Biggest Hits HD (High)",
                            "channelTitle": "eddyronk66",
                            "channelId": "UCk8mCOkDGbVscraLpdm9AIQ",
                            "created": "2012-06-27T01:47:48.000Z",
                            "videoId": "SOoFKRAYQug",
                            "pctLikes": 100,
                            "viewCount": 707,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/SOoFKRAYQug/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:25",
                            "durationMinutes": 3.4166666666666665,
                            "$$hashKey": "object:462"
                        }
                    ]
                },
                "Xboxgunner Gaming": {
                    "count": 1,
                    "views": 2803,
                    "videos": [
                        {
                            "title": "Madden NFL 16 Epic Compilation Ep. 1 (Featuring 1 Handed Catches, Sickest Junks, Hardest Hits)",
                            "channelTitle": "Xboxgunner Gaming",
                            "channelId": "UC40AH2eCFkBoWEph1IkqzFg",
                            "created": "2016-02-07T21:29:09.000Z",
                            "videoId": "HHEeroexw5I",
                            "pctLikes": 100,
                            "viewCount": 2803,
                            "likes": 18,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/HHEeroexw5I/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:50",
                            "durationMinutes": 2.8333333333333335,
                            "$$hashKey": "object:441"
                        }
                    ]
                },
                "Friede Frey": {
                    "count": 1,
                    "views": 1110,
                    "videos": [
                        {
                            "title": "NFL/NCCA Best Jukes,hits,stiff Arms,catches",
                            "channelTitle": "Friede Frey",
                            "channelId": "UCKE4uuvwT8xJ_c0Xhv7fBhA",
                            "created": "2015-05-21T01:19:00.000Z",
                            "videoId": "nDJGr72m4VA",
                            "pctLikes": 100,
                            "viewCount": 1110,
                            "likes": 14,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/nDJGr72m4VA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:39",
                            "durationMinutes": 3.65,
                            "$$hashKey": "object:452"
                        }
                    ]
                },
                "Sequence Media Group": {
                    "count": 1,
                    "views": 1190,
                    "videos": [
                        {
                            "title": "NFL Helmet to Helmet Hits...Former Redskin Defensive Back... Brian Davis",
                            "channelTitle": "Sequence Media Group",
                            "channelId": "UC8AczokDXpE3F09NLoXgB7g",
                            "created": "2010-11-12T18:37:42.000Z",
                            "videoId": "jO1DcA6L1D4",
                            "pctLikes": 100,
                            "viewCount": 1190,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/jO1DcA6L1D4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:12",
                            "durationMinutes": 6.2,
                            "$$hashKey": "object:451"
                        }
                    ]
                },
                "graysonmartin": {
                    "count": 1,
                    "views": 3089,
                    "videos": [
                        {
                            "title": "Jamar Taylor lays OUT Jordan Matthews NFL HITS!!",
                            "channelTitle": "graysonmartin",
                            "channelId": "UCx1yzRweRe0flydMZIm8nGQ",
                            "created": "2015-11-15T20:49:09.000Z",
                            "videoId": "uvJp-k87p68",
                            "pctLikes": 100,
                            "viewCount": 3089,
                            "likes": 14,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/uvJp-k87p68/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:24",
                            "durationMinutes": 0.4,
                            "$$hashKey": "object:439"
                        }
                    ]
                },
                "AtoWn VRanT": {
                    "count": 1,
                    "views": 2406,
                    "videos": [
                        {
                            "title": "NFL Greatest Hits Mix",
                            "channelTitle": "AtoWn VRanT",
                            "channelId": "UC2eigxEv2ApOV-zlvdJ94gw",
                            "created": "2012-01-20T07:21:22.000Z",
                            "videoId": "rDnCUqkSeiQ",
                            "pctLikes": 100,
                            "viewCount": 2406,
                            "likes": 6,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/rDnCUqkSeiQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:21",
                            "durationMinutes": 4.35,
                            "$$hashKey": "object:443"
                        }
                    ]
                },
                "MUFC-SkyFleX": {
                    "count": 1,
                    "views": 6457,
                    "videos": [
                        {
                            "title": "NFL - HARD HITS - BOOM Earthquake!!!",
                            "channelTitle": "MUFC-SkyFleX",
                            "channelId": "UC7ZMpxsd527sx3BEFOKnKug",
                            "created": "2013-09-07T23:47:07.000Z",
                            "videoId": "PiXYrZYqx_Y",
                            "pctLikes": 100,
                            "viewCount": 6457,
                            "likes": 20,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/PiXYrZYqx_Y/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:40",
                            "durationMinutes": 3.6666666666666665,
                            "$$hashKey": "object:428"
                        }
                    ]
                },
                "broncoplanet": {
                    "count": 1,
                    "views": 544,
                    "videos": [
                        {
                            "title": "Spencer Larsen Talks NFL Football, Big Hits, and Heroes",
                            "channelTitle": "broncoplanet",
                            "channelId": "UC5PT7J75kjYxZUN0gKAZw3A",
                            "created": "2011-09-23T05:04:44.000Z",
                            "videoId": "v8S4UE0dp6Q",
                            "pctLikes": 100,
                            "viewCount": 544,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/v8S4UE0dp6Q/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:10:01",
                            "durationMinutes": 10.016666666666667,
                            "$$hashKey": "object:466"
                        }
                    ]
                },
                "Jared Greenberg": {
                    "count": 1,
                    "views": 599,
                    "videos": [
                        {
                            "title": "NFL Hits & Fines - Flyer News Story",
                            "channelTitle": "Jared Greenberg",
                            "channelId": "UCC6PfxFGHCPA1hn1TfIeVYw",
                            "created": "2011-12-22T19:35:35.000Z",
                            "videoId": "evEm_AKLysg",
                            "pctLikes": 100,
                            "viewCount": 599,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/evEm_AKLysg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:23",
                            "durationMinutes": 2.3833333333333333,
                            "$$hashKey": "object:464"
                        }
                    ]
                },
                "TheUnizee": {
                    "count": 1,
                    "views": 11269,
                    "videos": [
                        {
                            "title": "NFL- HITS MIX (WOW)",
                            "channelTitle": "TheUnizee",
                            "channelId": "UC2MC51KKyWCqA7vGXko-Yow",
                            "created": "2010-09-03T13:47:24.000Z",
                            "videoId": "fy1DVbFDJQk",
                            "pctLikes": 100,
                            "viewCount": 11269,
                            "likes": 16,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/fy1DVbFDJQk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:09:34",
                            "durationMinutes": 9.566666666666666,
                            "$$hashKey": "object:420"
                        }
                    ]
                },
                "NFLization": {
                    "count": 2,
                    "views": 32572,
                    "videos": [
                        {
                            "title": "NFL - Roy Williams Greatest Hits",
                            "channelTitle": "NFLization",
                            "channelId": "UCbYuxzL9-YVrErLDanO7TLA",
                            "created": "2009-11-27T22:06:50.000Z",
                            "videoId": "T8e7hXKFnf4",
                            "pctLikes": 100,
                            "viewCount": 6134,
                            "likes": 13,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/T8e7hXKFnf4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:44",
                            "durationMinutes": 0.7333333333333333,
                            "$$hashKey": "object:430"
                        },
                        {
                            "title": "NFL - Top Brutal Hits/Tackles",
                            "channelTitle": "NFLization",
                            "channelId": "UCbYuxzL9-YVrErLDanO7TLA",
                            "created": "2009-11-27T21:31:54.000Z",
                            "videoId": "9n6a2Ri4GKM",
                            "pctLikes": 96.61016949152543,
                            "viewCount": 26438,
                            "likes": 57,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/9n6a2Ri4GKM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:58",
                            "durationMinutes": 2.966666666666667
                        }
                    ]
                },
                "DcentUser": {
                    "count": 1,
                    "views": 80,
                    "videos": [
                        {
                            "title": "NFL Big Hits Montage",
                            "channelTitle": "DcentUser",
                            "channelId": "UC2KltznWcRNbE-LKmWb6UsQ",
                            "created": "2014-09-05T22:56:08.000Z",
                            "videoId": "-UPPDFejAyg",
                            "pctLikes": 100,
                            "viewCount": 80,
                            "likes": 4,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/-UPPDFejAyg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:41",
                            "durationMinutes": 3.6833333333333336,
                            "$$hashKey": "object:501"
                        }
                    ]
                },
                "Tiktaalik": {
                    "count": 1,
                    "views": 10780,
                    "videos": [
                        {
                            "title": "Vintage NFL Hard Hits",
                            "channelTitle": "Tiktaalik",
                            "channelId": "UCXxUTmCuLGBAMMqdhdHvVww",
                            "created": "2014-02-24T02:17:12.000Z",
                            "videoId": "TeJFEf7JfUA",
                            "pctLikes": 100,
                            "viewCount": 10780,
                            "likes": 19,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/TeJFEf7JfUA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:11",
                            "durationMinutes": 1.1833333333333333,
                            "$$hashKey": "object:421"
                        }
                    ]
                },
                "KING EVIDENCE": {
                    "count": 1,
                    "views": 80,
                    "videos": [
                        {
                            "title": "NFL/COLLEGE HARDEST HITS",
                            "channelTitle": "KING EVIDENCE",
                            "channelId": "UCto6IZQbOOhCDiHh7t12qFA",
                            "created": "2016-01-12T20:49:59.000Z",
                            "videoId": "FfbQAETqrMk",
                            "pctLikes": 100,
                            "viewCount": 80,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/FfbQAETqrMk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:00",
                            "durationMinutes": 3,
                            "$$hashKey": "object:502"
                        }
                    ]
                },
                "Straight Outta Flint": {
                    "count": 2,
                    "views": 38,
                    "videos": [
                        {
                            "title": "Madden NFL 25 Season 1, hard hits, funny moments, & dope plays",
                            "channelTitle": "Straight Outta Flint",
                            "channelId": "UCyR7x3YwutfGb1aPzna3gAw",
                            "created": "2016-06-17T16:03:24.000Z",
                            "videoId": "36kQw5PNTIE",
                            "pctLikes": 100,
                            "viewCount": 24,
                            "likes": 6,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/36kQw5PNTIE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:18",
                            "durationMinutes": 3.3,
                            "$$hashKey": "object:512"
                        },
                        {
                            "title": "Madden NFL 25 Season 2, hard hits, funny moments, & dope plays",
                            "channelTitle": "Straight Outta Flint",
                            "channelId": "UCyR7x3YwutfGb1aPzna3gAw",
                            "created": "2016-06-19T21:08:59.000Z",
                            "videoId": "Dnay0SSVIaE",
                            "pctLikes": 100,
                            "viewCount": 14,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Dnay0SSVIaE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:05",
                            "durationMinutes": 2.0833333333333335,
                            "$$hashKey": "object:522"
                        }
                    ]
                },
                "James RFC": {
                    "count": 1,
                    "views": 210,
                    "videos": [
                        {
                            "title": "RUGBY & NFL: MASSIVE HITS & SMASHES AND A MESSAGE",
                            "channelTitle": "James RFC",
                            "channelId": "UCxMf_ItIQNoGytvZXP6v9Aw",
                            "created": "2015-07-14T18:58:12.000Z",
                            "videoId": "Zmj1NaIkxoc",
                            "pctLikes": 100,
                            "viewCount": 210,
                            "likes": 10,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Zmj1NaIkxoc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:57",
                            "durationMinutes": 2.95,
                            "$$hashKey": "object:484"
                        }
                    ]
                },
                "Damon Palaamo": {
                    "count": 1,
                    "views": 4,
                    "videos": [
                        {
                            "title": "Nfl big hits lady",
                            "channelTitle": "Damon Palaamo",
                            "channelId": "UC-TSskAWgU8u5xsZtZmClbA",
                            "created": "2016-06-27T12:26:38.000Z",
                            "videoId": "hr4mQU1JeTc",
                            "pctLikes": 0,
                            "viewCount": 4,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/hr4mQU1JeTc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:56",
                            "durationMinutes": 3.9333333333333336,
                            "$$hashKey": "object:533"
                        }
                    ]
                },
                "Jaden Pearson": {
                    "count": 1,
                    "views": 2,
                    "videos": [
                        {
                            "title": "NFL HARDEST HITS 2016",
                            "channelTitle": "Jaden Pearson",
                            "channelId": "UCj2EUxgx1Tft1MNsAqqqXZA",
                            "created": "2016-06-26T18:59:39.000Z",
                            "videoId": "7pCCmgfA44Y",
                            "pctLikes": 0,
                            "viewCount": 2,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/7pCCmgfA44Y/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:42",
                            "durationMinutes": 2.7,
                            "$$hashKey": "object:537"
                        }
                    ]
                },
                "ADAM ROSEBOY188": {
                    "count": 4,
                    "views": 9,
                    "videos": [
                        {
                            "title": "NFL HARDES HITS",
                            "channelTitle": "ADAM ROSEBOY188",
                            "channelId": "UCIJ1KTgzSNr-FZB9YI3vvRQ",
                            "created": "2016-06-20T04:12:03.000Z",
                            "videoId": "2dw9tTsyW7k",
                            "pctLikes": 0,
                            "viewCount": 2,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/2dw9tTsyW7k/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:16",
                            "durationMinutes": 4.266666666666667,
                            "$$hashKey": "object:535"
                        },
                        {
                            "title": "NFL BIG HITS",
                            "channelTitle": "ADAM ROSEBOY188",
                            "channelId": "UCIJ1KTgzSNr-FZB9YI3vvRQ",
                            "created": "2016-06-20T04:10:54.000Z",
                            "videoId": "WYZ1sLtKLNg",
                            "pctLikes": 0,
                            "viewCount": 2,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/WYZ1sLtKLNg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:12",
                            "durationMinutes": 3.2,
                            "$$hashKey": "object:536"
                        },
                        {
                            "title": "NFL hardest HITS",
                            "channelTitle": "ADAM ROSEBOY188",
                            "channelId": "UCIJ1KTgzSNr-FZB9YI3vvRQ",
                            "created": "2016-06-20T04:10:40.000Z",
                            "videoId": "52BeWieXl38",
                            "pctLikes": 0,
                            "viewCount": 1,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/52BeWieXl38/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:36",
                            "durationMinutes": 1.6,
                            "$$hashKey": "object:538"
                        },
                        {
                            "title": "NFL HARDEST HITS",
                            "channelTitle": "ADAM ROSEBOY188",
                            "channelId": "UCIJ1KTgzSNr-FZB9YI3vvRQ",
                            "created": "2016-06-20T04:12:27.000Z",
                            "videoId": "KaKhA9tRfDg",
                            "pctLikes": 0,
                            "viewCount": 4,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/KaKhA9tRfDg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:30",
                            "durationMinutes": 3.5,
                            "$$hashKey": "object:534"
                        }
                    ]
                },
                "Warrior wolfboy": {
                    "count": 1,
                    "views": 10,
                    "videos": [
                        {
                            "title": "Football Vines,NFL, Hard Hits,runs,And more!!!",
                            "channelTitle": "Warrior wolfboy",
                            "channelId": "UC6FoKQcG7i88PToWL_MngYA",
                            "created": "2016-06-18T06:49:26.000Z",
                            "videoId": "uqX2zCstnu0",
                            "pctLikes": 100,
                            "viewCount": 10,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/uqX2zCstnu0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:10",
                            "durationMinutes": 4.166666666666667,
                            "$$hashKey": "object:529"
                        }
                    ]
                },
                "Fahad Alkandari l فهد الكندري": {
                    "count": 1,
                    "views": 180813,
                    "videos": [
                        {
                            "title": "ح٧ لاعب NFL الأمريكي وقصة هدايته و سجوده في الملعب Hard Hits & Humility: A Muslim In The NFL",
                            "channelTitle": "Fahad Alkandari l فهد الكندري",
                            "channelId": "UCTRGcT1KQVoQA1vdNLlbjhw",
                            "created": "2016-06-12T14:00:53.000Z",
                            "videoId": "bqZzkerJCEs",
                            "pctLikes": 99.36154688070047,
                            "viewCount": 180813,
                            "likes": 5447,
                            "dislikes": 35,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/bqZzkerJCEs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:17:49",
                            "durationMinutes": 17.816666666666666,
                            "$$hashKey": "object:378"
                        }
                    ]
                },
                "Jordan Stunkard": {
                    "count": 1,
                    "views": 12,
                    "videos": [
                        {
                            "title": "NFL huge hits",
                            "channelTitle": "Jordan Stunkard",
                            "channelId": "UCJDkzQduMZCbUgt_RBLzk-A",
                            "created": "2016-06-11T18:12:42.000Z",
                            "videoId": "EvuoK1AHUZ0",
                            "pctLikes": 100,
                            "viewCount": 12,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/EvuoK1AHUZ0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:25",
                            "durationMinutes": 2.4166666666666665,
                            "$$hashKey": "object:527"
                        }
                    ]
                },
                "PAstudios": {
                    "count": 1,
                    "views": 4,
                    "videos": [
                        {
                            "title": "TOP MEMORIAL PLAYS AND HITS IN THE NFL",
                            "channelTitle": "PAstudios",
                            "channelId": "UCG3bY4pEooB9xppM0a8Feyw",
                            "created": "2016-06-11T04:56:48.000Z",
                            "videoId": "X7aF_vFiUXY",
                            "pctLikes": 0,
                            "viewCount": 4,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/X7aF_vFiUXY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:38",
                            "durationMinutes": 3.6333333333333333,
                            "$$hashKey": "object:532"
                        }
                    ]
                },
                "Nfl Bomm": {
                    "count": 2,
                    "views": 32,
                    "videos": [
                        {
                            "title": "Best NFL Defensiv plays \" Nasty Hits\"",
                            "channelTitle": "Nfl Bomm",
                            "channelId": "UCz0Gkti1C4PIIn1K9K3ciPg",
                            "created": "2016-06-07T20:05:42.000Z",
                            "videoId": "bQhUjQM7UbI",
                            "pctLikes": 100,
                            "viewCount": 12,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/bQhUjQM7UbI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:37",
                            "durationMinutes": 2.6166666666666667,
                            "$$hashKey": "object:526"
                        },
                        {
                            "title": "Monster Hits Nfl \"Must to watch\" \"Lil Scrapy Gangsta Gangsta\"",
                            "channelTitle": "Nfl Bomm",
                            "channelId": "UCz0Gkti1C4PIIn1K9K3ciPg",
                            "created": "2016-06-07T16:05:41.000Z",
                            "videoId": "4nONquWXzKk",
                            "pctLikes": 100,
                            "viewCount": 20,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/4nONquWXzKk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:30",
                            "durationMinutes": 0.5,
                            "$$hashKey": "object:517"
                        }
                    ]
                },
                "maurice Pliet": {
                    "count": 1,
                    "views": 9,
                    "videos": [
                        {
                            "title": "The Bigges Hits and Death in the NFL",
                            "channelTitle": "maurice Pliet",
                            "channelId": "UCl4_VB7LrJRDutvZ_Ov-d9g",
                            "created": "2016-06-07T14:58:34.000Z",
                            "videoId": "b0xr5YISoCg",
                            "pctLikes": 100,
                            "viewCount": 9,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/b0xr5YISoCg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:01",
                            "durationMinutes": 3.0166666666666666,
                            "$$hashKey": "object:531"
                        }
                    ]
                },
                "Football LaLalu": {
                    "count": 1,
                    "views": 0,
                    "videos": [
                        {
                            "title": "NFL Football - NES Gameplay - football hits",
                            "channelTitle": "Football LaLalu",
                            "channelId": "UCczpVHECznJzfWlOlrpg8-w",
                            "created": "2016-06-06T12:23:59.000Z",
                            "videoId": "W5yrohJmvYs",
                            "pctLikes": 0,
                            "viewCount": 0,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/W5yrohJmvYs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:25",
                            "durationMinutes": 4.416666666666667,
                            "$$hashKey": "object:539"
                        }
                    ]
                },
                "RANDOM NAME 420": {
                    "count": 1,
                    "views": 10,
                    "videos": [
                        {
                            "title": "NFL IS A DANGEROUS SPORT (BRUTAL HITS)",
                            "channelTitle": "RANDOM NAME 420",
                            "channelId": "UC5u6Q3phGklzuRQ2Au-q-tA",
                            "created": "2016-06-05T00:38:28.000Z",
                            "videoId": "ITsqDYUssGo",
                            "pctLikes": 0,
                            "viewCount": 10,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ITsqDYUssGo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:30",
                            "durationMinutes": 3.5,
                            "$$hashKey": "object:530"
                        }
                    ]
                },
                "Sports Ultra": {
                    "count": 1,
                    "views": 23760,
                    "videos": [
                        {
                            "title": "NFL hardest hits",
                            "channelTitle": "Sports Ultra",
                            "channelId": "UCUnDYCXXjhu20_Gg8Cg23QA",
                            "created": "2016-06-03T01:58:01.000Z",
                            "videoId": "EM2eduecTKw",
                            "pctLikes": 63.73626373626373,
                            "viewCount": 23760,
                            "likes": 58,
                            "dislikes": 33,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/EM2eduecTKw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:36",
                            "durationMinutes": 1.6,
                            "$$hashKey": "object:410"
                        }
                    ]
                },
                "Redskizzle": {
                    "count": 1,
                    "views": 374,
                    "videos": [
                        {
                            "title": "NFL HARDEST HITS | TOOOD - Reaction!!!",
                            "channelTitle": "Redskizzle",
                            "channelId": "UCw-y_4k5UemwVNKJN8Ta-Hg",
                            "created": "2016-05-28T13:29:17.000Z",
                            "videoId": "KRdf7KqB5ZY",
                            "pctLikes": 95.45454545454545,
                            "viewCount": 374,
                            "likes": 21,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/KRdf7KqB5ZY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:12",
                            "durationMinutes": 5.2,
                            "$$hashKey": "object:470"
                        }
                    ]
                },
                "K.J.M.K.": {
                    "count": 1,
                    "views": 90,
                    "videos": [
                        {
                            "title": "NFL Big Hits",
                            "channelTitle": "K.J.M.K.",
                            "channelId": "UCeU8jSapjlUfMh2AlUkopTA",
                            "created": "2016-05-28T04:32:50.000Z",
                            "videoId": "8EQZy2oe68w",
                            "pctLikes": 100,
                            "viewCount": 90,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/8EQZy2oe68w/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:48",
                            "durationMinutes": 3.8,
                            "$$hashKey": "object:500"
                        }
                    ]
                },
                "Shayle": {
                    "count": 1,
                    "views": 521,
                    "videos": [
                        {
                            "title": "NFL Big Hits- Turn Down For What",
                            "channelTitle": "Shayle",
                            "channelId": "UC_7hVonPIyOg4EDVhVF8bsg",
                            "created": "2016-05-27T21:21:36.000Z",
                            "videoId": "J_Uexh2zkaQ",
                            "pctLikes": 76.92307692307693,
                            "viewCount": 521,
                            "likes": 10,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/J_Uexh2zkaQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:32",
                            "durationMinutes": 2.533333333333333,
                            "$$hashKey": "object:467"
                        }
                    ]
                },
                "Mario Fatafehi": {
                    "count": 1,
                    "views": 62,
                    "videos": [
                        {
                            "title": "NFL hits",
                            "channelTitle": "Mario Fatafehi",
                            "channelId": "UCScOoYIsrJvc1G_MmYxtveg",
                            "created": "2016-05-23T13:06:56.000Z",
                            "videoId": "OwiiNVYviAQ",
                            "pctLikes": 100,
                            "viewCount": 62,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/OwiiNVYviAQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:24",
                            "durationMinutes": 4.4,
                            "$$hashKey": "object:506"
                        }
                    ]
                },
                "Rohan Shah": {
                    "count": 1,
                    "views": 18,
                    "videos": [
                        {
                            "title": "NFL Big Hits",
                            "channelTitle": "Rohan Shah",
                            "channelId": "UCbhwV6E2yxy9wpdagUiMwIw",
                            "created": "2016-05-23T03:05:38.000Z",
                            "videoId": "ZL9-85vtIUk",
                            "pctLikes": 0,
                            "viewCount": 18,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ZL9-85vtIUk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:39",
                            "durationMinutes": 0.65,
                            "$$hashKey": "object:518"
                        }
                    ]
                },
                "THE NFL MASTER 1123": {
                    "count": 1,
                    "views": 11,
                    "videos": [
                        {
                            "title": "Footballs biggest hits  MUST READ Description",
                            "channelTitle": "THE NFL MASTER 1123",
                            "channelId": "UC-GXFlTvSkJaT9MTApZb-0A",
                            "created": "2016-05-21T20:59:32.000Z",
                            "videoId": "qJFrTodVE54",
                            "pctLikes": 100,
                            "viewCount": 11,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/qJFrTodVE54/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333,
                            "$$hashKey": "object:528"
                        }
                    ]
                },
                "Dustin Baker": {
                    "count": 1,
                    "views": 25,
                    "videos": [
                        {
                            "title": "NT FB 2015 Full Case PYT #7 MONSTER HITS NFL Shield 1/1",
                            "channelTitle": "Dustin Baker",
                            "channelId": "UCiaW8tVFfZJ7XYn_1etTsTA",
                            "created": "2016-05-21T20:53:27.000Z",
                            "videoId": "XoQR4C3fhAM",
                            "pctLikes": 0,
                            "viewCount": 25,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/XoQR4C3fhAM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:37:51",
                            "durationMinutes": 37.85,
                            "$$hashKey": "object:511"
                        }
                    ]
                },
                "SICK MADDEN HIGHLIGHTS": {
                    "count": 1,
                    "views": 17,
                    "videos": [
                        {
                            "title": "Big Hits of the year in Madden NFL 16 Online H2H HE GOT......JACKED UP!",
                            "channelTitle": "SICK MADDEN HIGHLIGHTS",
                            "channelId": "UCs0vdDQ2wmHI3mY-JNHibIQ",
                            "created": "2016-05-21T16:28:13.000Z",
                            "videoId": "i6C7HXD0D4Y",
                            "pctLikes": 0,
                            "viewCount": 17,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/i6C7HXD0D4Y/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:59",
                            "durationMinutes": 0.9833333333333333,
                            "$$hashKey": "object:519"
                        }
                    ]
                },
                "Gaming Gods": {
                    "count": 1,
                    "views": 22,
                    "videos": [
                        {
                            "title": "NFL hardest hits",
                            "channelTitle": "Gaming Gods",
                            "channelId": "UC_JDt0BSK6KCVzfCw30VaSg",
                            "created": "2016-05-18T02:51:39.000Z",
                            "videoId": "pL4Kjct5C1E",
                            "pctLikes": 0,
                            "viewCount": 22,
                            "likes": 0,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/pL4Kjct5C1E/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:24",
                            "durationMinutes": 1.4,
                            "$$hashKey": "object:514"
                        }
                    ]
                },
                "Tzz Baby": {
                    "count": 1,
                    "views": 5428,
                    "videos": [
                        {
                            "title": "NFL Biggest Hits  2015/2016 ᴴᴰ || \"Hit Stick!!!\"",
                            "channelTitle": "Tzz Baby",
                            "channelId": "UC-AWbDEOztfsenHbs0w_bug",
                            "created": "2016-05-11T21:45:14.000Z",
                            "videoId": "JfxoKKWg4W8",
                            "pctLikes": 87.75510204081633,
                            "viewCount": 5428,
                            "likes": 43,
                            "dislikes": 6,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/JfxoKKWg4W8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:57",
                            "durationMinutes": 4.95,
                            "$$hashKey": "object:432"
                        }
                    ]
                },
                "Prince Prodigy NBA 2K16": {
                    "count": 1,
                    "views": 5117,
                    "videos": [
                        {
                            "title": "SOUR LEMON JUICE CHALLENGE ON NFL STREET 2!!! HARDEST HITS I HAVE EVER SEEN IN A VIDEO GAME!!",
                            "channelTitle": "Prince Prodigy NBA 2K16",
                            "channelId": "UClS4kJMPMpGwhjBkvwfPsmw",
                            "created": "2016-05-11T20:55:18.000Z",
                            "videoId": "WX5QbjNuVjQ",
                            "pctLikes": 99.61538461538461,
                            "viewCount": 5117,
                            "likes": 259,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/WX5QbjNuVjQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:09:47",
                            "durationMinutes": 9.783333333333333,
                            "$$hashKey": "object:435"
                        }
                    ]
                },
                "bossdudeish": {
                    "count": 1,
                    "views": 13,
                    "videos": [
                        {
                            "title": "BEST NFL HITS!",
                            "channelTitle": "bossdudeish",
                            "channelId": "UCTFYX5TLo7ZZNcFL5QO5_nw",
                            "created": "2016-05-10T15:38:55.000Z",
                            "videoId": "t6AttInlIfE",
                            "pctLikes": 0,
                            "viewCount": 13,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/t6AttInlIfE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:44",
                            "durationMinutes": 7.733333333333333,
                            "$$hashKey": "object:524"
                        }
                    ]
                },
                "YH HY": {
                    "count": 2,
                    "views": 81,
                    "videos": [
                        {
                            "title": "Best NFL Hits,  Runs, Touchdowns",
                            "channelTitle": "YH HY",
                            "channelId": "UCgW8jBgW19SBO7e89LUGECw",
                            "created": "2016-05-07T08:24:11.000Z",
                            "videoId": "Amuj2H205L8",
                            "pctLikes": 33.33333333333333,
                            "viewCount": 52,
                            "likes": 1,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Amuj2H205L8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:53",
                            "durationMinutes": 3.8833333333333333,
                            "$$hashKey": "object:507"
                        },
                        {
                            "title": "NFL  Biggest Hits and Best Plays",
                            "channelTitle": "YH HY",
                            "channelId": "UCgW8jBgW19SBO7e89LUGECw",
                            "created": "2016-05-06T09:49:26.000Z",
                            "videoId": "0O1ibBsHtYw",
                            "pctLikes": 0,
                            "viewCount": 29,
                            "likes": 0,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/0O1ibBsHtYw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:42",
                            "durationMinutes": 4.7,
                            "$$hashKey": "object:509"
                        }
                    ]
                },
                "Görkem Özkur": {
                    "count": 1,
                    "views": 13,
                    "videos": [
                        {
                            "title": "Madden NFL 16 | Best Plays & Hardest Hits",
                            "channelTitle": "Görkem Özkur",
                            "channelId": "UCKBz8Nu9u_d4vG1ApwBZwuQ",
                            "created": "2016-05-06T16:51:01.000Z",
                            "videoId": "9hjYeur7cCE",
                            "pctLikes": 100,
                            "viewCount": 13,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/9hjYeur7cCE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:15",
                            "durationMinutes": 3.25,
                            "$$hashKey": "object:525"
                        }
                    ]
                },
                "SM Productions": {
                    "count": 3,
                    "views": 1753,
                    "videos": [
                        {
                            "title": "NRL vs NFL || Big Hits",
                            "channelTitle": "SM Productions",
                            "channelId": "UCUorItHa_MPUuF8JkfJj4hQ",
                            "created": "2016-05-05T04:34:14.000Z",
                            "videoId": "Wjt9VcV_1do",
                            "pctLikes": 100,
                            "viewCount": 311,
                            "likes": 10,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Wjt9VcV_1do/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:04",
                            "durationMinutes": 4.066666666666666,
                            "$$hashKey": "object:476"
                        },
                        {
                            "title": "Big Hits NRL and NFL ft. Bass drop",
                            "channelTitle": "SM Productions",
                            "channelId": "UCUorItHa_MPUuF8JkfJj4hQ",
                            "created": "2015-10-13T12:18:25.000Z",
                            "videoId": "gLlz0owa1-Q",
                            "pctLikes": 87.5,
                            "viewCount": 1338,
                            "likes": 14,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/gLlz0owa1-Q/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:37",
                            "durationMinutes": 4.616666666666667,
                            "$$hashKey": "object:5294"
                        },
                        {
                            "title": "NFL - Biggest Hits",
                            "channelTitle": "SM Productions",
                            "channelId": "UCUorItHa_MPUuF8JkfJj4hQ",
                            "created": "2016-03-17T08:00:25.000Z",
                            "videoId": "4yGveO3_cVo",
                            "pctLikes": 80,
                            "viewCount": 104,
                            "likes": 4,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/4yGveO3_cVo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:47",
                            "durationMinutes": 1.7833333333333332,
                            "$$hashKey": "object:5327"
                        }
                    ]
                },
                "JaysForDays22": {
                    "count": 1,
                    "views": 107,
                    "videos": [
                        {
                            "title": "HARDEST NFL HITS OF ALL TIME (2016)",
                            "channelTitle": "JaysForDays22",
                            "channelId": "UC_jjzslnlFDIiRg9LKu8TAA",
                            "created": "2016-05-01T14:56:47.000Z",
                            "videoId": "k8s4DNArCOo",
                            "pctLikes": 100,
                            "viewCount": 107,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/k8s4DNArCOo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:28",
                            "durationMinutes": 2.466666666666667,
                            "$$hashKey": "object:497"
                        }
                    ]
                },
                "S1LENCE !": {
                    "count": 1,
                    "views": 105,
                    "videos": [
                        {
                            "title": "College NFL, best hits by s1lence",
                            "channelTitle": "S1LENCE !",
                            "channelId": "UCtUPgbNxRJWzaOLQ0HuEVIg",
                            "created": "2016-04-26T19:02:02.000Z",
                            "videoId": "2d-hvbCxf_M",
                            "pctLikes": 100,
                            "viewCount": 105,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/2d-hvbCxf_M/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:52",
                            "durationMinutes": 0.8666666666666667,
                            "$$hashKey": "object:498"
                        }
                    ]
                },
                "Stage Club": {
                    "count": 1,
                    "views": 43,
                    "videos": [
                        {
                            "title": "Biggiest NFL  hardest hits 15 16",
                            "channelTitle": "Stage Club",
                            "channelId": "UCggYUIVYomNIZ5bDEkJr1Jw",
                            "created": "2016-04-21T16:05:38.000Z",
                            "videoId": "TB2h5O3fVqc",
                            "pctLikes": 0,
                            "viewCount": 43,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/TB2h5O3fVqc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:30",
                            "durationMinutes": 3.5,
                            "$$hashKey": "object:508"
                        }
                    ]
                },
                "NFL NEWS GERMANY": {
                    "count": 1,
                    "views": 158,
                    "videos": [
                        {
                            "title": "College Football -DIE BESTEN PLAYS UND KRASSE HITS 2015 +++ NFL NEWS GERMANY",
                            "channelTitle": "NFL NEWS GERMANY",
                            "channelId": "UCstQma-7hZ3xRQNhSTEi1Sw",
                            "created": "2016-04-21T06:07:56.000Z",
                            "videoId": "dAKREev-WQ0",
                            "pctLikes": 75,
                            "viewCount": 158,
                            "likes": 3,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/dAKREev-WQ0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:27",
                            "durationMinutes": 7.45,
                            "$$hashKey": "object:488"
                        }
                    ]
                },
                "USA TODAY Sports": {
                    "count": 1,
                    "views": 16,
                    "videos": [
                        {
                            "title": "NFL Draft 2016: Quick hits",
                            "channelTitle": "USA TODAY Sports",
                            "channelId": "UCZ5C1HBPMEcCA1YGQmqj6Iw",
                            "created": "2016-04-18T17:52:44.000Z",
                            "videoId": "p9aEoDZ-gsg",
                            "pctLikes": 0,
                            "viewCount": 16,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/p9aEoDZ-gsg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:15",
                            "durationMinutes": 1.25,
                            "$$hashKey": "object:520"
                        }
                    ]
                },
                "SportLights": {
                    "count": 1,
                    "views": 16,
                    "videos": [
                        {
                            "title": "Best NFL Hits",
                            "channelTitle": "SportLights",
                            "channelId": "UCN27f4PlrSWXi9DhF3Fol6w",
                            "created": "2016-04-15T19:54:58.000Z",
                            "videoId": "PnYP3O1Ov6E",
                            "pctLikes": 0,
                            "viewCount": 16,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/PnYP3O1Ov6E/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:51",
                            "durationMinutes": 1.85,
                            "$$hashKey": "object:521"
                        }
                    ]
                },
                "Panda Perfect": {
                    "count": 1,
                    "views": 112,
                    "videos": [
                        {
                            "title": "NFL hardest hits-Panda Perfect",
                            "channelTitle": "Panda Perfect",
                            "channelId": "UClJcCWhKeHa4skvXj1aDHXw",
                            "created": "2016-04-12T01:29:52.000Z",
                            "videoId": "NWgkmg6mMWo",
                            "pctLikes": 33.33333333333333,
                            "viewCount": 112,
                            "likes": 1,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/NWgkmg6mMWo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:32",
                            "durationMinutes": 2.533333333333333,
                            "$$hashKey": "object:494"
                        }
                    ]
                },
                "LilRock_715": {
                    "count": 1,
                    "views": 14,
                    "videos": [
                        {
                            "title": "NFL Biggest Hits",
                            "channelTitle": "LilRock_715",
                            "channelId": "UCPhl5wHtkg-2uHVL67S2t-A",
                            "created": "2016-04-11T21:13:40.000Z",
                            "videoId": "_h_UQntvPYY",
                            "pctLikes": 100,
                            "viewCount": 14,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/_h_UQntvPYY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333,
                            "$$hashKey": "object:523"
                        }
                    ]
                },
                "The Future Is Now": {
                    "count": 1,
                    "views": 6569394,
                    "videos": [
                        {
                            "title": "Best Football Vines Compilation - Top 27 Football Vines From 2013 ✔",
                            "channelTitle": "The Future Is Now",
                            "channelId": "UCqkHsQeqwuPV3UunvXdgjFQ",
                            "created": "2014-01-06T03:24:11.000Z",
                            "videoId": "zIixDAMyu8A",
                            "pctLikes": 92.80941110956424,
                            "viewCount": 6569394,
                            "likes": 13333,
                            "dislikes": 1033,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/zIixDAMyu8A/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:41",
                            "durationMinutes": 2.6833333333333336,
                            "$$hashKey": "object:330"
                        }
                    ]
                },
                "neutralzoneHD": {
                    "count": 1,
                    "views": 4148295,
                    "videos": [
                        {
                            "title": "The BIGGEST Hits Ever Seen from the NHL (HD)",
                            "channelTitle": "neutralzoneHD",
                            "channelId": "UCxxnV_ynoKiGxWigb9BdvJA",
                            "created": "2012-08-23T12:43:48.000Z",
                            "videoId": "-5xkMNIt-5k",
                            "pctLikes": 94.47339785808373,
                            "viewCount": 4148295,
                            "likes": 16496,
                            "dislikes": 965,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/-5xkMNIt-5k/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:30",
                            "durationMinutes": 5.5,
                            "$$hashKey": "object:333"
                        }
                    ]
                },
                "The Fumble": {
                    "count": 1,
                    "views": 2658383,
                    "videos": [
                        {
                            "title": "Rams-Giants Fight After Late Hit On Odell Beckham, Cody Davis Gets Kicked in Face",
                            "channelTitle": "The Fumble",
                            "channelId": "UCojyGFb8W2xxSsJ5c_XburQ",
                            "created": "2014-12-22T03:45:05.000Z",
                            "videoId": "zQ7CW_F6BGs",
                            "pctLikes": 89.49799440865444,
                            "viewCount": 2658383,
                            "likes": 7363,
                            "dislikes": 864,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/zQ7CW_F6BGs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:14",
                            "durationMinutes": 2.2333333333333334,
                            "$$hashKey": "object:336"
                        }
                    ]
                },
                "ReblopTV News": {
                    "count": 1,
                    "views": 2584713,
                    "videos": [
                        {
                            "title": "Ray Rice Elevator KNOCKOUT Janay Palmer - Hits Fiancee & Punch | Punches KO REBLOP.com",
                            "channelTitle": "ReblopTV News",
                            "channelId": "UCMOPxx6z8VEk8I6BmPKuhjw",
                            "created": "2014-09-09T06:48:31.000Z",
                            "videoId": "-TAA87yvd-w",
                            "pctLikes": 58.43060959792478,
                            "viewCount": 2584713,
                            "likes": 1802,
                            "dislikes": 1282,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/-TAA87yvd-w/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:15",
                            "durationMinutes": 1.25,
                            "$$hashKey": "object:337"
                        }
                    ]
                },
                "Ross Taylor": {
                    "count": 1,
                    "views": 1856908,
                    "videos": [
                        {
                            "title": "Crazy Football Hits and Tackles-  '01 - '08",
                            "channelTitle": "Ross Taylor",
                            "channelId": "UCqGBzO222hH2HWSsFtaDGvQ",
                            "created": "2008-09-24T00:37:50.000Z",
                            "videoId": "pPObnPS-LIs",
                            "pctLikes": 90.46728971962617,
                            "viewCount": 1856908,
                            "likes": 1452,
                            "dislikes": 153,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/pPObnPS-LIs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:08",
                            "durationMinutes": 3.1333333333333333,
                            "$$hashKey": "object:342"
                        }
                    ]
                },
                "cyrus": {
                    "count": 1,
                    "views": 1219899,
                    "videos": [
                        {
                            "title": "the biggest football hits ever",
                            "channelTitle": "cyrus",
                            "channelId": "UC1JQsYuFvVa_bB4nNm6nLRg",
                            "created": "2008-08-07T22:02:26.000Z",
                            "videoId": "-pTssI2yajI",
                            "pctLikes": 93.74233128834356,
                            "viewCount": 1219899,
                            "likes": 1528,
                            "dislikes": 102,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/-pTssI2yajI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:58",
                            "durationMinutes": 2.966666666666667,
                            "$$hashKey": "object:346"
                        }
                    ]
                },
                "BenjisGridiron": {
                    "count": 1,
                    "views": 1023894,
                    "videos": [
                        {
                            "title": "College Football Hardest Hits 2012-2013 (HD)",
                            "channelTitle": "BenjisGridiron",
                            "channelId": "UCMrnc6p782fNIAgEgWlEITQ",
                            "created": "2013-01-17T18:51:23.000Z",
                            "videoId": "NiZGf2-ckkY",
                            "pctLikes": 96.61193640865258,
                            "viewCount": 1023894,
                            "likes": 3707,
                            "dislikes": 130,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/NiZGf2-ckkY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:39",
                            "durationMinutes": 4.65,
                            "$$hashKey": "object:347"
                        }
                    ]
                },
                "CoopSauce": {
                    "count": 1,
                    "views": 921904,
                    "videos": [
                        {
                            "title": "College Football Big Hits and Plays 2015-16 HD (Weeks 1-6)",
                            "channelTitle": "CoopSauce",
                            "channelId": "UC6cEfIIVJG3XmCoaJrI6AIQ",
                            "created": "2015-10-15T03:01:49.000Z",
                            "videoId": "SJKNyZgH4Xo",
                            "pctLikes": 91.64807930607188,
                            "viewCount": 921904,
                            "likes": 3698,
                            "dislikes": 337,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/SJKNyZgH4Xo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:44",
                            "durationMinutes": 5.733333333333333,
                            "$$hashKey": "object:350"
                        }
                    ]
                },
                "Shane sundby": {
                    "count": 1,
                    "views": 827713,
                    "videos": [
                        {
                            "title": "Vontaze Burfict hits Antonio Brown in the head .. Dirty",
                            "channelTitle": "Shane sundby",
                            "channelId": "UCK5D8cL4nTXSHHhISK2Q4Tw",
                            "created": "2016-01-10T04:57:02.000Z",
                            "videoId": "-tfLncD3pGM",
                            "pctLikes": 71.0122699386503,
                            "viewCount": 827713,
                            "likes": 463,
                            "dislikes": 189,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/-tfLncD3pGM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:40",
                            "durationMinutes": 0.6666666666666666,
                            "$$hashKey": "object:351"
                        }
                    ]
                },
                "PeopleCam": {
                    "count": 1,
                    "views": 741198,
                    "videos": [
                        {
                            "title": "The Best Football (+Hits) VINES of 2014!",
                            "channelTitle": "PeopleCam",
                            "channelId": "UCWqplK-CXvCZr1-LaVlVwww",
                            "created": "2014-02-04T18:12:05.000Z",
                            "videoId": "32me07aeUK4",
                            "pctLikes": 95.51877270892209,
                            "viewCount": 741198,
                            "likes": 2366,
                            "dislikes": 111,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/32me07aeUK4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:29",
                            "durationMinutes": 4.483333333333333,
                            "$$hashKey": "object:352"
                        }
                    ]
                },
                "jamesbrito1979": {
                    "count": 1,
                    "views": 653980,
                    "videos": [
                        {
                            "title": "NFL ref hits player in the helmet",
                            "channelTitle": "jamesbrito1979",
                            "channelId": "UCiFxgA83RlpjTjkKZxdDNRg",
                            "created": "2010-11-08T18:54:43.000Z",
                            "videoId": "OmhcdWozq4Q",
                            "pctLikes": 47.019867549668874,
                            "viewCount": 653980,
                            "likes": 213,
                            "dislikes": 240,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/OmhcdWozq4Q/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:08",
                            "durationMinutes": 0.13333333333333333,
                            "$$hashKey": "object:353"
                        }
                    ]
                },
                "Michael Lopez": {
                    "count": 1,
                    "views": 621892,
                    "videos": [
                        {
                            "title": "Michael Vick Fist fight with Lovie Smith",
                            "channelTitle": "Michael Lopez",
                            "channelId": "UCfiUjnLjBmX1LWB633ob_YQ",
                            "created": "2008-11-16T07:50:04.000Z",
                            "videoId": "jgJtVFebtJo",
                            "pctLikes": 10.623946037099493,
                            "viewCount": 621892,
                            "likes": 126,
                            "dislikes": 1060,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/jgJtVFebtJo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:59",
                            "durationMinutes": 3.9833333333333334,
                            "$$hashKey": "object:354"
                        }
                    ]
                },
                "opelt11": {
                    "count": 1,
                    "views": 533117,
                    "videos": [
                        {
                            "title": "Brett Favre's Career Ending Sack Last Game Ever - Vikings vs Bears 2010",
                            "channelTitle": "opelt11",
                            "channelId": "UCpgHg0lTfoUCkpGEOaBIjbQ",
                            "created": "2010-12-21T02:57:58.000Z",
                            "videoId": "UHOkOr0mHpQ",
                            "pctLikes": 84.25806451612902,
                            "viewCount": 533117,
                            "likes": 653,
                            "dislikes": 122,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/UHOkOr0mHpQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:58",
                            "durationMinutes": 1.9666666666666668,
                            "$$hashKey": "object:356"
                        }
                    ]
                },
                "falldownproduction": {
                    "count": 1,
                    "views": 487633,
                    "videos": [
                        {
                            "title": "NFL big hits (The Longest Yard)",
                            "channelTitle": "falldownproduction",
                            "channelId": "UCfXpCx-LYHbiGskhXsfXnEA",
                            "created": "2008-04-29T06:25:17.000Z",
                            "videoId": "oK8IRV8jpRs",
                            "pctLikes": 67.62295081967213,
                            "viewCount": 487633,
                            "likes": 165,
                            "dislikes": 79,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/oK8IRV8jpRs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:48",
                            "durationMinutes": 3.8,
                            "$$hashKey": "object:358"
                        }
                    ]
                },
                "MLGTroy1": {
                    "count": 1,
                    "views": 463553,
                    "videos": [
                        {
                            "title": "NFL Big Hits Here Comes The Boom",
                            "channelTitle": "MLGTroy1",
                            "channelId": "UCnj-uWdzTYyS6kyetmPSIPQ",
                            "created": "2012-12-09T18:05:10.000Z",
                            "videoId": "LzeOcqmE1gM",
                            "pctLikes": 92.942515651679,
                            "viewCount": 463553,
                            "likes": 1633,
                            "dislikes": 124,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/LzeOcqmE1gM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:10",
                            "durationMinutes": 4.166666666666667,
                            "$$hashKey": "object:359"
                        }
                    ]
                },
                "ale8014": {
                    "count": 1,
                    "views": 451240,
                    "videos": [
                        {
                            "title": "NFL Greatest Hits",
                            "channelTitle": "ale8014",
                            "channelId": "UCZqKgJxaR9NV7FCPt0tJBJg",
                            "created": "2008-09-10T06:30:08.000Z",
                            "videoId": "sOQTlD-1YRY",
                            "pctLikes": 0,
                            "viewCount": 451240,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/sOQTlD-1YRY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:32",
                            "durationMinutes": 4.533333333333333,
                            "$$hashKey": "object:360"
                        }
                    ]
                },
                "BGR3CH": {
                    "count": 1,
                    "views": 329320,
                    "videos": [
                        {
                            "title": "James Harrison \"Illegal\" Hits All of Them",
                            "channelTitle": "BGR3CH",
                            "channelId": "UCSQAtSdykhdI4xewDPLEclw",
                            "created": "2010-11-30T09:06:25.000Z",
                            "videoId": "6BfxMalwza4",
                            "pctLikes": 63.34310850439883,
                            "viewCount": 329320,
                            "likes": 216,
                            "dislikes": 125,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/6BfxMalwza4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:05",
                            "durationMinutes": 1.0833333333333333,
                            "$$hashKey": "object:363"
                        }
                    ]
                },
                "Doc Godfrey": {
                    "count": 1,
                    "views": 306731,
                    "videos": [
                        {
                            "title": "Best NFL and College Football Knockout Hits Mix: Original",
                            "channelTitle": "Doc Godfrey",
                            "channelId": "UCmBqpVpmqHPgdeJPA3UYOGw",
                            "created": "2011-06-01T10:23:04.000Z",
                            "videoId": "ORxGd7MIE8A",
                            "pctLikes": 82.24101479915433,
                            "viewCount": 306731,
                            "likes": 389,
                            "dislikes": 84,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ORxGd7MIE8A/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:57",
                            "durationMinutes": 1.95,
                            "$$hashKey": "object:364"
                        }
                    ]
                },
                "Doggiesofwar": {
                    "count": 1,
                    "views": 302132,
                    "videos": [
                        {
                            "title": "Rugby Hits-Till I collapse",
                            "channelTitle": "Doggiesofwar",
                            "channelId": "UCaWe83ZeBOdwOXQ-vS1I-ew",
                            "created": "2012-02-14T03:12:37.000Z",
                            "videoId": "7ckKqwlBiEU",
                            "pctLikes": 94.88372093023256,
                            "viewCount": 302132,
                            "likes": 816,
                            "dislikes": 44,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/7ckKqwlBiEU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:30",
                            "durationMinutes": 4.5,
                            "$$hashKey": "object:365"
                        }
                    ]
                },
                "puffykilled2pac": {
                    "count": 1,
                    "views": 280959,
                    "videos": [
                        {
                            "title": "Steve Largent Hit - Entire Sequence",
                            "channelTitle": "puffykilled2pac",
                            "channelId": "UCgKbLDkmewrEXGBwiEV1w0Q",
                            "created": "2012-12-22T07:35:30.000Z",
                            "videoId": "KKHKtkct5Hw",
                            "pctLikes": 97.56493506493507,
                            "viewCount": 280959,
                            "likes": 1202,
                            "dislikes": 30,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/KKHKtkct5Hw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:29",
                            "durationMinutes": 3.4833333333333334,
                            "$$hashKey": "object:368"
                        }
                    ]
                },
                "robertdavis001": {
                    "count": 1,
                    "views": 279160,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits Top 10 - Part 4",
                            "channelTitle": "robertdavis001",
                            "channelId": "UCz_KTiUzLnCSgrHX2QHy7vA",
                            "created": "2008-12-29T03:01:25.000Z",
                            "videoId": "-7DZPYkRWXM",
                            "pctLikes": 12.666666666666668,
                            "viewCount": 279160,
                            "likes": 19,
                            "dislikes": 131,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/-7DZPYkRWXM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:14",
                            "durationMinutes": 0.23333333333333334,
                            "$$hashKey": "object:369"
                        }
                    ]
                },
                "ChiefsMan44": {
                    "count": 1,
                    "views": 257285,
                    "videos": [
                        {
                            "title": "NFL hardest hits 2009 2010",
                            "channelTitle": "ChiefsMan44",
                            "channelId": "UCsbjWmFeqvJjs1Ms9Czkiew",
                            "created": "2009-12-05T04:11:38.000Z",
                            "videoId": "GBZ4No9WWmI",
                            "pctLikes": 85.16746411483254,
                            "viewCount": 257285,
                            "likes": 178,
                            "dislikes": 31,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/GBZ4No9WWmI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:32",
                            "durationMinutes": 2.533333333333333,
                            "$$hashKey": "object:370"
                        }
                    ]
                },
                "ridge0957": {
                    "count": 1,
                    "views": 242890,
                    "videos": [
                        {
                            "title": "NFL BIG HITS",
                            "channelTitle": "ridge0957",
                            "channelId": "UCiZh4B-iyqu2QeeNgo0HqSw",
                            "created": "2008-12-16T23:42:49.000Z",
                            "videoId": "_2W4GCdHmgI",
                            "pctLikes": 95.07389162561576,
                            "viewCount": 242890,
                            "likes": 386,
                            "dislikes": 20,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/_2W4GCdHmgI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:54",
                            "durationMinutes": 3.9,
                            "$$hashKey": "object:373"
                        }
                    ]
                },
                "Rondachamp24": {
                    "count": 1,
                    "views": 217928,
                    "videos": [
                        {
                            "title": "Cheap hit by  Meriweather on Heap",
                            "channelTitle": "Rondachamp24",
                            "channelId": "UCnTm62ZhYVPfLqEpV9KybQg",
                            "created": "2010-10-17T18:17:56.000Z",
                            "videoId": "d2iGzAJIHX8",
                            "pctLikes": 61.76470588235294,
                            "viewCount": 217928,
                            "likes": 42,
                            "dislikes": 26,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/d2iGzAJIHX8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:15",
                            "durationMinutes": 0.25,
                            "$$hashKey": "object:376"
                        }
                    ]
                },
                "Поговорим о спорте": {
                    "count": 1,
                    "views": 28,
                    "videos": [
                        {
                            "title": "Американский футбол NFL Hardest Hits",
                            "channelTitle": "Поговорим о спорте",
                            "channelId": "UCayZR8bEdNEH12eiQ96z72Q",
                            "created": "2015-03-14T19:22:43.000Z",
                            "videoId": "BXU3Ge5iFRA",
                            "pctLikes": 0,
                            "viewCount": 28,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/BXU3Ge5iFRA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:56",
                            "durationMinutes": 3.9333333333333336,
                            "$$hashKey": "object:510"
                        }
                    ]
                },
                "Bander Stadt": {
                    "count": 1,
                    "views": 21515,
                    "videos": [
                        {
                            "title": "Американский футбол NFL Hardest Hits",
                            "channelTitle": "Bander Stadt",
                            "channelId": "UCPx_HkDBmFn4xopbwEwvBoQ",
                            "created": "2013-05-18T16:50:51.000Z",
                            "videoId": "XtmyCkyCctQ",
                            "pctLikes": 94.44444444444444,
                            "viewCount": 21515,
                            "likes": 68,
                            "dislikes": 4,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/XtmyCkyCctQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:56",
                            "durationMinutes": 3.9333333333333336,
                            "$$hashKey": "object:412"
                        }
                    ]
                },
                "mikecat91": {
                    "count": 1,
                    "views": 4536,
                    "videos": [
                        {
                            "title": "1992 NFL HARD HITS",
                            "channelTitle": "mikecat91",
                            "channelId": "UCCgFa53gMJo94LO6oDToHIA",
                            "created": "2008-12-28T12:59:30.000Z",
                            "videoId": "WL6h12p9Aao",
                            "pctLikes": 91.66666666666666,
                            "viewCount": 4536,
                            "likes": 11,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/WL6h12p9Aao/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:12",
                            "durationMinutes": 3.2,
                            "$$hashKey": "object:438"
                        }
                    ]
                },
                "CardsInfinity.com": {
                    "count": 1,
                    "views": 6040,
                    "videos": [
                        {
                            "title": "2007 Score Select NFL Hobby Box Break ( Nice hits)",
                            "channelTitle": "CardsInfinity.com",
                            "channelId": "UCmnp-WxsWlhdGZ_lforMX4g",
                            "created": "2007-07-25T00:51:18.000Z",
                            "videoId": "fEtDBjwzPLA",
                            "pctLikes": 91.17647058823529,
                            "viewCount": 6040,
                            "likes": 31,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/fEtDBjwzPLA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:08",
                            "durationMinutes": 7.133333333333334,
                            "$$hashKey": "object:431"
                        }
                    ]
                },
                "lilask8er": {
                    "count": 1,
                    "views": 310,
                    "videos": [
                        {
                            "title": "2009 nfl football hits",
                            "channelTitle": "lilask8er",
                            "channelId": "UCsKbKzEzXU3xaxUrduAQ5WQ",
                            "created": "2009-07-23T09:12:17.000Z",
                            "videoId": "V4yj-tG92t8",
                            "pctLikes": 0,
                            "viewCount": 310,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/V4yj-tG92t8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:34",
                            "durationMinutes": 0.5666666666666667,
                            "$$hashKey": "object:477"
                        }
                    ]
                },
                "GoGTSLive": {
                    "count": 1,
                    "views": 232,
                    "videos": [
                        {
                            "title": "2009 Bowman NFL Draft Picks Part 3 of 3- The Hits and Report Card",
                            "channelTitle": "GoGTSLive",
                            "channelId": "UCJxvD2r2DVJXjc8LEpd33tw",
                            "created": "2009-06-16T03:19:41.000Z",
                            "videoId": "_Ns1Cp5d4uo",
                            "pctLikes": 0,
                            "viewCount": 232,
                            "likes": 0,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/_Ns1Cp5d4uo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:00",
                            "durationMinutes": 2,
                            "$$hashKey": "object:483"
                        }
                    ]
                },
                "WeMadeThisProduction": {
                    "count": 1,
                    "views": 55537,
                    "videos": [
                        {
                            "title": "2011 - 2012  NFL The Hard Hits",
                            "channelTitle": "WeMadeThisProduction",
                            "channelId": "UCvtFG9Xkye4bFLxpgUqkPNA",
                            "created": "2011-11-17T08:57:51.000Z",
                            "videoId": "aCpC6tBTrTQ",
                            "pctLikes": 86.53846153846155,
                            "viewCount": 55537,
                            "likes": 90,
                            "dislikes": 14,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/aCpC6tBTrTQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:14",
                            "durationMinutes": 3.2333333333333334,
                            "$$hashKey": "object:392"
                        }
                    ]
                },
                "Ghetto Pistol": {
                    "count": 1,
                    "views": 8469,
                    "videos": [
                        {
                            "title": "2013 NFL'S HARDEST HITS insane",
                            "channelTitle": "Ghetto Pistol",
                            "channelId": "UC_EsviV5pPvhsjJ4xxkTrBQ",
                            "created": "2013-12-17T02:59:27.000Z",
                            "videoId": "8-clcJNAbbo",
                            "pctLikes": 74.07407407407408,
                            "viewCount": 8469,
                            "likes": 20,
                            "dislikes": 7,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/8-clcJNAbbo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:04",
                            "durationMinutes": 4.066666666666666,
                            "$$hashKey": "object:425"
                        }
                    ]
                },
                "Jose Rodriguez": {
                    "count": 1,
                    "views": 20476,
                    "videos": [
                        {
                            "title": "|2014| NFL Biggest Hits and Brawls",
                            "channelTitle": "Jose Rodriguez",
                            "channelId": "UC5OFffUzRNWdJPpCQsiaXVw",
                            "created": "2014-12-26T01:40:42.000Z",
                            "videoId": "TYLQj3Du8oA",
                            "pctLikes": 69.86301369863014,
                            "viewCount": 20476,
                            "likes": 51,
                            "dislikes": 22,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/TYLQj3Du8oA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:07",
                            "durationMinutes": 2.1166666666666667,
                            "$$hashKey": "object:414"
                        }
                    ]
                },
                "Nytemare10": {
                    "count": 2,
                    "views": 425,
                    "videos": [
                        {
                            "title": "2014 NFL Topps Platinum & Topps Fire Dual Hobby Box Break #1 Hits Only",
                            "channelTitle": "Nytemare10",
                            "channelId": "UCf5UGYm4tOBz5FoAcg3AXHA",
                            "created": "2015-05-31T03:06:50.000Z",
                            "videoId": "dapVYnVtYeM",
                            "pctLikes": 100,
                            "viewCount": 181,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/dapVYnVtYeM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:24",
                            "durationMinutes": 5.4,
                            "$$hashKey": "object:485"
                        },
                        {
                            "title": "My NFL Trading Card Hits Collection",
                            "channelTitle": "Nytemare10",
                            "channelId": "UCf5UGYm4tOBz5FoAcg3AXHA",
                            "created": "2015-01-13T00:12:17.000Z",
                            "videoId": "iMx0meSVT6Y",
                            "pctLikes": 100,
                            "viewCount": 244,
                            "likes": 4,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/iMx0meSVT6Y/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:14:54",
                            "durationMinutes": 14.9,
                            "$$hashKey": "object:5315"
                        }
                    ]
                },
                "champjersey": {
                    "count": 1,
                    "views": 1494,
                    "videos": [
                        {
                            "title": "$23 Stitched On Jersey - great hits in NFL",
                            "channelTitle": "champjersey",
                            "channelId": "UCFbDJGTli1VrIUOulSrztTA",
                            "created": "2009-09-02T08:43:29.000Z",
                            "videoId": "6u3P3bwDCrc",
                            "pctLikes": 50,
                            "viewCount": 1494,
                            "likes": 1,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/6u3P3bwDCrc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:33",
                            "durationMinutes": 2.55,
                            "$$hashKey": "object:450"
                        }
                    ]
                },
                "souljasouthtv": {
                    "count": 1,
                    "views": 283,
                    "videos": [
                        {
                            "title": "#4 2013 HERMAN C MCCRAY IV 13 YEARS OLD NFL HITS FATBOY DA HITMAN  POP WARNER RIVIERA BEAC",
                            "channelTitle": "souljasouthtv",
                            "channelId": "UCMIZcYFl-wMp-AwHubwdDEg",
                            "created": "2013-09-27T06:23:39.000Z",
                            "videoId": "SMWRMX0sH7s",
                            "pctLikes": 50,
                            "viewCount": 283,
                            "likes": 1,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/SMWRMX0sH7s/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:29",
                            "durationMinutes": 1.4833333333333334,
                            "$$hashKey": "object:479"
                        }
                    ]
                },
                "Kohl's Kicking Camps": {
                    "count": 2,
                    "views": 26780,
                    "videos": [
                        {
                            "title": "4.63 Kickoff Hang Time | NFL Punter Brett Hartmann | Chicago Kicking Camp",
                            "channelTitle": "Kohl's Kicking Camps",
                            "channelId": "UCV-0wytm-vh-p92aJidWSkA",
                            "created": "2011-07-08T18:07:31.000Z",
                            "videoId": "ueugOWJ9aeo",
                            "pctLikes": 97.5,
                            "viewCount": 25718,
                            "likes": 39,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ueugOWJ9aeo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:25",
                            "durationMinutes": 1.4166666666666667,
                            "$$hashKey": "object:406"
                        },
                        {
                            "title": "Jacob Dombrowski | NFL Free Agent Punter",
                            "channelTitle": "Kohl's Kicking Camps",
                            "channelId": "UCV-0wytm-vh-p92aJidWSkA",
                            "created": "2016-03-02T20:56:52.000Z",
                            "videoId": "9HlkreNUNQ4",
                            "pctLikes": 92.3076923076923,
                            "viewCount": 1062,
                            "likes": 24,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/9HlkreNUNQ4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:06",
                            "durationMinutes": 2.1,
                            "$$hashKey": "object:5296"
                        }
                    ]
                },
                "PrincessOfTheSummer": {
                    "count": 1,
                    "views": 17001,
                    "videos": [
                        {
                            "title": "Aaron Rodgers 'Hail Mary' vs. Lions almost hit 'Stadium Ceiling' (In Stadium)",
                            "channelTitle": "PrincessOfTheSummer",
                            "channelId": "UChJAXGhsbHEHMbIJWUhbUaw",
                            "created": "2015-12-05T10:15:17.000Z",
                            "videoId": "4CzA5l2SNw4",
                            "pctLikes": 100,
                            "viewCount": 17001,
                            "likes": 35,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/4CzA5l2SNw4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:16",
                            "durationMinutes": 0.26666666666666666,
                            "$$hashKey": "object:417"
                        }
                    ]
                },
                "Arizona Cardinals (NFC West - NFL)": {
                    "count": 1,
                    "views": 2666,
                    "videos": [
                        {
                            "title": "Adrian Wilson's Greatest Hits",
                            "channelTitle": "Arizona Cardinals (NFC West - NFL)",
                            "channelId": "UC9YrTlASDs12N2SosBvl8tQ",
                            "created": "2015-04-23T23:30:16.000Z",
                            "videoId": "CM16lbTRmcU",
                            "pctLikes": 100,
                            "viewCount": 2666,
                            "likes": 39,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/CM16lbTRmcU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:52",
                            "durationMinutes": 1.8666666666666667,
                            "$$hashKey": "object:442"
                        }
                    ]
                },
                "jamieebberts": {
                    "count": 1,
                    "views": 752,
                    "videos": [
                        {
                            "title": "Amazing NFL HITS by High School Players - CRUNCH TIME",
                            "channelTitle": "jamieebberts",
                            "channelId": "UCT5619bh1qTWPaYqra5MJLg",
                            "created": "2012-05-03T19:43:29.000Z",
                            "videoId": "yuQw9CWXfa0",
                            "pctLikes": 100,
                            "viewCount": 752,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/yuQw9CWXfa0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:09",
                            "durationMinutes": 3.15,
                            "$$hashKey": "object:460"
                        }
                    ]
                },
                "TheVideomontager": {
                    "count": 1,
                    "views": 55055,
                    "videos": [
                        {
                            "title": "Amazing football hits NFL",
                            "channelTitle": "TheVideomontager",
                            "channelId": "UCFLAr2sKg6Rd7sCVvci1c5Q",
                            "created": "2009-11-08T18:26:30.000Z",
                            "videoId": "SWHWwwOA2DA",
                            "pctLikes": 93.58974358974359,
                            "viewCount": 55055,
                            "likes": 73,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/SWHWwwOA2DA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:52",
                            "durationMinutes": 4.866666666666667,
                            "$$hashKey": "object:393"
                        }
                    ]
                },
                "maxthrailkill": {
                    "count": 1,
                    "views": 1059,
                    "videos": [
                        {
                            "title": "Amazing Rugby League Vs. American Football (NFL) BIG HITS Montage",
                            "channelTitle": "maxthrailkill",
                            "channelId": "UCVsJV0M9vERAX1U0w5B2wgQ",
                            "created": "2012-05-03T19:49:12.000Z",
                            "videoId": "_aS0zDsN-yY",
                            "pctLikes": 100,
                            "viewCount": 1059,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/_aS0zDsN-yY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:34",
                            "durationMinutes": 4.566666666666666,
                            "$$hashKey": "object:453"
                        }
                    ]
                },
                "mrvideo100100": {
                    "count": 1,
                    "views": 889,
                    "videos": [
                        {
                            "title": "American Football -- NFL HITS, RUNS, CATCHES and, SCUFFLES",
                            "channelTitle": "mrvideo100100",
                            "channelId": "UCSNsc9pqlF226omYhVo0njA",
                            "created": "2011-01-05T09:37:50.000Z",
                            "videoId": "xW3P1WWpJiI",
                            "pctLikes": 80,
                            "viewCount": 889,
                            "likes": 4,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/xW3P1WWpJiI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:23",
                            "durationMinutes": 5.383333333333334,
                            "$$hashKey": "object:457"
                        }
                    ]
                },
                "ESPNFL": {
                    "count": 1,
                    "views": 25209,
                    "videos": [
                        {
                            "title": "American Football s Hardest Hits NFL College Super Bowl 48",
                            "channelTitle": "ESPNFL",
                            "channelId": "UCCXlYSd8uIM0fms8uJVF-cg",
                            "created": "2014-03-13T12:59:11.000Z",
                            "videoId": "kXZQvcUwVYw",
                            "pctLikes": 97.2972972972973,
                            "viewCount": 25209,
                            "likes": 72,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/kXZQvcUwVYw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:58",
                            "durationMinutes": 2.966666666666667,
                            "$$hashKey": "object:407"
                        }
                    ]
                },
                "NFL NETWORK": {
                    "count": 1,
                    "views": 36227,
                    "videos": [
                        {
                            "title": "Andrew Luck Compliments Hits",
                            "channelTitle": "NFL NETWORK",
                            "channelId": "UCLjTngffO6AByEtKDfOD4vQ",
                            "created": "2015-10-04T16:05:19.000Z",
                            "videoId": "Buvo_-3x9dA",
                            "pctLikes": 99.54545454545455,
                            "viewCount": 36227,
                            "likes": 219,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Buvo_-3x9dA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:43",
                            "durationMinutes": 0.7166666666666667,
                            "$$hashKey": "object:398"
                        }
                    ]
                },
                "Complex News": {
                    "count": 1,
                    "views": 37605,
                    "videos": [
                        {
                            "title": "Anonymous NFL Head Coach Thinks Jay Gruden Is Letting Robert Griffin III Take Hits on Purpose",
                            "channelTitle": "Complex News",
                            "channelId": "UCpFHkjOa7ia6bH5_6cDsDXg",
                            "created": "2015-08-24T20:50:45.000Z",
                            "videoId": "bJ2vgGYR2kc",
                            "pctLikes": 99.19908466819221,
                            "viewCount": 37605,
                            "likes": 867,
                            "dislikes": 7,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/bJ2vgGYR2kc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:10",
                            "durationMinutes": 2.1666666666666665,
                            "$$hashKey": "object:397"
                        }
                    ]
                },
                "Biggsz79": {
                    "count": 2,
                    "views": 1457,
                    "videos": [
                        {
                            "title": "AYF NFL Hardest Hits",
                            "channelTitle": "Biggsz79",
                            "channelId": "UCxA0eNJ7Sh_CHEQ2PeonTrQ",
                            "created": "2014-10-22T02:23:45.000Z",
                            "videoId": "o0ZuAMKzgZY",
                            "pctLikes": 80,
                            "viewCount": 987,
                            "likes": 4,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/o0ZuAMKzgZY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:09",
                            "durationMinutes": 0.15,
                            "$$hashKey": "object:456"
                        },
                        {
                            "title": "Hardest Hits NFL and Youth football Biggsz",
                            "channelTitle": "Biggsz79",
                            "channelId": "UCxA0eNJ7Sh_CHEQ2PeonTrQ",
                            "created": "2014-10-22T19:42:57.000Z",
                            "videoId": "2GTsszI7vQo",
                            "pctLikes": 100,
                            "viewCount": 470,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/2GTsszI7vQo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:12",
                            "durationMinutes": 0.2
                        }
                    ]
                },
                "mrhighlight84": {
                    "count": 2,
                    "views": 48509,
                    "videos": [
                        {
                            "title": "█▬█ BACKBREAKER NFL 2014 | Fumbles & Big Hits Montage #1",
                            "channelTitle": "mrhighlight84",
                            "channelId": "UCzBKJXDtH-MuyFG_fx0Z9zA",
                            "created": "2014-03-18T22:12:52.000Z",
                            "videoId": "WmMPuJ83WVA",
                            "pctLikes": 98.85892116182573,
                            "viewCount": 46121,
                            "likes": 953,
                            "dislikes": 11,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/WmMPuJ83WVA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:12",
                            "durationMinutes": 3.2,
                            "$$hashKey": "object:395"
                        },
                        {
                            "title": "BACKBREAKER | NFL & NCAA Football Big Hits Montage | JT Money Hit Em High",
                            "channelTitle": "mrhighlight84",
                            "channelId": "UCzBKJXDtH-MuyFG_fx0Z9zA",
                            "created": "2012-07-13T21:21:42.000Z",
                            "videoId": "RI2LMBKw1PQ",
                            "pctLikes": 100,
                            "viewCount": 2388,
                            "likes": 20,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/RI2LMBKw1PQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:16",
                            "durationMinutes": 4.266666666666667,
                            "$$hashKey": "object:444"
                        }
                    ]
                },
                "halofandude123Studio": {
                    "count": 1,
                    "views": 112,
                    "videos": [
                        {
                            "title": "BdotOMGMovement NFL Hard Hits",
                            "channelTitle": "halofandude123Studio",
                            "channelId": "UCNVilguRJiGZBB7ODCv-20A",
                            "created": "2015-02-23T23:06:45.000Z",
                            "videoId": "Gg_SSKO2-dU",
                            "pctLikes": 0,
                            "viewCount": 112,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Gg_SSKO2-dU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:13",
                            "durationMinutes": 0.21666666666666667,
                            "$$hashKey": "object:493"
                        }
                    ]
                },
                "Annalisa Lakeisha": {
                    "count": 1,
                    "views": 22,
                    "videos": [
                        {
                            "title": "Best American Football Vines - Best NFL Vines - Hits & Tackles [ Best New Vines ] Jan. 201",
                            "channelTitle": "Annalisa Lakeisha",
                            "channelId": "UCPBpcIfsA2PrX2_0SUSV6YA",
                            "created": "2016-02-21T18:38:36.000Z",
                            "videoId": "lGoYxjm8_Bo",
                            "pctLikes": 0,
                            "viewCount": 22,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/lGoYxjm8_Bo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:26",
                            "durationMinutes": 6.433333333333334,
                            "$$hashKey": "object:515"
                        }
                    ]
                },
                "Aries Sports": {
                    "count": 2,
                    "views": 100,
                    "videos": [
                        {
                            "title": "Best American Football Vines   Best NFL Vines   Hits & Tackles  Best New Vines  Jan  2014 Part 2",
                            "channelTitle": "Aries Sports",
                            "channelId": "UCr8OazdZBR5B0achZ54h6UA",
                            "created": "2016-04-05T20:07:48.000Z",
                            "videoId": "pfYCJ-LXcTk",
                            "pctLikes": 100,
                            "viewCount": 72,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/pfYCJ-LXcTk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:19",
                            "durationMinutes": 3.3166666666666664,
                            "$$hashKey": "object:503"
                        },
                        {
                            "title": "Best Football Vines Compilation March 2016   NFL Vines Big Hits, Football Highlights & Celebrations",
                            "channelTitle": "Aries Sports",
                            "channelId": "UCr8OazdZBR5B0achZ54h6UA",
                            "created": "2016-04-05T20:07:48.000Z",
                            "videoId": "ynzd7_r5EDA",
                            "pctLikes": 0,
                            "viewCount": 28,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ynzd7_r5EDA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:36",
                            "durationMinutes": 3.6,
                            "$$hashKey": "object:5348"
                        }
                    ]
                },
                "Twanda Florence": {
                    "count": 1,
                    "views": 110,
                    "videos": [
                        {
                            "title": "Best Football Vines Jukes Compilation 2015 - NFL Vines Best Big Hits with Beat Drops",
                            "channelTitle": "Twanda Florence",
                            "channelId": "UCyr1Cya9-wgDQB4nP5GZd3w",
                            "created": "2016-02-21T16:49:05.000Z",
                            "videoId": "KrnCrNUcLrs",
                            "pctLikes": 0,
                            "viewCount": 110,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/KrnCrNUcLrs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:14",
                            "durationMinutes": 6.233333333333333,
                            "$$hashKey": "object:495"
                        }
                    ]
                },
                "Bruce Marlier": {
                    "count": 1,
                    "views": 8269,
                    "videos": [
                        {
                            "title": "Best NFL Hard Hits of 2012 BRUTAL Collisions",
                            "channelTitle": "Bruce Marlier",
                            "channelId": "UCxYWoxSsWmrI8l0PuKbEj8w",
                            "created": "2014-01-02T21:48:34.000Z",
                            "videoId": "O5hK4S0nTqE",
                            "pctLikes": 96,
                            "viewCount": 8269,
                            "likes": 24,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/O5hK4S0nTqE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:04",
                            "durationMinutes": 4.066666666666666,
                            "$$hashKey": "object:426"
                        }
                    ]
                },
                "Ginno": {
                    "count": 1,
                    "views": 7071,
                    "videos": [
                        {
                            "title": "Best American Football Vines - Best NFL Vines - Hits & Tackles Reaction!",
                            "channelTitle": "Ginno",
                            "channelId": "UCommgk5zZL_eVpADVoeoaZw",
                            "created": "2015-08-11T16:00:02.000Z",
                            "videoId": "O3OM0oFNh4Y",
                            "pctLikes": 92.3076923076923,
                            "viewCount": 7071,
                            "likes": 84,
                            "dislikes": 7,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/O3OM0oFNh4Y/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:23",
                            "durationMinutes": 4.383333333333334,
                            "$$hashKey": "object:427"
                        }
                    ]
                },
                "1MegaSport": {
                    "count": 1,
                    "views": 1522,
                    "videos": [
                        {
                            "title": "Best of NFL (Touchdowns, Hits, Highlights)",
                            "channelTitle": "1MegaSport",
                            "channelId": "UC-uOW46cWyGOLxPopbvjlPA",
                            "created": "2012-03-14T18:55:17.000Z",
                            "videoId": "RoGn9RswsLY",
                            "pctLikes": 75,
                            "viewCount": 1522,
                            "likes": 3,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/RoGn9RswsLY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:24",
                            "durationMinutes": 3.4,
                            "$$hashKey": "object:449"
                        }
                    ]
                },
                "Stillers33": {
                    "count": 1,
                    "views": 4644,
                    "videos": [
                        {
                            "title": "Best NHL and NFL hits",
                            "channelTitle": "Stillers33",
                            "channelId": "UChgie3O2jSXjTXKZMZXnnDg",
                            "created": "2008-01-19T12:29:00.000Z",
                            "videoId": "0-k9Tf88SW4",
                            "pctLikes": 100,
                            "viewCount": 4644,
                            "likes": 4,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/0-k9Tf88SW4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:35",
                            "durationMinutes": 3.5833333333333335,
                            "$$hashKey": "object:437"
                        }
                    ]
                },
                "Jr": {
                    "count": 1,
                    "views": 151576,
                    "videos": [
                        {
                            "title": "NFL Hits season 2006-2008(Remix Till I Collapse)",
                            "channelTitle": "Jr",
                            "channelId": "UCGsCOYvvo8ylFwckfBI3Cig",
                            "created": "2009-09-25T05:55:27.000Z",
                            "videoId": "twO-Uxfa9-k",
                            "pctLikes": 98.08743169398907,
                            "viewCount": 151576,
                            "likes": 359,
                            "dislikes": 7,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/twO-Uxfa9-k/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:24",
                            "durationMinutes": 5.4,
                            "$$hashKey": "object:5215"
                        }
                    ]
                },
                "KDLM Films": {
                    "count": 1,
                    "views": 49110,
                    "videos": [
                        {
                            "title": "NFL Highlights and Biggest Hits (HD)",
                            "channelTitle": "KDLM Films",
                            "channelId": "UC7Tt81BuHAj9TuHGOK4bCJg",
                            "created": "2013-09-29T15:51:22.000Z",
                            "videoId": "uxwvCKuaAks",
                            "pctLikes": 90.4494382022472,
                            "viewCount": 49110,
                            "likes": 161,
                            "dislikes": 17,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/uxwvCKuaAks/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:44",
                            "durationMinutes": 3.7333333333333334,
                            "$$hashKey": "object:5250"
                        }
                    ]
                },
                "whitemystery978": {
                    "count": 1,
                    "views": 25422,
                    "videos": [
                        {
                            "title": "nfl helmet to helmet hits.flv",
                            "channelTitle": "whitemystery978",
                            "channelId": "UCBjSzoG6JVlQl8GohhDWdkg",
                            "created": "2010-11-30T23:13:14.000Z",
                            "videoId": "RIHuDvhNAvY",
                            "pctLikes": 83.01886792452831,
                            "viewCount": 25422,
                            "likes": 44,
                            "dislikes": 9,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/RIHuDvhNAvY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:13",
                            "durationMinutes": 3.216666666666667,
                            "$$hashKey": "object:5260"
                        }
                    ]
                },
                "PJB TRIBUTES": {
                    "count": 1,
                    "views": 93755,
                    "videos": [
                        {
                            "title": "NFL - | THE MOST BRUTAL HITS |",
                            "channelTitle": "PJB TRIBUTES",
                            "channelId": "UCXtD2-V4GgRbwJU9Ej_BVXQ",
                            "created": "2013-09-01T13:02:07.000Z",
                            "videoId": "2G-Mdq2DdhY",
                            "pctLikes": 92.11618257261411,
                            "viewCount": 93755,
                            "likes": 222,
                            "dislikes": 19,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/2G-Mdq2DdhY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:31",
                            "durationMinutes": 2.5166666666666666,
                            "$$hashKey": "object:5237"
                        }
                    ]
                },
                "MMMMax": {
                    "count": 1,
                    "views": 98910,
                    "videos": [
                        {
                            "title": "BEST NFL VINES HITS",
                            "channelTitle": "MMMMax",
                            "channelId": "UCt4NxXqr1tzpulkAuieehZQ",
                            "created": "2014-08-07T11:16:10.000Z",
                            "videoId": "wj-2LlIZ70I",
                            "pctLikes": 81.66666666666667,
                            "viewCount": 98910,
                            "likes": 245,
                            "dislikes": 55,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/wj-2LlIZ70I/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:33",
                            "durationMinutes": 4.55,
                            "$$hashKey": "object:5233"
                        }
                    ]
                },
                "RaptorsFan2": {
                    "count": 1,
                    "views": 38455,
                    "videos": [
                        {
                            "title": "NFL Owners Meeting Video - Illegal Hits",
                            "channelTitle": "RaptorsFan2",
                            "channelId": "UC6tFfPmgAJWb-XJ8i2MclLA",
                            "created": "2012-12-21T18:18:53.000Z",
                            "videoId": "uRxyk2P5gfY",
                            "pctLikes": 76.36363636363637,
                            "viewCount": 38455,
                            "likes": 84,
                            "dislikes": 26,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/uRxyk2P5gfY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:11:58",
                            "durationMinutes": 11.966666666666667,
                            "$$hashKey": "object:5254"
                        }
                    ]
                },
                "Matthew Swanson": {
                    "count": 1,
                    "views": 80980,
                    "videos": [
                        {
                            "title": "NFL's Hardest And Greatest Hits Of All-Time",
                            "channelTitle": "Matthew Swanson",
                            "channelId": "UCt0ZQSlPIgHjx5BMNY2_jzQ",
                            "created": "2011-11-23T15:50:45.000Z",
                            "videoId": "JDIjCdfm6FM",
                            "pctLikes": 95.13888888888889,
                            "viewCount": 80980,
                            "likes": 137,
                            "dislikes": 7,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/JDIjCdfm6FM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:46",
                            "durationMinutes": 2.7666666666666666,
                            "$$hashKey": "object:5246"
                        }
                    ]
                },
                "istepos": {
                    "count": 1,
                    "views": 80731,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits 2012",
                            "channelTitle": "istepos",
                            "channelId": "UCwFgYz1wlloooRPOvJuv8WA",
                            "created": "2012-11-14T13:54:17.000Z",
                            "videoId": "o0ApjHL2hW8",
                            "pctLikes": 90.54726368159204,
                            "viewCount": 80731,
                            "likes": 182,
                            "dislikes": 19,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/o0ApjHL2hW8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:45",
                            "durationMinutes": 3.75,
                            "$$hashKey": "object:5247"
                        }
                    ]
                },
                "Ian Ward": {
                    "count": 2,
                    "views": 141200,
                    "videos": [
                        {
                            "title": "NFL's Greatest Hits - Dick Butkus",
                            "channelTitle": "Ian Ward",
                            "channelId": "UCt_1fPHk3PxOU28XzIQT2Sg",
                            "created": "2014-10-25T20:03:40.000Z",
                            "videoId": "qJzEgMhU9_Q",
                            "pctLikes": 97.74774774774775,
                            "viewCount": 140360,
                            "likes": 217,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/qJzEgMhU9_Q/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:17",
                            "durationMinutes": 1.2833333333333332,
                            "$$hashKey": "object:5217"
                        },
                        {
                            "title": "NFL's Greatest Hits - Greatest Quarterbacks",
                            "channelTitle": "Ian Ward",
                            "channelId": "UCt_1fPHk3PxOU28XzIQT2Sg",
                            "created": "2014-10-25T19:31:38.000Z",
                            "videoId": "RKJDla7_q6Y",
                            "pctLikes": 100,
                            "viewCount": 840,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/RKJDla7_q6Y/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:57",
                            "durationMinutes": 2.95,
                            "$$hashKey": "object:5302"
                        }
                    ]
                },
                "SPIDERMANSWAG101": {
                    "count": 1,
                    "views": 2509,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits From 2009",
                            "channelTitle": "SPIDERMANSWAG101",
                            "channelId": "UCj0XSZAkzhSHBnq8iPr5amQ",
                            "created": "2011-08-02T15:02:13.000Z",
                            "videoId": "tSp0cSiiGTc",
                            "pctLikes": 93.33333333333333,
                            "viewCount": 2509,
                            "likes": 14,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/tSp0cSiiGTc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:10",
                            "durationMinutes": 5.166666666666667,
                            "$$hashKey": "object:5286"
                        }
                    ]
                },
                "XJACKOLHX": {
                    "count": 1,
                    "views": 9309,
                    "videos": [
                        {
                            "title": "nfl's greatest hits   prodigy",
                            "channelTitle": "XJACKOLHX",
                            "channelId": "UClJB3Mx-55pB2te1iVuV6YQ",
                            "created": "2009-02-24T19:27:10.000Z",
                            "videoId": "0EZrEiUJt6Y",
                            "pctLikes": 98,
                            "viewCount": 9309,
                            "likes": 49,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/0EZrEiUJt6Y/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:58",
                            "durationMinutes": 2.966666666666667,
                            "$$hashKey": "object:5270"
                        }
                    ]
                },
                "Junior Pina": {
                    "count": 1,
                    "views": 93695,
                    "videos": [
                        {
                            "title": "NFL Helmet hits",
                            "channelTitle": "Junior Pina",
                            "channelId": "UClovG3A7Fp0RkCxtOJkJZPw",
                            "created": "2011-03-25T19:41:40.000Z",
                            "videoId": "Yj-8rchU5ag",
                            "pctLikes": 87.77292576419214,
                            "viewCount": 93695,
                            "likes": 201,
                            "dislikes": 28,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Yj-8rchU5ag/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:59",
                            "durationMinutes": 4.983333333333333,
                            "$$hashKey": "object:5238"
                        }
                    ]
                },
                "Taateo Mati": {
                    "count": 1,
                    "views": 6218,
                    "videos": [
                        {
                            "title": "NFL VS Rugby League Big Hits Here Comes The Boom",
                            "channelTitle": "Taateo Mati",
                            "channelId": "UCpXjex4HAkIrgf4YlfwfgSg",
                            "created": "2015-08-03T05:44:08.000Z",
                            "videoId": "kEsIkoAiHQY",
                            "pctLikes": 100,
                            "viewCount": 6218,
                            "likes": 41,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/kEsIkoAiHQY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:56",
                            "durationMinutes": 3.9333333333333336,
                            "$$hashKey": "object:5276"
                        }
                    ]
                },
                "damyre ollison": {
                    "count": 1,
                    "views": 123865,
                    "videos": [
                        {
                            "title": "Here comes the boom  Biggest NCAA and NFL hits   HD720P",
                            "channelTitle": "damyre ollison",
                            "channelId": "UCE6RBMkasPHmxz1O71y8Zrw",
                            "created": "2014-02-14T16:17:20.000Z",
                            "videoId": "FZGnDuf9OqI",
                            "pctLikes": 97.1830985915493,
                            "viewCount": 123865,
                            "likes": 483,
                            "dislikes": 14,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/FZGnDuf9OqI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:56",
                            "durationMinutes": 3.9333333333333336,
                            "$$hashKey": "object:5221"
                        }
                    ]
                },
                "KONY2012ISBAD": {
                    "count": 1,
                    "views": 55109,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits 2010-2011",
                            "channelTitle": "KONY2012ISBAD",
                            "channelId": "UC5VnLW7hxcMh2oztmgHTN-g",
                            "created": "2012-03-14T18:15:49.000Z",
                            "videoId": "pWdajf0eMnI",
                            "pctLikes": 97.57281553398059,
                            "viewCount": 55109,
                            "likes": 201,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/pWdajf0eMnI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:43",
                            "durationMinutes": 4.716666666666667,
                            "$$hashKey": "object:5248"
                        }
                    ]
                },
                "armida boonstra": {
                    "count": 1,
                    "views": 104091,
                    "videos": [
                        {
                            "title": "nfl's hardest hits",
                            "channelTitle": "armida boonstra",
                            "channelId": "UC5d0iO6XsqebtpjKS2fq_ng",
                            "created": "2012-09-25T10:54:54.000Z",
                            "videoId": "DktTs53dGsY",
                            "pctLikes": 89.63963963963964,
                            "viewCount": 104091,
                            "likes": 199,
                            "dislikes": 23,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/DktTs53dGsY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:56",
                            "durationMinutes": 3.9333333333333336,
                            "$$hashKey": "object:5228"
                        }
                    ]
                },
                "UltraSportsMix": {
                    "count": 1,
                    "views": 23694,
                    "videos": [
                        {
                            "title": "Top 10 Hits in the NFL (HD)",
                            "channelTitle": "UltraSportsMix",
                            "channelId": "UC1X2cA47eoBje96O9cn0RAQ",
                            "created": "2013-07-23T19:50:00.000Z",
                            "videoId": "f1AOjHQMPtg",
                            "pctLikes": 81.13207547169812,
                            "viewCount": 23694,
                            "likes": 43,
                            "dislikes": 10,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/f1AOjHQMPtg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:32",
                            "durationMinutes": 1.5333333333333332,
                            "$$hashKey": "object:5261"
                        }
                    ]
                },
                "hockeycugz19": {
                    "count": 1,
                    "views": 41586,
                    "videos": [
                        {
                            "title": "Bone Crushing NFL Hits",
                            "channelTitle": "hockeycugz19",
                            "channelId": "UC89NrsedNUCR7IKcsXE9uWg",
                            "created": "2009-06-19T14:39:48.000Z",
                            "videoId": "Tk1TdPFbhZw",
                            "pctLikes": 91.37931034482759,
                            "viewCount": 41586,
                            "likes": 53,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Tk1TdPFbhZw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:20",
                            "durationMinutes": 7.333333333333333,
                            "$$hashKey": "object:5252"
                        }
                    ]
                },
                "Janabo Ebe": {
                    "count": 1,
                    "views": 2313,
                    "videos": [
                        {
                            "title": "NFL Big Hits and Plays Compilation! | HD 2015!",
                            "channelTitle": "Janabo Ebe",
                            "channelId": "UCxRSciMkUMxVAQDiUXjzLJQ",
                            "created": "2015-11-19T02:10:00.000Z",
                            "videoId": "YX3ZkiYU5cE",
                            "pctLikes": 62.5,
                            "viewCount": 2313,
                            "likes": 5,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/YX3ZkiYU5cE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:17",
                            "durationMinutes": 7.283333333333333,
                            "$$hashKey": "object:5288"
                        }
                    ]
                },
                "high school soccer": {
                    "count": 1,
                    "views": 5249,
                    "videos": [
                        {
                            "title": "Top Hardest Hits in NFL History HD",
                            "channelTitle": "high school soccer",
                            "channelId": "UCkSLWK8lkaYXQsfeV78MLug",
                            "created": "2014-11-01T16:38:47.000Z",
                            "videoId": "yBGvsmOlEwM",
                            "pctLikes": 100,
                            "viewCount": 5249,
                            "likes": 13,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/yBGvsmOlEwM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:00",
                            "durationMinutes": 3,
                            "$$hashKey": "object:5278"
                        }
                    ]
                },
                "Chris Hunt": {
                    "count": 1,
                    "views": 47484,
                    "videos": [
                        {
                            "title": "NFL Hits #1 (Eminem - Lose Yourself)",
                            "channelTitle": "Chris Hunt",
                            "channelId": "UCj4_wPnh8AmoB3OI7nSQIrg",
                            "created": "2012-02-12T01:56:44.000Z",
                            "videoId": "gtTQSj6ZdXs",
                            "pctLikes": 97.91666666666666,
                            "viewCount": 47484,
                            "likes": 235,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/gtTQSj6ZdXs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:10",
                            "durationMinutes": 5.166666666666667,
                            "$$hashKey": "object:5251"
                        }
                    ]
                },
                "augdog55555": {
                    "count": 1,
                    "views": 17403,
                    "videos": [
                        {
                            "title": "NFL vs NHL (hits, fights, and celebrations)",
                            "channelTitle": "augdog55555",
                            "channelId": "UCF1PpD-1jlVmitZShFS6Zkw",
                            "created": "2012-02-02T01:28:58.000Z",
                            "videoId": "UBQWCmi6jXU",
                            "pctLikes": 90.74074074074075,
                            "viewCount": 17403,
                            "likes": 49,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/UBQWCmi6jXU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:09:03",
                            "durationMinutes": 9.05,
                            "$$hashKey": "object:5264"
                        }
                    ]
                },
                "Tim Paulson": {
                    "count": 1,
                    "views": 39823,
                    "videos": [
                        {
                            "title": "NFL's Hardest Hits",
                            "channelTitle": "Tim Paulson",
                            "channelId": "UC5a4DMRm_XA4CDGJ90o0ikg",
                            "created": "2009-12-07T21:51:50.000Z",
                            "videoId": "mGUijiOJpx0",
                            "pctLikes": 94.68085106382979,
                            "viewCount": 39823,
                            "likes": 89,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/mGUijiOJpx0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:46",
                            "durationMinutes": 3.7666666666666666,
                            "$$hashKey": "object:5253"
                        }
                    ]
                },
                "Sm00th TV": {
                    "count": 1,
                    "views": 1867,
                    "videos": [
                        {
                            "title": "NFL Classic: Great Hits",
                            "channelTitle": "Sm00th TV",
                            "channelId": "UCUyu8toCleNTojjcKR6r3ww",
                            "created": "2011-11-29T04:36:31.000Z",
                            "videoId": "fYm5ZJXBo84",
                            "pctLikes": 100,
                            "viewCount": 1867,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/fYm5ZJXBo84/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:27",
                            "durationMinutes": 3.45,
                            "$$hashKey": "object:5289"
                        }
                    ]
                },
                "cambby": {
                    "count": 1,
                    "views": 99672,
                    "videos": [
                        {
                            "title": "Hardest Football Hits in NFL",
                            "channelTitle": "cambby",
                            "channelId": "UC04WX4u5KLYfOS20w7uHz4g",
                            "created": "2010-02-27T00:02:01.000Z",
                            "videoId": "HZoPujuOQiI",
                            "pctLikes": 92.53731343283582,
                            "viewCount": 99672,
                            "likes": 124,
                            "dislikes": 10,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/HZoPujuOQiI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:51",
                            "durationMinutes": 4.85,
                            "$$hashKey": "object:5232"
                        }
                    ]
                },
                "chinkzz85": {
                    "count": 1,
                    "views": 6051,
                    "videos": [
                        {
                            "title": "NFL Hits and Highlights- Drop The World",
                            "channelTitle": "chinkzz85",
                            "channelId": "UC0pThOXOl-8BKah4v5Y6SfA",
                            "created": "2011-07-29T02:08:29.000Z",
                            "videoId": "oAiCYn-sl94",
                            "pctLikes": 100,
                            "viewCount": 6051,
                            "likes": 14,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/oAiCYn-sl94/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:39",
                            "durationMinutes": 4.65,
                            "$$hashKey": "object:5277"
                        }
                    ]
                },
                "Y3U": {
                    "count": 1,
                    "views": 120755,
                    "videos": [
                        {
                            "title": "Hardest NFL hits 2014-15",
                            "channelTitle": "Y3U",
                            "channelId": "UCivwGdPoHj9ESxykKEXDEHg",
                            "created": "2014-07-02T20:16:17.000Z",
                            "videoId": "Q17Xgj0Oh80",
                            "pctLikes": 70.63492063492063,
                            "viewCount": 120755,
                            "likes": 267,
                            "dislikes": 111,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Q17Xgj0Oh80/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:38",
                            "durationMinutes": 3.6333333333333333,
                            "$$hashKey": "object:5223"
                        }
                    ]
                },
                "Storyy Penning": {
                    "count": 2,
                    "views": 115630,
                    "videos": [
                        {
                            "title": "NFL Concussion Hits",
                            "channelTitle": "Storyy Penning",
                            "channelId": "UCIuuAgEE3aaEfB0IxgC_qLg",
                            "created": "2012-01-12T02:13:46.000Z",
                            "videoId": "tMbGiBWxvu0",
                            "pctLikes": 51.09034267912772,
                            "viewCount": 97400,
                            "likes": 164,
                            "dislikes": 157,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/tMbGiBWxvu0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:56",
                            "durationMinutes": 4.933333333333334,
                            "$$hashKey": "object:5234"
                        },
                        {
                            "title": "NFL Concussion Hits",
                            "channelTitle": "Storyy Penning",
                            "channelId": "UCIuuAgEE3aaEfB0IxgC_qLg",
                            "created": "2012-01-12T02:43:59.000Z",
                            "videoId": "EnY0oSM8wFQ",
                            "pctLikes": 57.14285714285714,
                            "viewCount": 18230,
                            "likes": 32,
                            "dislikes": 24,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/EnY0oSM8wFQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:56",
                            "durationMinutes": 4.933333333333334
                        }
                    ]
                },
                "The Point with Ana Kasparian": {
                    "count": 1,
                    "views": 82651,
                    "videos": [
                        {
                            "title": "NFL Football Hits, Concussions, Injuries & a Lifetime of Pain",
                            "channelTitle": "The Point with Ana Kasparian",
                            "channelId": "UCvb-DqrtgHRX-hPypnjfkdw",
                            "created": "2013-05-24T21:20:35.000Z",
                            "videoId": "UT__BsZlHSc",
                            "pctLikes": 85.28301886792453,
                            "viewCount": 82651,
                            "likes": 226,
                            "dislikes": 39,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/UT__BsZlHSc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:09:13",
                            "durationMinutes": 9.216666666666667,
                            "$$hashKey": "object:5243"
                        }
                    ]
                },
                "BonnieNose !!": {
                    "count": 1,
                    "views": 53667,
                    "videos": [
                        {
                            "title": "NFL Hard Hits With Dubstep(AHHH YEAAAA)",
                            "channelTitle": "BonnieNose !!",
                            "channelId": "UCjs6o2iE3Vuzq3gTib9e2iQ",
                            "created": "2014-02-21T16:07:43.000Z",
                            "videoId": "wVrFSSifXlg",
                            "pctLikes": 86.15384615384616,
                            "viewCount": 53667,
                            "likes": 224,
                            "dislikes": 36,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/wVrFSSifXlg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:24",
                            "durationMinutes": 4.4,
                            "$$hashKey": "object:5249"
                        }
                    ]
                },
                "Rise Above Sports": {
                    "count": 1,
                    "views": 81694,
                    "videos": [
                        {
                            "title": "NFL College Football Pump Up | Highlights Live | Football highlights | Big Hits | (HD)",
                            "channelTitle": "Rise Above Sports",
                            "channelId": "UCbMsJ-_tjnxVqax5058iWcA",
                            "created": "2015-04-25T04:18:43.000Z",
                            "videoId": "mkwJHVYaGS8",
                            "pctLikes": 97.48283752860412,
                            "viewCount": 81694,
                            "likes": 426,
                            "dislikes": 11,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/mkwJHVYaGS8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:12",
                            "durationMinutes": 2.2,
                            "$$hashKey": "object:5245"
                        }
                    ]
                },
                "Hollidaybrent92": {
                    "count": 1,
                    "views": 169263,
                    "videos": [
                        {
                            "title": "NFL's hardest hits ever!!!",
                            "channelTitle": "Hollidaybrent92",
                            "channelId": "UCoo8ETZD6ctACGQmIC2iCSw",
                            "created": "2008-11-03T20:18:36.000Z",
                            "videoId": "Yg6l3EQITYc",
                            "pctLikes": 92.43027888446214,
                            "viewCount": 169263,
                            "likes": 232,
                            "dislikes": 19,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Yg6l3EQITYc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:58",
                            "durationMinutes": 2.966666666666667,
                            "$$hashKey": "object:5213"
                        }
                    ]
                },
                "Adam Signy": {
                    "count": 1,
                    "views": 27571,
                    "videos": [
                        {
                            "title": "This Is NFL - Super-Bowl Promo hard hits",
                            "channelTitle": "Adam Signy",
                            "channelId": "UCznBpQUOgFa9ycIUvdh6NJQ",
                            "created": "2012-01-28T12:16:55.000Z",
                            "videoId": "ZQGbQszMark",
                            "pctLikes": 96.80851063829788,
                            "viewCount": 27571,
                            "likes": 91,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ZQGbQszMark/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:10",
                            "durationMinutes": 4.166666666666667,
                            "$$hashKey": "object:5259"
                        }
                    ]
                },
                "DatDudeBA": {
                    "count": 1,
                    "views": 4168,
                    "videos": [
                        {
                            "title": "Madden NFL 25 | Sean Taylor Half Beast Tribute/Highlights | Bigs Hits and Sick Picks!",
                            "channelTitle": "DatDudeBA",
                            "channelId": "UCMJ4GeaEFJhwBRqYwoSirkQ",
                            "created": "2014-07-28T16:42:58.000Z",
                            "videoId": "8lsk0G6AZwo",
                            "pctLikes": 100,
                            "viewCount": 4168,
                            "likes": 48,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/8lsk0G6AZwo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:13",
                            "durationMinutes": 4.216666666666667,
                            "$$hashKey": "object:5283"
                        }
                    ]
                },
                "SpInxXxAqua": {
                    "count": 1,
                    "views": 39,
                    "videos": [
                        {
                            "title": "Here comes the Boom   NFL ,College football, hits and runs (I DO NOT OWN THIS)",
                            "channelTitle": "SpInxXxAqua",
                            "channelId": "UCtfA9MKOJUAQ6gYxV3aL2Kw",
                            "created": "2016-01-07T02:03:54.000Z",
                            "videoId": "oqwjUie--3U",
                            "pctLikes": 100,
                            "viewCount": 39,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/oqwjUie--3U/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:58",
                            "durationMinutes": 3.966666666666667,
                            "$$hashKey": "object:5345"
                        }
                    ]
                },
                "Jack Dando": {
                    "count": 1,
                    "views": 35,
                    "videos": [
                        {
                            "title": "Biggest NFL hits 2015",
                            "channelTitle": "Jack Dando",
                            "channelId": "UCmZM4BZOY-N1sAmKLkDgVtw",
                            "created": "2016-03-06T09:16:44.000Z",
                            "videoId": "j4N040SXtRk",
                            "pctLikes": 100,
                            "viewCount": 35,
                            "likes": 4,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/j4N040SXtRk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:56",
                            "durationMinutes": 3.9333333333333336,
                            "$$hashKey": "object:5346"
                        }
                    ]
                },
                "TradeTheTrend": {
                    "count": 1,
                    "views": 8325,
                    "videos": [
                        {
                            "title": "NFL to dole out suspensions for illegal hits",
                            "channelTitle": "TradeTheTrend",
                            "channelId": "UCdMbo3RknL1cwOxnd_cdNUA",
                            "created": "2010-10-19T19:50:14.000Z",
                            "videoId": "pi0fOFQvLiY",
                            "pctLikes": 100,
                            "viewCount": 8325,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/pi0fOFQvLiY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:07",
                            "durationMinutes": 1.1166666666666667,
                            "$$hashKey": "object:5272"
                        }
                    ]
                },
                "ROLLtideCRIMSON1": {
                    "count": 1,
                    "views": 583,
                    "videos": [
                        {
                            "title": "panthers big hits (NFL)",
                            "channelTitle": "ROLLtideCRIMSON1",
                            "channelId": "UCn9btTSfnEKyeGDKvlDJ4Hg",
                            "created": "2011-12-24T04:27:14.000Z",
                            "videoId": "kMLwKy--MOw",
                            "pctLikes": 100,
                            "viewCount": 583,
                            "likes": 7,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/kMLwKy--MOw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:50",
                            "durationMinutes": 2.8333333333333335,
                            "$$hashKey": "object:5307"
                        }
                    ]
                },
                "Alicia Brooke": {
                    "count": 1,
                    "views": 540,
                    "videos": [
                        {
                            "title": "NFL Biggest Hits Pump Up Video HD   YouTube",
                            "channelTitle": "Alicia Brooke",
                            "channelId": "UCWQ31FKWNt1QEXKwGsuG-yQ",
                            "created": "2012-12-24T04:31:23.000Z",
                            "videoId": "oB07XqkArPA",
                            "pctLikes": 100,
                            "viewCount": 540,
                            "likes": 7,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/oB07XqkArPA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:53",
                            "durationMinutes": 2.8833333333333333,
                            "$$hashKey": "object:5308"
                        }
                    ]
                },
                "ctcooper Sports": {
                    "count": 1,
                    "views": 62,
                    "videos": [
                        {
                            "title": "NFL VS RUGBY biggest hits",
                            "channelTitle": "ctcooper Sports",
                            "channelId": "UCmMdNgSHeXQtNu99t8cK76g",
                            "created": "2015-11-12T05:00:15.000Z",
                            "videoId": "SzmyoTF3cco",
                            "pctLikes": 100,
                            "viewCount": 62,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/SzmyoTF3cco/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:03",
                            "durationMinutes": 1.05,
                            "$$hashKey": "object:5338"
                        }
                    ]
                },
                "Frank George": {
                    "count": 1,
                    "views": 1622,
                    "videos": [
                        {
                            "title": "Nfl Blitz- Hits and Runs(HD)",
                            "channelTitle": "Frank George",
                            "channelId": "UCaLdVXa5N2m55aXMMfB9XmQ",
                            "created": "2013-01-22T02:39:12.000Z",
                            "videoId": "7JFqv2R70gw",
                            "pctLikes": 100,
                            "viewCount": 1622,
                            "likes": 4,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/7JFqv2R70gw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:28",
                            "durationMinutes": 6.466666666666667,
                            "$$hashKey": "object:5291"
                        }
                    ]
                },
                "the Testing Grounds": {
                    "count": 2,
                    "views": 124,
                    "videos": [
                        {
                            "title": "NFL ('15-'16 season) Week 11 Predictions Using Madden 16",
                            "channelTitle": "the Testing Grounds",
                            "channelId": "UCsRpgR6OuA5RIxeGR1C6Ljw",
                            "created": "2015-11-19T16:19:00.000Z",
                            "videoId": "3s28TVRRBWE",
                            "pctLikes": 100,
                            "viewCount": 90,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/3s28TVRRBWE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:14:05",
                            "durationMinutes": 14.083333333333334,
                            "$$hashKey": "object:5330"
                        },
                        {
                            "title": "NFL ('15-'16 season) Week 1 Predictions Using Madden 16 pt 2",
                            "channelTitle": "the Testing Grounds",
                            "channelId": "UCsRpgR6OuA5RIxeGR1C6Ljw",
                            "created": "2015-09-13T05:36:08.000Z",
                            "videoId": "h3JCXaJolVA",
                            "pctLikes": 100,
                            "viewCount": 34,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/h3JCXaJolVA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:56",
                            "durationMinutes": 3.9333333333333336
                        }
                    ]
                },
                "GOVHQ": {
                    "count": 1,
                    "views": 308,
                    "videos": [
                        {
                            "title": "NFL Blitz (1998 Version) Season Mode w/ GOVHQ Part 1 - BONE CRUSHING HITS",
                            "channelTitle": "GOVHQ",
                            "channelId": "UCLRSmskw4uCavlqZUMD_cxg",
                            "created": "2014-09-11T21:00:01.000Z",
                            "videoId": "o_GD55GBiVo",
                            "pctLikes": 100,
                            "viewCount": 308,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/o_GD55GBiVo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:18:53",
                            "durationMinutes": 18.883333333333333,
                            "$$hashKey": "object:5313"
                        }
                    ]
                },
                "Everything About Sport": {
                    "count": 1,
                    "views": 145,
                    "videos": [
                        {
                            "title": "NFL Biggest hits of All Time - New HD!",
                            "channelTitle": "Everything About Sport",
                            "channelId": "UCpUOENNcRajUw_YLKvJHvjw",
                            "created": "2016-03-13T10:11:05.000Z",
                            "videoId": "DolmtuWgqkU",
                            "pctLikes": 100,
                            "viewCount": 145,
                            "likes": 20,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/DolmtuWgqkU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:35",
                            "durationMinutes": 2.5833333333333335,
                            "$$hashKey": "object:5323"
                        }
                    ]
                },
                "Kid Got Game": {
                    "count": 1,
                    "views": 187,
                    "videos": [
                        {
                            "title": "Madden NFL 16 Top Hits & Catches",
                            "channelTitle": "Kid Got Game",
                            "channelId": "UC4km2P25EZOjIWbQhs6sP7g",
                            "created": "2015-09-11T21:26:04.000Z",
                            "videoId": "Z_8Mh7Ef9_I",
                            "pctLikes": 100,
                            "viewCount": 187,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Z_8Mh7Ef9_I/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:28",
                            "durationMinutes": 3.466666666666667,
                            "$$hashKey": "object:5320"
                        }
                    ]
                },
                "SuperGary14": {
                    "count": 1,
                    "views": 1714,
                    "videos": [
                        {
                            "title": "NFL's Biggest Hits",
                            "channelTitle": "SuperGary14",
                            "channelId": "UCuu7KJo8O-UgccZSjNCtx2g",
                            "created": "2010-02-06T23:15:46.000Z",
                            "videoId": "W7FvSi3JNfc",
                            "pctLikes": 100,
                            "viewCount": 1714,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/W7FvSi3JNfc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:56",
                            "durationMinutes": 2.9333333333333336,
                            "$$hashKey": "object:5290"
                        }
                    ]
                },
                "ORIGNALAUSTRALIAN": {
                    "count": 1,
                    "views": 942,
                    "videos": [
                        {
                            "title": "Lets Get It On - SMIF N WESSUN.  NFL BIG HITS TRIBUTE",
                            "channelTitle": "ORIGNALAUSTRALIAN",
                            "channelId": "UC6aS8If9X3yqN-dUYxA5FFQ",
                            "created": "2009-03-29T08:52:32.000Z",
                            "videoId": "F3aoWgZLKlA",
                            "pctLikes": 100,
                            "viewCount": 942,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/F3aoWgZLKlA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:41",
                            "durationMinutes": 3.6833333333333336,
                            "$$hashKey": "object:5298"
                        }
                    ]
                },
                "the gamer": {
                    "count": 1,
                    "views": 88,
                    "videos": [
                        {
                            "title": "NFL/geile Hits und tackels/here comes the boom",
                            "channelTitle": "the gamer",
                            "channelId": "UCr2vM9YHHShohgiojXNDoJg",
                            "created": "2016-01-20T18:36:30.000Z",
                            "videoId": "YAyvc_1P8LY",
                            "pctLikes": 100,
                            "viewCount": 88,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/YAyvc_1P8LY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:51",
                            "durationMinutes": 2.85,
                            "$$hashKey": "object:5331"
                        }
                    ]
                },
                "EZGaming": {
                    "count": 1,
                    "views": 93,
                    "videos": [
                        {
                            "title": "Reaction To SwagFoulNation/NFL Hardest Hits",
                            "channelTitle": "EZGaming",
                            "channelId": "UCLECR_o_0zyxwiBoXvTigFQ",
                            "created": "2016-02-05T01:32:15.000Z",
                            "videoId": "91JkWpsnH6A",
                            "pctLikes": 100,
                            "viewCount": 93,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/91JkWpsnH6A/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:27",
                            "durationMinutes": 6.45,
                            "$$hashKey": "object:5329"
                        }
                    ]
                },
                "allamericansports100": {
                    "count": 1,
                    "views": 1014,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits of 2011-2012",
                            "channelTitle": "allamericansports100",
                            "channelId": "UCBxT7uB6jPYwSHcaxmjCUzg",
                            "created": "2013-05-18T21:21:35.000Z",
                            "videoId": "rZj_dLzSOwU",
                            "pctLikes": 100,
                            "viewCount": 1014,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/rZj_dLzSOwU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:04",
                            "durationMinutes": 4.066666666666666,
                            "$$hashKey": "object:5297"
                        }
                    ]
                },
                "Tristan Williams": {
                    "count": 1,
                    "views": 67,
                    "videos": [
                        {
                            "title": "Top 10 Hardest and Roughest Hits - NFL",
                            "channelTitle": "Tristan Williams",
                            "channelId": "UCwYoMGYDVYq1dZ1RuOxr-Sw",
                            "created": "2015-05-04T01:13:09.000Z",
                            "videoId": "4AoGLfLYzXI",
                            "pctLikes": 100,
                            "viewCount": 67,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/4AoGLfLYzXI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:15",
                            "durationMinutes": 2.25,
                            "$$hashKey": "object:5336"
                        }
                    ]
                },
                "GEONEWSHD": {
                    "count": 1,
                    "views": 931,
                    "videos": [
                        {
                            "title": "NFL hits Aldon Smith hard, gives him a one-year suspension",
                            "channelTitle": "GEONEWSHD",
                            "channelId": "UCtwkKOeruKqpbdfAj-7vNgQ",
                            "created": "2015-11-18T20:24:15.000Z",
                            "videoId": "YT9ql6ysgsQ",
                            "pctLikes": 100,
                            "viewCount": 931,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/YT9ql6ysgsQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:17",
                            "durationMinutes": 0.2833333333333333,
                            "$$hashKey": "object:5299"
                        }
                    ]
                },
                "Turkish American Football": {
                    "count": 1,
                    "views": 692,
                    "videos": [
                        {
                            "title": "NFL Hardest and Amazing Hits 2011-2014",
                            "channelTitle": "Turkish American Football",
                            "channelId": "UCs1ngekjp1rkL7e1hwbLHNw",
                            "created": "2014-04-06T10:18:08.000Z",
                            "videoId": "i6JFPDASIWQ",
                            "pctLikes": 100,
                            "viewCount": 692,
                            "likes": 4,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/i6JFPDASIWQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:34",
                            "durationMinutes": 4.566666666666666,
                            "$$hashKey": "object:5303"
                        }
                    ]
                },
                "JRTrax": {
                    "count": 1,
                    "views": 928,
                    "videos": [
                        {
                            "title": "NFL Card Pack Opening! 2014 Panini Elite! 2014 Panini Prestige! Big Hits!",
                            "channelTitle": "JRTrax",
                            "channelId": "UCOdw8ODaN4xwj0B2_myqryA",
                            "created": "2015-07-20T23:47:47.000Z",
                            "videoId": "BioW6ZC3BpY",
                            "pctLikes": 100,
                            "viewCount": 928,
                            "likes": 23,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/BioW6ZC3BpY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:02",
                            "durationMinutes": 5.033333333333333,
                            "$$hashKey": "object:5300"
                        }
                    ]
                },
                "M-M Gaming videos": {
                    "count": 1,
                    "views": 23,
                    "videos": [
                        {
                            "title": "Madden NFL 16 2 BIG HITS",
                            "channelTitle": "M-M Gaming videos",
                            "channelId": "UCicdCmyayIuB40rg2i9axIw",
                            "created": "2015-12-13T19:00:13.000Z",
                            "videoId": "BWYy0qtOLO4",
                            "pctLikes": 100,
                            "viewCount": 23,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/BWYy0qtOLO4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:35",
                            "durationMinutes": 0.5833333333333334,
                            "$$hashKey": "object:5352"
                        }
                    ]
                },
                "el chingaooo supreme 555": {
                    "count": 1,
                    "views": 2357,
                    "videos": [
                        {
                            "title": "NFL vs Rugby Hits",
                            "channelTitle": "el chingaooo supreme 555",
                            "channelId": "UCyR6EIEes2tzdvHhwr8BI0Q",
                            "created": "2015-03-02T01:25:19.000Z",
                            "videoId": "l3z4vk6wIpQ",
                            "pctLikes": 100,
                            "viewCount": 2357,
                            "likes": 31,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/l3z4vk6wIpQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:08:39",
                            "durationMinutes": 8.65,
                            "$$hashKey": "object:5287"
                        }
                    ]
                },
                "NFLrocks3": {
                    "count": 1,
                    "views": 1397,
                    "videos": [
                        {
                            "title": "NFL BIG HITS",
                            "channelTitle": "NFLrocks3",
                            "channelId": "UCD6dPfKvUYHox1j-ywCvMtQ",
                            "created": "2010-07-24T22:23:04.000Z",
                            "videoId": "-HjL0EycPJY",
                            "pctLikes": 100,
                            "viewCount": 1397,
                            "likes": 11,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/-HjL0EycPJY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:55",
                            "durationMinutes": 4.916666666666667,
                            "$$hashKey": "object:5293"
                        }
                    ]
                },
                "ILLUSTRIOUS ART": {
                    "count": 1,
                    "views": 166,
                    "videos": [
                        {
                            "title": "CAN NEVER GET TIRED OF THESE NFL & COLLEGE HITS",
                            "channelTitle": "ILLUSTRIOUS ART",
                            "channelId": "UC3BeeeoC2d7-psgOIJZhKCg",
                            "created": "2015-08-20T18:00:08.000Z",
                            "videoId": "jKimVElB1MM",
                            "pctLikes": 100,
                            "viewCount": 166,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/jKimVElB1MM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333,
                            "$$hashKey": "object:5322"
                        }
                    ]
                },
                "TomoSports": {
                    "count": 1,
                    "views": 673,
                    "videos": [
                        {
                            "title": "NFL hardest hits: did Mike and Maurkice Pouncey beat up man at club?",
                            "channelTitle": "TomoSports",
                            "channelId": "UCBsLPD0qpkFE2aEKKWfMRWQ",
                            "created": "2014-07-16T14:26:30.000Z",
                            "videoId": "mTqtEtASPxc",
                            "pctLikes": 100,
                            "viewCount": 673,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/mTqtEtASPxc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:12",
                            "durationMinutes": 1.2,
                            "$$hashKey": "object:5304"
                        }
                    ]
                },
                "zezima1892": {
                    "count": 1,
                    "views": 1555,
                    "videos": [
                        {
                            "title": "NFL Pittsburgh Steelers huge hits.",
                            "channelTitle": "zezima1892",
                            "channelId": "UCXpWNGWhsPXFil_pGTqYdUQ",
                            "created": "2010-01-03T16:35:54.000Z",
                            "videoId": "S7iglKemqu4",
                            "pctLikes": 100,
                            "viewCount": 1555,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/S7iglKemqu4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:53",
                            "durationMinutes": 0.8833333333333333,
                            "$$hashKey": "object:5292"
                        }
                    ]
                },
                "SimFBallCritic": {
                    "count": 1,
                    "views": 4067,
                    "videos": [
                        {
                            "title": "Real NFL Footage, Double hits in a football game, Yay or Nay",
                            "channelTitle": "SimFBallCritic",
                            "channelId": "UCfxV3f4XXX_GP2Wm9Z-1B_g",
                            "created": "2010-08-14T06:54:24.000Z",
                            "videoId": "NEe7wXkm5dM",
                            "pctLikes": 100,
                            "viewCount": 4067,
                            "likes": 13,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/NEe7wXkm5dM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:45",
                            "durationMinutes": 0.75,
                            "$$hashKey": "object:5284"
                        }
                    ]
                },
                "Sport Montages": {
                    "count": 1,
                    "views": 180,
                    "videos": [
                        {
                            "title": "NFL Biggest Hits and Plays",
                            "channelTitle": "Sport Montages",
                            "channelId": "UCwoGdOJqM4KZVTApEjlAM4g",
                            "created": "2015-11-09T22:40:09.000Z",
                            "videoId": "grSY-ULZJWU",
                            "pctLikes": 100,
                            "viewCount": 180,
                            "likes": 6,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/grSY-ULZJWU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:10",
                            "durationMinutes": 4.166666666666667,
                            "$$hashKey": "object:5321"
                        }
                    ]
                },
                "jacko5456": {
                    "count": 1,
                    "views": 8228,
                    "videos": [
                        {
                            "title": "Big NFL Hits",
                            "channelTitle": "jacko5456",
                            "channelId": "UCByDnh34Hxh4p-lKnQPMNRA",
                            "created": "2010-11-24T09:55:09.000Z",
                            "videoId": "ZMRmcihFSKU",
                            "pctLikes": 100,
                            "viewCount": 8228,
                            "likes": 26,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ZMRmcihFSKU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:10",
                            "durationMinutes": 7.166666666666667,
                            "$$hashKey": "object:5273"
                        }
                    ]
                },
                "Tobee67": {
                    "count": 1,
                    "views": 507,
                    "videos": [
                        {
                            "title": "hits and tackles form all NFL  AFL  College Teams",
                            "channelTitle": "Tobee67",
                            "channelId": "UCNIew_ROkOqMK1hBFN8zzcw",
                            "created": "2010-06-13T22:01:19.000Z",
                            "videoId": "IS9jYiZlAKQ",
                            "pctLikes": 100,
                            "viewCount": 507,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/IS9jYiZlAKQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:13",
                            "durationMinutes": 3.216666666666667,
                            "$$hashKey": "object:5309"
                        }
                    ]
                },
                "ryan forehand": {
                    "count": 1,
                    "views": 68,
                    "videos": [
                        {
                            "title": "Football's Hardest Hits & Trucks   College & NFL",
                            "channelTitle": "ryan forehand",
                            "channelId": "UC0807xUMYysaHsLWDZrg6fw",
                            "created": "2016-03-01T19:06:34.000Z",
                            "videoId": "GoNEs6XfsOw",
                            "pctLikes": 100,
                            "viewCount": 68,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/GoNEs6XfsOw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:00",
                            "durationMinutes": 4,
                            "$$hashKey": "object:5334"
                        }
                    ]
                },
                "romat13": {
                    "count": 1,
                    "views": 4729,
                    "videos": [
                        {
                            "title": "Nfl's Greatest Hits",
                            "channelTitle": "romat13",
                            "channelId": "UCd97rGmCXk3R0k9Vh71La_w",
                            "created": "2008-04-11T01:59:46.000Z",
                            "videoId": "Z6sibWkBWb4",
                            "pctLikes": 100,
                            "viewCount": 4729,
                            "likes": 9,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Z6sibWkBWb4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:44",
                            "durationMinutes": 2.7333333333333334,
                            "$$hashKey": "object:5280"
                        }
                    ]
                },
                "Optical_310": {
                    "count": 1,
                    "views": 60,
                    "videos": [
                        {
                            "title": "Madden NFL Career Mode Ep. 10 - Quincy Makes Targeted Big Hits! Flynn chokes again!!",
                            "channelTitle": "Optical_310",
                            "channelId": "UCiLX96xotcXDHVHT3it81Hw",
                            "created": "2015-05-13T20:27:51.000Z",
                            "videoId": "AxxZvr5BztY",
                            "pctLikes": 100,
                            "viewCount": 60,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/AxxZvr5BztY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:08:55",
                            "durationMinutes": 8.916666666666666,
                            "$$hashKey": "object:5339"
                        }
                    ]
                },
                "Haron A": {
                    "count": 1,
                    "views": 224,
                    "videos": [
                        {
                            "title": "Ante Up - Hardest NFL Hits (HD)",
                            "channelTitle": "Haron A",
                            "channelId": "UCFFa_Win06rO0zabwAc0mTg",
                            "created": "2016-03-27T21:52:05.000Z",
                            "videoId": "5w8I5amYbC8",
                            "pctLikes": 80,
                            "viewCount": 224,
                            "likes": 4,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/5w8I5amYbC8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:57",
                            "durationMinutes": 3.95,
                            "$$hashKey": "object:5318"
                        }
                    ]
                },
                "Dylan Royse": {
                    "count": 1,
                    "views": 8,
                    "videos": [
                        {
                            "title": "NFL Vines : biggest football hits 2016",
                            "channelTitle": "Dylan Royse",
                            "channelId": "UCIzI7sseXaT-f2Xfmfpfylw",
                            "created": "2016-03-23T01:07:47.000Z",
                            "videoId": "904IeRCjR6w",
                            "pctLikes": 50,
                            "viewCount": 8,
                            "likes": 1,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/904IeRCjR6w/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:21",
                            "durationMinutes": 0.35,
                            "$$hashKey": "object:5362"
                        }
                    ]
                },
                "Teh MC": {
                    "count": 1,
                    "views": 81,
                    "videos": [
                        {
                            "title": "NFL Big Hits Compilation",
                            "channelTitle": "Teh MC",
                            "channelId": "UCULWfQgvCcCYw0Uziy_nRhQ",
                            "created": "2016-03-21T02:04:58.000Z",
                            "videoId": "1HtG4LsZ-BE",
                            "pctLikes": 100,
                            "viewCount": 81,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/1HtG4LsZ-BE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:30",
                            "durationMinutes": 1.5,
                            "$$hashKey": "object:5332"
                        }
                    ]
                },
                "Sports Highlights": {
                    "count": 1,
                    "views": 143,
                    "videos": [
                        {
                            "title": "Biggest Hits in NFL History",
                            "channelTitle": "Sports Highlights",
                            "channelId": "UC-BvsK7EhsQwkWBmumbXdnA",
                            "created": "2016-03-19T23:15:29.000Z",
                            "videoId": "6As-7_mOhxE",
                            "pctLikes": 100,
                            "viewCount": 143,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/6As-7_mOhxE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:47",
                            "durationMinutes": 3.783333333333333,
                            "$$hashKey": "object:5324"
                        }
                    ]
                },
                "noobkill213": {
                    "count": 1,
                    "views": 19047,
                    "videos": [
                        {
                            "title": "NFL Topps 2015 Supreme & Strata Box Breaks!! BIG HITS!!!",
                            "channelTitle": "noobkill213",
                            "channelId": "UCEcTHIdOUWQKMtHzMMILKCQ",
                            "created": "2016-03-16T17:29:06.000Z",
                            "videoId": "0GzjWntmf34",
                            "pctLikes": 93.80165289256198,
                            "viewCount": 19047,
                            "likes": 454,
                            "dislikes": 30,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/0GzjWntmf34/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:30",
                            "durationMinutes": 6.5,
                            "$$hashKey": "object:5263"
                        }
                    ]
                },
                "Andrea Prz": {
                    "count": 1,
                    "views": 13,
                    "videos": [
                        {
                            "title": "NFL IS AMAZING #1 - Big Hits & Big Play",
                            "channelTitle": "Andrea Prz",
                            "channelId": "UC7uGSJWA81wixLDVYM5n5jA",
                            "created": "2016-03-06T18:07:53.000Z",
                            "videoId": "Hy3RxEgfH4A",
                            "pctLikes": 0,
                            "viewCount": 13,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Hy3RxEgfH4A/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:18",
                            "durationMinutes": 3.3,
                            "$$hashKey": "object:5359"
                        }
                    ]
                },
                "松隈一成": {
                    "count": 1,
                    "views": 25,
                    "videos": [
                        {
                            "title": "NFL hardest hits",
                            "channelTitle": "松隈一成",
                            "channelId": "UC3gdcM8Tf0oba0NjOOJd6Vg",
                            "created": "2016-03-04T12:03:01.000Z",
                            "videoId": "-ic0gpg417E",
                            "pctLikes": 0,
                            "viewCount": 25,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/-ic0gpg417E/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:04",
                            "durationMinutes": 4.066666666666666,
                            "$$hashKey": "object:5350"
                        }
                    ]
                },
                "Cricket,Football and Hocky": {
                    "count": 1,
                    "views": 13,
                    "videos": [
                        {
                            "title": "NFL College Football Craziest Plays WOW MOMENTS Hardest Hits 2014 ᴴᴰ ✔",
                            "channelTitle": "Cricket,Football and Hocky",
                            "channelId": "UCagwrv7hU-vrOrNlygaU0hQ",
                            "created": "2016-02-28T17:11:54.000Z",
                            "videoId": "IpbBT7hlI7g",
                            "pctLikes": 0,
                            "viewCount": 13,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/IpbBT7hlI7g/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:57",
                            "durationMinutes": 2.95,
                            "$$hashKey": "object:5360"
                        }
                    ]
                },
                "itsrad 111": {
                    "count": 1,
                    "views": 317,
                    "videos": [
                        {
                            "title": "nfl football hype hits plays run this town",
                            "channelTitle": "itsrad 111",
                            "channelId": "UChMO6XtQAYmqV4FlPeXOvPw",
                            "created": "2016-02-27T11:46:55.000Z",
                            "videoId": "4s0L91zqqsg",
                            "pctLikes": 80,
                            "viewCount": 317,
                            "likes": 4,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/4s0L91zqqsg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:27",
                            "durationMinutes": 1.45,
                            "$$hashKey": "object:5312"
                        }
                    ]
                },
                "Dexter Christopher": {
                    "count": 1,
                    "views": 18,
                    "videos": [
                        {
                            "title": "FOOTBALL VINES COMPILATION: Best Football Vines December 2015 - NFL Vines Big Hits",
                            "channelTitle": "Dexter Christopher",
                            "channelId": "UCJelbAE9RaSDSrzmGXAzPJw",
                            "created": "2016-02-22T08:22:18.000Z",
                            "videoId": "vSS5E4jqW-Y",
                            "pctLikes": 0,
                            "viewCount": 18,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/vSS5E4jqW-Y/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:06",
                            "durationMinutes": 7.1,
                            "$$hashKey": "object:5355"
                        }
                    ]
                },
                "Monkey Channel": {
                    "count": 1,
                    "views": 5,
                    "videos": [
                        {
                            "title": "Big hits NFL football cards",
                            "channelTitle": "Monkey Channel",
                            "channelId": "UC64SwpTppnPXx-_i3iSP5Ng",
                            "created": "2016-02-20T04:59:40.000Z",
                            "videoId": "a97d8OYFzqg",
                            "pctLikes": 0,
                            "viewCount": 5,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/a97d8OYFzqg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:08:40",
                            "durationMinutes": 8.666666666666666,
                            "$$hashKey": "object:5363"
                        }
                    ]
                },
                "ImOKEYish": {
                    "count": 1,
                    "views": 22,
                    "videos": [
                        {
                            "title": "NFL College Football's Biggest Hits and Best Plays Compilation   2015",
                            "channelTitle": "ImOKEYish",
                            "channelId": "UC89_49635ou-4EgvQYpRGzg",
                            "created": "2016-02-19T21:15:23.000Z",
                            "videoId": "sE2Sqds-s4M",
                            "pctLikes": 0,
                            "viewCount": 22,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/sE2Sqds-s4M/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:27",
                            "durationMinutes": 7.45,
                            "$$hashKey": "object:5353"
                        }
                    ]
                },
                "Ian_Donohue": {
                    "count": 1,
                    "views": 13,
                    "videos": [
                        {
                            "title": "Madden NFL 16 hard hits with ian and michael",
                            "channelTitle": "Ian_Donohue",
                            "channelId": "UCoP0yMm62wAYKw2wvQf8qTw",
                            "created": "2016-02-16T18:40:53.000Z",
                            "videoId": "LalsUQqd6Tg",
                            "pctLikes": 0,
                            "viewCount": 13,
                            "likes": 0,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/LalsUQqd6Tg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:14:57",
                            "durationMinutes": 14.95,
                            "$$hashKey": "object:5357"
                        }
                    ]
                },
                "Mike LaRoche": {
                    "count": 1,
                    "views": 17,
                    "videos": [
                        {
                            "title": "Biggest Football Hits Montage!! (NFL/NCAA)",
                            "channelTitle": "Mike LaRoche",
                            "channelId": "UCqVvhDFUTmlPFasJtX8ZE0w",
                            "created": "2016-02-16T15:15:32.000Z",
                            "videoId": "VxRcqfuxADc",
                            "pctLikes": 0,
                            "viewCount": 17,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/VxRcqfuxADc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333,
                            "$$hashKey": "object:5356"
                        }
                    ]
                },
                "Brett Masserant": {
                    "count": 1,
                    "views": 133,
                    "videos": [
                        {
                            "title": "Jalen Schlachter 2016 NFL Draft BIG HITS",
                            "channelTitle": "Brett Masserant",
                            "channelId": "UCdXeGP7QHkA4qaOf3x7SFXw",
                            "created": "2016-02-14T19:47:52.000Z",
                            "videoId": "s0QaXFWJ9YA",
                            "pctLikes": 100,
                            "viewCount": 133,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/s0QaXFWJ9YA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:52",
                            "durationMinutes": 1.8666666666666667,
                            "$$hashKey": "object:5325"
                        }
                    ]
                },
                "NUVO": {
                    "count": 1,
                    "views": 12,
                    "videos": [
                        {
                            "title": "Biggest Nfl Hits",
                            "channelTitle": "NUVO",
                            "channelId": "UC_5OsWL5bq5pdenp5bAPXTQ",
                            "created": "2016-02-14T15:36:13.000Z",
                            "videoId": "949hJn1XJyQ",
                            "pctLikes": 100,
                            "viewCount": 12,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/949hJn1XJyQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:35",
                            "durationMinutes": 5.583333333333333,
                            "$$hashKey": "object:5361"
                        }
                    ]
                },
                "Frank.mp4": {
                    "count": 1,
                    "views": 24,
                    "videos": [
                        {
                            "title": "Craziest NFL Hits Of All Time (Must Watch)",
                            "channelTitle": "Frank.mp4",
                            "channelId": "UCxi5DR5sEO1INaqS6W9y_RA",
                            "created": "2016-02-13T19:00:00.000Z",
                            "videoId": "OsiokLnB0Is",
                            "pctLikes": 66.66666666666666,
                            "viewCount": 24,
                            "likes": 2,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/OsiokLnB0Is/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333,
                            "$$hashKey": "object:5351"
                        }
                    ]
                },
                "SuperBeasting": {
                    "count": 1,
                    "views": 13,
                    "videos": [
                        {
                            "title": "Madden NFL 16 My Career| The White Sean Taylor? | Big Hits=Fumble=Turnovers",
                            "channelTitle": "SuperBeasting",
                            "channelId": "UC28dV41fPYXKaTmTulSr8Cw",
                            "created": "2016-02-11T14:53:04.000Z",
                            "videoId": "iNk66NNvRvw",
                            "pctLikes": 0,
                            "viewCount": 13,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/iNk66NNvRvw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:15:00",
                            "durationMinutes": 15,
                            "$$hashKey": "object:5358"
                        }
                    ]
                },
                "Sick Sports": {
                    "count": 1,
                    "views": 301,
                    "videos": [
                        {
                            "title": "The hardest hits in the NFL 2015-2016 (HD)",
                            "channelTitle": "Sick Sports",
                            "channelId": "UCdlDafoE3JkkSe-Orjm6mhw",
                            "created": "2016-02-09T14:43:28.000Z",
                            "videoId": "_lNU8Y6kPtU",
                            "pctLikes": 90.9090909090909,
                            "viewCount": 301,
                            "likes": 10,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/_lNU8Y6kPtU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:06",
                            "durationMinutes": 1.1,
                            "$$hashKey": "object:5314"
                        }
                    ]
                },
                "Thrill Sports": {
                    "count": 1,
                    "views": 637,
                    "videos": [
                        {
                            "title": "Top NFL Football Hits of 2015-2016 (HD)",
                            "channelTitle": "Thrill Sports",
                            "channelId": "UCj498iOU1400AwEAV1S1m0Q",
                            "created": "2016-02-07T22:08:54.000Z",
                            "videoId": "Lt-hALuJLr4",
                            "pctLikes": 97.67441860465115,
                            "viewCount": 637,
                            "likes": 42,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Lt-hALuJLr4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:52",
                            "durationMinutes": 0.8666666666666667,
                            "$$hashKey": "object:5306"
                        }
                    ]
                },
                "H20 Carlo": {
                    "count": 1,
                    "views": 66,
                    "videos": [
                        {
                            "title": "Nfl Hardest Hits And Trucks 2014/2015",
                            "channelTitle": "H20 Carlo",
                            "channelId": "UC9R-xs0pPMCR0hybFRxHAKw",
                            "created": "2016-02-07T18:40:49.000Z",
                            "videoId": "jLWFsi_SxjA",
                            "pctLikes": 50,
                            "viewCount": 66,
                            "likes": 1,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/jLWFsi_SxjA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:52",
                            "durationMinutes": 2.8666666666666667,
                            "$$hashKey": "object:5337"
                        }
                    ]
                },
                "lucagallenmiller": {
                    "count": 1,
                    "views": 33,
                    "videos": [
                        {
                            "title": "NFL hardest hits #2",
                            "channelTitle": "lucagallenmiller",
                            "channelId": "UCdI6rnY8GBXUFQhTTsAAgmg",
                            "created": "2016-02-07T15:54:17.000Z",
                            "videoId": "ktA5GGH129Y",
                            "pctLikes": 75,
                            "viewCount": 33,
                            "likes": 3,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ktA5GGH129Y/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333,
                            "$$hashKey": "object:5347"
                        }
                    ]
                },
                "Breaking Things": {
                    "count": 1,
                    "views": 234,
                    "videos": [
                        {
                            "title": "Best hits compilation NFL LFL",
                            "channelTitle": "Breaking Things",
                            "channelId": "UCPp6KPykM1kRT26-eCnX2tQ",
                            "created": "2016-02-06T21:06:46.000Z",
                            "videoId": "YCZumj0dGzw",
                            "pctLikes": 100,
                            "viewCount": 234,
                            "likes": 24,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/YCZumj0dGzw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:31",
                            "durationMinutes": 1.5166666666666666,
                            "$$hashKey": "object:5317"
                        }
                    ]
                },
                "Rise NationZz": {
                    "count": 1,
                    "views": 28,
                    "videos": [
                        {
                            "title": "Madden NFL 16 TOP 5 HITS#1",
                            "channelTitle": "Rise NationZz",
                            "channelId": "UC0WWx38O5yRrCYpHiOmV2iQ",
                            "created": "2016-02-06T01:00:13.000Z",
                            "videoId": "rwBK_wHla9E",
                            "pctLikes": 100,
                            "viewCount": 28,
                            "likes": 10,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/rwBK_wHla9E/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:18",
                            "durationMinutes": 1.3,
                            "$$hashKey": "object:5349"
                        }
                    ]
                },
                "The Reel": {
                    "count": 1,
                    "views": 68,
                    "videos": [
                        {
                            "title": "Biggest NFL and College Hits",
                            "channelTitle": "The Reel",
                            "channelId": "UCKZUw8-wbdD-V1mQX9GBDkw",
                            "created": "2016-02-02T02:44:57.000Z",
                            "videoId": "TWg9YbVHpOc",
                            "pctLikes": 100,
                            "viewCount": 68,
                            "likes": 6,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/TWg9YbVHpOc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:50",
                            "durationMinutes": 6.833333333333333,
                            "$$hashKey": "object:5333"
                        }
                    ]
                },
                "HAWPOfficial": {
                    "count": 1,
                    "views": 194570,
                    "videos": [
                        {
                            "title": "NFL Blitz - Hey Ash Whatcha Playin'?",
                            "channelTitle": "HAWPOfficial",
                            "channelId": "UCrQieQckb9Fw9-SD7BdkpjQ",
                            "created": "2015-10-01T19:00:18.000Z",
                            "videoId": "f-IRwNSM1BE",
                            "pctLikes": 98.33147942157953,
                            "viewCount": 194570,
                            "likes": 5304,
                            "dislikes": 90,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/f-IRwNSM1BE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:41",
                            "durationMinutes": 1.6833333333333333,
                            "$$hashKey": "object:5209"
                        }
                    ]
                },
                "B HAVOC": {
                    "count": 1,
                    "views": 187317,
                    "videos": [
                        {
                            "title": "NFL Hardest Tackles (HERE COMES THE BOOM!!)",
                            "channelTitle": "B HAVOC",
                            "channelId": "UCdRPPTKhE7x1VaAZACTNMOQ",
                            "created": "2011-01-23T15:10:24.000Z",
                            "videoId": "nf6HCZDPWak",
                            "pctLikes": 93.73848987108656,
                            "viewCount": 187317,
                            "likes": 509,
                            "dislikes": 34,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/nf6HCZDPWak/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:05",
                            "durationMinutes": 3.0833333333333335,
                            "$$hashKey": "object:5210"
                        }
                    ]
                },
                "FootzStomp": {
                    "count": 1,
                    "views": 181631,
                    "videos": [
                        {
                            "title": "Darrell Reid Monster Hit on Chris Henry 12/30/07",
                            "channelTitle": "FootzStomp",
                            "channelId": "UC3qZtJ3ExqPqSH52GZ0VUNQ",
                            "created": "2014-02-19T14:14:00.000Z",
                            "videoId": "L0_rXN5itlg",
                            "pctLikes": 87.57396449704143,
                            "viewCount": 181631,
                            "likes": 148,
                            "dislikes": 21,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/L0_rXN5itlg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:51",
                            "durationMinutes": 0.85,
                            "$$hashKey": "object:5211"
                        }
                    ]
                },
                "ReyMysterio4Life": {
                    "count": 1,
                    "views": 172251,
                    "videos": [
                        {
                            "title": "Hardest Football Hits (NCAA) (NFL)",
                            "channelTitle": "ReyMysterio4Life",
                            "channelId": "UCw0tN3oMXiC5w9S9WGtiBfw",
                            "created": "2008-11-26T22:48:43.000Z",
                            "videoId": "UGVHLSf1Vcc",
                            "pctLikes": 74.4186046511628,
                            "viewCount": 172251,
                            "likes": 64,
                            "dislikes": 22,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/UGVHLSf1Vcc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:14",
                            "durationMinutes": 3.2333333333333334,
                            "$$hashKey": "object:5212"
                        }
                    ]
                },
                "Michael Chutko": {
                    "count": 1,
                    "views": 165681,
                    "videos": [
                        {
                            "title": "John Lynch Greatest Hits",
                            "channelTitle": "Michael Chutko",
                            "channelId": "UCQd_hctC9_wrFPh8yjsR-Ww",
                            "created": "2012-02-14T17:42:55.000Z",
                            "videoId": "acN4SDoAhds",
                            "pctLikes": 98.3957219251337,
                            "viewCount": 165681,
                            "likes": 368,
                            "dislikes": 6,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/acN4SDoAhds/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:43",
                            "durationMinutes": 2.716666666666667,
                            "$$hashKey": "object:5214"
                        }
                    ]
                },
                "jivaldi": {
                    "count": 1,
                    "views": 141226,
                    "videos": [
                        {
                            "title": "NFL: Oakland Raiders - Defensive Back Hit",
                            "channelTitle": "jivaldi",
                            "channelId": "UCK7FxX4OgalyWQ5g7D0lTVg",
                            "created": "2006-08-28T21:29:33.000Z",
                            "videoId": "E0xMUvGjMKo",
                            "pctLikes": 79.38144329896907,
                            "viewCount": 141226,
                            "likes": 154,
                            "dislikes": 40,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/E0xMUvGjMKo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:10",
                            "durationMinutes": 1.1666666666666667,
                            "$$hashKey": "object:5216"
                        }
                    ]
                },
                "TPSNCompetitive": {
                    "count": 1,
                    "views": 139688,
                    "videos": [
                        {
                            "title": "NFL Hit Of The Day  350lbs Vince Wilfork Hits Donald Jones .!",
                            "channelTitle": "TPSNCompetitive",
                            "channelId": "UCFyBwB3git1m3122P3vMxAQ",
                            "created": "2012-09-30T22:05:25.000Z",
                            "videoId": "zF747Kqx1qg",
                            "pctLikes": 98.33795013850416,
                            "viewCount": 139688,
                            "likes": 355,
                            "dislikes": 6,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/zF747Kqx1qg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:42",
                            "durationMinutes": 0.7,
                            "$$hashKey": "object:5218"
                        }
                    ]
                },
                "IChevChelios": {
                    "count": 1,
                    "views": 134601,
                    "videos": [
                        {
                            "title": "NFL player hits ref!!",
                            "channelTitle": "IChevChelios",
                            "channelId": "UCmYFHfFkx-rd7e5jj45vUCg",
                            "created": "2011-10-30T17:07:05.000Z",
                            "videoId": "xeoh8rFnjR8",
                            "pctLikes": 90.42553191489363,
                            "viewCount": 134601,
                            "likes": 170,
                            "dislikes": 18,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/xeoh8rFnjR8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:21",
                            "durationMinutes": 0.35,
                            "$$hashKey": "object:5219"
                        }
                    ]
                },
                "SourceFed": {
                    "count": 1,
                    "views": 124610,
                    "videos": [
                        {
                            "title": "New Crime Fighting Robot Hits The Streets!",
                            "channelTitle": "SourceFed",
                            "channelId": "UC_gE-kg7JvuwCNlbZ1-shlA",
                            "created": "2013-12-03T00:55:14.000Z",
                            "videoId": "Y81fJ_O_qy0",
                            "pctLikes": 98.58156028368793,
                            "viewCount": 124610,
                            "likes": 5838,
                            "dislikes": 84,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Y81fJ_O_qy0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:54",
                            "durationMinutes": 1.9,
                            "$$hashKey": "object:5220"
                        }
                    ]
                },
                "n64blitz": {
                    "count": 1,
                    "views": 122852,
                    "videos": [
                        {
                            "title": "NFL Blitz 2000 Ridiculous Plays",
                            "channelTitle": "n64blitz",
                            "channelId": "UCw8QaNRA61fT7ahTBzCS_Yw",
                            "created": "2008-03-17T18:34:18.000Z",
                            "videoId": "SSPewc--3yY",
                            "pctLikes": 95.56650246305419,
                            "viewCount": 122852,
                            "likes": 388,
                            "dislikes": 18,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/SSPewc--3yY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:31",
                            "durationMinutes": 3.5166666666666666,
                            "$$hashKey": "object:5222"
                        }
                    ]
                },
                "Corneliu66": {
                    "count": 1,
                    "views": 117610,
                    "videos": [
                        {
                            "title": "NHL Hits 2006-2007",
                            "channelTitle": "Corneliu66",
                            "channelId": "UCVVP7iDDYHuf2EJmxu8y1FQ",
                            "created": "2007-05-15T19:37:26.000Z",
                            "videoId": "fqIrXgzp6UU",
                            "pctLikes": 92.94117647058823,
                            "viewCount": 117610,
                            "likes": 158,
                            "dislikes": 12,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/fqIrXgzp6UU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:50",
                            "durationMinutes": 2.8333333333333335,
                            "$$hashKey": "object:5224"
                        }
                    ]
                },
                "BrocktonEnterprise": {
                    "count": 1,
                    "views": 113868,
                    "videos": [
                        {
                            "title": "Brutal hits in the NFL this season reverberate locally",
                            "channelTitle": "BrocktonEnterprise",
                            "channelId": "UC2nbSmxsIyOITXMtBnRIhpQ",
                            "created": "2007-09-14T11:38:15.000Z",
                            "videoId": "Z4Ru6t6DdN0",
                            "pctLikes": 0,
                            "viewCount": 113868,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Z4Ru6t6DdN0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:38",
                            "durationMinutes": 1.6333333333333333,
                            "$$hashKey": "object:5225"
                        }
                    ]
                },
                "ChatBrowns": {
                    "count": 1,
                    "views": 104638,
                    "videos": [
                        {
                            "title": "NFL's Greatest HIts!",
                            "channelTitle": "ChatBrowns",
                            "channelId": "UCy1EP5tGIrzoIgDdYcLnivQ",
                            "created": "2010-06-18T19:39:52.000Z",
                            "videoId": "xn-byrM8W3w",
                            "pctLikes": 90.86294416243655,
                            "viewCount": 104638,
                            "likes": 179,
                            "dislikes": 18,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/xn-byrM8W3w/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:07",
                            "durationMinutes": 4.116666666666666,
                            "$$hashKey": "object:5226"
                        }
                    ]
                },
                "doublegunsproduction": {
                    "count": 1,
                    "views": 104596,
                    "videos": [
                        {
                            "title": "NFL HARDEST HITS",
                            "channelTitle": "doublegunsproduction",
                            "channelId": "UCoEyoYpruBYUqCQ2JzQobcg",
                            "created": "2010-04-06T18:53:01.000Z",
                            "videoId": "P7GU3kHmaYU",
                            "pctLikes": 63.013698630136986,
                            "viewCount": 104596,
                            "likes": 46,
                            "dislikes": 27,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/P7GU3kHmaYU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:27",
                            "durationMinutes": 4.45,
                            "$$hashKey": "object:5227"
                        }
                    ]
                },
                "tddf33": {
                    "count": 1,
                    "views": 104062,
                    "videos": [
                        {
                            "title": "NFL's Hardest Hits (with decent music) lol",
                            "channelTitle": "tddf33",
                            "channelId": "UC28kCMWAIW5urlVr3k6WLog",
                            "created": "2008-07-16T06:14:37.000Z",
                            "videoId": "q3T6SsYFmto",
                            "pctLikes": 80.51948051948052,
                            "viewCount": 104062,
                            "likes": 62,
                            "dislikes": 15,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/q3T6SsYFmto/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:41",
                            "durationMinutes": 2.6833333333333336,
                            "$$hashKey": "object:5229"
                        }
                    ]
                },
                "Ptwarriors010": {
                    "count": 1,
                    "views": 103954,
                    "videos": [
                        {
                            "title": "NHL and NFL Big Hits",
                            "channelTitle": "Ptwarriors010",
                            "channelId": "UCchVlT02G76vxDXTlIlziZQ",
                            "created": "2007-09-17T23:22:04.000Z",
                            "videoId": "MEzeZ1aNtbA",
                            "pctLikes": 94.85294117647058,
                            "viewCount": 103954,
                            "likes": 129,
                            "dislikes": 7,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/MEzeZ1aNtbA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:51",
                            "durationMinutes": 3.85,
                            "$$hashKey": "object:5230"
                        }
                    ]
                },
                "phatfarm1234567": {
                    "count": 1,
                    "views": 102452,
                    "videos": [
                        {
                            "title": "NFL BIGGEST HITS YOU EVER SEEN",
                            "channelTitle": "phatfarm1234567",
                            "channelId": "UCmQYoEafX3p190UlJrSOk8g",
                            "created": "2008-10-27T13:20:26.000Z",
                            "videoId": "2J8fpaqML5w",
                            "pctLikes": 46.03174603174603,
                            "viewCount": 102452,
                            "likes": 29,
                            "dislikes": 34,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/2J8fpaqML5w/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:34",
                            "durationMinutes": 7.566666666666666,
                            "$$hashKey": "object:5231"
                        }
                    ]
                },
                "evantesp": {
                    "count": 1,
                    "views": 97189,
                    "videos": [
                        {
                            "title": "Hardest Football Hits 2016 ᴴᴰ",
                            "channelTitle": "evantesp",
                            "channelId": "UCVLdl_C9kfllVXK9K817OTA",
                            "created": "2015-12-30T02:02:12.000Z",
                            "videoId": "G9En6NoqfAo",
                            "pctLikes": 92.23744292237443,
                            "viewCount": 97189,
                            "likes": 404,
                            "dislikes": 34,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/G9En6NoqfAo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333,
                            "$$hashKey": "object:5235"
                        }
                    ]
                },
                "byHAITUS": {
                    "count": 1,
                    "views": 94719,
                    "videos": [
                        {
                            "title": "NFL BIGGEST HITS (RECENT)",
                            "channelTitle": "byHAITUS",
                            "channelId": "UCwbQ8TcBXG58KcMGK0-SZ7Q",
                            "created": "2012-10-14T07:20:52.000Z",
                            "videoId": "TCiBUvME3sA",
                            "pctLikes": 91.49659863945578,
                            "viewCount": 94719,
                            "likes": 269,
                            "dislikes": 25,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/TCiBUvME3sA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:58",
                            "durationMinutes": 3.966666666666667,
                            "$$hashKey": "object:5236"
                        }
                    ]
                },
                "James John": {
                    "count": 1,
                    "views": 93047,
                    "videos": [
                        {
                            "title": "Brian Dawkins and Ray Lewis Hits and Highlights",
                            "channelTitle": "James John",
                            "channelId": "UC5A-dLtzWLQaq3UWJ1q22KA",
                            "created": "2011-11-15T01:56:16.000Z",
                            "videoId": "GFl1cRKgIPw",
                            "pctLikes": 96.47887323943662,
                            "viewCount": 93047,
                            "likes": 274,
                            "dislikes": 10,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/GFl1cRKgIPw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:58",
                            "durationMinutes": 4.966666666666667,
                            "$$hashKey": "object:5239"
                        }
                    ]
                },
                "wolle154": {
                    "count": 1,
                    "views": 90698,
                    "videos": [
                        {
                            "title": "Happy Hippo Hits - Im Hippoland",
                            "channelTitle": "wolle154",
                            "channelId": "UCw7MzbiWZ5O2rQOLGnIa21g",
                            "created": "2008-04-27T18:30:46.000Z",
                            "videoId": "nFl-5GHTn_Q",
                            "pctLikes": 93.02325581395348,
                            "viewCount": 90698,
                            "likes": 40,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/nFl-5GHTn_Q/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:52",
                            "durationMinutes": 3.8666666666666667,
                            "$$hashKey": "object:5240"
                        }
                    ]
                },
                "amolb500": {
                    "count": 1,
                    "views": 88745,
                    "videos": [
                        {
                            "title": "NFL BIGGEST HITS 2012-2013",
                            "channelTitle": "amolb500",
                            "channelId": "UCneS_0JO5CNRlvS8cbm1WNg",
                            "created": "2012-06-18T14:17:00.000Z",
                            "videoId": "D9AcukARM5U",
                            "pctLikes": 41.12903225806452,
                            "viewCount": 88745,
                            "likes": 102,
                            "dislikes": 146,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/D9AcukARM5U/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:34",
                            "durationMinutes": 5.566666666666666,
                            "$$hashKey": "object:5241"
                        }
                    ]
                },
                "NOLA KING": {
                    "count": 1,
                    "views": 84891,
                    "videos": [
                        {
                            "title": "BIGGEST N.F.L HITS 2012 - 2013",
                            "channelTitle": "NOLA KING",
                            "channelId": "UC9GHhNHYbFYsRTWNQBoxVCA",
                            "created": "2013-05-25T02:12:41.000Z",
                            "videoId": "5kKvYOpduhc",
                            "pctLikes": 64.81481481481481,
                            "viewCount": 84891,
                            "likes": 140,
                            "dislikes": 76,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/5kKvYOpduhc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:44",
                            "durationMinutes": 3.7333333333333334,
                            "$$hashKey": "object:5242"
                        }
                    ]
                },
                "yyz1335": {
                    "count": 1,
                    "views": 82129,
                    "videos": [
                        {
                            "title": "Sacks from the NFL",
                            "channelTitle": "yyz1335",
                            "channelId": "UCfFxrq7QJjLvIk33Ov8FlsA",
                            "created": "2008-10-13T01:48:17.000Z",
                            "videoId": "Jd6vC4zaFUk",
                            "pctLikes": 76.12903225806451,
                            "viewCount": 82129,
                            "likes": 118,
                            "dislikes": 37,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Jd6vC4zaFUk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:58",
                            "durationMinutes": 2.966666666666667,
                            "$$hashKey": "object:5244"
                        }
                    ]
                },
                "Montage King": {
                    "count": 1,
                    "views": 33031,
                    "videos": [
                        {
                            "title": "Best football hits and fights ever - Here comes the BOOM",
                            "channelTitle": "Montage King",
                            "channelId": "UCMppD7o9-SHCoBvMt75RvlQ",
                            "created": "2013-07-27T23:24:58.000Z",
                            "videoId": "5C3YqnN5QC8",
                            "pctLikes": 92.20779220779221,
                            "viewCount": 33031,
                            "likes": 142,
                            "dislikes": 12,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/5C3YqnN5QC8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:15",
                            "durationMinutes": 4.25,
                            "$$hashKey": "object:5257"
                        }
                    ]
                },
                "xCrEaTiiiOn": {
                    "count": 1,
                    "views": 920,
                    "videos": [
                        {
                            "title": "Best NFL Hits Of All Time",
                            "channelTitle": "xCrEaTiiiOn",
                            "channelId": "UCLcCk92WhTAdiigCe75BZXw",
                            "created": "2012-09-23T05:34:12.000Z",
                            "videoId": "oJvsvs9Ivyk",
                            "pctLikes": 88.88888888888889,
                            "viewCount": 920,
                            "likes": 8,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/oJvsvs9Ivyk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:34",
                            "durationMinutes": 2.5666666666666664,
                            "$$hashKey": "object:5301"
                        }
                    ]
                },
                "staceyman": {
                    "count": 1,
                    "views": 4497,
                    "videos": [
                        {
                            "title": "Best Football HARDEST Hits Sports Vines Compilation 2015 Reaction",
                            "channelTitle": "staceyman",
                            "channelId": "UC5L6bhFi48Oa_5ysNQTlSmQ",
                            "created": "2015-08-29T23:25:35.000Z",
                            "videoId": "TEe-KgEhQfY",
                            "pctLikes": 94.91525423728814,
                            "viewCount": 4497,
                            "likes": 56,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/TEe-KgEhQfY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:03",
                            "durationMinutes": 5.05,
                            "$$hashKey": "object:5281"
                        }
                    ]
                },
                "sports compilation": {
                    "count": 1,
                    "views": 54,
                    "videos": [
                        {
                            "title": "Best American Football Vines - Best NFL Vines - Hits & Tackles - Best New Vines  Sep. 2015 Part 4",
                            "channelTitle": "sports compilation",
                            "channelId": "UCShGzJGAdePF5ku36fJ26qw",
                            "created": "2015-09-18T20:01:04.000Z",
                            "videoId": "HbT9URtEtds",
                            "pctLikes": 0,
                            "viewCount": 54,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/HbT9URtEtds/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:01",
                            "durationMinutes": 3.0166666666666666,
                            "$$hashKey": "object:5341"
                        }
                    ]
                },
                "•RGN• Unreal Highlights HD": {
                    "count": 1,
                    "views": 94,
                    "videos": [
                        {
                            "title": "► BEST/WORST/GREATEST • NFL HITS & TACKLES◄ •2014 - 2015•",
                            "channelTitle": "•RGN• Unreal Highlights HD",
                            "channelId": "UCAfvC5cM0UVsa3dSnc2AOKg",
                            "created": "2015-07-07T17:43:08.000Z",
                            "videoId": "Pzwe_80grSI",
                            "pctLikes": 100,
                            "viewCount": 94,
                            "likes": 13,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Pzwe_80grSI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:58",
                            "durationMinutes": 3.966666666666667,
                            "$$hashKey": "object:5328"
                        }
                    ]
                },
                "Minimum Gamer": {
                    "count": 1,
                    "views": 67,
                    "videos": [
                        {
                            "title": "Best nfl/college hits",
                            "channelTitle": "Minimum Gamer",
                            "channelId": "UC63OHGpNeS2ul-4v1_iX6qQ",
                            "created": "2015-12-15T22:46:06.000Z",
                            "videoId": "-hkAsdxI_jM",
                            "pctLikes": 100,
                            "viewCount": 67,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/-hkAsdxI_jM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333,
                            "$$hashKey": "object:5335"
                        }
                    ]
                },
                "MyBestFurnitureVideo": {
                    "count": 1,
                    "views": 7023,
                    "videos": [
                        {
                            "title": "Best of NFL hits, Best of Saints, Top hardest hits! Get out of my way! Ludacris",
                            "channelTitle": "MyBestFurnitureVideo",
                            "channelId": "UCxPJENcbQAAkC53B0HBKXCQ",
                            "created": "2012-07-02T15:37:29.000Z",
                            "videoId": "EO_RjrmLoNc",
                            "pctLikes": 87.5,
                            "viewCount": 7023,
                            "likes": 28,
                            "dislikes": 4,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/EO_RjrmLoNc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:59",
                            "durationMinutes": 3.9833333333333334,
                            "$$hashKey": "object:5275"
                        }
                    ]
                },
                "Joko Lodang": {
                    "count": 1,
                    "views": 20,
                    "videos": [
                        {
                            "title": "Best American Football Vines Best NFL Vines Hits Tackles Best New Vines May 2015 Part 1",
                            "channelTitle": "Joko Lodang",
                            "channelId": "UCUs4i9zo-N-qGQFJBJwpYcg",
                            "created": "2015-06-24T03:54:51.000Z",
                            "videoId": "UNBZcrioXT8",
                            "pctLikes": 0,
                            "viewCount": 20,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/UNBZcrioXT8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:37",
                            "durationMinutes": 5.616666666666667,
                            "$$hashKey": "object:5354"
                        }
                    ]
                },
                "NFLvinesNFL": {
                    "count": 1,
                    "views": 648,
                    "videos": [
                        {
                            "title": "Best NFL Vines Compilation   Best American Football Vines   NFL Vines Hits   NFL Vines Matchday 13",
                            "channelTitle": "NFLvinesNFL",
                            "channelId": "UCZEpCEgOOz3iyhDBJVdyPJQ",
                            "created": "2015-01-29T04:25:57.000Z",
                            "videoId": "IbrNx6ksuWw",
                            "pctLikes": 83.33333333333334,
                            "viewCount": 648,
                            "likes": 5,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/IbrNx6ksuWw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:01",
                            "durationMinutes": 3.0166666666666666,
                            "$$hashKey": "object:5305"
                        }
                    ]
                },
                "Przemo Thorburn": {
                    "count": 1,
                    "views": 21275,
                    "videos": [
                        {
                            "title": "BEST KNOCKOUT VINES - MMA KO - Taekwondo KO - NFL HITS - KO VINE COMPILATION |+18|",
                            "channelTitle": "Przemo Thorburn",
                            "channelId": "UCuY4i1qqt2cARQHYZMN_oFw",
                            "created": "2015-08-11T23:41:20.000Z",
                            "videoId": "YHm4So48vpQ",
                            "pctLikes": 93.33333333333333,
                            "viewCount": 21275,
                            "likes": 140,
                            "dislikes": 10,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/YHm4So48vpQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:22:54",
                            "durationMinutes": 22.9,
                            "$$hashKey": "object:5262"
                        }
                    ]
                },
                "Marty Caswell MartyTimeTV": {
                    "count": 1,
                    "views": 10843,
                    "videos": [
                        {
                            "title": "Beyonce hits NFL Network Set & Radio Row Explodes",
                            "channelTitle": "Marty Caswell MartyTimeTV",
                            "channelId": "UC5f0V7szPwlwbq5_vAdEZlQ",
                            "created": "2013-02-01T01:16:20.000Z",
                            "videoId": "Zqi_MND6xzU",
                            "pctLikes": 94.33962264150944,
                            "viewCount": 10843,
                            "likes": 50,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Zqi_MND6xzU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:03",
                            "durationMinutes": 4.05,
                            "$$hashKey": "object:5268"
                        }
                    ]
                },
                "street3kings1124": {
                    "count": 1,
                    "views": 2850,
                    "videos": [
                        {
                            "title": "Big hits in NFL street 3 + interceptions, fumbles, broken tackles!",
                            "channelTitle": "street3kings1124",
                            "channelId": "UCjYpzbMfJvm8TP4er95lYuQ",
                            "created": "2008-11-22T22:07:43.000Z",
                            "videoId": "QXngmlQ_VzI",
                            "pctLikes": 71.42857142857143,
                            "viewCount": 2850,
                            "likes": 5,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/QXngmlQ_VzI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:44",
                            "durationMinutes": 1.7333333333333334,
                            "$$hashKey": "object:5285"
                        }
                    ]
                },
                "540flip56": {
                    "count": 1,
                    "views": 9475,
                    "videos": [
                        {
                            "title": "Big football hits NCAA and NFL",
                            "channelTitle": "540flip56",
                            "channelId": "UC27NhvewnP08cJa6IyxP1Hg",
                            "created": "2010-01-07T23:35:06.000Z",
                            "videoId": "DXalgxIbJEk",
                            "pctLikes": 83.33333333333334,
                            "viewCount": 9475,
                            "likes": 5,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/DXalgxIbJEk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:29",
                            "durationMinutes": 3.4833333333333334,
                            "$$hashKey": "object:5269"
                        }
                    ]
                },
                "LilDounney": {
                    "count": 1,
                    "views": 8219,
                    "videos": [
                        {
                            "title": "Big Hits from the 2010 NFL season",
                            "channelTitle": "LilDounney",
                            "channelId": "UCTv68nrIZThqAc7dh9u97yA",
                            "created": "2010-11-28T16:02:34.000Z",
                            "videoId": "p9_qLPizpXg",
                            "pctLikes": 35,
                            "viewCount": 8219,
                            "likes": 7,
                            "dislikes": 13,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/p9_qLPizpXg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:05",
                            "durationMinutes": 3.0833333333333335,
                            "$$hashKey": "object:5274"
                        }
                    ]
                },
                "The Kansas City Public Library": {
                    "count": 1,
                    "views": 205,
                    "videos": [
                        {
                            "title": "Big Hits, Lasting Hurts: Health & Safety in the NFL - December 3, 2013",
                            "channelTitle": "The Kansas City Public Library",
                            "channelId": "UCoPIDBl45-cTvTsiDYi8jxQ",
                            "created": "2013-12-18T14:00:06.000Z",
                            "videoId": "XQUUU614j2g",
                            "pctLikes": 0,
                            "viewCount": 205,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/XQUUU614j2g/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "01:20:17",
                            "durationMinutes": 80.28333333333333,
                            "$$hashKey": "object:5319"
                        }
                    ]
                },
                "TDKNews": {
                    "count": 1,
                    "views": 1098,
                    "videos": [
                        {
                            "title": "Big Football Hits Compilation 2014 NFL",
                            "channelTitle": "TDKNews",
                            "channelId": "UCrKmXL_NLuIYW5I1pWHK74Q",
                            "created": "2014-11-21T06:22:25.000Z",
                            "videoId": "WVvC1SpXtl4",
                            "pctLikes": 80,
                            "viewCount": 1098,
                            "likes": 8,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/WVvC1SpXtl4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:30",
                            "durationMinutes": 2.5,
                            "$$hashKey": "object:5295"
                        }
                    ]
                },
                "Super Athletes": {
                    "count": 1,
                    "views": 121,
                    "videos": [
                        {
                            "title": "Big NFL hits: Super Athlete Special",
                            "channelTitle": "Super Athletes",
                            "channelId": "UCEu0UqH03piwxufBso9qcKw",
                            "created": "2015-11-27T07:26:42.000Z",
                            "videoId": "ze9coVD-qiY",
                            "pctLikes": 0,
                            "viewCount": 121,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ze9coVD-qiY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333,
                            "$$hashKey": "object:5326"
                        }
                    ]
                },
                "T.E. C.H": {
                    "count": 1,
                    "views": 45,
                    "videos": [
                        {
                            "title": "Biggest Sporting Hits of All Time",
                            "channelTitle": "T.E. C.H",
                            "channelId": "UCCWHHD4MpVe9B_9b-Q1IAHA",
                            "created": "2013-07-27T03:02:15.000Z",
                            "videoId": "r8Ev5dhGSYQ",
                            "pctLikes": 0,
                            "viewCount": 45,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/r8Ev5dhGSYQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:53",
                            "durationMinutes": 3.8833333333333333,
                            "$$hashKey": "object:5343"
                        }
                    ]
                },
                "patsfan1228": {
                    "count": 1,
                    "views": 13463,
                    "videos": [
                        {
                            "title": "Biggest NFL and college football hits ever",
                            "channelTitle": "patsfan1228",
                            "channelId": "UC2dHmsC0UuP8yyNk6lDK8SA",
                            "created": "2008-10-11T20:47:40.000Z",
                            "videoId": "xGdpiH_BnaA",
                            "pctLikes": 80,
                            "viewCount": 13463,
                            "likes": 16,
                            "dislikes": 4,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/xGdpiH_BnaA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:09:41",
                            "durationMinutes": 9.683333333333334,
                            "$$hashKey": "object:5265"
                        }
                    ]
                },
                "tricky shots": {
                    "count": 1,
                    "views": 59,
                    "videos": [
                        {
                            "title": "Biggest hits in nfl history with music",
                            "channelTitle": "tricky shots",
                            "channelId": "UCEWPr-vpKuw2CIyamUuC_8A",
                            "created": "2015-12-17T00:24:36.000Z",
                            "videoId": "ZDkg6IevL3w",
                            "pctLikes": 100,
                            "viewCount": 59,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ZDkg6IevL3w/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333,
                            "$$hashKey": "object:5340"
                        }
                    ]
                },
                "thapilla": {
                    "count": 1,
                    "views": 479,
                    "videos": [
                        {
                            "title": "Biggest Football Hits Ever - NFL/NCAA Sports Hit Compilation #1",
                            "channelTitle": "thapilla",
                            "channelId": "UCb5jrcbUc7lV0sNLbZcjp5A",
                            "created": "2016-01-03T05:54:41.000Z",
                            "videoId": "EHEBfkLF1ec",
                            "pctLikes": 95,
                            "viewCount": 479,
                            "likes": 19,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/EHEBfkLF1ec/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:57",
                            "durationMinutes": 2.95,
                            "$$hashKey": "object:5311"
                        }
                    ]
                },
                "Sportz Swaggg": {
                    "count": 1,
                    "views": 53,
                    "videos": [
                        {
                            "title": "Biggest NFL football hits 2014/15",
                            "channelTitle": "Sportz Swaggg",
                            "channelId": "UCJkVUa3GKnZjVajqRBVYZLw",
                            "created": "2015-10-15T03:56:20.000Z",
                            "videoId": "QdBN9VgsGpM",
                            "pctLikes": 100,
                            "viewCount": 53,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/QdBN9VgsGpM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:33",
                            "durationMinutes": 2.55,
                            "$$hashKey": "object:5342"
                        }
                    ]
                },
                "kyto2003": {
                    "count": 1,
                    "views": 42,
                    "videos": [
                        {
                            "title": "Biggest NFL hits",
                            "channelTitle": "kyto2003",
                            "channelId": "UCy-FloI4_XItXjArmqApzAg",
                            "created": "2015-06-14T08:52:19.000Z",
                            "videoId": "DTuDvQoGi-Q",
                            "pctLikes": 0,
                            "viewCount": 42,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/DTuDvQoGi-Q/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:51",
                            "durationMinutes": 0.85,
                            "$$hashKey": "object:5344"
                        }
                    ]
                },
                "Mid Cities TEXANS FOOTBALL 2013": {
                    "count": 1,
                    "views": 12273,
                    "videos": [
                        {
                            "title": "♠ BIGGEST HITS - HUGE HITS QB Blind Side REAL injuries in PEEWEE FOOTBALL!♠",
                            "channelTitle": "Mid Cities TEXANS FOOTBALL 2013",
                            "channelId": "UCgyjtQbzq4v8qhgpP1McbKg",
                            "created": "2014-06-30T16:32:58.000Z",
                            "videoId": "lu9sOmOLPTY",
                            "pctLikes": 71.84466019417476,
                            "viewCount": 12273,
                            "likes": 74,
                            "dislikes": 29,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/lu9sOmOLPTY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:23",
                            "durationMinutes": 3.3833333333333333,
                            "$$hashKey": "object:5267"
                        }
                    ]
                },
                "Alex Hailes": {
                    "count": 1,
                    "views": 68198,
                    "videos": [
                        {
                            "title": "NFL's Biggest Hits, Amazing Touchdowns and Great Celebrations! High Quality",
                            "channelTitle": "Alex Hailes",
                            "channelId": "UCB7fT3fWLQRCc4i1l2JZtGQ",
                            "created": "2010-11-16T22:41:37.000Z",
                            "videoId": "B0wyZ8ady14",
                            "pctLikes": 88.0503144654088,
                            "viewCount": 68198,
                            "likes": 140,
                            "dislikes": 19,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/B0wyZ8ady14/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:09:03",
                            "durationMinutes": 9.05
                        }
                    ]
                },
                "Sports Compilations": {
                    "count": 1,
                    "views": 1237,
                    "videos": [
                        {
                            "title": "Hardest NFL Hits Compilation",
                            "channelTitle": "Sports Compilations",
                            "channelId": "UCiGjJfuHHF-SIAOaXjUZO_g",
                            "created": "2015-06-28T00:12:25.000Z",
                            "videoId": "Mx5LS3Fr310",
                            "pctLikes": 38.46153846153847,
                            "viewCount": 1237,
                            "likes": 10,
                            "dislikes": 16,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Mx5LS3Fr310/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:14",
                            "durationMinutes": 4.233333333333333
                        }
                    ]
                },
                "Stephen Courtney": {
                    "count": 1,
                    "views": 45283,
                    "videos": [
                        {
                            "title": "NFL Hard Hits Brutal Biggest Hardest Rough Illegal Tackles And Injuries",
                            "channelTitle": "Stephen Courtney",
                            "channelId": "UCA2yEuOIbafVv-wJ2OWgDZQ",
                            "created": "2012-04-05T09:55:15.000Z",
                            "videoId": "PG8xWFFjUvI",
                            "pctLikes": 69.23076923076923,
                            "viewCount": 45283,
                            "likes": 90,
                            "dislikes": 40,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/PG8xWFFjUvI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:04",
                            "durationMinutes": 4.066666666666666
                        }
                    ]
                },
                "ProudPlasticPaddy": {
                    "count": 1,
                    "views": 3219,
                    "videos": [
                        {
                            "title": "NHL vs NFL Hits",
                            "channelTitle": "ProudPlasticPaddy",
                            "channelId": "UCzvE2iWwuHguDP9eFNauaNw",
                            "created": "2013-10-18T21:30:51.000Z",
                            "videoId": "WuXnz9iCP0k",
                            "pctLikes": 77.77777777777779,
                            "viewCount": 3219,
                            "likes": 7,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/WuXnz9iCP0k/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:28",
                            "durationMinutes": 4.466666666666667
                        }
                    ]
                },
                "Zhi Bin": {
                    "count": 1,
                    "views": 17894,
                    "videos": [
                        {
                            "title": "Hard Football Hits NFL 2012",
                            "channelTitle": "Zhi Bin",
                            "channelId": "UCy890tSCwqVD39qBiX6rlng",
                            "created": "2013-01-14T08:24:31.000Z",
                            "videoId": "nb9OUfQU6aQ",
                            "pctLikes": 84.0909090909091,
                            "viewCount": 17894,
                            "likes": 37,
                            "dislikes": 7,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/nb9OUfQU6aQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:12",
                            "durationMinutes": 7.2
                        }
                    ]
                },
                "Jose": {
                    "count": 1,
                    "views": 56840,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits",
                            "channelTitle": "Jose",
                            "channelId": "UCKf2qSjC54MfV-AcDe3do4A",
                            "created": "2012-03-25T06:34:19.000Z",
                            "videoId": "H7oqSs4db20",
                            "pctLikes": 92.13973799126637,
                            "viewCount": 56840,
                            "likes": 211,
                            "dislikes": 18,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/H7oqSs4db20/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:45",
                            "durationMinutes": 4.75
                        }
                    ]
                },
                "Florian Cario": {
                    "count": 1,
                    "views": 37458,
                    "videos": [
                        {
                            "title": "NFL and College Football Hits // By FloEditing",
                            "channelTitle": "Florian Cario",
                            "channelId": "UCagRGb8pc6MkGH36j5o6y9A",
                            "created": "2013-08-04T23:36:14.000Z",
                            "videoId": "yUJFjG4bGM8",
                            "pctLikes": 96.58119658119658,
                            "viewCount": 37458,
                            "likes": 226,
                            "dislikes": 8,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/yUJFjG4bGM8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:59",
                            "durationMinutes": 5.983333333333333
                        }
                    ]
                },
                "schacher10": {
                    "count": 1,
                    "views": 255576,
                    "videos": [
                        {
                            "title": "Steve Atwater",
                            "channelTitle": "schacher10",
                            "channelId": "UCEiSXRhlJfW6ih614O1ToEg",
                            "created": "2009-07-13T07:01:23.000Z",
                            "videoId": "sWtSUgLm_Oo",
                            "pctLikes": 98.43971631205673,
                            "viewCount": 255576,
                            "likes": 694,
                            "dislikes": 11,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/sWtSUgLm_Oo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:36",
                            "durationMinutes": 3.6
                        }
                    ]
                },
                "Ray J Montoya": {
                    "count": 1,
                    "views": 4188,
                    "videos": [
                        {
                            "title": "NFL Deadliest Hits - Ft. Avenged Sevenfold's Hail to the king",
                            "channelTitle": "Ray J Montoya",
                            "channelId": "UCCJUXfbQxQf3TRAFRX9HEFQ",
                            "created": "2013-09-12T03:19:37.000Z",
                            "videoId": "QBo00UJ7YIM",
                            "pctLikes": 80,
                            "viewCount": 4188,
                            "likes": 24,
                            "dislikes": 6,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/QBo00UJ7YIM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:24",
                            "durationMinutes": 5.4
                        }
                    ]
                },
                "Afro Vines": {
                    "count": 1,
                    "views": 2540737,
                    "videos": [
                        {
                            "title": "BEST AMERICAN FOOTBALL VINES WITH DROPS 2015",
                            "channelTitle": "Afro Vines",
                            "channelId": "UCNSvQdZOLhTlXHbrsNkPjuA",
                            "created": "2015-01-16T06:11:03.000Z",
                            "videoId": "4eJWIXgChQM",
                            "pctLikes": 95.88771678884319,
                            "viewCount": 2540737,
                            "likes": 10726,
                            "dislikes": 460,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/4eJWIXgChQM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:54",
                            "durationMinutes": 7.9
                        }
                    ]
                },
                "Beat Drop Vines": {
                    "count": 1,
                    "views": 18681624,
                    "videos": [
                        {
                            "title": "Beat Drop VINES Compilation #1",
                            "channelTitle": "Beat Drop Vines",
                            "channelId": "UCYrtgtWm1oEGqb8XVcTM4DA",
                            "created": "2014-11-22T19:44:09.000Z",
                            "videoId": "AJKiQN9W6Oc",
                            "pctLikes": 97.2242907870911,
                            "viewCount": 18681624,
                            "likes": 124030,
                            "dislikes": 3541,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/AJKiQN9W6Oc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:25",
                            "durationMinutes": 5.416666666666667
                        }
                    ]
                },
                "chris182828": {
                    "count": 1,
                    "views": 31533,
                    "videos": [
                        {
                            "title": "NFL HARDEST HITS AND AWESOME MUSIC",
                            "channelTitle": "chris182828",
                            "channelId": "UCQlj0rag62jVUy885S-DhgQ",
                            "created": "2012-07-17T09:24:49.000Z",
                            "videoId": "DIbxM8hZtpA",
                            "pctLikes": 94.18604651162791,
                            "viewCount": 31533,
                            "likes": 81,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/DIbxM8hZtpA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:47",
                            "durationMinutes": 6.783333333333333
                        }
                    ]
                },
                "D-HAM": {
                    "count": 1,
                    "views": 1948,
                    "videos": [
                        {
                            "title": "NFL's Hardest Hits From 2004-2006",
                            "channelTitle": "D-HAM",
                            "channelId": "UCt46D1X1yo0O5-fEy-SU7cw",
                            "created": "2011-12-29T01:49:32.000Z",
                            "videoId": "8QXhTZlpaXk",
                            "pctLikes": 80,
                            "viewCount": 1948,
                            "likes": 8,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/8QXhTZlpaXk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:48",
                            "durationMinutes": 5.8
                        }
                    ]
                },
                "TheInvisibleNinja2": {
                    "count": 1,
                    "views": 57867,
                    "videos": [
                        {
                            "title": "The Biggest NFL hits in History!",
                            "channelTitle": "TheInvisibleNinja2",
                            "channelId": "UCWK_j75V_R4mo1LAQSjHKpQ",
                            "created": "2012-03-18T00:45:37.000Z",
                            "videoId": "V2FMAjWN8Tc",
                            "pctLikes": 94.77124183006535,
                            "viewCount": 57867,
                            "likes": 145,
                            "dislikes": 8,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/V2FMAjWN8Tc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:32",
                            "durationMinutes": 3.533333333333333
                        }
                    ]
                },
                "NOSaintsAllDay504": {
                    "count": 1,
                    "views": 9049,
                    "videos": [
                        {
                            "title": "NFL Football Hits and Highlights",
                            "channelTitle": "NOSaintsAllDay504",
                            "channelId": "UCdIQhsz8R3Y3N0Uwhv0L3DQ",
                            "created": "2010-10-28T21:29:45.000Z",
                            "videoId": "6LmyO_5v3jQ",
                            "pctLikes": 94.73684210526315,
                            "viewCount": 9049,
                            "likes": 18,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/6LmyO_5v3jQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:51",
                            "durationMinutes": 6.85
                        }
                    ]
                },
                "Shem PetitFrere": {
                    "count": 1,
                    "views": 9238,
                    "videos": [
                        {
                            "title": "NFL hardest hits of the 2005-2006 season",
                            "channelTitle": "Shem PetitFrere",
                            "channelId": "UCN7QRTmaTzYTcfUO8HsVpfw",
                            "created": "2009-01-13T14:06:20.000Z",
                            "videoId": "4SSEJlbs0G0",
                            "pctLikes": 70,
                            "viewCount": 9238,
                            "likes": 7,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/4SSEJlbs0G0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:16",
                            "durationMinutes": 5.266666666666667
                        }
                    ]
                },
                "Devo": {
                    "count": 1,
                    "views": 259,
                    "videos": [
                        {
                            "title": "NFL/College Football's Biggest Hits and Best Plays Compilation - 2015 REACTION",
                            "channelTitle": "Devo",
                            "channelId": "UC3sBbVmshr9hPPD1qVp4rXg",
                            "created": "2015-12-23T07:47:33.000Z",
                            "videoId": "OM-wbBp2NoQ",
                            "pctLikes": 77.77777777777779,
                            "viewCount": 259,
                            "likes": 7,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/OM-wbBp2NoQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:08:04",
                            "durationMinutes": 8.066666666666666
                        }
                    ]
                },
                "fansrc.com": {
                    "count": 1,
                    "views": 8227,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits Of All Time!",
                            "channelTitle": "fansrc.com",
                            "channelId": "UCZgyEOdSd9KnIscW8oe5fMg",
                            "created": "2014-12-19T18:00:05.000Z",
                            "videoId": "0c9F-LA-j9Y",
                            "pctLikes": 93.54838709677419,
                            "viewCount": 8227,
                            "likes": 29,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/0c9F-LA-j9Y/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:02",
                            "durationMinutes": 2.033333333333333
                        }
                    ]
                },
                "bronson gt": {
                    "count": 1,
                    "views": 1319,
                    "videos": [
                        {
                            "title": "NFL vs RUGBY BIG HITS!!!  MUST SEE!!!",
                            "channelTitle": "bronson gt",
                            "channelId": "UCLAMZ4U32J448Qs_QxPP7VQ",
                            "created": "2014-05-27T13:58:29.000Z",
                            "videoId": "VciQk3ZPmMk",
                            "pctLikes": 84.61538461538461,
                            "viewCount": 1319,
                            "likes": 11,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/VciQk3ZPmMk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:14",
                            "durationMinutes": 7.233333333333333
                        }
                    ]
                },
                "chandra babu": {
                    "count": 1,
                    "views": 383,
                    "videos": [
                        {
                            "title": "Carter  Low Hits Are The New NFL",
                            "channelTitle": "chandra babu",
                            "channelId": "UCpg8Z242fUdNtXGMq2Xr_gw",
                            "created": "2013-08-21T06:06:43.000Z",
                            "videoId": "2W1nSQaE4lo",
                            "pctLikes": 0,
                            "viewCount": 383,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/2W1nSQaE4lo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:34",
                            "durationMinutes": 2.5666666666666664
                        }
                    ]
                },
                "Nflopinion": {
                    "count": 1,
                    "views": 12219,
                    "videos": [
                        {
                            "title": "Nfl Hardest Hits 2007-2010",
                            "channelTitle": "Nflopinion",
                            "channelId": "UCGURTRLU9H0SFgAVs6ul44A",
                            "created": "2012-03-01T00:10:39.000Z",
                            "videoId": "Y5tDqEKbjxI",
                            "pctLikes": 86.48648648648648,
                            "viewCount": 12219,
                            "likes": 32,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Y5tDqEKbjxI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:44",
                            "durationMinutes": 2.7333333333333334
                        }
                    ]
                },
                "Joshua Mavin": {
                    "count": 1,
                    "views": 12110,
                    "videos": [
                        {
                            "title": "NFL Funny Hard Hit Fails",
                            "channelTitle": "Joshua Mavin",
                            "channelId": "UCUUiVnu0PC9rcJKdvYp7XqQ",
                            "created": "2012-05-30T09:42:48.000Z",
                            "videoId": "5-B3uXIgtqU",
                            "pctLikes": 81.48148148148148,
                            "viewCount": 12110,
                            "likes": 22,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/5-B3uXIgtqU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:21",
                            "durationMinutes": 5.35
                        }
                    ]
                },
                "xxxKossixxx": {
                    "count": 2,
                    "views": 82062,
                    "videos": [
                        {
                            "title": "NFL Hard Hits Brutal Revolution 2",
                            "channelTitle": "xxxKossixxx",
                            "channelId": "UCMOby_1dz9KODr7AKZOV8mw",
                            "created": "2013-12-18T20:21:42.000Z",
                            "videoId": "mkEqPDaizkg",
                            "pctLikes": 87.03703703703704,
                            "viewCount": 11267,
                            "likes": 47,
                            "dislikes": 7,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/mkEqPDaizkg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:05",
                            "durationMinutes": 4.083333333333333
                        },
                        {
                            "title": "NFL - Hardest hits [HD]",
                            "channelTitle": "xxxKossixxx",
                            "channelId": "UCMOby_1dz9KODr7AKZOV8mw",
                            "created": "2012-03-14T21:05:07.000Z",
                            "videoId": "YSWxchQH2Ms",
                            "pctLikes": 95.31914893617022,
                            "viewCount": 70795,
                            "likes": 224,
                            "dislikes": 11,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/YSWxchQH2Ms/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:19",
                            "durationMinutes": 3.3166666666666664
                        }
                    ]
                },
                "jeff nunez": {
                    "count": 1,
                    "views": 20613,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits Ever 2009-2010",
                            "channelTitle": "jeff nunez",
                            "channelId": "UCb9JFNdtHMXjiwMb0gqQEbA",
                            "created": "2011-08-13T00:48:32.000Z",
                            "videoId": "kL46vdLkF4I",
                            "pctLikes": 100,
                            "viewCount": 20613,
                            "likes": 48,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/kL46vdLkF4I/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:09",
                            "durationMinutes": 7.15
                        }
                    ]
                },
                "brunodir": {
                    "count": 1,
                    "views": 72535,
                    "videos": [
                        {
                            "title": "HARDEST TACKLES AND FOOTBALL HITS   NFL   COLLEGE",
                            "channelTitle": "brunodir",
                            "channelId": "UCNXO_0S-ZxVt3UQt_8M6LgQ",
                            "created": "2013-06-28T02:46:10.000Z",
                            "videoId": "ZWw42G4073A",
                            "pctLikes": 92.7007299270073,
                            "viewCount": 72535,
                            "likes": 254,
                            "dislikes": 20,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ZWw42G4073A/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:32",
                            "durationMinutes": 6.533333333333333
                        }
                    ]
                },
                "Dizzyspiral21": {
                    "count": 1,
                    "views": 1691,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits",
                            "channelTitle": "Dizzyspiral21",
                            "channelId": "UCLXwui72ixcI_onSqZiTHtA",
                            "created": "2015-11-29T23:29:18.000Z",
                            "videoId": "wcPQtjVkB6E",
                            "pctLikes": 80,
                            "viewCount": 1691,
                            "likes": 4,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/wcPQtjVkB6E/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:05",
                            "durationMinutes": 4.083333333333333
                        }
                    ]
                },
                "The Bearded Mohawk": {
                    "count": 1,
                    "views": 787,
                    "videos": [
                        {
                            "title": "NFL Big Hits and Fights",
                            "channelTitle": "The Bearded Mohawk",
                            "channelId": "UCxJzf5tVnbIb2JAQS3nIH2Q",
                            "created": "2015-07-22T23:51:26.000Z",
                            "videoId": "MH3n6N9Bg4A",
                            "pctLikes": 80,
                            "viewCount": 787,
                            "likes": 8,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/MH3n6N9Bg4A/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:09",
                            "durationMinutes": 3.15
                        }
                    ]
                },
                "Bill McCune": {
                    "count": 1,
                    "views": 9499,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits Mix - Till I Collapse",
                            "channelTitle": "Bill McCune",
                            "channelId": "UCbHEP5qOGoaht1NHvwWgSnw",
                            "created": "2013-09-22T03:16:38.000Z",
                            "videoId": "qmqtgCd3mD8",
                            "pctLikes": 96.96969696969697,
                            "viewCount": 9499,
                            "likes": 32,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/qmqtgCd3mD8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:55",
                            "durationMinutes": 1.9166666666666665
                        }
                    ]
                },
                "LI_YANKEEKING": {
                    "count": 1,
                    "views": 71,
                    "videos": [
                        {
                            "title": "OUCH!!!! NFL HARD HITS",
                            "channelTitle": "LI_YANKEEKING",
                            "channelId": "UC7B7IQ2B8db3uKr_1J10Q8g",
                            "created": "2015-09-30T14:03:36.000Z",
                            "videoId": "XmMlJeuSzpI",
                            "pctLikes": 100,
                            "viewCount": 71,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/XmMlJeuSzpI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:56",
                            "durationMinutes": 3.9333333333333336
                        }
                    ]
                },
                "Skiji": {
                    "count": 1,
                    "views": 1982,
                    "videos": [
                        {
                            "title": "Travis Kelce Grabs 15 Yard TD & 'Hits the Quan'!   Bills vs  Chiefs   NFL",
                            "channelTitle": "Skiji",
                            "channelId": "UCZtdHWzbV7hyghFxUZ9Q3XQ",
                            "created": "2015-12-30T00:23:40.000Z",
                            "videoId": "yJmTJAbb1iw",
                            "pctLikes": 100,
                            "viewCount": 1982,
                            "likes": 9,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/yJmTJAbb1iw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:09",
                            "durationMinutes": 0.15
                        }
                    ]
                },
                "Vivid Sports": {
                    "count": 1,
                    "views": 76,
                    "videos": [
                        {
                            "title": "NFL/COLLEGE BIGGEST HITS",
                            "channelTitle": "Vivid Sports",
                            "channelId": "UCVoBYCZ__xK0oofeFE1oWJA",
                            "created": "2015-11-03T05:55:49.000Z",
                            "videoId": "E8Dd-3Qh3SA",
                            "pctLikes": 100,
                            "viewCount": 76,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/E8Dd-3Qh3SA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:19",
                            "durationMinutes": 1.3166666666666667
                        }
                    ]
                },
                "esterni90": {
                    "count": 1,
                    "views": 1610,
                    "videos": [
                        {
                            "title": "NFL's Hardest Hits.mp4",
                            "channelTitle": "esterni90",
                            "channelId": "UCY2wY6KEoYnRPsZMtm_8I8g",
                            "created": "2012-03-30T20:04:17.000Z",
                            "videoId": "L5byMosgTQM",
                            "pctLikes": 100,
                            "viewCount": 1610,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/L5byMosgTQM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:07:10",
                            "durationMinutes": 7.166666666666667
                        }
                    ]
                },
                "NFL Media": {
                    "count": 1,
                    "views": 267,
                    "videos": [
                        {
                            "title": "Pittsburgh Steelers Big Hits",
                            "channelTitle": "NFL Media",
                            "channelId": "UCISrM3_QYZF0IHlgPeHZtGA",
                            "created": "2015-02-01T04:11:55.000Z",
                            "videoId": "wuW1QwkP5tY",
                            "pctLikes": 100,
                            "viewCount": 267,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/wuW1QwkP5tY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:40",
                            "durationMinutes": 3.6666666666666665
                        }
                    ]
                },
                "InspirationZer0": {
                    "count": 1,
                    "views": 1557,
                    "videos": [
                        {
                            "title": "The Endzone - Big Hits & Big Plays - NFL/NCAA",
                            "channelTitle": "InspirationZer0",
                            "channelId": "UCMPFk59Ju4srzg7syu14zNg",
                            "created": "2010-09-25T03:05:55.000Z",
                            "videoId": "Wz3mN-TehA4",
                            "pctLikes": 100,
                            "viewCount": 1557,
                            "likes": 14,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Wz3mN-TehA4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:28",
                            "durationMinutes": 3.466666666666667
                        }
                    ]
                },
                "iTz T4RBY": {
                    "count": 1,
                    "views": 77,
                    "videos": [
                        {
                            "title": "Madden NFL Hard Hits",
                            "channelTitle": "iTz T4RBY",
                            "channelId": "UCuVaYWr5BQHQk6D5IbRu1Fw",
                            "created": "2015-10-10T05:32:57.000Z",
                            "videoId": "CQ77AjHuVtA",
                            "pctLikes": 100,
                            "viewCount": 77,
                            "likes": 8,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/CQ77AjHuVtA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:58",
                            "durationMinutes": 0.9666666666666667
                        }
                    ]
                },
                "nadirangel": {
                    "count": 1,
                    "views": 6523,
                    "videos": [
                        {
                            "title": "One minute of Nfl big hits.",
                            "channelTitle": "nadirangel",
                            "channelId": "UCp25FsCn3AR1MUQiMO3xmDA",
                            "created": "2009-03-31T12:42:28.000Z",
                            "videoId": "90zxaEUx_OM",
                            "pctLikes": 100,
                            "viewCount": 6523,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/90zxaEUx_OM/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:27",
                            "durationMinutes": 1.45
                        }
                    ]
                },
                "Darren Hassler Hassler": {
                    "count": 1,
                    "views": 252,
                    "videos": [
                        {
                            "title": "Huge CFL NFL Hits (Dum Dee Dum)",
                            "channelTitle": "Darren Hassler Hassler",
                            "channelId": "UC9-_WS79OVl-vx37o_VOEsA",
                            "created": "2015-11-08T00:00:15.000Z",
                            "videoId": "tGMjjFnZgYY",
                            "pctLikes": 100,
                            "viewCount": 252,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/tGMjjFnZgYY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:41",
                            "durationMinutes": 1.6833333333333333
                        }
                    ]
                },
                "Antonio Garcia": {
                    "count": 1,
                    "views": 1006,
                    "videos": [
                        {
                            "title": "NFL Greatest Hits 2",
                            "channelTitle": "Antonio Garcia",
                            "channelId": "UCW629CtsDJaeFyr50PFfMaw",
                            "created": "2011-11-02T05:37:41.000Z",
                            "videoId": "PFacy8tyJVk",
                            "pctLikes": 100,
                            "viewCount": 1006,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/PFacy8tyJVk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:15",
                            "durationMinutes": 6.25
                        }
                    ]
                },
                "jackgator43": {
                    "count": 1,
                    "views": 1619,
                    "videos": [
                        {
                            "title": "Fear: NFL Biggest Hits, Plays, and Speeches (part 2/4)",
                            "channelTitle": "jackgator43",
                            "channelId": "UCGfEzqcGX6CZeER8uNzSpaA",
                            "created": "2012-07-07T18:51:37.000Z",
                            "videoId": "8gISHV3Z08I",
                            "pctLikes": 100,
                            "viewCount": 1619,
                            "likes": 9,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/8gISHV3Z08I/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:50",
                            "durationMinutes": 4.833333333333333
                        }
                    ]
                },
                "YamchaTheDestroyer": {
                    "count": 7,
                    "views": 2551,
                    "videos": [
                        {
                            "title": "ESPN NFL 2K5 - Big Hits #4",
                            "channelTitle": "YamchaTheDestroyer",
                            "channelId": "UC845A1Gd_-R75_hzeHhsKtg",
                            "created": "2010-07-31T17:02:06.000Z",
                            "videoId": "-Ze53xIkyzA",
                            "pctLikes": 100,
                            "viewCount": 454,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/-Ze53xIkyzA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:10",
                            "durationMinutes": 0.16666666666666666
                        },
                        {
                            "title": "ESPN NFL 2K 5 - Big Hits # 24",
                            "channelTitle": "YamchaTheDestroyer",
                            "channelId": "UC845A1Gd_-R75_hzeHhsKtg",
                            "created": "2012-07-01T17:50:16.000Z",
                            "videoId": "x1VR57JGSoE",
                            "pctLikes": 0,
                            "viewCount": 444,
                            "likes": 0,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/x1VR57JGSoE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:14",
                            "durationMinutes": 0.23333333333333334
                        },
                        {
                            "title": "ESPN NFL 2K5 - Big Hits #13",
                            "channelTitle": "YamchaTheDestroyer",
                            "channelId": "UC845A1Gd_-R75_hzeHhsKtg",
                            "created": "2011-01-20T01:06:40.000Z",
                            "videoId": "xfRK3Gdi6_s",
                            "pctLikes": 0,
                            "viewCount": 137,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/xfRK3Gdi6_s/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:16",
                            "durationMinutes": 0.26666666666666666
                        },
                        {
                            "title": "ESPN NFL 2K5 - Big Hits # 23",
                            "channelTitle": "YamchaTheDestroyer",
                            "channelId": "UC845A1Gd_-R75_hzeHhsKtg",
                            "created": "2012-07-01T17:45:54.000Z",
                            "videoId": "XalCarFJYps",
                            "pctLikes": 50,
                            "viewCount": 538,
                            "likes": 1,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/XalCarFJYps/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:28",
                            "durationMinutes": 0.4666666666666667
                        },
                        {
                            "title": "ESPN NFL 2K5 - Big Hits #2",
                            "channelTitle": "YamchaTheDestroyer",
                            "channelId": "UC845A1Gd_-R75_hzeHhsKtg",
                            "created": "2010-07-25T13:19:19.000Z",
                            "videoId": "Xm7yKYmY3H4",
                            "pctLikes": 50,
                            "viewCount": 657,
                            "likes": 1,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Xm7yKYmY3H4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:06",
                            "durationMinutes": 0.1
                        },
                        {
                            "title": "ESPN NFL 2K5 - Big Hits # 20",
                            "channelTitle": "YamchaTheDestroyer",
                            "channelId": "UC845A1Gd_-R75_hzeHhsKtg",
                            "created": "2012-02-25T22:58:46.000Z",
                            "videoId": "6lhTAwgMzx8",
                            "pctLikes": 0,
                            "viewCount": 147,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/6lhTAwgMzx8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:25",
                            "durationMinutes": 0.4166666666666667
                        },
                        {
                            "title": "ESPN NFL 2K5 - Big Hits # 22",
                            "channelTitle": "YamchaTheDestroyer",
                            "channelId": "UC845A1Gd_-R75_hzeHhsKtg",
                            "created": "2012-07-01T17:39:00.000Z",
                            "videoId": "eNRzdy4m0Vw",
                            "pctLikes": 100,
                            "viewCount": 174,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/eNRzdy4m0Vw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:11",
                            "durationMinutes": 0.18333333333333332
                        }
                    ]
                },
                "Jorge Ramirez": {
                    "count": 1,
                    "views": 387,
                    "videos": [
                        {
                            "title": "NFL Greatest Hits",
                            "channelTitle": "Jorge Ramirez",
                            "channelId": "UCyqSotW-rVHIyVX9DAbOVAg",
                            "created": "2008-10-03T01:51:30.000Z",
                            "videoId": "Ps0hqn6KLYw",
                            "pctLikes": 100,
                            "viewCount": 387,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Ps0hqn6KLYw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:13",
                            "durationMinutes": 2.216666666666667
                        }
                    ]
                },
                "NFL Big Hits & Humor": {
                    "count": 1,
                    "views": 1294,
                    "videos": [
                        {
                            "title": "NFL   Big Plays and Catches  2013 HD",
                            "channelTitle": "NFL Big Hits & Humor",
                            "channelId": "UCTIcwBskN0Q39wQqiSBa5ug",
                            "created": "2014-01-14T16:50:51.000Z",
                            "videoId": "QZx-BJqaML4",
                            "pctLikes": 100,
                            "viewCount": 1294,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/QZx-BJqaML4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:46",
                            "durationMinutes": 2.7666666666666666
                        }
                    ]
                },
                "Henrique Machado": {
                    "count": 1,
                    "views": 1154,
                    "videos": [
                        {
                            "title": "NFL Big Hits and Barbarism",
                            "channelTitle": "Henrique Machado",
                            "channelId": "UCfN64DInxg0C25NEoHaYdCw",
                            "created": "2012-03-15T18:20:48.000Z",
                            "videoId": "4GkmQ4ypzLA",
                            "pctLikes": 100,
                            "viewCount": 1154,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/4GkmQ4ypzLA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:35",
                            "durationMinutes": 6.583333333333333
                        }
                    ]
                },
                "wochit Entertainment": {
                    "count": 2,
                    "views": 7743,
                    "videos": [
                        {
                            "title": "Will Smith Film 'Concussion' Hits The NFL Hard",
                            "channelTitle": "wochit Entertainment",
                            "channelId": "UCfkpM3RuyUHqY4nRlP-egNA",
                            "created": "2015-11-25T21:34:35.000Z",
                            "videoId": "XdPgtMPvtp8",
                            "pctLikes": 100,
                            "viewCount": 7589,
                            "likes": 11,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/XdPgtMPvtp8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:10",
                            "durationMinutes": 1.1666666666666667
                        },
                        {
                            "title": "TV Ratings: NFL-Delayed 'Saturday Night Live' Hits Two-Year High With Younger Viewers",
                            "channelTitle": "wochit Entertainment",
                            "channelId": "UCfkpM3RuyUHqY4nRlP-egNA",
                            "created": "2016-01-17T21:59:36.000Z",
                            "videoId": "La7oydtci5Y",
                            "pctLikes": 66.66666666666666,
                            "viewCount": 154,
                            "likes": 2,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/La7oydtci5Y/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:35",
                            "durationMinutes": 0.5833333333333334
                        }
                    ]
                },
                "Adrian Gutierrez": {
                    "count": 1,
                    "views": 158,
                    "videos": [
                        {
                            "title": "NFL hits (pee wee)",
                            "channelTitle": "Adrian Gutierrez",
                            "channelId": "UCUa1i-ehDKbkpNvtplSAnvw",
                            "created": "2014-09-04T01:20:02.000Z",
                            "videoId": "Uo631a6g_Ec",
                            "pctLikes": 100,
                            "viewCount": 158,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Uo631a6g_Ec/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:25",
                            "durationMinutes": 1.4166666666666667
                        }
                    ]
                },
                "GenericLuchador": {
                    "count": 1,
                    "views": 60,
                    "videos": [
                        {
                            "title": "Nice NFL Platinum and NFL Topps Chrome Hits and WWE Dog Tags",
                            "channelTitle": "GenericLuchador",
                            "channelId": "UC_5vvGBchiIzg-ZhXr1e7ng",
                            "created": "2015-03-25T01:22:45.000Z",
                            "videoId": "qM_pyDhOxOU",
                            "pctLikes": 100,
                            "viewCount": 60,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/qM_pyDhOxOU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:10:56",
                            "durationMinutes": 10.933333333333334
                        }
                    ]
                },
                "Jordan Thompson": {
                    "count": 1,
                    "views": 833,
                    "videos": [
                        {
                            "title": "Jordan Thompson 2013 NFL Draft Prospect: Big Hits",
                            "channelTitle": "Jordan Thompson",
                            "channelId": "UC0mWhj1l-uYI-vCH2nn_BWw",
                            "created": "2012-12-17T21:57:58.000Z",
                            "videoId": "BrqKhaQYJdw",
                            "pctLikes": 100,
                            "viewCount": 833,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/BrqKhaQYJdw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:25",
                            "durationMinutes": 4.416666666666667
                        }
                    ]
                },
                "BBCMentalo": {
                    "count": 1,
                    "views": 16651,
                    "videos": [
                        {
                            "title": "NFL hardest hits and tackles 2006-2008 Video  - BBCMentalo",
                            "channelTitle": "BBCMentalo",
                            "channelId": "UCcL_KRMz_mwo2mx9m6VXBmA",
                            "created": "2010-02-15T15:04:21.000Z",
                            "videoId": "Jm__iVfF6A4",
                            "pctLikes": 100,
                            "viewCount": 16651,
                            "likes": 31,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Jm__iVfF6A4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:08:00",
                            "durationMinutes": 8
                        }
                    ]
                },
                "EveryThingIsSports": {
                    "count": 1,
                    "views": 157,
                    "videos": [
                        {
                            "title": "NFL Big Hits (Put On)",
                            "channelTitle": "EveryThingIsSports",
                            "channelId": "UCjYStAm1k33v-bQDFoP3pmQ",
                            "created": "2010-11-22T00:42:00.000Z",
                            "videoId": "WPEfgiyeCZo",
                            "pctLikes": 100,
                            "viewCount": 157,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/WPEfgiyeCZo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:20",
                            "durationMinutes": 5.333333333333333
                        }
                    ]
                },
                "Yojimboi12": {
                    "count": 1,
                    "views": 683,
                    "videos": [
                        {
                            "title": "football hits nfl/college",
                            "channelTitle": "Yojimboi12",
                            "channelId": "UC43p9UBk04NpsEgFh9yl-4g",
                            "created": "2011-04-04T08:07:50.000Z",
                            "videoId": "LzJkoLSvIFE",
                            "pctLikes": 100,
                            "viewCount": 683,
                            "likes": 5,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/LzJkoLSvIFE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:02",
                            "durationMinutes": 2.033333333333333
                        }
                    ]
                },
                "vandre39": {
                    "count": 1,
                    "views": 1667,
                    "videos": [
                        {
                            "title": "NFL Painful Hits",
                            "channelTitle": "vandre39",
                            "channelId": "UC3gHSmkImPrAYnhsKaC3Qsg",
                            "created": "2009-09-02T22:47:50.000Z",
                            "videoId": "rZoXm94poro",
                            "pctLikes": 100,
                            "viewCount": 1667,
                            "likes": 3,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/rZoXm94poro/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:33",
                            "durationMinutes": 2.55
                        }
                    ]
                },
                "Jo Honcho": {
                    "count": 1,
                    "views": 167,
                    "videos": [
                        {
                            "title": "Peewee, Highschool, College, Lingerie and NFL Hardest Football Hits",
                            "channelTitle": "Jo Honcho",
                            "channelId": "UCwjjcAedjrz9_oYDRu7TyxA",
                            "created": "2016-01-02T09:31:09.000Z",
                            "videoId": "vw2ja5t4eFE",
                            "pctLikes": 100,
                            "viewCount": 167,
                            "likes": 2,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/vw2ja5t4eFE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:45",
                            "durationMinutes": 4.75
                        }
                    ]
                },
                "[V] Hits": {
                    "count": 1,
                    "views": 8,
                    "videos": [
                        {
                            "title": "Madden NFL 16 Review",
                            "channelTitle": "[V] Hits",
                            "channelId": "UCsMGQJmqHZqeWzBCcHjQYpQ",
                            "created": "2016-01-19T04:17:33.000Z",
                            "videoId": "dUCffp7yUFY",
                            "pctLikes": 0,
                            "viewCount": 8,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/dUCffp7yUFY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:31",
                            "durationMinutes": 3.5166666666666666
                        }
                    ]
                },
                "Karl Daniels": {
                    "count": 1,
                    "views": 12,
                    "videos": [
                        {
                            "title": "Madden NFL 16 big hits all day",
                            "channelTitle": "Karl Daniels",
                            "channelId": "UCkhDoF0lXByZAU_Dr0CquNw",
                            "created": "2016-01-05T08:46:25.000Z",
                            "videoId": "Ah_6qY_XuKs",
                            "pctLikes": 0,
                            "viewCount": 12,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Ah_6qY_XuKs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:01",
                            "durationMinutes": 1.0166666666666666
                        }
                    ]
                },
                "Curtis Troll": {
                    "count": 1,
                    "views": 84,
                    "videos": [
                        {
                            "title": "NFL vs Rugby Hits|| Biggest hits ever!|| original video",
                            "channelTitle": "Curtis Troll",
                            "channelId": "UC1RxOlBzEvYtCSNpCVlGE_Q",
                            "created": "2015-12-23T15:56:58.000Z",
                            "videoId": "kqK0GCUrJOQ",
                            "pctLikes": 0,
                            "viewCount": 84,
                            "likes": 0,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/kqK0GCUrJOQ/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:09:10",
                            "durationMinutes": 9.166666666666666
                        }
                    ]
                },
                "Billbert33": {
                    "count": 1,
                    "views": 157,
                    "videos": [
                        {
                            "title": "NFL Big Hits",
                            "channelTitle": "Billbert33",
                            "channelId": "UCVefe33cd3cLE8VY_918QJw",
                            "created": "2015-12-11T21:56:13.000Z",
                            "videoId": "vbv73roWXT0",
                            "pctLikes": 91.66666666666666,
                            "viewCount": 157,
                            "likes": 11,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/vbv73roWXT0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:56",
                            "durationMinutes": 3.9333333333333336
                        }
                    ]
                },
                "BabaSport": {
                    "count": 1,
                    "views": 208,
                    "videos": [
                        {
                            "title": "Hard Count  NFL MVP race heats up, hot quarterbacks & week 13 s best hits",
                            "channelTitle": "BabaSport",
                            "channelId": "UCStcyXoKmapeSV94OLVaTig",
                            "created": "2015-12-08T11:30:31.000Z",
                            "videoId": "veGPA_dGLdk",
                            "pctLikes": 0,
                            "viewCount": 208,
                            "likes": 0,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/veGPA_dGLdk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:53",
                            "durationMinutes": 5.883333333333333
                        }
                    ]
                },
                "The Highlight Reel": {
                    "count": 1,
                    "views": 228,
                    "videos": [
                        {
                            "title": "NFL | College Football | Hardest Hits",
                            "channelTitle": "The Highlight Reel",
                            "channelId": "UCl0lYjg-Gpisjky_BpmuWpg",
                            "created": "2015-12-03T05:34:58.000Z",
                            "videoId": "lHGqhRkAUps",
                            "pctLikes": 100,
                            "viewCount": 228,
                            "likes": 7,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/lHGqhRkAUps/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:41",
                            "durationMinutes": 2.6833333333333336
                        }
                    ]
                },
                "PeterJaguars": {
                    "count": 1,
                    "views": 1768,
                    "videos": [
                        {
                            "title": "PETERJAGUARS PICK 'EM: WEEK 12! - 2015 NFL Picks - PJ HITS THE WHIP!",
                            "channelTitle": "PeterJaguars",
                            "channelId": "UCC_uqdk1K2eEKyogLfRKI3A",
                            "created": "2015-11-29T09:06:36.000Z",
                            "videoId": "vupa4JyATbY",
                            "pctLikes": 92.62295081967213,
                            "viewCount": 1768,
                            "likes": 113,
                            "dislikes": 9,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/vupa4JyATbY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:11:17",
                            "durationMinutes": 11.283333333333333
                        }
                    ]
                },
                "Philbo12345": {
                    "count": 1,
                    "views": 81292,
                    "videos": [
                        {
                            "title": "ESPN NFL 2K5 Hard Hits",
                            "channelTitle": "Philbo12345",
                            "channelId": "UConO0vz0zX748xXGU3j29lA",
                            "created": "2006-09-04T23:20:51.000Z",
                            "videoId": "Y3o0Dn8h7xY",
                            "pctLikes": 45.744680851063826,
                            "viewCount": 81292,
                            "likes": 43,
                            "dislikes": 51,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Y3o0Dn8h7xY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:34",
                            "durationMinutes": 4.566666666666666
                        }
                    ]
                },
                "AccessHollywood": {
                    "count": 1,
                    "views": 80002,
                    "videos": [
                        {
                            "title": "The NFL Hits Hollywood!",
                            "channelTitle": "AccessHollywood",
                            "channelId": "UCiKGMZZmZXK-RpbKJGXgH3Q",
                            "created": "2007-09-07T22:55:19.000Z",
                            "videoId": "LpPbxW9Zjdc",
                            "pctLikes": 80.3030303030303,
                            "viewCount": 80002,
                            "likes": 53,
                            "dislikes": 13,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/LpPbxW9Zjdc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:53",
                            "durationMinutes": 3.8833333333333333
                        }
                    ]
                },
                "Matt Richardson": {
                    "count": 3,
                    "views": 185061,
                    "videos": [
                        {
                            "title": "JACKED UP NFL #1",
                            "channelTitle": "Matt Richardson",
                            "channelId": "UCeOXDoDVasZp4SxGCHQ29hw",
                            "created": "2009-12-18T20:38:14.000Z",
                            "videoId": "xdMFe-HKe5o",
                            "pctLikes": 96.34146341463415,
                            "viewCount": 78218,
                            "likes": 79,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/xdMFe-HKe5o/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:36",
                            "durationMinutes": 1.6
                        },
                        {
                            "title": "JACKED UP NFL #4",
                            "channelTitle": "Matt Richardson",
                            "channelId": "UCeOXDoDVasZp4SxGCHQ29hw",
                            "created": "2009-12-18T20:46:28.000Z",
                            "videoId": "XLBqFpxl-lE",
                            "pctLikes": 90.69767441860465,
                            "viewCount": 58159,
                            "likes": 39,
                            "dislikes": 4,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/XLBqFpxl-lE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:05",
                            "durationMinutes": 2.0833333333333335
                        },
                        {
                            "title": "JACKED UP NFL #5",
                            "channelTitle": "Matt Richardson",
                            "channelId": "UCeOXDoDVasZp4SxGCHQ29hw",
                            "created": "2009-12-18T20:48:52.000Z",
                            "videoId": "GBMTJCwdPUU",
                            "pctLikes": 84,
                            "viewCount": 48684,
                            "likes": 42,
                            "dislikes": 8,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/GBMTJCwdPUU/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:02",
                            "durationMinutes": 1.0333333333333334
                        }
                    ]
                },
                "dukethakilla": {
                    "count": 1,
                    "views": 76180,
                    "videos": [
                        {
                            "title": "Superstar Ray Lewis Big Hits! My Career Madden NFL 13 Connected Careers",
                            "channelTitle": "dukethakilla",
                            "channelId": "UCDmrPWwGCMAuryxrLqc59Qw",
                            "created": "2012-09-17T20:30:09.000Z",
                            "videoId": "J9JpeAg_TQk",
                            "pctLikes": 97.97752808988764,
                            "viewCount": 76180,
                            "likes": 872,
                            "dislikes": 18,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/J9JpeAg_TQk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:05",
                            "durationMinutes": 4.083333333333333
                        }
                    ]
                },
                "d573762": {
                    "count": 1,
                    "views": 75372,
                    "videos": [
                        {
                            "title": "NFL HARDEST HITS",
                            "channelTitle": "d573762",
                            "channelId": "UC7dEApLpqk6tw5ZAQ5f4ncw",
                            "created": "2008-09-21T00:51:51.000Z",
                            "videoId": "5OMG-epMCFA",
                            "pctLikes": 95.08196721311475,
                            "viewCount": 75372,
                            "likes": 58,
                            "dislikes": 3,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/5OMG-epMCFA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:10",
                            "durationMinutes": 3.1666666666666665
                        }
                    ]
                },
                "mathieularouche": {
                    "count": 1,
                    "views": 74796,
                    "videos": [
                        {
                            "title": "NFL Greatest Hits with Roy Williams",
                            "channelTitle": "mathieularouche",
                            "channelId": "UCY6hqP4BBYD9sV7HE1_t4tQ",
                            "created": "2008-10-18T16:24:54.000Z",
                            "videoId": "yE6QZ3J3de0",
                            "pctLikes": 85.96491228070175,
                            "viewCount": 74796,
                            "likes": 49,
                            "dislikes": 8,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/yE6QZ3J3de0/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:35",
                            "durationMinutes": 0.5833333333333334
                        }
                    ]
                },
                "vtman17": {
                    "count": 1,
                    "views": 70218,
                    "videos": [
                        {
                            "title": "NFL`s hardest hits",
                            "channelTitle": "vtman17",
                            "channelId": "UCdBmptL_Flg73sZvebpfBgA",
                            "created": "2008-07-03T23:48:53.000Z",
                            "videoId": "ryNj7c4Z8Yg",
                            "pctLikes": 58.333333333333336,
                            "viewCount": 70218,
                            "likes": 21,
                            "dislikes": 15,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ryNj7c4Z8Yg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:09",
                            "durationMinutes": 3.15
                        }
                    ]
                },
                "andres jrg": {
                    "count": 1,
                    "views": 69213,
                    "videos": [
                        {
                            "title": "NFL Big hits   Here comes the boom",
                            "channelTitle": "andres jrg",
                            "channelId": "UCUEaQyZP8cMPpQHZQWoDu7g",
                            "created": "2014-02-08T05:14:08.000Z",
                            "videoId": "LwRDMf0aqqw",
                            "pctLikes": 94.58333333333333,
                            "viewCount": 69213,
                            "likes": 454,
                            "dislikes": 26,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/LwRDMf0aqqw/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:08",
                            "durationMinutes": 4.133333333333334
                        }
                    ]
                },
                "AndrewBarry03": {
                    "count": 1,
                    "views": 56574,
                    "videos": [
                        {
                            "title": "NFL Football Hits with Speech",
                            "channelTitle": "AndrewBarry03",
                            "channelId": "UCmdSJwZoxy9xfV7KDxrJ-vQ",
                            "created": "2011-02-26T20:58:28.000Z",
                            "videoId": "0hQ6Om3ABc8",
                            "pctLikes": 95.50561797752809,
                            "viewCount": 56574,
                            "likes": 170,
                            "dislikes": 8,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/0hQ6Om3ABc8/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:29",
                            "durationMinutes": 4.483333333333333
                        }
                    ]
                },
                "StFranniesHighschool": {
                    "count": 1,
                    "views": 55838,
                    "videos": [
                        {
                            "title": "Wes Welker layed out by Steelers Ryan Clark",
                            "channelTitle": "StFranniesHighschool",
                            "channelId": "UCV0Hqza42IB8FaRsaRN_vSg",
                            "created": "2012-01-05T22:12:19.000Z",
                            "videoId": "iVXLioOCPfk",
                            "pctLikes": 88.88888888888889,
                            "viewCount": 55838,
                            "likes": 32,
                            "dislikes": 4,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/iVXLioOCPfk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:08",
                            "durationMinutes": 0.13333333333333333
                        }
                    ]
                },
                "Slate Magazine": {
                    "count": 1,
                    "views": 49499,
                    "videos": [
                        {
                            "title": "The NFL Hits The Oregon Trail",
                            "channelTitle": "Slate Magazine",
                            "channelId": "UCYC4ijpFZY_CtdElWFyy-Gg",
                            "created": "2009-09-14T15:30:18.000Z",
                            "videoId": "ucyc50f9oak",
                            "pctLikes": 96.05911330049261,
                            "viewCount": 49499,
                            "likes": 195,
                            "dislikes": 8,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/ucyc50f9oak/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:53",
                            "durationMinutes": 2.8833333333333333
                        }
                    ]
                },
                "ArizonaCNFLFitz11": {
                    "count": 1,
                    "views": 47234,
                    "videos": [
                        {
                            "title": "NFL Hardest Hits From 2006 2008",
                            "channelTitle": "ArizonaCNFLFitz11",
                            "channelId": "UCkSwTCfZEh2bZQrQjolV1yA",
                            "created": "2009-03-28T11:45:52.000Z",
                            "videoId": "4skEI1ztHUg",
                            "pctLikes": 94.44444444444444,
                            "viewCount": 47234,
                            "likes": 85,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/4skEI1ztHUg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:24",
                            "durationMinutes": 5.4
                        }
                    ]
                },
                "Mason (iRepMyDougie)": {
                    "count": 2,
                    "views": 88540,
                    "videos": [
                        {
                            "title": "Madden NFL 13 Big Hits Mini-Montage #2",
                            "channelTitle": "Mason (iRepMyDougie)",
                            "channelId": "UCmkBeqzq6e1F7-XGK0A-73Q",
                            "created": "2012-09-13T01:35:30.000Z",
                            "videoId": "EpeDFZ5COBA",
                            "pctLikes": 91.93548387096774,
                            "viewCount": 44586,
                            "likes": 171,
                            "dislikes": 15,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/EpeDFZ5COBA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:30",
                            "durationMinutes": 2.5
                        },
                        {
                            "title": "Madden NFL 13 Big Hits Mini-Montage",
                            "channelTitle": "Mason (iRepMyDougie)",
                            "channelId": "UCmkBeqzq6e1F7-XGK0A-73Q",
                            "created": "2012-09-04T03:01:53.000Z",
                            "videoId": "Y09lm5F65y4",
                            "pctLikes": 91.78082191780823,
                            "viewCount": 43954,
                            "likes": 134,
                            "dislikes": 12,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/Y09lm5F65y4/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:31",
                            "durationMinutes": 2.5166666666666666
                        }
                    ]
                },
                "ryan ottens": {
                    "count": 1,
                    "views": 44491,
                    "videos": [
                        {
                            "title": "nfl hits - spartans highlights stiff arm of the year!",
                            "channelTitle": "ryan ottens",
                            "channelId": "UCcjjuWSDNP52b32Eh1tS-ug",
                            "created": "2007-03-19T15:07:27.000Z",
                            "videoId": "S1r2X8XHL2U",
                            "pctLikes": 54.054054054054056,
                            "viewCount": 44491,
                            "likes": 20,
                            "dislikes": 17,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/S1r2X8XHL2U/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:04:00",
                            "durationMinutes": 4
                        }
                    ]
                },
                "Sport Hustle": {
                    "count": 1,
                    "views": 42527,
                    "videos": [
                        {
                            "title": "Jarryd Hayne Makes 49ers Roster | NFL 2015 | His reaction",
                            "channelTitle": "Sport Hustle",
                            "channelId": "UCFtEf5ySivSAbjTOh9daqag",
                            "created": "2015-09-06T20:54:14.000Z",
                            "videoId": "X2zdzAErPxg",
                            "pctLikes": 99.18032786885246,
                            "viewCount": 42527,
                            "likes": 242,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/X2zdzAErPxg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:06:55",
                            "durationMinutes": 6.916666666666667
                        }
                    ]
                },
                "BMarshall15": {
                    "count": 1,
                    "views": 39985,
                    "videos": [
                        {
                            "title": "NFL's Greatest Hits",
                            "channelTitle": "BMarshall15",
                            "channelId": "UC5f2svFk7xbHCaAnJ8yJpNQ",
                            "created": "2008-05-08T23:16:51.000Z",
                            "videoId": "eMS2oTSIo9w",
                            "pctLikes": 73.52941176470588,
                            "viewCount": 39985,
                            "likes": 25,
                            "dislikes": 9,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/eMS2oTSIo9w/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:17",
                            "durationMinutes": 2.283333333333333
                        }
                    ]
                },
                "George HaliburtonTv": {
                    "count": 1,
                    "views": 3893,
                    "videos": [
                        {
                            "title": "Biggest Football Hits of All Time - College, NFL",
                            "channelTitle": "George HaliburtonTv",
                            "channelId": "UCR-3ygptnOjUIrOzcYoak6Q",
                            "created": "2013-01-10T00:46:13.000Z",
                            "videoId": "TMJwZR3CfNA",
                            "pctLikes": 100,
                            "viewCount": 3893,
                            "likes": 22,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/TMJwZR3CfNA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:38",
                            "durationMinutes": 3.6333333333333333
                        }
                    ]
                },
                "CNN": {
                    "count": 1,
                    "views": 1776,
                    "videos": [
                        {
                            "title": "\"Black Monday\" hits NFL hard",
                            "channelTitle": "CNN",
                            "channelId": "UCupvZG-5ko_eiXAupbDfxWw",
                            "created": "2013-12-30T22:34:25.000Z",
                            "videoId": "qM5c4g3zp6c",
                            "pctLikes": 100,
                            "viewCount": 1776,
                            "likes": 7,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/qM5c4g3zp6c/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:41",
                            "durationMinutes": 2.6833333333333336
                        }
                    ]
                },
                "chzbizman": {
                    "count": 1,
                    "views": 6684,
                    "videos": [
                        {
                            "title": "Brandon Browner Vicious Hit - The NFL Needs To Change The Rules",
                            "channelTitle": "chzbizman",
                            "channelId": "UCTKhQBx6E9O3n7LyoBF9MJg",
                            "created": "2014-12-08T06:56:07.000Z",
                            "videoId": "_2xz7SqP55Q",
                            "pctLikes": 94.52054794520548,
                            "viewCount": 6684,
                            "likes": 69,
                            "dislikes": 4,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/_2xz7SqP55Q/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:02:00",
                            "durationMinutes": 2
                        }
                    ]
                },
                "ekajylam": {
                    "count": 1,
                    "views": 2041,
                    "videos": [
                        {
                            "title": "College and NFL Hard Hits 2000 - 2013",
                            "channelTitle": "ekajylam",
                            "channelId": "UCyQeQ-FOs3_OS2dmWa89vxw",
                            "created": "2013-06-21T07:23:53.000Z",
                            "videoId": "WiVCxWJsMmg",
                            "pctLikes": 88.88888888888889,
                            "viewCount": 2041,
                            "likes": 8,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/WiVCxWJsMmg/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:33",
                            "durationMinutes": 3.55
                        }
                    ]
                },
                "Paul Partridge": {
                    "count": 1,
                    "views": 160,
                    "videos": [
                        {
                            "title": "cool nfl field goal! hits pole",
                            "channelTitle": "Paul Partridge",
                            "channelId": "UCp9FRcL7GfFUmtPuUNxV7Zg",
                            "created": "2014-03-12T20:44:30.000Z",
                            "videoId": "bZ6MVHhBg7o",
                            "pctLikes": 0,
                            "viewCount": 160,
                            "likes": 0,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/bZ6MVHhBg7o/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:38",
                            "durationMinutes": 0.6333333333333333
                        }
                    ]
                },
                "Football Insanity": {
                    "count": 1,
                    "views": 701,
                    "videos": [
                        {
                            "title": "CRAZIEST NFL CATCHES, PLAYS, HITS AND MORE! (2014) HD",
                            "channelTitle": "Football Insanity",
                            "channelId": "UCEkhEat-KS552TClqXigg2w",
                            "created": "2015-08-24T01:38:34.000Z",
                            "videoId": "oLdpExCShIA",
                            "pctLikes": 100,
                            "viewCount": 701,
                            "likes": 29,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/oLdpExCShIA/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:03:52",
                            "durationMinutes": 3.8666666666666667
                        }
                    ]
                },
                "Boxing Now": {
                    "count": 1,
                    "views": 267,
                    "videos": [
                        {
                            "title": "Crazy Hits! Cat Edition! NFL Promo Week 9",
                            "channelTitle": "Boxing Now",
                            "channelId": "UCbe_N5SULIdKlO_e-g7RBhQ",
                            "created": "2015-11-01T11:29:27.000Z",
                            "videoId": "wzjDXDxFLJo",
                            "pctLikes": 0,
                            "viewCount": 267,
                            "likes": 0,
                            "dislikes": 1,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/wzjDXDxFLJo/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:16",
                            "durationMinutes": 0.26666666666666666
                        }
                    ]
                },
                "Jumper news": {
                    "count": 1,
                    "views": 5502,
                    "videos": [
                        {
                            "title": "'Deflate Gate' Hits NFL's Patriots Video",
                            "channelTitle": "Jumper news",
                            "channelId": "UCm_v_-doGuVpF0SRdqA-7Ig",
                            "created": "2015-01-19T22:31:57.000Z",
                            "videoId": "w0CnTvBZXwc",
                            "pctLikes": 58.333333333333336,
                            "viewCount": 5502,
                            "likes": 7,
                            "dislikes": 5,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/w0CnTvBZXwc/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:05:41",
                            "durationMinutes": 5.683333333333334
                        }
                    ]
                },
                "Branden Banks": {
                    "count": 1,
                    "views": 26058,
                    "videos": [
                        {
                            "title": "Donte Whitner Hits Pierre Thomas W/ Screen Shaking Effects!!! Hardest Hit of 2011-2012 NFL Season",
                            "channelTitle": "Branden Banks",
                            "channelId": "UCvX9ZCP0FnxUKxk_1hCcMNQ",
                            "created": "2012-01-15T10:49:42.000Z",
                            "videoId": "UEzJM1nWr38",
                            "pctLikes": 92.85714285714286,
                            "viewCount": 26058,
                            "likes": 26,
                            "dislikes": 2,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/UEzJM1nWr38/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:25",
                            "durationMinutes": 0.4166666666666667
                        }
                    ]
                },
                "24PerDay": {
                    "count": 1,
                    "views": 1506,
                    "videos": [
                        {
                            "title": "Donte Stallworth NFL Player Hits, Kills Pedestrian with his Bentley",
                            "channelTitle": "24PerDay",
                            "channelId": "UCjJOe_yxqB_n-rCcEapiz1g",
                            "created": "2009-03-18T02:30:17.000Z",
                            "videoId": "LOpVaoaN-4s",
                            "pctLikes": 100,
                            "viewCount": 1506,
                            "likes": 1,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/LOpVaoaN-4s/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:01:23",
                            "durationMinutes": 1.3833333333333333
                        }
                    ]
                },
                "BASportsGuy": {
                    "count": 1,
                    "views": 2643,
                    "videos": [
                        {
                            "title": "Eric Reid on making first NFL hits",
                            "channelTitle": "BASportsGuy",
                            "channelId": "UCORuQjmYMyMSu-FqSXLg5EA",
                            "created": "2013-08-09T04:57:39.000Z",
                            "videoId": "2fxJk5Bsx9s",
                            "pctLikes": 100,
                            "viewCount": 2643,
                            "likes": 13,
                            "dislikes": 0,
                            "thumbnail": {
                                "url": "https://i.ytimg.com/vi/2fxJk5Bsx9s/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "duration": "00:00:45",
                            "durationMinutes": 0.75
                        }
                    ]
                }
            };
        }

        return service;
    }]);

})();