hongcaiApp.controller("UserOrderCtrl", ["$scope", "$state", "$stateParams", "UserCenterService", function ($scope, $state, $stateParams, UserCenterService) {
    var projectDetails = UserCenterService.projectDetails.get({projectId: $stateParams.projectId}, function() {
        


    });
}]);

