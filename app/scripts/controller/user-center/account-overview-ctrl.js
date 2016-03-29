'use strict';
angular.module('hongcaiApp')
  .controller('AccountOverviewCtrl',  function($scope, $state, $rootScope, $stateParams,MainService,ProjectService, UserCenterService, toaster) {
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

    
    /*
    **零存宝、宏金盈列表
    */
    MainService.getIndexFundsProductList.get(function(response) {
    	console.log("hongjinying");
    	console.log(response);
    	$scope.fundsProjectProductList = response.data.fundsProjectProductList;
    });
    //机构宝
    ProjectService.projectList.get({
        status: '7',
      }, function(response) {
      	//console.log("jigoubao");
    	//console.log(response);
    	$scope.jigoubao = response.data.projectList;
      });
    
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
        toaster.pop('warning', response.msg);
      }
    });
    /**
     * 加息券统计信息
     */
    UserCenterService.getUserIncreaseRateCouponStatis.get({}, function(response) {
      if (response.ret === 1) {
        $scope.couponStatis = response.data.couponStatis;
      } else {
        toaster.pop('warning', response.msg);
      }
    });

    // 收益曲线
    UserCenterService.dayProfit.get({
      startTime: new Date().getTime(),
      endTime: new Date().getTime() + 60 * 1000,
    }, function(response){
    	//console.log(response);
      var data = response.data;
      $scope.profit = [];
      for(var key in data)  {
        var date = new Date(+key);
        $scope.profit.push(data[key]);
        $scope.yestodayProfit = data[key];
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
