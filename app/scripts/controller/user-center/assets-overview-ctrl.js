'use strict';
angular.module('hongcaiApp')
  .controller('AssetsOverviewCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', function($scope, $state, $rootScope, $stateParams, UserCenterService) {

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
     $scope.data = [
       [28, 48, 40, 19, 86, 27, 90]
     ];
     $scope.onClick = function (points, evt) {
       console.log(points, evt);
     };
     
    $scope.options = {
      bezierCurve: false,
      scaleShowVerticalLines: false
    }

    $rootScope.selectSide = 'assets-overview';
    var balance = 0;
    var waitingProfit = 0;
    var waitingCapital = 0;
    var freezeCapital = 0;
    var receivedProfit = 0;
    var amount = 0;
    var reward = 0;
    UserCenterService.getUserAccount.get(function(response) {
      if (response.ret === 1) {
        var account = response.data.account;

        balance = account.balance;
        waitingProfit = account.waitingProfit;
        waitingCapital = account.waitingCapital;
        freezeCapital = account.freezeCapital;
        receivedProfit = account.receivedProfit;
        amount = account.amount;
        reward = account.reward;

        $scope.reward = reward;
        $scope.account = response.data.account;

      } else {
        console.log('ask assets-overview, why getUserAccount did not load data...');
        $state.go('root.login');
      }
    });

  }]);
