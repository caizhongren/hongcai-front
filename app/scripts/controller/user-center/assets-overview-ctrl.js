'use strict';
angular.module('hongcaiApp')
  .controller('AssetsOverviewCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', function($scope, $state, $rootScope, $stateParams, UserCenterService) {

    $rootScope.selectSide = 'assets-overview';
    var balance = 0;
    var waitingProfit = 0;
    var waitingCapital = 0;
    var freezeCapital = 0;
    var receivedProfit = 0;
    var amount = 0;
    UserCenterService.getUserAccount.get(function(response) {
      if (response.ret === 1) {
        var account = response.data.account;

        balance = account.balance;
        waitingProfit = account.waitingProfit;
        waitingCapital = account.waitingCapital;
        freezeCapital = account.freezeCapital;
        receivedProfit = account.receivedProfit;
        amount = account.amount;

        $scope.account = response.data.account;
        if (balance === 0 && waitingProfit === 0 && waitingCapital === 0 && freezeCapital === 0 && receivedProfit === 0 && amount === 0) {
          $scope.doughnutAssetsData = [{
            value: 20,
            label: '可用余额',
            color: '#d2cb3f'
          }, {
            value: 20,
            label: '待收收益',
            color: '#62cbc6'
          }, {
            value: 20,
            label: '待收本金',
            color: '#f9b81e'
          }, {
            value: 20,
            label: '冻结资金',
            color: '#6aabe1'
          }];
        } else {
          $scope.doughnutAssetsData = [{
            value: account.balance,
            label: '可用余额',
            color: '#d2cb3f'
          }, {
            value: account.waitingProfit,
            label: '待收收益',
            color: '#62cbc6'
          }, {
            value: account.waitingCapital,
            label: '待收本金',
            color: '#f9b81e'
          }, {
            value: account.freezeCapital,
            label: '冻结资金',
            color: '#6aabe1'
          }];
        }

      } else {
        console.log('ask assets-overview, why getUserAccount did not load data...');
        $state.go('root.login');
      }
    });

    if (balance > 0 && waitingProfit > 0 && waitingCapital > 0 && freezeCapital > 0 && receivedProfit > 0 && amount > 0) {
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
  }]);
