hongcaiApp.controller("UserDealCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "UserCenterService", "$location", function ($scope,$rootScope, $state, $stateParams, UserCenterService, $location) {

  $rootScope.selectSide = 'record';
  var dateStart = 0;
  var dateEnd = 0;
  $scope.type = $stateParams.type;
  $scope.dateInterval = $stateParams.dateInterval

  $scope.fromDealDateChanged = function () {
    dateStart = $scope.fromDate;
    $location.path('record/'+$scope.dateInterval+'/'+$scope.status+'/'+dateStart+'/'+dateEnd);

    };

  $scope.untilDealDateChanged = function (status,dateInterval) {
    dateEnd = $scope.endDate;
    $location.path('record/'+$scope.dateInterval+'/'+$scope.status+'/'+dateStart+'/'+dateEnd);
  };

  var getDealByUser = UserCenterService.getDealByUser.get({ dateInterval: $stateParams.dateInterval, type: $stateParams.type},function(response) {

    $scope.dealList = getDealByUser.data.dealList;
    $scope.dateStart = getDealByUser.data.dateStart;
    $scope.dateEnd = getDealByUser.data.dateEnd;
    $scope.type = getDealByUser.data.type;
    $scope.dateInterval = getDealByUser.data.dateInterval;
    $scope.userId = getDealByUser.data.userId;
    $scope.capital = getDealByUser.data.capital;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];
    console.info(getDealByUser.data.dealList);
    $scope.numberOfPages = function() {
        return Math.ceil($scope.data.length / $scope.pageSize);
    }
    for (var i = 0; i < $scope.dealList.length; i++) {
        $scope.data.push($scope.dealList[i]);

    }
    console.log($scope.data)

  });

}]);

