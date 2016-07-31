/**
 * @ngdoc directive
 * @name ui.dimmer.directive:dimmer
 * @restrict C
 * @description
 * Dimmer directive.
 *
 */
angular.module('ui.dimmer').directive('dimmer', function($controller, $animate, $timeout) {
  return {
    restrict: 'C',
    require: '?^dimmable',
    controller: 'DimmerController',
    link: function(scope, elem, attrs, ctrl) {

      elem.attr('ng-animate-children', true);

      var animation;
      var controller, dimmableController;

      if (angular.isArray(ctrl)) {
        controller = ctrl[0];
        dimmableController = ctrl[1];
        dimmableController.set.dimmer(elem);
        controller.set.dimmable(dimmableController.get.dimmable());
      } else {
        controller = elem.controller('dimmer');
      }

      scope.$watch(controller.is.active, function(active, wasActive) {
        elem.toggleClass('active', active);
      });

      scope.$watch(controller.is.visible, function(visible, wasVisible) {
        if (visible) controller.get.dimmable().addClass('ui dimmable dimmed');
        if (!visible) controller.get.dimmable().removeClass('dimmed');
        elem.toggleClass('visible', visible && !controller.is.animatingIn());
      });

      scope.$watch(controller.is.animatingIn, function(animatingIn) {
        if (animatingIn) {
          if (animation) $animate.cancel(animation);
          animation = $animate.setClass(elem, 'visible animating fade in', 'out').then(function() {
            if (controller.is.animatingIn())
              controller.set.active();
            elem.removeClass('animating fade in');
          });
        }
      });

      scope.$watch(controller.is.animatingOut, function(animatingOut) {
        if (animatingOut) {
          if (animation) $animate.cancel(animation);
          elem.removeClass('in');
          animation = $animate.addClass(elem, 'visible animating fade out').then(function() {
            if (controller.is.animatingOut())
              controller.remove.visible();
            elem.removeClass('animating fade out');
          }).finally(function() {

          });
        }
      });


    }
  };
});
