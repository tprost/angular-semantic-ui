angular.module('demo', ['ui']);

angular.module('demo').directive('demoOnTheFlyModalButton', function(modal) {

  return {
    restrict: 'ACE',
    link: function(scope, elem, attrs) {
      elem.bind('click', function(e) {
        e.preventDefault();
        modal.openModal({

          template: '<div class="header">Header</div>' +
            '<div class="content">' +
            '<p>Paragraph.</p>' +
            '<p>Paragraph.</p>' +
            '<p>Paragraph.</p>' +
            '</div>'
        });
      });
    }
  };

});

angular.module('demo').directive('demoInlineModalButton', function(modal) {

  return {
    restrict: 'ACE',
    link: function(scope, elem, attrs) {
      elem.bind('click', function(e) {
        e.preventDefault();

        var modalElement = document.getElementById('demo-inline-modal');
        modalElement = angular.element(modalElement);
        modalElement.controller('modal').show();
      });
    }
  };

});

angular.module('demo').directive('demoDimmerButton', function(modal) {

  return {
    restrict: 'ACE',
    link: function(scope, elem, attrs) {
      elem.bind('click', function(e) {
        e.preventDefault();

        var dimmer = document.getElementById('demo-dimmer');
        dimmer = angular.element(dimmer);
        dimmer.controller('dimmer').toggle();
      });
    }
  };

});
