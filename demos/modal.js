angular.element(document.querySelector("#example-modal-standard-show-button"))
  .bind('click', function(e) {
    var $modal = angular.element(
      document.querySelector(".ui.modal"));

    $modal.controller('modal').show();

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
