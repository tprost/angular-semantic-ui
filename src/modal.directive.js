angular.module('ui.modal').directive('modal', function($document, $animate, $compile) {
  return {
    restrict: 'C',
    controller: 'ModalController',
    link: function(scope, elem, attrs, ctrl) {

      var animation;
      var $dimmer;
      var $body = angular.element($document.find('body'));

      scope.$watch(ctrl.is.active, function(active, wasActive) {
        elem.toggleClass('active', active);
        angular.element($document.find('body')).toggleClass('dimmed', active);

      });

      scope.$watch(ctrl.is.visible, function(visible, wasVisible) {
        elem.toggleClass('visible', visible);
        if (!visible && !ctrl.is.active()) {
          if (ctrl.has.parent()) {
            ctrl.get.parent().append(elem);
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
        $dimmer.controller('dimmer').setDimmable($body);
        $dimmer.bind('click', function(e) {
          if (e.target === e.currentTarget) {
            scope.$apply(ctrl.hide);
          }
        });
        $dimmer.append(elem);
        return $dimmer;
      };

      scope.$watch(ctrl.is.animatingIn, function(animatingIn) {
        if (animatingIn) {
          createDimmer();

          if (animation) $animate.cancel(animation);
          elem.removeClass('out');
          elem.css('margin-top', '-' + elem[0].offsetHeight / 2 + 'px');
          animation = $animate.addClass(elem, 'visible animating scale in').then(function() {
            if (ctrl.is.animatingIn()) {
              ctrl.set.active();
            }
          }).finally(function() {
            elem.removeClass('animating scale in');
          });

        }
      });



      scope.$watch(ctrl.is.animatingOut, function(animatingOut) {
        if (animatingOut) {
          $dimmer.controller('dimmer').hide();
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

    }
  };
});
