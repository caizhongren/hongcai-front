'use strict';
hongcaiApp.controller('LuckyDrawCtrl', ['$scope', '$state', 'UserCenterService', '$alert', function ($scope, $state, UserCenterService, $alert ) {
  $scope.status = 1;

  UserCenterService.getLuckyList.get(function(response){
    if(response.ret === 1) {
      $scope.lotteryRecords = response.data.lotteryRecords;
      $scope.hongYunProject = response.data.hongYunProject;
      $scope.tuhaoProject = response.data.tuhaoProject;
      console.log(response)
    } else {
      $scope.msg = response.msg;
      var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
    }
  });

  $scope.luckyDraw = function() {
    UserCenterService.luckyDraw.get(function(response){
      if(response.ret === 1) {
        var hongbaoLevel = response.data.userHongbaoLottery.prizeLevel;
        if(hongbaoLevel === 0) {
          // 土豪状态
          $scope.status = 2;
        } else if (hongbaoLevel === 1) {
          // 普通宏包状态。
          $scope.status = 1;
        }
      } else {
        $scope.msg = response.msg;
        var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
      }
    })
  };

  $scope.goToRule = function() {
    $state.go($scope.isLogged === true?'root.userCenter.gift-overview':'root.login');
  }

}]);
