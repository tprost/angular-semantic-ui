/**
 * @ngdoc directive
 * @name ui.dimmer.directive:dimmer
 * @restrict C
 * @description
 * Dimmer directive.
 *
 */
angular.module('ui.dimmer').directive('dimmer', function($controller) {
  return {
    restrict: 'C',
    require: '?^dimmable',
    controller: 'DimmerController',
    link: function(scope, elem, attrs, ctrl) {

      elem.attr('ng-animate-children', true);

      if (angular.isArray(ctrl)) {
        var dimmerController = ctrl[0];
        var dimmableController = ctrl[1];
        dimmableController.set.dimmer(elem);
        dimmerController.set.dimmableController(dimmableController);
        dimmerController.set.dimmable(dimmableController.get.dimmable());
      }

    }
  };
});
