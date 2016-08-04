/**
 * @ngdoc type
 * @name ui.modal.ModalController
 * @module ui.modal
 * @description
 * The controller for the `modal` directive.
 *
 **/
angular.module('ui.modal').controller('ModalController', function($document, $element, $q, modalSettings) {

  var vm = this;
  var active, visible, animatingIn, animatingOut;
  var $parent = null;
  var $dimmer, dimmerController;
  var deferredShow, deferredHide;

  active = false;
  visible = false;
  animatingIn = false;
  animatingOut = false;

  vm.settings = angular.copy(modalSettings.defaults);

  vm.isActive = isActive;
  vm.isVisible = isVisible;
  vm.isAnimating = isAnimating;
  vm.isAnimatingIn = isAnimatingIn;
  vm.isAnimatingOut = isAnimatingOut;

  vm.setActive = setActive;
  vm.setVisible = setVisible;
  vm.setParent = setParent;

  vm.removeActive = removeActive;
  vm.removeVisible = removeVisible;
  vm.removeDimmer = removeDimmer;

  vm.hide = hide;
  vm.show = show;
  vm.toggle = toggle;

  vm.getParent = getParent;
  vm.getModal = getModal;

  vm.hasParent = hasParent;

  /**
   * @ngdoc method
   * @name ui.modal.ModalController#show
   *
   * @description
   * Animate the modal in.
   * @returns {Promise} `Promise` that resolves when the modal
   * finishes animating in.
   *
   */
  function show() {
    visible = true;
    if (!active) animatingIn = true;
    animatingOut = false;
    if (deferredShow) return deferredShow.promise;
    deferredShow = $q.defer();
    return deferredShow.promise;
  };

  /**
   * @ngdoc method
   * @name ui.modal.ModalController#hide
   *
   * @description
   * Animate the modal out.
   * @returns {Promise} `Promise` that resolves when the modal
   * finishes animating out.
   *
   */
  function hide() {
    active = false;
    animatingIn = false;
    if (visible) animatingOut = true;
    if (deferredHide) return deferredHide.promise;
    deferredHide = $q.defer();
    return deferredHide.promise;
  };

  /**
   * @ngdoc method
   * @name ui.modal.ModalController#toggle
   *
   * @description
   * If the modal is active, call `hide()`, otherwise call `show()`.
   */
  function toggle() {
    vm.is.active() ? vm.hide() : vm.show();
  };

  function getDimmer() {
    return $dimmer;
  };

  function getModal() {
    return $element;
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
    resolveShowPromise();
  };

  function removeVisible() {
    animatingOut = false;
    animatingIn = false;
    visible = false;
    resolveHidePromise();
  };

  function removeActive() {
    active = false;
  };

  function resolveShowPromise() {
    if (deferredShow) {
      deferredShow.resolve($element);
      deferredShow = null;
    }
  };

  function resolveHidePromise() {
    if (deferredHide) {
      deferredHide.resolve($element);
      deferredHide = null;
    }
  };

  function hasParent() {
    return angular.isElement($parent);
  };

  function hasDimmer() {
    return angular.isElement($dimmer);
  };

  function getParent() {
    return $parent;
  };

  function setParent(parent) {
    $parent = angular.element(parent);
  };

  function removeDimmer() {
    $dimmer.remove();
    $dimmer = null;
  };

});
