var myApp = angular.module("myApp", ["ui.modal"]);

myApp.config(function(modalSettingsProvider) {
  modalSettingsProvider.defaults.centerUsingMarginTop = false;
});

