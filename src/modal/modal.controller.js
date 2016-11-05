/**
 * @ngdoc controller
 * @name ModalController
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

  // resolved when the modal and dimmer are both hidden
  var deferredHidden;

  // resolved when the modal becomes visible (when it starts animating in)
  //   Note that Semantic UI isn't always consistent with whether
  //   something that is animating in is `visible` or not.
  var deferredVisible;

  // resolved when the modal is active (animated in)
  var deferredActive;

  // resolved when the modal is closed, approved or denied
  var deferredResolution;

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
  vm.close = hide;

  vm.show = show;

  vm.toggle = toggle;
  vm.approve = approve;
  vm.deny = deny;

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
   * gets closed for whatever reason. The result of the promise
   * will be an object with attribute `resolution` set to either
   * `approved`, `denied` or `closed`.
   *
   */
  function show() {
    visible = true;
    if (!active) animatingIn = true;
    animatingOut = false;
    deferredResolution = $q.defer();
    return deferredResolution.promise;
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
    if (deferredResolution) deferredResolution.resolve({
      resolution: 'closed'
    });
    deferredHidden = $q.defer();
    return deferredHidden.promise;
  };

  /**
   * @ngdoc method
   * @name ui.modal.ModalController#approve
   *
   * @description
   * Hides the modal and resolves the modal as `approved`.
   * @returns {Promise} `Promise` that resolves when the modal
   * finishes animating out.
   *
   */
  function approve() {
    deferredResolution.resolve({
      resolution: 'approved'
    });
    return hide();
  };

  /**
   * @ngdoc method
   * @name ui.modal.ModalController#deny
   *
   * @description
   * Hides the modal and resolves the modal as `denied`.
   * @returns {Promise} `Promise` that resolves when the modal
   * finishes animating out.
   *
   */
  function deny() {
    deferredResolution.resolve({
      resolution: 'denied'
    });
    return hide();
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
    if (deferredResolution) deferredResolution.notify(vm);
    if (deferredActive) deferredActive.resolve();
  };

  function removeVisible() {
    animatingOut = false;
    animatingIn = false;
    visible = false;
    if (deferredHidden) deferredHidden.resolve();
  };

  function removeActive() {
    active = false;
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
