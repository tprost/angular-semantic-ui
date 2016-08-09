angular.module('ui').directive('tab', function() {

  var postLink = function(scope, elem, attrs, ctrl) {


    var menuController = ctrl;

    // if it's a tab item (the actual tab)
    if (menuController && elem.hasClass('item')) {
      menuController.addTab(attrs.tab);
      elem.bind('click', function(e) {
        scope.$apply(function() {
          menuController.setActiveTab(attrs.tab);
        });
      });
      scope.$watch(menuController.getActiveTab, function(activeTabId) {
        elem.toggleClass('active', activeTabId == attrs.tab);
      });
      if (elem.hasClass('active')) menuController.setActiveTab(attrs.tab);
    }

  };

  return {
    require: '?^menu',
    restrict: 'A',
    link: postLink
  };
});

angular.module('ui').directive('tab', function($document) {

  var postLink = function(scope, elem, attrs, ctrl) {
    var tabController = ctrl;

    scope.$watch(tabController.isActive, function(active) {
      elem.toggleClass('active', active);
    });
  };

  return {
    controller: 'TabController',
    restrict: 'C',
    link: postLink
  };
});
