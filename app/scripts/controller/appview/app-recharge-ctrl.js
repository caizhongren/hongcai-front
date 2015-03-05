'use strict';
angular.module('hongcaiApp')
  .controller('AppRechargeCtrl', ['$scope','$location', function($scope, $location) {
    $scope.goInvest = function () {
      $location.path('/apprecharge-success/' + 'Continue to invest');
      window.location.reload();
    }
    $scope.goPersonal = function() {
      $location.path('/apprecharge-success/' + 'Personal Center');
      window.location.reload();
    }
  }]);
