'use strict';

angular.module('hongcaiApp')
  .directive('realMixMinLength', function(){
    return {
      restrict: 'A',
      require: 'ngModel',
      link:function(scope,ele,attrs,ctrl) {
        var minLen = +attrs.realMixMinLength;
        //View - >Model的更新
        ctrl.$parsers.unshift(function (str) {
          var len = str.match(/[^ -~]/g) === null ? str.length : str.length + str.match(/[^ -~]/g).length;
          if( len >= minLen ){
            ctrl.$setValidity('realMixMinLength', true);
            return str;
          } else{
            ctrl.$setValidity('realMixMinLength', false);
            return undefined;
          }
        });
      }
    };
  });
