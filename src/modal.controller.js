/**
 * @ngdoc type
 * @name ui.modal.ModalController
 * @module ui.modal
 * @description
 * The controller for the `modal` directive.
 *
 **/
angular.module('ui.modal').controller('ModalController', function($document, $element, $scope, $q, modalSettings) {

  var vm = this;
  var active, visible, animatingIn, animatingOut;
  var $parent;

  vm.settings = angular.copy(modalSettings.defaults);

  vm.is = {
    active: isActive,
    visible: isVisible,
    animating: isAnimating,
    animatingIn: isAnimatingIn,
    animatingOut: isAnimatingOut
  };

  vm.set = {
    active: setActive
  };

  vm.remove = {
    visible: removeVisible,
    dimmer: removeDimmer
  };

  vm.hide = hide;
  vm.show = show;
  vm.toggle = toggle;

  vm.refresh = refresh;

  vm.get = {
    parent: getParent,
    modal: getModal
  };

  vm.has = {
    parent: hasParent
  };

  var $dimmer, dimmerController;

  vm.settings = {

  };

  var deferredShow, deferredHide;

  /**
   * @ngdoc function
   * @name ui.modal.ModalController#show
   *
   *
   * @description
   * Show the modal.
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
   * @ngdoc function
   * @name ui.modal.ModalController#hide
   *
   * @description
   * Hide the modal.
   */
  function hide() {
    active = false;
    animatingIn = false;
    if (visible) animatingOut = true;
    if (deferredHide) return deferredHide.promise;
    deferredHide = $q.defer();
    return deferredHide.promise;
  };

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
  };

  function removeVisible() {
    animatingOut = false;
    animatingIn = false;
    visible = false;
  };

  function removeActive() {
    active = false;
  };

  function refresh() {

  };


  active = $element.hasClass('active');
  visible = $element.hasClass('visible');
  // original parent of the modal
  $parent = $element.parent() ? angular.element($element.parent()) : null;

  $element.addClass('transition');

  this.$doCheck = function() {

  };

  $scope.$watch(function() {
    return visible && active && dimmerController && dimmerController.isActive();
  }, function(shown) {
    if (deferredShow) deferredShow.resolve($element);
    deferredShow = null;
  });

  $scope.$watch(function() {
    return !visible && !active;
  }, function(shown) {
    if (deferredHide) deferredHide.resolve($element);
    deferredHide = null;
  });

  function hasParent() {
    return angular.isElement($parent);
  };

  function hasDimmer() {
    return angular.isElement($dimmer);
  };

  function getParent() {
    return $parent;
  };

  function removeDimmer() {
    $dimmer.remove();
    $dimmer = null;
  };

});
