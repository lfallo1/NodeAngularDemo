angular.module('youtubeSearchApp').service('BrowserService', ['$window', function($window){
  var service = {};

  /**
   * http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/
   */
  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
  };

  service.isMobile = function(){
      return isMobile.any();
  }

  service.getBrowser = function(){
      var userAgent = $window.navigator.userAgent;
      var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};
      for(var key in browsers) {
          if (browsers[key].test(userAgent)) {
              return key;
          }
     };
     return 'unknown';
  };

  return service;
}]);
