hongcaiApp.controller('LuckyDrawCtrl', ['$scope', '$window', 'UserCenterService', function ($scope, $window, UserCenterService ) {
  $scope.luckyDraw = UserCenterService.luckyDraw.get(function(response){
    if(response === 1) {
      $scope.status = 1;
    }
  })
}]);
