angular.element(document.querySelector("#example-dimmer-basic-show-button"))
  .bind('click', function(e) {
    var $dimmable = angular.element(
      document.querySelector("#example-dimmer-basic")
        .querySelector('.dimmable'));

    $dimmable.controller('dimmable').show().then(function() {
      console.log("dimmable shown");
    });
    $dimmable.scope().$digest();

  });


angular.element(document.querySelector("#example-dimmer-basic-hide-button"))
  .bind('click', function(e) {
    var $dimmable = angular.element(
      document.querySelector("#example-dimmer-basic")
        .querySelector('.dimmable'));

    $dimmable.controller('dimmable').hide().then(function() {
      console.log("dimmable hidden");
    });
    $dimmable.scope().$digest();

  });
