angular.module('ui.dimmer').directive('dimmable', function($animate) {
  return {
    restrict: 'C',
    controller: 'DimmableController',
    link: function(scope, elem, attrs, ctrl) {

    }
  };
});
