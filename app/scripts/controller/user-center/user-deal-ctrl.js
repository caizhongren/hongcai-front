hongcaiApp.controller("UserDealCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "UserCenterService", function ($scope,$rootScope, $state, $stateParams, UserCenterService) {
    
    var getDealByUser = UserCenterService.getDealByUser.get({ dateInterval: $stateParams.dateInterval,
    															type: $stateParams.type},
    															function(response) {
        $scope.dealList = getDealByUser.data.dealList;
        $scope.startTime = getDealByUser.data.startTime;
        $scope.endTime = getDealByUser.data.endTime;
        $scope.type = getDealByUser.data.type;
        $scope.dateInterval = getDealByUser.data.dateInterval;
        $scope.userId = getDealByUser.data.userId;

    });
}]);

