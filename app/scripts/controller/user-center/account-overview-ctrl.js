'use strict';
angular.module('hongcaiApp')
  .controller('AccountOverviewCtrl', function($scope, $state, $rootScope, $stateParams, ProjectService, UserCenterService, ProjectUtils, DateUtils) {
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

        // $scope.labels = ['账户总资产', '累计净收益', '账户余额'];
        // $scope.data = [totalAssets, receivedProfit, balance];
        // $scope.colours = ['#e94828', '#f9b81e', '#62cbc6'];

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
            $scope.jigoubao[i].showByStatus = $scope.jigoubao[i].status === 6 || $scope.jigoubao[i].status === 7 ? true : false;
            $scope.data.push($scope.jigoubao[i]);
            ProjectUtils.projectTimedown($scope.jigoubao[i], $scope.serverTime);
          }

        } else {
          $scope.data = [];
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
      }
    });
    /**
     * 加息券统计信息
     */
    UserCenterService.getUserIncreaseRateCouponStatis.get({}, function(response) {
      if (response.ret === 1) {
        $scope.couponStatis = response.data.couponStatis;
      }
    });

    /**
     * 我的债权统计数据
     */
    $scope.getCreditRightStatistics = function() {
      UserCenterService.getCreditRightStatistics.get({}, function(response) {
        if (response.ret === 1) {
          $scope.statistics = response.data.creditRightStatis;
        }
      });
    };

    $scope.getCreditRightStatistics();



    /**
     * 收益走势图 累计
     */
    $scope.onClick = function (points, evt) {
      //console.log(points, evt);
    };

    // $scope.series = ['Series A']; // 一条曲线
    $scope.options = {
      bezierCurve: false,
      scaleShowVerticalLines: true,
      numberPrefix: "$"
    }
    // $scope.labels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月","8月","9月","10月","11月","12月"];//设置横坐标
    //数据（收益）
    // $scope.data = [[5, 4.0, 5.0, 3.3, 4.5,6.6,4.5,4.0,4.1,4.2,4.2,4.6] ]; 
    $scope.yearlyData = [];
    $scope.labels = [];
    var datas = [];
    var monthProfit = 
            [
              {
                profit: 2.4,
                createTime: 1496592000000
              },
              {
                profit: 2.4,
                createTime: 1496678400000
              },
              {
                profit: 2.4,
                createTime: 1496764800000
              },
              {
                profit: 2.4,
                createTime: 1496851200000
              },
              {
                profit: 2.4,
                createTime: 1496937600000
              },
              {
                profit: 2.4,
                createTime: 1497024000000
              },
              {
                profit: 2.4,
                createTime: 1497110400000
              },
              {
                profit: 2.4,
                createTime: 1496592000000
              },
              {
                profit: 2.4,
                createTime: 1497283200000
              },
              {
                profit: 2.4,
                createTime: 1497369600000
              },
              {
                profit: 2.4,
                createTime: 1497456000000
              },
              {
                profit: 2.4,
                createTime: 1497542400000
              },
            ]
    
    for(var i = 0; i <= monthProfit.length - 1; i++){
      var date1 = new Date(monthProfit[i].createTime);
      $scope.labels.push((date1.getMonth() + 1) + '月');
      datas.push(monthProfit[i].profit);
    }
    $scope.yearlyData.push(datas);

    /**
     * 收益走势图 每日
     */
     $scope.dailyOptions = {
       bezierCurve: false,
       scaleShowVerticalLines: true,
       numberPrefix: "$",
     }

    UserCenterService.dayProfit.get(function(response){
      var creditRightList = response.data.creditRightList;
      $scope.dailyDatas = [];
      $scope.dailyLabels = [];
      var dailyDatas = [];

      for(var i = 0; i <= creditRightList.length - 1; i++){
        var date = new Date(creditRightList[i].createTime);
        $scope.dailyLabels.push((date.getMonth() + 1) + '月-' + date.getDate() + '日');
        dailyDatas.push(creditRightList[i].profit);
      }

      $scope.dailyData = [];
      $scope.dailyData.push(dailyDatas);
    });




    //年份切换
    var currentYear = new Date().getFullYear();//当前年份
    $scope.chartYear = $scope.chartYear ? $scope.chartYear : currentYear;
    $scope.firstInvestYear = 2015; //首投年份
    $scope.toggleYear = function(preOrNext,tab) {
      if(preOrNext == 'pre' && $scope.chartYear > $scope.firstInvestYear){
        $scope.chartYear -= 1;
      }
      if(preOrNext == 'next' && $scope.chartYear < currentYear){
        $scope.chartYear += 1;
      }
      
    }
    //日期切换
    
   

    

  })
