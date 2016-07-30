angular.element(document.querySelector("#example-dimmer-basic-show-button"))
  .bind('click', function(e) {
    var $dimmable = angular.element(
      document.querySelector("#example-dimmer-basic")
        .querySelector('.dimmable'));

    $dimmable.controller('dimmable').show();
    $dimmable.scope().$digest();

  });


angular.element(document.querySelector("#example-dimmer-basic-hide-button"))
  .bind('click', function(e) {
    var $dimmable = angular.element(
      document.querySelector("#example-dimmer-basic")
        .querySelector('.dimmable'));

    $dimmable.controller('dimmable').hide();
    $dimmable.scope().$digest();

  });
