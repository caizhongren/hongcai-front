'use strict';
angular.module('hongcaiApp')
  .controller('assignmentsCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster, $alert) {
    /**
     * 判断是否开通第三方托管账户
     */
    $scope.checkTrusteeshipAccount = function() {
      if ( $rootScope.securityStatus.trusteeshipAccountStatus === 1) {
        $scope.haveTrusteeshipAccount = true;
      } else {
        $scope.haveTrusteeshipAccount = false;
      }
      return $scope.haveTrusteeshipAccount;
    }



    /**
     * 第一步
     */
    $scope.creditStepFlag = 1;
    $scope.Math = window.Math;
    $scope.disabledFlag1 = $scope.disabledFlag2 = $scope.disabledFlag3 = false;
    /**
     * 解决ng-click ng-disabled的生效的问题。
     */
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
        // toaster.pop('warning', response.msg);
      }
    });

    /**
     * 加载债权
     * @param  page      第几页
     * @param  pageSize  每页数据长度
     * @param  status   状态
     */
    $scope.currentDate = new Date().getTime();
    $scope.loadAssignments = function(page, pageSize, status){
      UserCenterService.assignmentsTransferablesList.get({
        page: page,
        pageSize: pageSize
      }, function(response) {
        if (response.transferables.length >0) {
          $scope.currentPage = page;
          $scope.pageSize = pageSize;
          $scope.searchStatus = status;

          $scope.transferablesList = response.transferables;
          $scope.count = response.count;
          $scope.numberOfPages = Math.ceil($scope.count / pageSize);
        } else {
        }
      });

    }
    

    /**
     * 获取转让中债权列表
     */
    $scope.getTranferingCreditRightList = function(page, pageSize, searchStatus) {
      $scope.searchStatus = searchStatus;
      UserCenterService.assignmentsList.get({
        page: 1,
        pageSize: 3,
        status: searchStatus
      },function(response){
        if (response.data.length > 0) {
          $scope.assignmentsList = response.data; 
          $scope.index = response.index;
          $scope.totalPage = response.totalPage;
          $scope.pageSize2 = response.pageSize;
          $scope.total = response.total;
        }
      });
    }


    /**
     * 撤销债权转让
     */
    $scope.cancelCreditAssignment = function(creditAssignment) {
      UserCenterService.cancelAssignment.update({
        assignmentNumber: creditAssignment.number,
        status: 2

      },function(response){

      });
      $alert({
        scope: $scope,
        template: 'views/modal/cancelCreditAssignment.html',
        show: true
      });
    }
    $scope.cancelAssignmentTrue = 1;

    $stateParams.tab = 1;
    $scope.searchStatus = parseInt($stateParams.tab) || 1;
    $scope.currentPage = 1;
    $scope.pageSize = 6;

    $scope.loadAssignments($scope.currentPage, $scope.pageSize, $scope.searchStatus);

  });
