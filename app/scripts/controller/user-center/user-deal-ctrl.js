hongcaiApp.controller("UserDealCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "UserCenterService", function ($scope,$rootScope, $state, $stateParams, UserCenterService) {

  $rootScope.selectSide = 'record';
  var dateStart = 0;
  var dateEnd = 0;

  $scope.fromDealDateChanged = function () {
    dateStart = $scope.fromDate;
    $location.path('record/:'+dateInterval+'/:'+status+'/:'+dateStart+'/:'+dateEnd);

    };

  $scope.untilDealDateChanged = function (status,dateInterval) {
    dateEnd = $scope.endDate;
    $location.path('record/:'+dateInterval+'/:'+status+'/:'+dateStart+'/:'+dateEnd)

  };

  var response = UserCenterService.getDealByUser.get( { dateInterval: $stateParams.dateInterval,
                                                        type: $stateParams.type},function() {

    $scope.type = $stateParams.type;
    $scope.dateInterval = $stateParams.dateInterval;

    if(response.ret == 1) {
      $scope.dealList = response.data.dealList;
      $scope.dateStart = response.data.startTime;
      $scope.dateEnd = response.data.endTime;
      $scope.userId = response.data.userId;
      $scope.capital = response.data.capital;
    }
  });
}]);

