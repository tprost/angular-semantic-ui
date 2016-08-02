/**
 * @ngdoc type
 * @name ui.dimmer.DimmerController
 * @module ui.dimmer
 * @description
 * The controller used in `dimmer` directive. Use it to
 * control the behaviour of the dimmer.
 *
 **/
angular.module('ui.dimmer').controller('DimmerController', function($scope, $element, $q) {

  $element.addClass('transition');

  var vm = this;
  var animatingIn, animatingOut, active, visible;
  var deferredShow, deferredHide;
  var $dimmable;

  vm.set = {
    visible: setVisible,
    active: setActive,
    dimmable: setDimmable
  };

  vm.remove = {
    visible: removeVisible,
    active: removeActive
  };

  vm.get = {
    dimmable: getDimmable
  };

  vm.hide = hide;
  vm.show = show;

  vm.is = {
    visible: isVisible,
    active: isActive,
    animating: isAnimating,
    animatingIn: isAnimatingIn,
    animatingOut: isAnimatingOut
  };

  function setDimmable(dimmable) {
    $dimmable = angular.element(dimmable);
  };

  // function setDimmableController(_dimmableController_) {
  //   dimmableController = _dimmableController_;
  // };

  function getDimmable() {
    return $dimmable;
  };

  // function getDimmableController() {
  //   return dimmableController;
  // };

  // function getDimmable() {
  //   return $element;
  // };

  // function getDimmer() {
  //   return $dimmer;
  // };

  // function hasDimmer() {
  //   return angular.isElement($dimmer);
  // };

  function hide() {
    if (visible) animatingOut = true;
    animatingIn = false;
    active = false;
    if (deferredHide) return deferredHide.promise;
    deferredHide = $q.defer();
    return deferredHide.promise;
  };

  function show() {
    if (!active) animatingIn = true;
    animatingOut = false;
    visible = true;
    if (deferredShow) return deferredShow.promise;
    deferredShow = $q.defer();
    return deferredShow.promise;
  };

  function isActive() {
    return active;
  };

  function isAnimating() {
    return animatingIn || animatingOut;
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
 
  active = $element.hasClass('active') || $element.hasClass('visible');
  visible = active;

  $scope.$watch(function() {
    return visible && active;
  }, function(shown) {
    if (shown) {
      if (deferredShow) deferredShow.resolve($element);
      deferredShow = null;
    }
  });

  $scope.$watch(function() {
    return !visible && !active;
  }, function(hidden) {
    if (hidden) {
      if (deferredHide) deferredHide.resolve($element);
      deferredHide = null;
    }
  });

});
