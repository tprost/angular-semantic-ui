angular.module('ui.dimmer').directive('dimmable', function($animate) {
  return {
    restrict: 'C',
    controller: 'DimmableController',
    link: function(scope, elem, attrs, ctrl) {

      var animation;
      var $dimmer = ctrl.get.dimmer();

      scope.$watch(ctrl.is.animatingOut, function(animatingOut) {
        var $dimmer = ctrl.get.dimmer();
        if (animatingOut) {
          if (animation) $animate.cancel(animation);
          $dimmer.removeClass('in');
          animation = $animate.addClass($dimmer, 'visible animating fade out').then(function() {
            if (ctrl.is.animatingOut()) {
              ctrl.remove.visible();

            }
          }).finally(function() {
            $dimmer.removeClass('animating fade out');
          });
        }
      });

      scope.$watch(ctrl.is.animatingIn, function(animatingIn) {
        var $dimmer = ctrl.get.dimmer();
        if (animatingIn) {
          if (animation) $animate.cancel(animation);
          $dimmer.removeClass('out');
          animation = $animate.addClass($dimmer, 'visible animating fade in').then(function() {
            if (ctrl.is.animatingIn()) {
              ctrl.set.active();
            }
          }).finally(function() {
            $dimmer.removeClass('animating fade in');
          });
        }
      });

      scope.$watch(ctrl.is.active, function(active, wasActive) {
        $dimmer = ctrl.get.dimmer();
        $dimmer.toggleClass('active', active);
      });

      scope.$watch(ctrl.is.visible, function(visible, wasVisible) {
        elem.toggleClass('dimmed', visible);
        $dimmer = ctrl.get.dimmer();
        $dimmer.toggleClass('visible', visible);
      });

    }
  };
});
