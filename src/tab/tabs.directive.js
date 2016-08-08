angular.module('ui').directive('tabs', function() {

  var postLink = function(scope, elem, attrs) {

    if (elem.hasClass('tabs') && elem.hasClass('menu')) {

      // the entire tab segments
      var tabs = [];
      var tab = angular.element(elem.next());
      while (tab.hasClass('tab')) {
        tabs.push(tab);
        tab = angular.element(tab.next());
      }

      // the links to the tabs
      var items = [];
      angular.forEach(elem.children(), function(item) {
        item = angular.element(item);
        items.push(item);
        item.bind('click', function(e) {
          e.preventDefault();
          angular.forEach(items, function(item) {
            item.removeClass('active');
          });
          item.addClass('active');
          angular.forEach(tabs, function(tab) {
            if (tab.attr('data-tab') == item.attr('data-tab')) {
              tab.addClass('active');
            } else {
              tab.removeClass('active');
            }
          });
        });
      });




    }

  };

  return {
    restrict: 'ACE',
    link: postLink
  };
});
