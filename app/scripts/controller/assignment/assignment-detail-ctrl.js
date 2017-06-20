'use strict';
angular.module('hongcaiApp')
  .controller('AssignmentDetailCtrl', function($scope, $state, $rootScope, $location, $stateParams, $window, CreditService, OrderService, $modal, $alert, toaster, $timeout, DateUtils, MainService, ProjectService, RESTFUL_DOMAIN) {
    var number = $stateParams.number;
    // $rootScope.toActivate();
   
    /**
     * 债券详情
     */


    CreditService.getCreditAssignment.get({
      number: number
    },function(response){
      if(response && response.ret !== -1) {
        $scope.creditProject = response;
        $scope.annual = response.annualEarnings;
        $scope.creditNum = $scope.creditProject.number;
        $scope.projectNum = response.projectNumber;
        $scope.originalAnnual = response.originalAnnualEarnings;
        $scope.remainDay = response.remainDay;

        $scope.projectTexts(response.projectId);
        $scope.watchInvestAmount = function(newVal, oldVal){
          $scope.error = '';
          if( newVal ==null || newVal == undefined || newVal != oldVal) {
              $scope.errMsg = '';
            }
          if( newVal < 0) {
              $scope.errMsg = '投资金额必须大于等于100';
            }
          if(newVal && newVal < 100) {
              $scope.errMsg = '投资金额必须大于等于100';
            }
          if(newVal) {
            if(newVal == 100 && $rootScope.account.balance >=100 && $scope.creditProject.currentStock *100 >=100) {
              $scope.errMsg = '';
            }
            if(newVal % 100 !== 0) {
              $scope.errMsg = '投资金额必须为100的整数倍';
            }
            if(newVal >  $rootScope.account.balance || (newVal <= $rootScope.account.balancenewVal && $rootScope.account.balancenewVal < $scope.realPayAmount)) {
              $scope.errMsg = '账户余额不足，请先充值';
            }
            if(newVal > $scope.creditProject.currentStock *100) {
              $scope.errMsg = '投资金额必须小于' + $scope.creditProject.currentStock *100;
            }

            //上次还款到认购当日的天数
            var lastPayDays = DateUtils.intervalDays(new Date().getTime(), $scope.lastRepayDay) * (new Date().getTime() > $scope.lastRepayDay ? 1 : -1); 
              
            var reward = ($scope.annual - $scope.originalAnnual) * newVal * $scope.remainDay / 36500;
            //  代收未收利息
            $scope.exProfit = newVal * $scope.originalAnnual * lastPayDays / 36500;
            //实际支付金额
            $scope.realPayAmount = newVal + $scope.exProfit - reward;
            //待收利息
            $scope.profit = newVal * $scope.remainDay * $scope.annual / 36500;

          }
        }
        //原项目还款记录
        ProjectService.originProjectBills.get({
          number: $scope.projectNum
        },function(response) {
          if(response && response.ret !==-1) {
            $scope.projectBills = response;
            $scope.latestProjectBill;
            for(var i= 0; i< response.length; i++) {
              if(response[i].status === 0) {
                $scope.latestProjectBill = response[i];
                break;
              }
            }
            $scope.lastRepayDay = $scope.latestProjectBill.lastRepaymentTime;
            $scope.repayDay = $scope.latestProjectBill.repaymentTime;
          }
        });
        //查询原项目信息
        ProjectService.projectDetails.get({
          number: $scope.projectNum
        }, function(response) {
          if(response && response.ret !== -1) {
            $scope.project = response.data.project;
            $scope.baseFileUrl = response.data.baseFileUrl;
          }
        });

      }
    })
    /**
     * 转让记录
     */
     $scope.getCreditAssignmentList = function(page, pageSize) {
      ProjectService.getAssignmentOrders.get({
       number: $stateParams.number,
       page: page, 
       pageSize: pageSize
      }, function(response) {
        if(response && response.ret != -1) {
          $scope.assignmentOrders = response;
          $scope.pageSize0 = response.pageSize;
          // console.log($scope.assignmentOrders);
        }
      });
     };
     $scope.getCreditAssignmentList(1,12);

  

    /**
    * 立即认购
    */
    $scope.clicked = true;
    $scope.toInvest = function(amount) {
      $scope.clicked = false;
      var invest = function () {
        // 使用同步请求， 解决有可能弹窗被浏览器拦截的问题
        $.ajax({
          url: RESTFUL_DOMAIN + '/assignments/' + $scope.creditNum + '/orders' + '?amount=' + amount,
          'type': 'POST',
          async: false,
          dataType: 'json',
          success: function(response) {
            $scope.clicked = true;
            $scope.msg = '12';
            $scope.investAmount = amount;
            if (response && response.ret !== -1) {
              $alert({
                scope: $scope,
                template: 'views/modal/alertYEEPAY.html',
                show: true
              });

              $window.open('/#!/user-order-transfer/' + response.projectId + '/' + response.id + '/' + response.type + '?orderNumber=' + response.number, '_blank');
            }else if(response.code == -1037) {
              $rootScope.toFinishOrder();
            } else {
              toaster.pop('error', response.msg);
            }
          }
        });
      }
      // $rootScope.toNotice(invest);
      $rootScope.toActivate(invest);
    };

    /**
     * 媒体报道
     */
    $scope.projectTexts = function(projectId) {
      ProjectService.projectTexts.get({
        projectId: projectId
      }, function(response) {
        $scope.mediaList = response.data.texts;
      });
    }
    $scope.toLogin = function() {
      var thisUrl = $location.path();
      $location.path('/login').search({
        redirectUrl: thisUrl
      });
    };


    $scope.toRecharge = function() {
      if($rootScope.securityStatus.realNameAuthStatus !== 1) {
        $rootScope.toRealNameAuth();
        return;
      }
      $modal({
        scope: $scope,
        template: 'views/modal/modal-toRecharge.html',
        show: true
      });
    };



    $scope.tabs = [{
      title: '还款计划',
    }, {
      title: '投资记录',
    }];


    $scope.toggle = {};
    $scope.toggle.switchTab = function(tabIndex) {
      $scope.toggle.activeTab = tabIndex;
    };

   
    
    $scope.load = function(page) {
      if(page !== $scope.assignmentOrders.index) {
        $scope.assignmentOrders.index = page;
      }

      $scope.getCreditAssignmentList(page, $scope.pageSize0);
    }
  });
