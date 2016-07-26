angular.module('ui.modal').controller('ModalController', function($document) {

  var controller = this;
  var dimmer;
  // original parent of the modal
  var parent;

  this.$initialize = function(modal) {
    this.modal = modal;
    parent = this.modal.parent();
  };

  this.show = function() {
    this.modal.addClass('transition active visible');

    var body, bodyLastChild;
    body = angular.element($document.find('body'));
    body.addClass('dimmable dimmed');
    dimmer = angular.element('<div class="ui dimmer transition active visible"></div>');
    dimmer.bind('click', function(e) {
      controller.hide();
    });
    body.append(dimmer);
    dimmer.append(this.modal);
  };

  this.hide = function() {
    this.modal.removeClass('active visible');
    parent.append(this.modal);
    dimmer.remove();

  };

});

angular.module('ui.modal').directive('modal', function() {
  return {
    restrict: 'C',
    controller: 'ModalController',
    link: function(scope, elem, attrs, ctrl) {
      if (elem.hasClass('ui')) {
        ctrl.$initialize(elem);
      }
    }
  };
});
