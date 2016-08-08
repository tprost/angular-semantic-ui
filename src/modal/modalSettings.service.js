angular.module('ui.modal').provider('modalSettings', function() {
  var modalSettings = {
    defaults: {
      centerUsingMarginTop: true,
      closable: true // closable by clicking on the dimmer or otherwise
    },
    $get: function() {
      return modalSettings;
    }
  };
  return modalSettings;
});
