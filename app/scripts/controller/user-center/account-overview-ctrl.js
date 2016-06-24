'use strict';
angular.module('hongcaiApp')
  .controller('AccountOverviewCtrl',  function($scope, $state, $interval, $rootScope, $stateParams, ProjectService, UserCenterService, toaster, DateUtils) {
    var totalAssets = 0;
    var receivedProfit = 0;
    var balance = 0;
    var reward = 0;
    UserCenterService.getUserAccount.get(function(response) {
      if (response.ret === 1) {
        var account = response.data.account;
        totalAssets = response.data.totalAssets;
        receivedProfit = account.receivedProfit;
        balance = account.balance;
        reward = account.reward;

        $scope.reward = reward;
        $scope.account = response.data.account;
        $scope.account.totalAssets = totalAssets;
        if (totalAssets === 0 && receivedProfit === 0 && balance === 0) {
          totalAssets = 30;
          receivedProfit = 30;
          balance = 30;
        } 

        $scope.labels = ['账户总资产', '累计净收益', '账户余额'];
        $scope.data = [totalAssets, receivedProfit, balance];
        $scope.colours = ['#e94828', '#f9b81e', '#62cbc6'];

      } else {
        // toaster.pop('warning', response.msg);
      }

    });

    
    $scope.jigoubaoList = function() {
      ProjectService.getAccountOverviewProjects.get({
        categoryCode: "01"
      }, function(response) {
        if (response.ret === 1) {
          $scope.serverTime = response.data.serverTime;
          $scope.jigoubao = response.data.projectList;
          $scope.projectStatusMap = response.data.projectStatusMap;
          $scope.repaymentTypeMap = response.data.repaymentTypeMap;
          $scope.data = [];
          $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
          };
          for (var i = 0; i < $scope.jigoubao.length; i++) {
            $scope.jigoubao[i].countdown = new Date($scope.jigoubao[i].releaseStartTime).getTime() - $scope.serverTime;
            $scope.jigoubao[i].showByStatus = $scope.jigoubao[i].status === 6 || $scope.jigoubao[i].status === 7 ? true : false;
            $scope.jigoubao[i]._timeDown = DateUtils.toHourMinSeconds($scope.jigoubao[i].countdown);
            $scope.data.push($scope.jigoubao[i]);
          }

          var interval = $interval(function() {
            for (var i = $scope.jigoubao.length - 1; i >= 0; i--) {
              $scope.jigoubao[i].countdown -= 1000;
              if ($scope.jigoubao[i].countdown <= 0 && $scope.jigoubao[i].status == 2) {
                $state.reload();
              }

              $scope.jigoubao[i]._timeDown = DateUtils.toHourMinSeconds($scope.jigoubao[i].countdown);
            };
          }, 1000);
          $scope.$on('$stateChangeStart', function() {
            clearInterval(interval);
          });
        } else {
          $scope.data = [];
          // toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          //console.log('ask project-list, why projectList did not load data...');
        }
      });
    };

    $scope.jigoubaoList();
    
    /**
     * 我的债权统计数据
     */
    // $scope.getCreditRightStatistics = function() {
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
     * 加息券统计信息
     */
    UserCenterService.getUserIncreaseRateCouponStatis.get({}, function(response) {
      if (response.ret === 1) {
        $scope.couponStatis = response.data.couponStatis;
      } else {
        // toaster.pop('warning', response.msg);
      }
    });

    /**
     * 我的债权统计数据
     */
    $scope.getCreditRightStatistics = function() {
      UserCenterService.getCreditRightStatistics.get({}, function(response) {
        if (response.ret === 1) {
          $scope.statistics = response.data.creditRightStatis;
        } else {
          // toaster.pop('warning', response.msg);
        }
      });
    };

    $scope.getCreditRightStatistics ();


  })
.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      // colours: ['#FF5252', '#FF8A80'],
      responsive: false,
      scaleFontSize: 8,
      tooltipXOffset: 10
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
  }]);
