;(function(angular, debug) {
  'use strict';

  if (!angular)
    throw new Error('ionicDuoshuo.init(); angular.js required.');

  angular
    .module('ionic-duoshuo', ['duoshuo'])
    .directive('ionicDuoshuo', ionicDuoshuoDirective)
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
    }
  }

  function ionicDuoshuoDirective() {
    var directive = {
      restrict: 'AE',
      require: 'ngModel',
      template: html(),
      replace: true,
      link: link
    };
    return directive;

    function link(scope, element, attrs, ctrl) {
      // model => view
      ctrl.$render = render;
      // view => model
      function updateModel(list) {
        ctrl.$setViewValue(list);
      }

      function render() {
        // ctrl.$viewValue
      }
    }

    function html() {
      return [
        ''
      ].join('');
    }
  }

})(window.angular, window.debug);
