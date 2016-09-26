/**
 * @ngdoc directive
 * @name ui.sidebar.directive:sidebar
 * @module ui.sidebar
 * @restrict C
 * @description
 * Sidebar directive.
 *
 */
angular.module('ui.sidebar').directive('sidebar', function($controller, $animate, $document) {

  return {
    restrict: 'C',
    controller: 'SidebarController',
    link: function(scope, elem, attrs, ctrl) {

      var animation, animatingIn, animatingOut;

      var body = angular.element($document[0].querySelector('body'));
      body.addClass('minimal pushable');

      if (elem.hasClass('visible')) ctrl.setVisible();

      scope.$watch(ctrl.isVisible, function(visible) {
        if (!ctrl.isAnimatingIn() && visible) {
          elem.toggleClass('visible', visible);
        }
        if (!ctrl.isAnimatingOut() && !visible) {
          elem.toggleClass('visible', visible);
        }
      });

      scope.$watch(ctrl.isAnimatingIn, function(animatingIn) {
        if (animatingIn) {
          if (animation) $animate.cancel(animation);

          var pusher = $document[0].querySelector('.pusher');
          $animate.addClass(pusher, 'dimmed');

          animation = $animate.addClass(elem, 'visible animating in').then(function() {
            ctrl.removeAnimating();
            elem.removeClass('animating in');
            elem.removeClass(ctrl.settings.transition);
          });
        }
      });

      scope.$watch(ctrl.isAnimatingOut, function(animatingOut) {
        if (animatingOut) {
          if (animation) $animate.cancel(animation);
          elem.removeClass('in');

          var pusher = $document[0].querySelector('.pusher');
          $animate.removeClass(pusher, 'dimmed');

          animation = $animate.setClass(elem, 'animating out', 'visible').then(function() {
            ctrl.removeAnimating();
            ctrl.removeVisible();
            elem.removeClass('animating out');
            elem.removeClass(ctrl.settings.transition);
          });
        }
      });


    }
  };
});
