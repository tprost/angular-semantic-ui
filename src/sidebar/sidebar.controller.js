/**
 * @ngdoc type
 * @name ui.sidebar.SidebarController
 * @module ui.sidebar
 * @description
 *
 */
angular.module('ui.sidebar').controller('SidebarController', function(sidebarSettings) {

  var vm = this;

  var visible = false;
  var animatingIn, animatingOut = false;

  vm.setVisible = setVisible;
  vm.removeVisible = removeVisible;
  vm.isVisible = isVisible;
  vm.isAnimating = isAnimating;
  vm.isAnimatingIn = isAnimatingIn;
  vm.isAnimatingOut = isAnimatingOut;
  vm.show = show;
  vm.hide = hide;
  vm.toggle = toggle;
  vm.removeAnimating = removeAnimating;

  vm.settings = angular.copy(sidebarSettings.defaults);

  function show() {
    visible = true;
    animatingIn = true;
  };

  function hide() {
    animatingOut = true;
  };

  function toggle() {
    return visible ? hide() : show();
  };

  function isVisible() {
    return visible;
  };

  function setVisible() {
    visible = true;
    animatingIn = false;
  };

  function removeVisible() {
    visible = false;
    animatingOut = false;
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

  function removeAnimating() {
    animatingIn = false;
    animatingOut = false;
  };

});
