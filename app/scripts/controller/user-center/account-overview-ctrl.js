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

    /*
     * 现金券、加息券数量统计
     */
    $scope.getUserCoupons = function() {
      /**
       * 现金券统计
       */
      UserCenterService.getUserCashCouponsStat.get(function(response) {
        if (!response || response.ret === -1) {
          return;
        }
        $scope.unUsedCashCoupon = response.unGotAmount;
      });
      /**
       * 加息券统计
       */
      UserCenterService.getUserIncreaseRateCouponStatis.get(function(response) {
        if (response.ret === 1) {
          $scope.unUsedRateCoupon = response.data.couponStatis.unUsedCoupon;
        }
      });
    }
    $scope.getUserCoupons();


    /**
     * 收益走势图 累计
     */
    $scope.onClick = function (points, evt) {
      //console.log(points, evt);
    };

    // $scope.medals_colours = [{
    //   fillColor:['rgba(0,0,0,0)'], //填充色
    //   strokeColor:['#f9721f'],//曲线颜色
    // }];
    $scope.medals_colours = ['#f9721f','fdcfb3','rgba(0,0,0,0)'];
    $scope.options = {
      bezierCurve: false,
      scaleShowVerticalLines: true, //竖线网格是否显示
      numberPrefix: "$",
      tooltipFontColor:'#fff', //tip字体颜色
      tooltipFillColor: '#f9721f',//tip背景颜色
    }
    //lables and data config tab=== 0 调用
    $scope.datasConfig = function() {
      $scope.yearlyData = [];
      $scope.labels = [];
      var datas = [];
      //模拟数据
      var monthProfit = 
              [
                {
                  profit: 0.4,
                  createTime: 1496592000000
                },
                {
                  profit: 19.4,
                  createTime: 1496678400000
                },
                {
                  profit: 23.4,
                  createTime: 1496764800000
                },
                {
                  profit: 28.4,
                  createTime: 1496851200000
                },
                {
                  profit: 17.4,
                  createTime: 1496937600000
                },
                {
                  profit: 24.4,
                  createTime: 1497024000000
                },
                {
                  profit: 12.4,
                  createTime: 1497110400000
                },
                {
                  profit: 22.4,
                  createTime: 1496592000000
                },
                {
                  profit: 22.4,
                  createTime: 1497283200000
                },
                {
                  profit: 25.4,
                  createTime: 1497369600000
                },
                {
                  profit: 22.4,
                  createTime: 1497456000000
                },
                {
                  profit: 22.4,
                  createTime: 1497542400000
                },
              ]
      
      for(var i = 0; i <= monthProfit.length - 1; i++){
        var date1 = new Date(monthProfit[i].createTime);
        $scope.labels.push((date1.getMonth() + 1) + '月');
        datas.push(monthProfit[i].profit);
      }
      $scope.yearlyData.push(datas);
    }
    $scope.datasConfig();

    /**
     * 收益走势图 每日 tab=== 1 调用
     */
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

    /**
     *  年份切换
     */
    var currentYear = new Date().getFullYear();//当前年份
    $scope.chartYear = $scope.chartYear ? $scope.chartYear : currentYear;
    $scope.firstInvestYear = 2015; //首投年份
    $scope.toggleYear = function(preOrNext,tab) {
      //上一年
      if(preOrNext == 'pre' && $scope.chartYear > $scope.firstInvestYear){
        $scope.chartYear -= 1;
        //update datasConfig
        var datas = [];
        $scope.labels = [];
        $scope.yearlyData = [];
        var monthProfit = [
          {
            profit: 19.4,
            createTime: 1496592000000
          },
          {
            profit: 18.4,
            createTime: 1496678400000
          },
          {
            profit: 29.4,
            createTime: 1496764800000
          },
          {
            profit: 2.4,
            createTime: 1496851200000
          },
          {
            profit: 7.4,
            createTime: 1496937600000
          },
          {
            profit: 4.4,
            createTime: 1497024000000
          },
          {
            profit: 2.4,
            createTime: 1497110400000
          },
          {
            profit: 22.4,
            createTime: 1496592000000
          },
          {
            profit: 22.4,
            createTime: 1497283200000
          },
          {
            profit: 5.4,
            createTime: 1497369600000
          },
          {
            profit: 22.4,
            createTime: 1497456000000
          },
          {
            profit: 12.4,
            createTime: 1497542400000
          },
        ]
        for(var i = 0; i <= monthProfit.length - 1; i++){
          var date1 = new Date(monthProfit[i].createTime);
          $scope.labels.push((date1.getMonth() + 1) + '月');
          datas.push(monthProfit[i].profit);
        }
        $scope.yearlyData.push(datas);
      }
      //下一年
      if(preOrNext == 'next' && $scope.chartYear < currentYear){
        $scope.chartYear += 1;
         //update datasConfig
        datas = [];
        $scope.labels = [];
        $scope.yearlyData = [];
        monthProfit = 
            [
              {
                profit: 20.4,
                createTime: 1496592000000
              },
              {
                profit: 19.4,
                createTime: 1496678400000
              },
              {
                profit: 23.4,
                createTime: 1496764800000
              },
              {
                profit: 28.4,
                createTime: 1496851200000
              },
              {
                profit: 17.4,
                createTime: 1496937600000
              },
              {
                profit: 24.4,
                createTime: 1497024000000
              },
              {
                profit: 12.4,
                createTime: 1497110400000
              },
              {
                profit: 22.4,
                createTime: 1496592000000
              },
              {
                profit: 22.4,
                createTime: 1497283200000
              },
              {
                profit: 25.4,
                createTime: 1497369600000
              },
              {
                profit: 22.4,
                createTime: 1497456000000
              },
              {
                profit: 22.4,
                createTime: 1497542400000
              },
            ]
        for(var i = 0; i <= monthProfit.length - 1; i++){
          var date1 = new Date(monthProfit[i].createTime);
          $scope.labels.push((date1.getMonth() + 1) + '月');
          datas.push(monthProfit[i].profit);
        }
        $scope.yearlyData.push(datas);
      }
      
    }
    //日期切换
                                                                                                                                               
    //资产总额详情显示框
    $scope.showPaymentBox = false;
    $scope.selectPaymentBox = function(){
      $scope.showPaymentBox = !$scope.showPaymentBox;
    }
    //解决 部分浏览器 元素blur失效问题
    window.onclick = function (event) {
      var e = window.event || arguments[0];
      var _con = $('.select-payment');   // 设置目标区域
      if(!_con.is(e.target) && _con.has(e.target).length === 0){ 
        $scope.showPaymentBox = false;
        $scope.$apply();
      }
    }

  })
