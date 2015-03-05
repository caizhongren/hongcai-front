'use strict';
angular.module('hongcaiApp')
  .filter('addPreZero', function () {
    return function (input) {
      input = Number(input);
      if (input === 0) {
        return '0' + String(input);
      } else {
        return;
      }
    };
  });
