/**
 * @ngdoc controller
 * @name MenuController
 * @module ui.tab
 * @description
 * Each menu can have a number of tab items. Only one tab item
 * can be selected at a given time.
 */
angular.module('ui.tab').controller('MenuController', function() {

  var vm = this;

  var tabs = [];
  var activeTab = null;

  vm.getActiveTab = getActiveTab;
  vm.setActiveTab = setActiveTab;
  vm.getTabs = getTabs;
  vm.addTab = addTab;
  vm.removeTab = removeTab;

  function getActiveTab() {
    return activeTab;
  };

  function setActiveTab(_tab_) {
    activeTab = _tab_;
  };

  function getTabs() {
    return tabs;
  };

  function addTab(tab) {
    tabs.push(tab);
  };

  function removeTab(tab) {
    var index = tabs.indexOf(tab);
    if (index > -1) {
      tabs.splice(index, 1);
    }
    if (activeTab == tab) {
      activeTab = tabs[0];
    }
  };

});
