(function() {
  'use strict';

  angular
    .module('app')
    .controller('youtubeCtrl', youtubeCtrl);

  youtubeCtrl.$inject = ['$scope', '$stateParams'];

  /* @ngInject */
  function youtubeCtrl($scope, $stateParams) {
    var socket = io.connect();
    var room = $stateParams.room;

    $scope.castFile = function() {
      var message = "<a href='#'>IEUP!</a>" + room;
      socket.emit('sendMessage', room, message);
    }

    //al conectarse se conecta a la sala
    socket.on('connect', function() {
      socket.emit('room', room);
    });

    // pintar el mensaje del servidor
    socket.on('message', function(data) {
      console.log(data);
      $scope.screen = data;
      $scope.$digest();
    });

  }
})();
