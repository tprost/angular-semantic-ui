angular.module('ui.dimmer').controller('DimmableController', function($element, $scope, $compile) {

  var vm = this;
  var visible = false;
  var active = false;
  var animatingIn, animatingOut = false;

  var $dimmer;

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
    if (visible) animatingOut = true;
    animatingIn = false;
    active = false;
  };

  function isActive() {
    return active;
  };

  function isAnimating() {
    return vm.isAnimatingIn() || vm.isAnimatingOut();
  };

  function isAnimatingIn() {
    return animatingIn;
  };

  function isAnimatingOut() {
    return animatingOut;
  };

  function isVisible() {
    return visible;
  };

  function setDimmer(dimmer) {
    $dimmer = angular.element(dimmer);
  };

  function setVisible() {
    visible = true;
  };

  function setActive() {
    animatingIn = false;
    animatingOut = false;
    visible = true;
    active = true;
  };

  function removeVisible() {
    animatingOut = false;
    animatingIn = false;
    visible = false;
  };

  function removeActive() {
    active = false;
  };

  function show() {
    animatingOut = false;
    visible = true;
    if (!active) {
      animatingIn = true;
    }
  };

  function create() {
    $dimmer = angular.element('<div class="ui dimmer"></div>');
    $element.append($dimmer);
    $compile($dimmer)($scope);
  };

});
