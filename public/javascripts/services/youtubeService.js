(function() {
  'use strict';

  angular
    .module('app')
    .constant('base', 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50')
    .service('youtubeService', youtubeService);

  function youtubeService($http, $q, base, configDev) {
    var playlistId = 'PLEC84DA8F03E861CE';
    var api = base + '&playlistId=' + playlistId + '&key=' + configDev.youtubeKey;
    return {
      'get': function() {
        var defer = $q.defer();
        $http.get(api)
          .then(function(resp) {
            defer.resolve(resp);
          }, function(resp) {
            defer.reject(err);
          });
        return defer.promise;
      }
    }
  }

})();
