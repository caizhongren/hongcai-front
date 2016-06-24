'use strict';
angular.module('hongcaiApp')
  .controller('CreditDetailsCtrl', ['$scope', '$state', '$rootScope', '$location', '$stateParams', 'CreditService', 'OrderService', '$modal', '$alert', 'toaster', '$timeout', 'ipCookie', 'MainService', function($scope, $state, $rootScope, $location, $stateParams, CreditService, OrderService, $modal, $alert, toaster, $timeout, ipCookie, MainService) {
    var number = $stateParams.assignmentNumber;
    if (!number) {
      $state.go('root.credit-list-query-no');
    }
    CreditService.creditAssignmentDetail.get({
      assignmentNumber: number
    }, function(response) {
      if (response.ret === 1) {
        $scope.creditAssignment = response.data.creditAssignment;
        $scope.project = response.data.project;
        $scope.projectInfo = response.data.projectInfo;
        $scope.orderList = response.data.orderList;
        $scope.enterprise = response.data.enterprise;
        $scope.enterpriseThumbnailFileList = response.data.enterpriseThumbnailFileList;
        $scope.enterpriseOriginalFileList = response.data.enterpriseOriginalFileList;
        /**
         * 可投金额
         */
        $scope.creditAssignmentInvestNum = $scope.creditAssignment.amount - ($scope.creditAssignment.soldStock + $scope.creditAssignment.occupancyStock) * $scope.project.increaseAmount;
        if ($scope.creditAssignment.status === 1) {
          if ($rootScope.account) {
            $scope.userCanCreditInvestNum = $scope.creditAssignmentInvestNum > $rootScope.account.balance ? $rootScope.account.balance : $scope.creditAssignmentInvestNum;
          } else {
            $scope.userCanCreditInvestNum = 0
          }
          if ($rootScope.isLogged) {
            if ($rootScope.securityStatus.realNameAuthStatus === 1) {
              /**
               * 实名认证用户
               */
              $scope.creFlag = 2;
            } else {
              /**
               * 开启普通用户
               */
              $scope.creFlag = 1;
            }
          } else {
            /**
             * 未登录
             */
            $scope.creFlag = 0;
          }
        }
      } else {
        $state.go('root.credit-list-query-no');
      }
    });


    $scope.toRealNameAuth = function() {
      if ($rootScope.securityStatus.realNameAuthStatus !== 1) {
        $modal({
          scope: $scope,
          template: 'views/modal/modal-toRealNameAuth.html',
          show: true
        });
      }
    };

    $scope.toRecharge = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/modal-toRecharge.html',
        show: true
      });
    };

    $scope.expectedCal = function(subscribeAmount) {
      var creditAssignment = $scope.creditAssignment;
      if (!subscribeAmount) {
        return {
          discountAmount: 0,
          realPay: 0,
          profit: 0
        };
      }
      var profit = creditAssignment.annualEarnings * subscribeAmount * creditAssignment.remainDay / 365;
      var discountAmount = creditAssignment.discountAmount * subscribeAmount / creditAssignment.amount;
      var realPay = Number(subscribeAmount) + Number(discountAmount);
      return {
        discountAmount: discountAmount,
        realPay: realPay,
        profit: profit
      }
    }

    $scope.toAllCreditInvest = function() {
      $scope.subscribeAmount = $scope.userCanCreditInvestNum;
    }

    /*
     * 认购债权
     */
    $scope.subscribeCreditRight = function(subscribeAmount) {
      $scope.creAmount = subscribeAmount;
      if ($scope.creFlag === 0) {
        $rootScope.tologin();
      } else if ($scope.creFlag === 1) {
        $scope.toRealNameAuth();
      } else if ($scope.creFlag === 2) {
        CreditService.subscribeCreditRight.get({
          assignmentNumber: $scope.creditAssignment.number,
          subscribeAmount: subscribeAmount,
        }, function(response) {
          if (response.ret === 1) {

          } else {
            toaster.pop('warning', response.msg);
          }
        });
      }
    }

    $scope.checkStepAmount = function(subscribeAmount) {
      if (subscribeAmount >= 100) {
        if (subscribeAmount % 100 === 0) {
          return false;
        } else {
          return true;
        }
      }
    };
    $scope.checkLargeUserCanAmount = function(subscribeAmount) {
      if ($rootScope.account.balance < subscribeAmount) {
        return true;
      } else {
        return false;
      }
    };



    $scope.project = {
      'progress': 10,
      'increaseAmount': 100
    }
    $scope.securityStatus = {
      'mobileStatus': 1,
      'realNameAuthStatus': 1,
      'emailStatus': 1
    }

    $rootScope.selectPage = $location.path().split('/')[1];

    $scope.tabs = [{
      title: '项目信息',
    }, {
      title: '企业信息',
    }, {
      title: '风控信息',
    }, {
      title: '相关文件',
    }, {
      title: '项目历程',
    }];


    $scope.tabsRight = [{
      title: '投资记录',
    }, {
      title: '还款计划',
    }];

    $scope.tabsRightReserve = [{
      title: '当前预约',
    }, {
      title: '我的预约记录',
    }];
    $scope.toggle = {};
    $scope.toggle.switchTab = function(tabIndex) {
      $scope.toggle.activeTab = tabIndex;
    };

    $scope.toggle.switchTabRight = function(tabIndexRight) {
      $scope.toggle.activeTabRight = tabIndexRight;
    };

    $scope.toggle.switchTabRightReserve = function(tabIndexRightReserve) {
      $scope.toggle.activeTabRightReserve = tabIndexRightReserve;
    };


    $scope.toLogin = function() {
      var thisUrl = $location.path();
      $location.path('/login').search({
        redirectUrl: thisUrl
      });
    };
  }]);
