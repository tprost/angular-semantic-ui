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
          ctrl.setTotal(attrs.total);
          ctrl.setValue(attrs.value);
        }
        scope.$watch(ctrl.getPercent, function(percent) {
          var bar = angular.element(elem[0].querySelector('.bar'));
          bar.css('width', percent + '%');
          var progress = angular.element(elem[0].querySelector('.progress'));
          progress.html(+percent.toFixed(1) + '%');
        });

      }

    }
  };
});
