'use strict';
angular.module('hongcaiApp')
  .controller('CreditCtrl', ['$location', '$scope', '$http', '$rootScope', '$state', '$stateParams', 'UserCenterService', '$aside', '$window', 'OrderService', 'config', 'toaster', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster) {
    $rootScope.redirectUrl = $location.path();
    $rootScope.selectSide = 'credit';

    $scope.creditStepFlag = 1;
    $scope.Math = window.Math;
  }]);
