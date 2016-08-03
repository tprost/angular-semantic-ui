/**
 * @ngdoc type
 * @name ui.dimmer.DimmableController
 * @module ui.dimmer
 * @description
 *
 * The controller used in `dimmable` directive. Use it to
 * control the behaviour of the dimmer inside the dimmable.
 *
 */
angular.module('ui.dimmer').controller('DimmableController', function($element, $scope, $compile, $q) {

  var vm = this;
  var $dimmer, dimmerController;

  vm.show = show;
  vm.hide = hide;

  vm.setVisible = setVisible;
  vm.removeVisible = removeVisible;
  vm.isVisible = isVisible;

  vm.setActive = setActive;
  vm.removeActive = removeActive;
  vm.isActive = isActive;

  vm.isAnimating = isAnimating;
  vm.isAnimatingIn = isAnimatingIn;
  vm.isAnimatingOut = isAnimatingOut;

  vm.setDimmer = setDimmer;
  vm.getDimmable = getDimmable;
  vm.getDimmer = getDimmer;

  vm.setDimmer = setDimmer;
  vm.hasDimmer = hasDimmer;

  vm.create = create;

  function getDimmable() {
    return $element;
  };

  function getDimmer() {
    return $dimmer;
  };

  function hasDimmer() {
    return angular.isElement($dimmer);
  };

  function hide() {
    return dimmerController.hide();
  };

  function isActive() {
    return dimmerController.isActive();
  };

  function isAnimating() {
    return dimmerController.isAnimating();
  };

  function isAnimatingIn() {
    return dimmerController.isAnimatingIn();
  };

  function isAnimatingOut() {
    return dimmerController.isAnimatingOut();
  };

  function isVisible() {
    return dimmerController.isVisible();
  };

  function setActive() {
    return dimmerController.setActive();
  };

  function setDimmer(dimmer) {
    $dimmer = angular.element(dimmer);
    dimmerController = $dimmer.controller('dimmer');
  };

  /**
   * @ngdoc method
   * @name ui.dimmer.DimmableController#setVisible
   *
   * @description
   * Makes the dimmer in the dimmable visible.
   *
   */
  function setVisible() {
    return dimmerController.setVisible();
  };

  /**
   * @ngdoc method
   * @name ui.dimmer.DimmableController#removeVisible
   *
   * @description
   * Makes the dimmer in the dimmable hidden.
   *
   */
  function removeVisible() {
    return dimmerController.removeVisible();
  };

  function removeActive() {
    return dimmerController.removeActive();
  };

  function show() {
    return dimmerController.show();
  };

  function create() {
    $dimmer = angular.element('<div class="ui dimmer"></div>');
    $element.append($dimmer);
    $compile($dimmer)($scope);
    dimmerController = $dimmer.controller('dimmer');
    dimmerController.setDimmable($element);
  };

  create();


});
