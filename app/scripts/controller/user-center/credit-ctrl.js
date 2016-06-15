'use strict';
angular.module('hongcaiApp')
  .controller('CreditCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster, $alert) {
    //判断是否开通第三方托管账户
    $scope.checkTrusteeshipAccount = function() {
      if ( $rootScope.securityStatus.trusteeshipAccountStatus === 1) {
        $scope.haveTrusteeshipAccount = true;
      } else {
        $scope.haveTrusteeshipAccount = false;
      }
      return $scope.haveTrusteeshipAccount;
    }



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
    UserCenterService.getCreditRightStatistics.get({}, function(response) {
      if (response.ret === 1) {
        $scope.creditRightStatis = response.data.creditRightStatis;
        $scope.showCreditRightStatistics = $scope.creditRightStatis.totalInvestCount;
      } else {
        $scope.showCreditRightStatistics = false;
        toaster.pop('warning', response.msg);
      }
    });

    /**
     * 加载债权
     * @param  page      第几页
     * @param  pageSize  每页数据长度
     * @param  status   状态
     */
    $scope.loadCredits = function(page, pageSize, status){
      UserCenterService.getHeldInCreditRightList.get({
        page: page,
        pageSize: pageSize,
        status: status
      }, function(response) {
        if (response.ret === 1) {
          $scope.currentPage = page;
          $scope.pageSize = pageSize;
          $scope.searchStatus = status;


          $scope.heldInCreditList = response.data.heldIdCreditList;
          $scope.creditRightTransferStatusMap = response.data.creditRightTransferStatusMap;
          $scope.creditRightStatusMap = response.data.creditRightStatusMap;
          $scope.productsMap = response.data.productsMap;
          $scope.fundsPoolInOutMap = response.data.fundsPoolInOutMap;
          $scope.count = response.data.count;
          $scope.numberOfPages = Math.ceil($scope.count / pageSize);
        } else {
          toaster.pop('warning', response.msg);
        }
      });

    }

    

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
      if ($rootScope.autoTransfer !== 1) {
        $scope.msg = '亲~，开启自动续投功能需要先开通自动投标权限哦!';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-openReservation.html',
          show: true
        });
      } else {
        UserCenterService.autoReinvest.get({
          repeat:reinvestActionType,
          creditRightId:creditRightId
        },function(response){
          if(response.ret === 1) {
            $state.reload();
          } else {
            if (response.code == -1082) {
              $scope.msg = '亲~，开启自动续投功能需要先开通自动投标权限哦!';
              $alert({
                scope: $scope,
                template: 'views/modal/alert-openReservation.html',
                show: true
              });
            } else {
              toaster.pop('warning', response.msg);
            }
          }
        });
      }
    }


    /**
     * 平台C债权转入债权池
     */
    $scope.putCreditRightInPool = function(creditRightId) {
      UserCenterService.putCreditRightInPool.get({
        creditRightId:creditRightId
      },function(response){
        if(response.ret === 1) {
          $state.reload();
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    }

    $scope.searchStatus = parseInt($stateParams.searchStatus) || 1;
    $scope.currentPage = 1;
    $scope.pageSize = 6;


    $scope.loadCredits($scope.currentPage, $scope.pageSize, $scope.searchStatus);

  });
