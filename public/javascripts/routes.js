(function() {
  'use strict';

  angular
    .module('app')
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home/anonymous');

      $stateProvider
        .state('home', {
          url: '/home/:room',
          templateUrl: 'templates/home.html',
          controller: 'youtubeCtrl',
          controllerAs: 'youtube'
        })

    });

})();
