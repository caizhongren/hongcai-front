'use strict';
angular.module('hongcaiApp')
  .controller('AccountOverviewCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'toaster', function($scope, $state, $rootScope, $stateParams, UserCenterService, toaster) {

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
          $scope.doughnutAccountData = [{
            value: 30,
            label: '账户总资产',
            color: '#e94828'
          }, {
            value: 30,
            label: '累计净收益',
            color: '#f9b81e'
          }, {
            value: 30,
            label: '账户余额',
            color: '#62cbc6'
          }];
        } else {
          if(reward > 0){
            $scope.doughnutAccountData = [{
              value: totalAssets,
              label: '账户总资产',
              color: '#e94828'
            }, {
              value: receivedProfit,
              label: '累计净收益',
              color: '#f9b81e'
            }, {
              value: balance,
              label: '账户余额',
              color: '#62cbc6'
            }, {
              value: reward,
              label: '活动奖金',
              color: '#cb62bb'
            }];
          }else if( reward === 0){
            $scope.doughnutAccountData = [{
              value: totalAssets,
              label: '账户总资产',
              color: '#e94828'
            }, {
              value: receivedProfit,
              label: '累计净收益',
              color: '#f9b81e'
            }, {
              value: balance,
              label: '账户余额',
              color: '#62cbc6'
            }];
          }
          
        }

      } else {
        toaster.pop('warning', response.msg);
        $state.go('root.login');
      }

      if (totalAssets > 0 && receivedProfit > 0 && balance > 0) {
        $scope.doughnutOptions = {
          segmentShowStroke: false,
          segmentStrokeColor: '#fff',
          segmentStrokeWidth: 2,
          percentageInnerCutout: 65,
          animation: true,
          animationSteps: 100,
          animationEasing: 'easeOutQuart',
          animateRotate: true,
          animateScale: false
        };
      } else {
        $scope.doughnutOptions = {
          segmentShowStroke: false,
          segmentStrokeColor: '#fff',
          segmentStrokeWidth: 2,
          percentageInnerCutout: 65,
          animation: true,
          animationSteps: 100,
          animationEasing: 'easeOutQuart',
          animateRotate: true,
          animateScale: false,
          showTooltips: false
        };
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


  }]);
