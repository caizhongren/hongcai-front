hongcaiApp.controller("UserOrderCtrl", ["$location", "$scope", "$rootScope", "$state", "$stateParams", "UserCenterService", function ($location,$scope,$rootScope, $state, $stateParams, UserCenterService) {

  $rootScope.selectSide = 'userCenter-investment';

  var dateStart = 0;
  var dateEnd = 0;

  $scope.fromDateChanged = function () {
      dateStart = $scope.fromDate;
      $location.path($rootScope.selectSide+'/:'+dateInterval+'/:'+status+'/:'+dateStart+'/:'+dateEnd);
    };

  $scope.untilDealDateChanged = function (status,dateInterval) {
      dateEnd = $scope.endDate;
      $location.path($rootScope.selectSide+'/:'+dateInterval+'/:'+status+'/:'+dateStart+'/:'+dateEnd)
  };

    var response = UserCenterService.getOrderByUser.get({ dateInterval: $stateParams.dateInterval,
                                                              status: $stateParams.status},
                                                              function() {
      $scope.status = $stateParams.status;
      $scope.dateInterval = $stateParams.dateInterval;
      if(response.ret == 1){
        $scope.orderList = response.data.orderVoList;
        $scope.amount = response.data.amount;
        $scope.orderCount = response.data.orderCount;
      }
    });
}]);

