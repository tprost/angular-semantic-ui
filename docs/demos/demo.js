var demoApp = angular.module('demo', ['ui', 'ngAnimate']);

demoApp.config(function(sidebarSettingsProvider) {
  sidebarSettingsProvider.defaults.closable = false;
  sidebarSettingsProvider.defaults.dimPage = false;
});
