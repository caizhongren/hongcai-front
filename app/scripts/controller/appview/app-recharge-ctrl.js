'use strict';
angular.module('hongcaiApp')
  .controller('AppRechargeCtrl', ['$scope','$location','$window', function($scope, $location, $window) {
    $scope.goInvest = function () {
      // $location.path('/apprecharge-success/' + 'Continue to invest');
      // console.log('location:' + $location.absUrl());
      $window.location.href = $location.absUrl() + 'Continue to invest';
    }
    $scope.goPersonal = function() {
      $window.location.href = $location.absUrl() + 'Personal Center';
      // $location.path('/apprecharge-success/' + 'Personal Center');
      // window.location.reload();
    }
  }]);
