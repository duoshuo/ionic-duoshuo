;(function(angular, debug) {
  'use strict';
  var log;

  if (!angular)
    throw new Error('ionicDuoshuo.init(); angular.js required.');
  if (debug)
    log = debug('ionic-duoshuo');

  angular
    .module('ionic-duoshuo', ['duoshuo'])
    .directive('ionicDuoshuo', ['$duoshuo', ionicDuoshuoDirective])
    .provider('ionicDuoshuo', ionicDuoshuoProvider);

  function ionicDuoshuoProvider() {
    this.config = config;
    this.$get = ['duoshuo', function(duoshuo) {
      return duoshuo;
    }];

    function config(configs) {
      if (!configs) 
        return;
      if (!configs.short_name) 
        throw new Error('ionicDuoshuo.config(); duoshuo.short_name is required');
      window.duoshuoQuery = configs;

      if (log) log(window.duoshuoQuery);
    }
  }

  function ionicDuoshuoDirective(duoshuo) {
    var directive = {
      restrict: 'AE',
      require: 'ngModel',
      template: html(),
      replace: true,
      link: link
    };
    return directive;

    function link(scope, element, attrs, ctrl) {
      if (log) {
        log(scope);
        log(element);
        log(attrs);
        log(ctrl);
        log(duoshuo);
      }

      scope.postComment = postComment;

      if (attrs.threadKey)
        fetchComments(attrs.threadKey);

      // model => view
      ctrl.$render = render;
      
      // view => model
      function updateModel(list) {
        ctrl.$setViewValue(list);
      }

      function render() {
        // ctrl.$viewValue
      }

      function fetchComments(threadId) {
        duoshuo.get('threads/listposts', {
          container_url: attrs.url || '',
          thread_id: threadId,
          require:'site,visitor,nonce,lang'
        }, function(err, data, res){
          log(data);
        }, function(err){
          log(err);
        });
      }

      function postComment() {
        if (log) {
          debug('Posting comments:');
          debug(scope.comment);
        }
        // Create thread_id (uuid)
      }
    }

    function html() {
      return [
        '<div class="list">',
          // Comments list
          '<div class="item item-avatar" ng-repeat="comment in comments">',
            '<img ng-src="{{comment.author.avatar}}">',
            '<h2 ng-bind="comment.author.name"></h2>',
            '<p ng-bind="comment.content"></p>',
          '</div>',
          // Comments Box
          '<label class="item item-input">',
            '<textarea placeholder="说点什么吧..." ng-model="comment"></textarea>',
          '</label>',
          // Comments Post Button
          '<button class="button button-block button-positive" ng-click="postComment();">',
            '发表评论',
          '</button>',
        '</div>'
      ].join('');
    }
  }

})(window.angular, window.debug);
