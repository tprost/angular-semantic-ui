angular.module('ui').directive('item', function() {

  var postLink = function(scope, elem, attrs, ctrl) {
// var menuController = ctrl[1];
// var itemController = ctrl[0];
//     scope.$watch(ctrl.isActive, function(active) {
//       elem.toggleClass('active', active);
//     });
  };

  return {
    require: '?^menu',
    controller: 'ItemController',
    restrict: 'C',
    link: postLink
  };
});
