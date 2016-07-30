/**
 * @ngdoc directive
 * @name ui.modal.directive:modal
 * @restrict C
 * @description
 * Modal directive.
 *
 */
angular.module('ui.modal').directive('modal', function($document, $animate) {
  return {
    restrict: 'C',
    controller: 'ModalController',
    link: function(scope, elem, attrs, ctrl) {

      var animation;

      scope.$watch(ctrl.is.active, function(active, wasActive) {
        elem.toggleClass('active', active);
        angular.element($document.find('body')).toggleClass('dimmed', active);
      });

      scope.$watch(ctrl.is.visible, function(visible, wasVisible) {
        elem.toggleClass('visible', visible);
        if (visible) {
          angular.element($document.find('body'))
            .addClass('dimmmed');
          ctrl.showDimmer();
        }
      });

      scope.$watch(ctrl.is.animatingOut, function(animatingOut) {
        if (animatingOut) {
          ctrl.hideDimmer();
          if (animation) $animate.cancel(animation);
          elem.removeClass('in');
          animation = $animate.addClass(elem, 'visible animating scale out').then(function() {
            if (ctrl.is.animatingOut()) {
              ctrl.remove.visible();
            }
          }).finally(function() {
            elem.removeClass('animating scale out');
          });
        }
      });

      scope.$watch(ctrl.is.animatingIn, function(animatingIn) {
        if (animatingIn) {
          ctrl.showDimmer();
          if (animation) $animate.cancel(animation);
          elem.removeClass('out');

          animation = $animate.addClass(elem, 'visible animating scale in').then(function() {
            if (ctrl.is.animatingIn()) {
              ctrl.set.active();
            }
          }).finally(function() {
            elem.removeClass('animating scale in');
          });
          ctrl.refresh();
        }
      });

    }
  };
});
