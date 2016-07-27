angular.module('ui.dimmer').directive('dimmer', function() {
  return {
    restrict: 'C',
    require: '?^dimmable',
    controller: 'DimmerController',
    link: function(scope, elem, attrs, ctrl) {
      if (angular.isArray(ctrl) && ctrl[1]) ctrl[0].$setDimmable(ctrl[1].$element);
    }
  };
});
