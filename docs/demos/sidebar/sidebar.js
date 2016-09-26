 var button = document.querySelector('#sidebar-demo-button');
 button = angular.element(button);
 button.bind('click', function() {
     var sidebar = document.querySelector('.ui.sidebar');
     sidebar = angular.element(sidebar);
     sidebar.controller('sidebar').toggle();
     sidebar.scope().$digest();
 });

 var closeButton = document.querySelector('#sidebar-demo-close-button');
 closeButton = angular.element(closeButton);
 closeButton.bind('click', function() {
     var sidebar = document.querySelector('.ui.sidebar');
     sidebar = angular.element(sidebar);
     sidebar.controller('sidebar').toggle();
     sidebar.scope().$digest();
 });
