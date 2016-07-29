angular.module('ui.dimmer').controller('DimmableController', function($element, $scope, $compile) {

  this.get = {
    dimmable: function() {
      return $element;
    }
  };

  var dimmer = angular.element($element[0].lastChild);
  if( !dimmer.controller('dimmer')) {
    dimmer = angular.element('<div class="ui dimmer"></div>');
    $element.append(dimmer);
    $compile(dimmer)($scope);
  }

});
