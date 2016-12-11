;(function(ng) {
  'use strict';

  ng.module('Capstone')
    .controller('TodoController', [
      '$log',
      'Todo',
      'TodoDAO',
      function($log, Todo, TodoDAO) {
        var self = this;

        self.theBestVideo = "sMKoNBRZM1M";

        self.todo = new Todo();
        self.todos = [];

        self.createTodo = function(todo) {
          debugger;
          TodoDAO
            .createTodo(todo)
            .then(function(newTodo) {
              self.todos.push(newTodo);
              self.todo = new Todo();
            })
            .catch($log.error);
        };

        function _getAll() {
          return TodoDAO
            .getAll()
            .then(function(todos) {
              self.todos = todos;
              return self.todos;
            })
            .catch($log.error);
        }

        self.deleteTodo = function(id) {
          TodoDAO
            .deleteTodo(id)
            .then(function() {
              return _getAll();
            })
            .catch($log.error);
        };

        _getAll();

        return self;
      }
    ])

    .directive('youtube', function($window) {
      return {
        restrict: "E",

        scope: {
          height:   "@",
          width:    "@",
          videoid:  "@"  
        },

        template: '<div></div>',

        link: function(scope, element) {
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          var player;

          $window.onYouTubeIframeAPIReady = function() {
            player = new YT.Player(element.children()[0], {

              playerVars: {
                autoplay: 0,
                html5: 1,
                theme: "light",
                modesbranding: 0,
                color: "white",
                iv_load_policy: 3,
                showinfo: 1,
                controls: 1,
              },

              height: scope.height,
              width: scope.width,
              videoId: scope.videoid
            });
          };
        },  
      }
    });


}(window.angular));
