angular.module('ui.sidebar').provider('sidebarSettings', function() {
  var sidebarSettings = {
    defaults: {
      transition: 'uncover'
    },
    $get: function() {
      return sidebarSettings;
    }
  };
  return sidebarSettings;
});
