'use strict';
angular.module('hongcaiApp')
  .filter('moreMillion', function () {
    return function (input) {
      input = Number(input);
      if(input >= 1000000 ){
        return parseInt(input);
      } else {
        return input.toFixed(2);
      }
    };
  });
