/**
 * @ngdoc controller
 * @name ItemController
 * @module ui.tab
 * @description
 *
 */
angular.module('ui.tab').controller('ItemController', function() {

  var vm = this;

  var active = false;

  vm.setActive = setActive;
  vm.removeActive = removeActive;
  vm.isActive = isActive;

  function isActive() {
    return active;
  };

  function setActive() {
    active = true;
  };

  function removeActive() {
    active = false;
  };

});
