/**
 * @ngdoc directive
 * @name progress
 * @module ui.progress
 *
 */
angular.module('ui.progress').directive('progress', function($animate) {
  return {
    restrict: 'C',
    controller: 'ProgressController',
    link: function(scope, elem, attrs, ctrl) {

      if (elem.hasClass('ui')) {

        if (attrs.total && attrs.value) {
          scope.$watch(attrs.value, function(value) {
            ctrl.setValue(Number(value));
          });
          scope.$watch(attrs.total, function(total) {
            ctrl.setTotal(Number(total));
          });
        } else if (attrs.percent) {
          ctrl.setPercent(Number(attrs.percent));
        }
        scope.$watch(ctrl.getPercent, function(percent) {
          if (angular.isNumber(percent)) {
            if (percent > 100) percent = 100;
            var bar = angular.element(elem[0].querySelector('.bar'));
            bar.css('width', percent + '%');
            var progress = angular.element(elem[0].querySelector('.progress'));
            progress.html(+percent.toFixed(1) + '%');
          }
        });

      }

    }
  };
});
