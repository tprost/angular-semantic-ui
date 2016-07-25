angular.module('demo', ['pathgather.popeye']);

angular.module('demo').directive('demoOnTheFlyModalButton', function(Popeye) {

  return {
    restrict: 'ACE',
    link: function(scope, elem, attrs) {
      elem.bind('click', function(e) {
        e.preventDefault();
        var modal = Popeye.openModal({

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

angular.module('demo').directive('demoInlineModalButton', function(Popeye) {

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
