'use strict';
angular.module('hongcaiApp')
  .controller('AssetsOverviewCtrl', function($scope, $state, $rootScope, $stateParams, UserCenterService) {

     $scope.onClick = function (points, evt) {
       console.log(points, evt);
     };

    $scope.options = {
      bezierCurve: false,
      // scaleGridLineWidth:1,
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


    UserCenterService.dayProfit.get({
      startTime: new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
      endTime: new Date().getTime()
    }, function(response){
      var data = response.data;
      $scope.labels = [];
      var datas = [];
      for(var key in data)  {
        var date = new Date(+key);

        $scope.labels.push((date.getMonth() + 1) + '-' + date.getDate()); 
        datas.push(data[key]);
      } 

      $scope.data = [];
      $scope.data.push(datas);
    });

  });
