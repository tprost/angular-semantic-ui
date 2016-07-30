angular.element(document.querySelector("#example-modal-standard-show-button"))
  .bind('click', function(e) {
    var $modal = angular.element(
      document.querySelector(".ui.modal"));

    $modal.controller('modal').show();
    $modal.scope().$digest();

  });

angular.element(document.querySelector("#example-root-scope-digest-button"))
  .bind('click', function(e) {
    var $rootScope = angular.injector(['ng', 'ui']).get('$rootScope');
    $rootScope.$digest();
  });

angular.element(document.querySelector("#example-modal-dynamic-show-button"))
  .bind('click', function(e) {
    var modalService = angular.injector(['ng', 'ui']).get('modalService');

    modalService.openModal({

      template: '<div class="header">Header</div>' +
        '<div class="content">' +
        '<p>Paragraph.</p>' +
        '<p>Paragraph.</p>' +
        '<p>Paragraph.</p>' +
        '</div>'
    });
  });
