/**
 * @ngdoc directive
 * @name sidebar
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


      var pusher = angular.element($document[0].querySelector('.pusher'));
      var pusherClickHandler = function(e) {
        if (ctrl.isVisible() && !ctrl.isAnimatingIn() && ctrl.settings.closable) {
          e.preventDefault();
          ctrl.hide();
          scope.$apply();
        }
      };
      var pusherClickHandlerBound = false;

      function bindPusherClickHandler() {
        if (!pusherClickHandlerBound)
          pusher.bind('click', pusherClickHandler);
      };

      function unbindPusherClickHandler() {
        if (pusherClickHandlerBound)
          pusher.unbind('click', pusherClickHandler);
      };

      scope.$watch(ctrl.isVisible, function(visible) {
        if (!ctrl.isAnimatingIn() && visible) {
          elem.toggleClass('visible', visible);
        }
        if (!ctrl.isAnimatingOut() && !visible) {
          elem.toggleClass('visible', visible);
        }
        if (visible)
          bindPusherClickHandler();
      });

      scope.$watch(ctrl.isAnimatingIn, function(animatingIn) {
        if (animatingIn) {
          if (animation) $animate.cancel(animation);

          var pusher = $document[0].querySelector('.pusher');
          if (ctrl.settings.dimPage) {
            $animate.addClass(pusher, 'dimmed');
          }

          animation = $animate.addClass(elem, 'visible animating in').then(function() {
            ctrl.removeAnimating();
            elem.removeClass('animating in');
            elem.removeClass(ctrl.settings.transition);
          });
        }
      });

      scope.$watch(ctrl.isAnimatingOut, function(animatingOut) {
        if (animatingOut) {
          unbindPusherClickHandler();
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
