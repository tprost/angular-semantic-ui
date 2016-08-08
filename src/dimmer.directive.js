/**
 * @ngdoc directive
 * @name ui.dimmer.directive:dimmer
 * @restrict C
 * @description
 * Dimmer directive.
 *
 */
angular.module('ui.dimmer').directive('dimmer', function($controller, $animate, $timeout) {

  var animation;
  var controller, dimmableController;


  return {
    restrict: 'C',
    require: '?^dimmable',
    controller: 'DimmerController',
    link: {


      pre: function(scope, elem ,attrs, ctrl) {
        elem.attr('ng-animate-children', true);


        if (angular.isArray(ctrl)) {
          controller = ctrl[0];
          dimmableController = ctrl[1];
          dimmableController.setDimmer(elem);
          controller.setDimmable(dimmableController.getDimmable());
        } else {
          controller = elem.controller('dimmer');
        }
      },

      post: function(scope, elem, attrs, ctrl) {

        scope.$watch(controller.isActive, function(active, wasActive) {
          elem.toggleClass('active', active);
        });

        scope.$watch(controller.isVisible, function(visible, wasVisible) {
          var $dimmable = controller.getDimmable();
          if ($dimmable && !dimmableController) {
            visible ?
              $dimmable.addClass('ui dimmable dimmed')
              : $dimmable.removeClass('dimmed');
          }
          elem.toggleClass('visible', visible && !controller.isAnimatingIn());
        });

        scope.$watch(controller.isAnimatingIn, function(animatingIn) {
          if (animatingIn) {
            if (animation) $animate.cancel(animation);
            animation = $animate.setClass(elem, 'visible animating in ' + controller.settings.transition, 'out').then(function() {
              if (controller.isAnimatingIn())
                controller.setActive();
              elem.removeClass('animating in');
              elem.removeClass(controller.settings.transition);
            });
          }
        });

        scope.$watch(controller.isAnimatingOut, function(animatingOut) {
          if (animatingOut) {
            if (animation) $animate.cancel(animation);
            elem.removeClass('in');
            animation = $animate.addClass(elem, 'visible animating out ' + controller.settings.transition).then(function() {
              if (controller.isAnimatingOut())
                controller.removeVisible();
              elem.removeClass('animating out');
              elem.removeClass(controller.settings.transition);
            }).finally(function() {

            });
          }
        });


      }
    }
  };
});
