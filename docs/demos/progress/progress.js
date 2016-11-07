angular.element(document.querySelector("#example-progress-1-button"))
  .bind('click', function(e) {

    var progress = angular.element(
      document.querySelector("#example-progress-1"));

    var controller = progress.controller('progress');

    var value = controller.getValue();

    controller.setValue(value + 10);

    progress.scope().$digest();

  });


angular.module('demo').controller('Example2Controller', function($scope) {
  $scope.value = 4;
  $scope.total = 10;
});
