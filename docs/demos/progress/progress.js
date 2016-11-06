angular.element(document.querySelector("#example-progress-1-button"))
  .bind('click', function(e) {

    var progress = angular.element(
      document.querySelector("#example-progress-1"));

    var controller = progress.controller('progress');

    var value = controller.getValue();

    controller.setValue(value + 10);

    progress.scope().$digest();

  });
