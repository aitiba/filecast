(function() {
  'use strict';

  angular
    .module('app', ['ui.router', 'ngSanitize'])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home/anonymous');

      $stateProvider
        .state('home', {
          url: '/home/:room',
          templateUrl: 'templates/home.html',
          controller: 'youtubeCtrl'
        })

    });
})();
