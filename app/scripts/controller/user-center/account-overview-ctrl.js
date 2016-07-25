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

        $scope.labels = ['账户总资产', '累计净收益', '账户余额'];
        $scope.data = [totalAssets, receivedProfit, balance];
        $scope.colours = ['#e94828', '#f9b81e', '#62cbc6'];

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

  })
