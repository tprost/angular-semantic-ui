angular.module('ui.sidebar').provider('sidebarSettings', function() {
  var sidebarSettings = {
    defaults: {
      transition: 'uncover',
      closable: true,
      dimPage: true
    },
    $get: function() {
      return sidebarSettings;
    }
  };
  return sidebarSettings;
});
