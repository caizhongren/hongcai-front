hongcaiApp.controller('LuckyDrawCtrl', ['$scope', '$window', 'UserCenterService', function ($scope, $window, UserCenterService ) {
  $scope.status = 0;
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
        $window.alert(response.msg);
      }
    })
  };
}]);
