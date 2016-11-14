'use strict';
angular.module('hongcaiApp')
  .controller('CreditSecurityCtrl', ['$location', '$scope', '$http', '$rootScope', '$state', '$stateParams', 'UserCenterService', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService) {
    $rootScope.selectPage_two = $location.path().split('/')[2].split('-')[0];
    $scope.number = $stateParams.number;
    $scope.detailStatus = 1;

    //债权项目信息
    UserCenterService.assignmentCreditDetail.get({
      number: $scope.number 
    }, function(response){
      if (response && response.ret !== -1) {
        $scope.project = response.project;
        $scope.creditRight = response.creditRight;
        $scope.increaseRateCoupon = response.increaseRateCoupon;
        $scope.oriRate = $scope.creditRight.baseRate + $scope.creditRight.riseRate;
        $scope.waitProfit = $scope.creditRight.profit - $scope.creditRight.returnProfit;
      }
    });
    
    //还款计划 
    UserCenterService.getCreditRightBills.get({
      number: $scope.number
    }, function(response){
      if (response && response.ret !== -1) {
        $scope.creditRightBill = response;
      }
    });
    

    

  }]);
