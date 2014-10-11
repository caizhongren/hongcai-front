'use strict';
angular.module('hongcaiApp').directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var checker = function () {
                var e1 = $("#" + attrs.name).val();
                var e2 = $("#" + attrs.passwordMatch).val();
                return e1 == e2;
            };
            scope.$watch(checker, function(n) {
                ctrl.$setValidity("passwordmatch", n);
            });
        }
    };
}]);