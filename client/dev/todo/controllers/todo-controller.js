;(function(ng) {
  'use strict';

  ng.module('Capstone')
    .controller('TodoController', [
      '$log',
      'Todo',
      '$http',
      function($log, Todo, $http) {
        var self = this;

        self.ids = [];
        self.searched =false;
        self.name = new Todo();

        self.searchName = function(name) {
          self.searched = true;
          searchVideos(null, name.keyword);
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
            self.ids = data.items;
          })
          .error( function () {
            console.log('boo');
          });
        };

        return self;
      }
    ])

  .directive('myoutube', function($sce) {
    return {
      restrict: 'E',
      scope: { code:'@' },
      template: '<div style="float:left;padding:10px;margin:20px">' +
                  '<iframe style="overflow:hidden;height:200px;width:350px" width="100%" height="100%" src="{{url}}" frameborder="0" >' + 
                  '</iframe>' +
                '</div>',
      link: function (scope) {
        scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + scope.code);
      }
    };
  });

}(window.angular));
