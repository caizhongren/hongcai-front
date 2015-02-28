'use strict';
angular.module('hongcaiApp')
  .controller('CreditCtrl', ['$location', '$scope', '$http', '$rootScope', '$state', '$stateParams', 'UserCenterService', '$aside', '$window', 'OrderService', 'config', 'toaster', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster) {
    $rootScope.redirectUrl = $location.path();
    $rootScope.selectSide = 'credit';
    // 第一步
    $scope.creditStepFlag = 1;
    $scope.Math = window.Math;
    $scope.disabledFlag1 = $scope.disabledFlag2 = $scope.disabledFlag3 = false;
    // 解决ng-click ng-disabled的生效的问题。
    $scope.$watch('creditStepFlag', function() {
      if ($scope.creditStepFlag === 1) {
        $scope.disabledFlag2 = true;
        $scope.disabledFlag3 = true;
      } else if ($scope.creditStepFlag === 2){
        $scope.disabledFlag3 = true;
      } else {
        $scope.disabledFlag2 = false;
      }
    });


    /**
     * 获得持有中债权列表
     */
    $scope.getHeldInCreditRightList = function(){
      $scope.searchStatus = 1;

      UserCenterService.getHeldInCreditRightList.get({}, function(response){
        $scope.heldIdCreditList = response.data.heldIdCreditList;
      });
    };

    $scope.getHeldInCreditRightList();

    $scope.getTranferingCreditRightList = function(searchStatus){
      UserCenterService.getTranferCreditRightList.get({
        status:searchStatus
      },function(response){
        $scope.transferingCreditList = response.data.transferCreditList;
      });
    }

  $scope.getTranferedCreditRightList = function(searchStatus){
      UserCenterService.getTranferCreditRightList.get({
        status:searchStatus
      },function(response){
        $scope.transferedCreditList = response.data.transferCreditList;
          for (var i = 0; i < $scope.transferedCreditList.length; i++) {
              //步进值
              var increaseAmount = transferedCreditList[i].project.increaseAmount;
              //剩余份数
              var currentStock = transferedCreditList[i].creditAssignment.currentStock;
              //卖出份数
              var soldStock = transferedCreditList[i].creditAssignment.soldStock;
              //折让金
              var discountAmount = transferedCreditList[i].creditAssignment.discountAmount;
              //总份数
              var totalStock = soldStock + currentStock;

              //初始债权
              var initAmount = soldStock*increaseAmount;
              //回收的折让金
              var returnDiscountAmount = discountAmount * soldStock/totalStock;
              //回收款项
              var backAmount = soldStock*increaseAmount + returnDiscountAmount;
              //收益
              var profit = backAmount - initAmount;

              transferedCreditList[i].initAmount = initAmount;
              transferedCreditList[i].backAmount = backAmount;
              transferedCreditList[i].profit = profit;
          }
      });
    }
    $scope.getTranferedCreditRightList(3);
    $scope.getTranferingCreditRightList(2);
  }]);
