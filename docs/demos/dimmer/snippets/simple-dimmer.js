var $dimmable = angular.element(document.querySelector('.dimmable'));

// show
$dimmable.controller('dimmable').show().then(function() {
  console.log("dimmable shown");
});
$dimmable.scope().$digest();

// hide
$dimmable.controller('dimmable').hide().then(function() {
  console.log("dimmable hidden");
});
$dimmable.scope().$digest();
