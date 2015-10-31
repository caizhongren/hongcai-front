'use strict';
angular.module('hongcaiApp')
  .controller('AccountOverviewCtrl',  function($scope, $state, $rootScope, $stateParams, UserCenterService, toaster) {


    $rootScope.selectSide = 'account-overview';
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
        toaster.pop('warning', response.msg);
      }

    });



    // 原版获取投资统计数据
    /*OrderService.statisticsByUser.get(function(response) {
      if (response.ret === 1) {
        var orderNum = response.data.orderNum;
        if (orderNum) {
          $scope.investingNum = orderNum.isInve;
          $scope.investedNum = orderNum.overInve;
          $scope.investNum = orderNum.allInve;
        }
      }
    });*/


    /**
     * 我的债权统计数据
     */
    $scope.getCreditRightStatistics = function() {
      UserCenterService.getCreditRightStatistics.get({}, function(response) {
        if (response.ret === 1) {
          $scope.statistics = response.data.creditRightStatis;
        } else {
          toaster.pop('warning', response.msg);
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
