
var angular, popeye,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

popeye = function(angular) {
  "use strict";
  var mod;
  mod = angular.module('ui.modal');
};

if ((typeof window !== "undefined" && window !== null ? window.angular : void 0) != null) {
  popeye(window.angular);
} else if (typeof require === "function") {
  angular = require("angular");
  popeye(angular);
} else {
  throw new Error("Could not find angular on window nor via require()");
}

if (typeof module !== "undefined" && module !== null) {
  module.exports = "ui.modal";
}
