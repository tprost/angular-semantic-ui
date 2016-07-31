angular.module('ui.dimmer').controller('DimmableController', function($element, $scope, $compile, $q) {

  var vm = this;
  var visible = false;
  var active = false;
  var animatingIn, animatingOut = false;

  var $dimmer, dimmerController;

  vm.show = show;
  vm.hide = hide;

  vm.is = {
    active: isActive,
    visible: isVisible,
    animating: isAnimating,
    animatingIn: isAnimatingIn,
    animatingOut: isAnimatingOut
  };

  vm.get = {
    dimmable: getDimmable,
    dimmer: getDimmer
  };

  vm.set = {
    visible: setVisible,
    active: setActive,
    dimmer: setDimmer
  };

  vm.remove = {
    visible: removeVisible,
    active: removeActive
  };

  vm.has = {
    dimmer: hasDimmer
  };

  vm.create = create;

  vm.$postLink = function() {
    if (!vm.has.dimmer()) vm.create();
  };

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
    return dimmerController.is.active();
  };

  function isAnimating() {
    return dimmerController.is.animating();
  };

  function isAnimatingIn() {
    return dimmerController.is.animatingIn();
  };

  function isAnimatingOut() {
    return dimmerController.is.animatingOut();
  };

  function isVisible() {
    return dimmerController.is.visible();
  };

  function setActive() {
    return dimmerController.set.active();
  };

  function setDimmer(dimmer) {
    $dimmer = angular.element(dimmer);
  };

  function setVisible() {
    return dimmerController.set.visible();
  };

  function removeVisible() {
    return dimmerController.remove.visible();
  };

  function removeActive() {
    return dimmerController.remove.active();
  };

  function show() {
    return dimmerController.show();
  };

  function create() {
    $dimmer = angular.element('<div class="ui dimmer"></div>');
    $element.append($dimmer);
    $compile($dimmer)($scope);
    dimmerController = $dimmer.controller('dimmer');
  };



});
