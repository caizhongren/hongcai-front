'use strict';
angular.module('hongcaiApp')
  .controller('CreditCtrl', ['$location', '$scope', '$http', '$rootScope', '$state', '$stateParams', 'UserCenterService', '$aside', '$window', 'OrderService', 'config', 'toaster', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster) {
    //判断是否开通第三方托管账户
    if ( $rootScope.securityStatus.trusteeshipAccountStatus === 1) {
      $scope.haveTrusteeshipAccount = true;
    } else {
      $scope.haveTrusteeshipAccount = false;
    }

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
      } else if ($scope.creditStepFlag === 2) {
        $scope.disabledFlag3 = true;
      } else {
        $scope.disabledFlag2 = false;
      }
    });
   
    /**
     * 我的债权统计数据
     */
    $scope.getCreditRightStatistics = function() {
      UserCenterService.getCreditRightStatistics.get({}, function(response) {
        if (response.ret === 1) {
          $scope.data = response.data;
        } else {
          console.log(response);
        }
      });
    };

    $scope.getCreditRightStatistics ();

    /**
     * 获得持有中债权列表
     */
    $scope.getHeldInCreditRightList = function(searchStatus) {
      $scope.searchStatus = searchStatus;

      UserCenterService.getHeldInCreditRightList.get({status: searchStatus}, function(response) {
        if(response.ret == 1) {
          $scope.heldInCreditList = response.data.heldIdCreditList;
          $scope.creditRightTransferStatusMap = response.data.creditRightTransferStatusMap;
          $scope.creditRightStatusMap = response.data.creditRightStatusMap;
          $scope.productsMap = response.data.productsMap;
          $scope.fundsPoolInOutMap = response.data.fundsPoolInOutMap;
          console.log(response);
        } else {
          console.log(response);
        }
        
      });
    };

    $scope.getHeldInCreditRightList(1);

    /**
     * 获取转让中债权列表
     */
    $scope.getTranferingCreditRightList = function(searchStatus) {
      UserCenterService.getTranferCreditRightList.get({
        status: searchStatus
      }, function(response) {
        $scope.searchStatus = 2;
        $scope.transferingCreditList = response.data.transferCreditList;
        $scope.assignmentStatusMap = response.data.assignmentStatusMap;
      });
    }

    /**
     * 获取已回款债权列表
     */
    $scope.getTranferedCreditRightList = function(searchStatus) {
      UserCenterService.getTranferCreditRightList.get({
        status: searchStatus
      }, function(response) {
        $scope.searchStatus = 3;
        $scope.transferedCreditList = response.data.transferCreditList;
        $scope.assignmentStatusMap = response.data.assignmentStatusMap;
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
          var initAmount = soldStock * increaseAmount;
          //回收的折让金
          var returnDiscountAmount = discountAmount * soldStock / totalStock;
          //回收款项
          var backAmount = soldStock * increaseAmount + returnDiscountAmount;
          //收益
          var profit = backAmount - initAmount;

          transferedCreditList[i].initAmount = initAmount;
          transferedCreditList[i].backAmount = backAmount;
          transferedCreditList[i].profit = profit;
        }
      });
    }


    /**
     * 撤销债权转让
     */
    $scope.cancelCreditAssignment = function(creditAssignment) {
      UserCenterService.cancelCreditAssignment.get({
        assignmentNumber:creditAssignment.number
      },function(response){
        $scope.getTranferingCreditRightList(2);
      });
    }

    /**
     * 自动复投/取消复投
     */
    $scope.autoReinvest = function(reinvestActionType,creditRightId) {
      UserCenterService.autoReinvest.get({
        repeat:reinvestActionType,
        creditRightId:creditRightId
      },function(response){
        console.log(response);
        if(response.ret === 1) {
          window.location.reload();
        } else {
          console.log(response);
        }
      });
    }


    /**
     * 平台C债权转入债权池
     */
    $scope.putCreditRightInPool = function(creditRightId) {
      UserCenterService.putCreditRightInPool.get({
        creditRightId:creditRightId
      },function(response){
        if(response.ret === 1) {
          window.location.reload();
        } else {
          console.log(response);
        }
      });
    }

    /*$scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function(data) {
      return Math.ceil(data.length / $scope.pageSize);
    };*/

    // $scope.getTranferedCreditRightList(3);
    // $scope.getTranferingCreditRightList(2);
  }]);
