angular.module('ui.modal').provider('modalSettings', function() {
  var modalSettings = {
    defaults: {
      centerUsingMarginTop: true
    },
    $get: function() {
      return modalSettings;
    }
  };
  return modalSettings;
});
