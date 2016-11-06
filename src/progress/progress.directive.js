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
        if (attrs.total) {
          ctrl.setTotal(Number(attrs.total));
          ctrl.setValue(Number(attrs.value));
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
