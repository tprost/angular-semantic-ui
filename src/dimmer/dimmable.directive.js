angular.module('ui.dimmer').directive('dimmable', function($animate) {
  return {
    restrict: 'C',
    controller: 'DimmableController',
    link: function(scope, elem, attrs, ctrl) {

      scope.$watch(ctrl.isVisible, function(visible) {
        if (visible) {
          ctrl.getDimmable().addClass('ui dimmable dimmed');
        } else {
          ctrl.getDimmable().removeClass('dimmed');
        }
      });

    }
  };
});
