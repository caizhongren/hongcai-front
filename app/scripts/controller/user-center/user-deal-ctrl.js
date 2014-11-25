
hongcaiApp.controller('UserDealCtrl', ['$scope', '$rootScope', '$state', '$stateParams','$location', 'UserCenterService', function ($scope,$rootScope, $state, $stateParams, $location, UserCenterService) {
  $rootScope.selectSide = 'record';
  var dateStart = 0;
  var dateEnd = 0;
  $scope.type = $stateParams.type;
  $scope.dateInterval = $stateParams.dateInterval;
  $scope.typeValue = { '1': '充值', '2': '提现', '3': '投资', '4,5': '回款' };
  // 时间函数，先注释
  // $scope.openStartTime = function($event) {
  //   $event.preventDefault();
  //   $event.stopPropagation();

  //   $scope.openedStartTime = true;
  // };
  // $scope.openEndTime = function($event) {
  //   $event.preventDefault();
  //   $event.stopPropagation();

  //   $scope.openedEndTime = true;
  // };
  $scope.fromDealDateChanged = function () {
    dateStart = $scope.recFromDate;
  };
  $scope.untilDealDateChanged = function (type,dateInterval) {
    dateEnd = $scope.recUntilDate;
    $location.path('record/'+$scope.dateInterval+'/'+$scope.type+'/'+dateStart+'/'+dateEnd);
  };

  var getDealByUser = UserCenterService.getDealByUser.get({ dateInterval: $stateParams.dateInterval,type: $stateParams.type,dateStart: $stateParams.dateStart, dateEnd: $stateParams.dateEnd},function(response) {
    $scope.dealList = getDealByUser.data.dealList;
    $scope.recFromDate = getDealByUser.data.dateStart;
    $scope.recUntilDate = getDealByUser.data.dateEnd;
    $scope.type = getDealByUser.data.type;
    $scope.dateInterval = getDealByUser.data.dateInterval;
    $scope.userId = getDealByUser.data.userId;
    $scope.capital = getDealByUser.data.capital;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];

    $scope.numberOfPages = function() {
      return Math.ceil($scope.data.length / $scope.pageSize);
    }
    for (var i = 0; i < $scope.dealList.length; i++) {
      $scope.data.push($scope.dealList[i]);
    }
  });
}]);

