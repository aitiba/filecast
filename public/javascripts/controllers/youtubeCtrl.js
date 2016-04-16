(function() {
  'use strict';

  angular
    .module('app')
    .controller('youtubeCtrl', youtubeCtrl);

  // youtubeCtrl.$inject = ['$scope', '$stateParams'];

  /* @ngInject */
  function youtubeCtrl($scope, $stateParams, youtubeService) {
    var vm = this;
    var socket = io.connect();
    var room = $stateParams.room;

    vm.castFile = function() {
      var message = "<a href='#'>IEUP!</a>" + room;
      socket.emit('sendMessage', room, message);
    }

    vm.view = function(videoId) {
      vm.videoId = videoId
    }


    //al conectarse se conecta a la sala
    socket.on('connect', function() {
      socket.emit('room', room);
    });

    // pintar el mensaje del servidor
    socket.on('message', function(data) {
      console.log(data);
      vm.screen = data;
      $scope.$digest();
    });

    youtubeService.get().then(function(videos) {
    //   https://www.youtube.com/v/1hnvapbxzs4?version=3&enablejsapi=1
      console.log(videos.data.items);
      vm.videos = videos.data.items;
    });
  }
})();
