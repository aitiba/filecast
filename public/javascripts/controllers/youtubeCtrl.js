(function() {
  'use strict';

  angular
    .module('app')
    .controller('youtubeCtrl', youtubeCtrl);

  // youtubeCtrl.$inject = ['$scope', '$stateParams'];

  /* @ngInject */
  function youtubeCtrl($http, $scope, $stateParams, youtubeService, $sce) {
    var vm = this;
    var socket = io.connect();
    var room = $stateParams.room;

    vm.castFile = function(videoId) {
      var message = "<iframe width='500px' height='350px' src='https://www.youtube.com/embed/" + videoId + "?autoplay=1&amp;autohide=0&amp;cc_load_policy=0&amp;color=white&amp;controls=1&amp;disablekb=1&amp;end=20&amp;fs=1&amp;hl=undefined&amp;playlist=&amp;playsinline=0&amp;rel=1&amp;showinfo=1&amp;start=undefined&amp;theme=undefined' frameborder='0' allowfullscreen=''></iframe>";

      socket.emit('sendMessage', room, message);
    }

    vm.view = function(videoId) {
      vm.videoId = videoId;
    }


    //al conectarse se conecta a la sala
    socket.on('connect', function() {
      socket.emit('room', room);
    });

    // pintar el mensaje del servidor
    socket.on('message', function(data) {
      console.log(data);
      // sanitize iframe HTML on ngSanitize
      $scope.screen = $sce.trustAsHtml(data);
      $scope.$digest();
    });

    youtubeService.get().then(function(videos) {
      // https://www.youtube.com/v/1hnvapbxzs4?version=3&enablejsapi=1
      vm.videos = videos.data.items;
    });
  }
})();
