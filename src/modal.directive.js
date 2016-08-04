angular.module('ui.modal').directive('modal', function($document, $animate, $compile) {
  return {
    restrict: 'C',
    controller: 'ModalController',
    link: function(scope, elem, attrs, ctrl) {

      var animation;
      var $dimmer;
      var $body = angular.element($document.find('body'));

      if (elem.parent()) ctrl.setParent(elem.parent());
      elem.addClass('transition');

      scope.$watch(ctrl.isActive, function(active, wasActive) {
        elem.toggleClass('active', active);
        angular.element($document.find('body')).toggleClass('dimmed', active);

      });

      scope.$watch(ctrl.isVisible, function(visible, wasVisible) {
        elem.toggleClass('visible', visible);

        if (!visible && !ctrl.isActive()) {
          if (ctrl.hasParent()) {

            ctrl.getParent().append(elem);
          } else {

            elem.remove();
          }
          if ($dimmer) $dimmer.remove();
        }
      });



      function createDimmer() {
        $dimmer = angular.element('<div class="ui dimmer visible"></div>');
        $compile($dimmer)(scope);
        $body.append($dimmer);
        var dimmerController = $dimmer.controller('dimmer');
        dimmerController.setDimmable($body);
        $dimmer.bind('click', function(e) {
          if (e.target === e.currentTarget) {
            scope.$apply(ctrl.hide);
          }
        });
        $dimmer.append(elem);
        dimmerController.setVisible();
        dimmerController.removeActive();
        dimmerController.show();
        return $dimmer;
      };

      scope.$watch(ctrl.isAnimatingIn, function(animatingIn) {
        if (animatingIn) {
          createDimmer();

          if (animation) $animate.cancel(animation);
          elem.removeClass('out');
          if (ctrl.settings.centerUsingMarginTop)
            elem.css('margin-top', '-' + elem[0].offsetHeight / 2 + 'px');
          animation = $animate.addClass(elem, 'visible animating scale in').then(function() {
            if (ctrl.isAnimatingIn()) {
              ctrl.setActive();
            }
          }).finally(function() {
            elem.removeClass('animating scale in');
          });

        }
      });



      scope.$watch(ctrl.isAnimatingOut, function(animatingOut) {
        if (animatingOut) {
          $dimmer.controller('dimmer').hide();
          if (animation) $animate.cancel(animation);
          elem.removeClass('in');
          animation = $animate.addClass(elem, 'visible animating scale out').then(function() {

            if (ctrl.isAnimatingOut()) {
              ctrl.removeVisible();
            }
          }).finally(function() {
            elem.removeClass('animating scale out');
          });

        }
      });

    }
  };
});
