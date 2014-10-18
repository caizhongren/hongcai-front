hongcaiApp.controller("UserOrderCtrl", ["$scope", "$state", "$stateParams", "UserCenterService", function ($scope, $state, $stateParams, UserCenterService) {
    var projectDetails = UserCenterService.getOrderByUser.get(function(response) {
        console.info(projectDetails.data);


    });
}]);

