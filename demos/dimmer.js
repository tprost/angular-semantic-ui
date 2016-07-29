angular.element(document.querySelector("#example-dimmer-basic-show-button"))
  .bind('click', function(e) {
    var $dimmer = angular.element(
      document.querySelector("#example-dimmer-basic")
        .querySelector('.dimmer'));

    $dimmer.controller('dimmer').show();

  });


angular.element(document.querySelector("#example-dimmer-basic-hide-button"))
  .bind('click', function(e) {
    var $dimmer = angular.element(
      document.querySelector("#example-dimmer-basic")
        .querySelector('.dimmer'));

    $dimmer.controller('dimmer').hide();

  });
