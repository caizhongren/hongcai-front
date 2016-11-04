'use strict';
angular.module('hongcaiApp')
  .controller('AssignmentDetailCtrl', function($scope, $state, $rootScope, $location, $stateParams, $window, CreditService, OrderService, $modal, $alert, toaster, $timeout, ipCookie, MainService, ProjectService, RESTFUL_DOMAIN) {
    var number = $stateParams.number;

   
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
        $scope.watchInvestAmount = function(newVal){
          $scope.error = '';
          if( newVal ==null || newVal == undefined) {
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
            if(newVal >  $rootScope.account.balance) {
              $scope.errMsg = '账户余额不足，请先充值';
            }
            if(newVal > $scope.creditProject.currentStock *100) {
              $scope.errMsg = '投资金额必须小于' + $scope.creditProject.currentStock *100;
            }
            //上次还款到认购当日的天数
            var lastPayDays = Math.ceil(Math.abs((new Date().getTime()  - $scope.lastRepayDay)/1000/60/60/24)); 
            //当前日期到下次还款日的天数
            var payDays =  Math.ceil(($scope.repayDay - new Date().getTime())/1000/60/60/24);
            //实际支付金额
            $scope.realPayAmount = newVal + newVal*$scope.originalAnnual*lastPayDays/365000 - ($scope.annual - $scope.originalAnnual)*newVal*payDays/36500;
            // console.log($scope.lastRepayDay);
            //待收利息
            $scope.profit = newVal * $scope.remainDay * $scope.originalAnnual / 36500;
          }
        }
        ProjectService.originProjectBills.get({
          number: $scope.projectNum
        },function(response) {
          if(response && response.ret !==-1) {
            $scope.projectBills = response;
            $scope.bills = [];
            for(var i= 0; i< response.length; i++) {
              if(response[i].status === 0) {
                $scope.bills.push(response[i]);
              }
            }
            $scope.lastRepayDay = $scope.bills[0].lastRepaymentTime;
            $scope.repayDay = $scope.bills[0].repaymentTime;
          }
        })
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
        }
      });
     };
     $scope.getCreditAssignmentList(1,6);

  

    /**
    * 立即认购
    */
    
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
              
              $modal({
                 scope: $scope,
                 template: 'views/modal/alert-unfinishedOrder.html',
                 show: true
               });
            
          }
        }
      });
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


    $scope.toAllCreditInvest = function() {
      $scope.subscribeAmount = $scope.userCanCreditInvestNum;
    }



    $scope.tabs = [{
      title: '投资记录',
    }, {
      title: '还款计划',
    }];


    $scope.toggle = {};
    $scope.toggle.switchTab = function(tabIndex) {
      $scope.toggle.activeTab = tabIndex;
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
