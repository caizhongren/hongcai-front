hongcaiApp.controller("UserDealCtrl", ["$scope", "$rootScope", "$state", "$stateParams","$location", "UserCenterService", function ($scope,$rootScope, $state, $stateParams, $location, UserCenterService) {

  $rootScope.selectSide = 'record';
  var dateStart = 0;
  var dateEnd = 0;

  $scope.fromDealDateChanged = function () {
    dateStart = $scope.fromDate;
    };

    $scope.untilDealDateChanged = function (status,dateInterval) {
        dateEnd = $scope.endDate;
        $location.path('record/'+dateInterval+'/'+status+'/'+dateStart+'/'+dateEnd);
    };

    var getDealByUser = UserCenterService.getDealByUser.get({ dateInterval: $stateParams.dateInterval,type: $stateParams.type,dateStart: $stateParams.dateStart,dateEnd: $stateParams.dateEnd},function(response) {

        $scope.dealList = getDealByUser.data.dealList;
        $scope.fromDate = getDealByUser.data.dateStart;
        $scope.endDate = getDealByUser.data.dateEnd;
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

    });

}]);

