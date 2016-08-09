angular.module('ui').directive('menu', function($document) {

  var postLink = function(scope, elem, attrs, ctrl) {
    scope.$watch(ctrl.getActiveTab, function(activeTabId) {

      angular.forEach(ctrl.getTabs(), function(tabId) {
        var tab = $document[0].querySelector('.tab' + '[data-tab="' + tabId + '"]');
        tab = angular.element(tab);
        var controller = tab.controller('tab');
        if (tab.attr('data-tab') == activeTabId) {
          controller.setActive();
        } else {
          controller.removeActive();
        }
      });

    });
  };

  return {
    controller: 'MenuController',
    restrict: 'C',
    link: postLink
  };
});
