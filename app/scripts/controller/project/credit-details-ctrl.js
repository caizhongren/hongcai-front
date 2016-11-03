'use strict';
angular.module('hongcaiApp')
  .controller('CreditDetailsCtrl', function($scope, $state, $rootScope, $location, $stateParams, $window, CreditService, OrderService, $modal, $alert, toaster, $timeout, ipCookie, MainService, ProjectService, RESTFUL_DOMAIN) {
    var number = $stateParams.number;
    console.log(number);
    // if (!number) {
      // $state.go('root.credit-list-query-no');
    // }
    // CreditService.creditAssignmentDetail.get({
    //   assignmentNumber: number
    // }, function(response) {
    //   if (response.ret === 1) {
    //     $scope.creditAssignment = response.data.creditAssignment;
    //     $scope.project = response.data.project;
    //     $scope.projectInfo = response.data.projectInfo;
    //     $scope.orderList = response.data.orderList;
    //     $scope.enterprise = response.data.enterprise;
    //     $scope.enterpriseThumbnailFileList = response.data.enterpriseThumbnailFileList;
    //     $scope.enterpriseOriginalFileList = response.data.enterpriseOriginalFileList;
    //     /**
    //      * 可投金额
    //      */
    //     $scope.creditAssignmentInvestNum = $scope.creditAssignment.amount - ($scope.creditAssignment.soldStock + $scope.creditAssignment.occupancyStock) * $scope.project.increaseAmount;
    //     if ($scope.creditAssignment.status === 1) {
    //       if ($rootScope.account) {
    //         $scope.userCanCreditInvestNum = $scope.creditAssignmentInvestNum > $rootScope.account.balance ? $rootScope.account.balance : $scope.creditAssignmentInvestNum;
    //       } else {
    //         $scope.userCanCreditInvestNum = 0
    //       }
    //       if ($rootScope.isLogged) {
    //         if ($rootScope.securityStatus.realNameAuthStatus === 1) {
    //           /**
    //            * 实名认证用户
    //            */
    //           $scope.creFlag = 2;
    //         } else {
    //           /**
    //            * 开启普通用户
    //            */
    //           $scope.creFlag = 1;
    //         }
    //       } else {
    //         /**
    //          * 未登录
    //          */
    //         $scope.creFlag = 0;
    //       }
    //     }
    //   } else {
    //     // $state.go('root.credit-list-query-no');
    //   }
    // });
    /**
     * 债券详情
     */
    CreditService.getCreditAssignment.get({
      number: number
    },function(response){
      if(response && response.ret !== -1) {
        $scope.creditProject = response;
        $scope.creditNum = $scope.creditProject.number;
      }
    })
    /**
     * 转让记录
     */
     $scope.getCreditAssignmentList = function(page, pageSize) {
      ProjectService.getCreditAssignments.get({
       number: $stateParams.number,
       page: page, 
       pageSize: pageSize
      }, function(response) {
        if(response && response.ret != -1) {
          console.log(response);
        }
      });
     };
     $scope.getCreditAssignmentList(1,6);
     /**
     * 原项目还款计划
     */
    $scope.getProjectBills = function (number) {
      ProjectService.originProjectBills.get({
        number: number,
      })
    }
    // $scope.getProjectBills($stateParams.number);

    /**
    * 立即认购
    */
    // $scope.amount = 100; 
    $scope.$watch('test111', function(newVal, oldVal) {
      console.log(newVal);
      if( newVal == undefined) {
        $scope.errMsg = '';
      } 
      if(newVal) {
        if(newVal < 100) {
          $scope.errMsg = '投资金额必须大于等于100';
        }
        // if(newVal % 100 != 0) {
        //   $scope.errMsg = '投资金额必须为' + $scope.project.increaseAmount + '的整数倍';
        // }
        // if(newVal > $scope.creditProject.currentStock && $scope.creditProject.currentStock > $rootScope.account.balance) {
        //   $scope.errMsg = '账户余额不足，请先充值';
        // }
        // if(newVal < $scope.creditProject.currentStock && $scope.creditProject.currentStock < $rootScope.account.balance ) {
        //   $scope.errMsg = '投资金额必须小于' + $scope.creditProject.currentStock;
        // }
      }
      // $scope.$apply();
    });



    
    $scope.toInvest = function(amount) {


      // 使用同步请求， 解决有可能弹窗被浏览器拦截的问题
      $.ajax({
        url: RESTFUL_DOMAIN + '/assignments/' + $scope.creditNum + '/orders' + '?amount=' + amount,
        'type': 'POST',
        async: false,
        dataType: 'json',
        success: function(response) {
          $scope.msg = '12';
          $scope.investAmount = amount;
          if (response && response.ret !== -1) {
            $alert({
              scope: $scope,
              template: 'views/modal/alertYEEPAY.html',
              show: true
            });

            $window.open('/#!/user-order-transfer/' + response.projectId + '/' + response.id + '/' + response.type + '?orderNumber=' + response.number, '_blank');
          } else {
            toaster.pop('error', response.msg);
          }
        }
      });
    };












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

    $scope.datas = [{
      time: '2016-01-10',
      anuual: '10',
      amount: '10000'
    }, {
      time: '2016-01-11',
      anuual: '11',
      amount: '10000'
    },  {
      time: '2016-01-12',
      anuual: '13',
      amount: '10000'
    }, {
      time: '2016-01-13',
      anuual: '14',
      amount: '10000'
    },  {
      time: '2016-01-14',
      anuual: '15',
      amount: '10000'
    },  {
      time: '2016-01-15',
      anuual: '16',
      amount: '10000'
    },  {
      time: '2016-01-16',
      anuual: '17',
      amount: '10000'
    }, {
      time: '2016-01-17',
      anuual: '10',
      amount: '10000'
    }, {
      time: '2016-01-18',
      anuual: '10',
      amount: '10000'
    },  {
      time: '2016-01-19',
      anuual: '10',
      amount: '10000'
    },  {
      time: '2016-01-12',
      anuual: '10',
      amount: '10000'
    }, {
      time: '2016-01-12',
      anuual: '10',
      amount: '10000'
    }];
    $scope.currentPage0 = 1;
    $scope.pageSize0 = 7; 
    $scope.pageCount0 = Math.ceil($scope.datas.length/$scope.pageSize0);
    $scope.load = function(page) {
      if(page != $scope.currentPage0) {
        $scope.currentPage0 = page;
      }

      $scope.getCreditAssignmentList(page, $scope.pageSize0);
    }
  });
