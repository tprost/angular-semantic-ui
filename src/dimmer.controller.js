/**
 * @ngdoc controller
 * @name ui.dimmer.controller:DimmerController
 * @description
 * The controller for a `dimmer` element.
 *
 **/
angular.module('ui.dimmer').controller('DimmerController', function($element) {

  $element.addClass('transition');

  var vm = this;
  var $dimmable, dimmableController;

  vm.set = {
    dimmable: setDimmable,
    dimmableController: setDimmableController
  };

  vm.get = {
    dimmable: getDimmable,
    dimmableController: getDimmableController
  };

  vm.hide = function() {
    return dimmableController.hide();
  };

  vm.show = function() {
    return dimmableController.show();
  };

  function setDimmable(dimmable) {
    $dimmable = angular.element(dimmable);
    if ($dimmable.controller('dimmable')) dimmableController = $dimmable.controller('dimmable');
  };

  function setDimmableController(_dimmableController_) {
    dimmableController = _dimmableController_;
  };

  function getDimmable() {
    return $dimmable;
  };

  function getDimmableController() {
    return dimmableController;
  };


});
