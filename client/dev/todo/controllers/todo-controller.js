;(function(ng) {
  'use strict';

  ng.module('Capstone')
    .controller('TodoController', [
      '$log',
      'Todo',
      'TodoDAO',
      '$http',
      function($log, Todo, TodoDAO, $http) {
        var self = this;

        self.ids = ["sMKoNBRZM1M","tntOCGkgt98", "kffacxfA7G4"];
        self.searched =false;
        self.todo = new Todo();
        self.todos = [];

        self.createTodo = function(todo) {
          self.searched = true;
          searchVideos(null, todo.todoMessage);
        };

        var searchVideos = function (isNewQuery, query) {
          $http.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
              key: 'AIzaSyAGtX0a8ICU-ih6JysuKlOke64BXhG8ysA',
              type: 'video',
              maxResults: '10',
              pageToken: isNewQuery ? '' : null,
              part: 'id,snippet',
              q: query
            }
          })
          .success( function (data) {
            console.log('data', data);
            self.ids = data.items;
          })
          .error( function () {
            console.log('boo');
          });
        };

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
