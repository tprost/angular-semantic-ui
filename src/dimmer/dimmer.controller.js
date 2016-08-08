/**
 * @ngdoc type
 * @name ui.dimmer.DimmerController
 * @module ui.dimmer
 * @description
 * The controller used in `dimmer` directive. Use it to
 * control the behaviour of the dimmer.
 *
 **/
angular.module('ui.dimmer').controller('DimmerController', function($scope, $element, $q, dimmerSettings) {

  $element.addClass('transition');

  var vm = this;
  var animatingIn, animatingOut, active, visible;
  var deferredShow, deferredHide;
  var $dimmable;

  vm.setVisible = setVisible;
  vm.removeVisible = removeVisible;
  vm.isVisible = isVisible;

  vm.setActive = setActive;
  vm.removeActive = removeActive;
  vm.isActive = isActive;

  vm.setDimmable = setDimmable;
  vm.getDimmable = getDimmable;

  vm.hide = hide;
  vm.show = show;

  vm.isAnimating = isAnimating;
  vm.isAnimatingOut = isAnimatingOut;
  vm.isAnimatingIn = isAnimatingIn;

  vm.settings = angular.copy(dimmerSettings.defaults);

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

  /**
   * @ngdoc method
   * @name ui.dimmer.DimmerController#hide
   *
   * @description
   * Animate out the dimmer.
   * @returns {Promise} `Promise` that resolves when the dimmer animates out.
   *
   */
  function hide() {
    if (visible) animatingOut = true;
    animatingIn = false;
    active = false;
    if (deferredHide) return deferredHide.promise;
    deferredHide = $q.defer();
    return deferredHide.promise;
  };

  /**
   * @ngdoc method
   * @name ui.dimmer.DimmerController#show
   *
   * @description
   * Animate in the dimmer.
   * @returns {Promise} `Promise` that resolves when the dimmer animates in.
   *
   */
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
    finishedAnimatingIn();
  };

  function removeVisible() {
    animatingOut = false;
    animatingIn = false;
    visible = false;
    finishedAnimatingOut();
  };

  function removeActive() {
    active = false;
  };

  function finishedAnimatingIn() {
    if (deferredShow) {
      deferredShow.resolve($element);
      deferredShow = null;
    }
  };

  function finishedAnimatingOut() {
    if (deferredHide) {
      deferredHide.resolve($element);
      deferredHide = null;
    }
  };

  active = $element.hasClass('active') || $element.hasClass('visible');
  visible = active;

});
