angular.element(document.querySelector("#example-modal-standard-show-button"))
  .bind('click', function(e) {
    var $modal = angular.element(
      document.querySelector(".ui.modal"));

    $modal.controller('modal').show().then(function() {
      console.log('modal shown');
    });
    $modal.scope().$digest();

  });

angular.element(document.querySelector("#example-root-scope-digest-button"))
  .bind('click', function(e) {
    var $rootScope = angular.injector(['ng', 'ui']).get('$rootScope');
    $rootScope.$digest();
  });

angular.module('demo').directive('murder', function($compile, modalService) {

  return {
    restrict: 'ACE',
    link: function(scope, elem, attrs) {
      elem.bind('click', function(e) {
        e.preventDefault();
        modalService.openModal({
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
