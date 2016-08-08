angular.module('ui.dimmer').provider('dimmerSettings', function() {
  var dimmerSettings = {
    defaults: {
      transition: 'fade'
    },
    $get: function() {
      return dimmerSettings;
    }
  };
  return dimmerSettings;
});
