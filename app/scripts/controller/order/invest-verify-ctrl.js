hongcaiApp.controller("investVerifyCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "OrderService", "SessionService", "toaster", function ($scope, $state, $rootScope, $stateParams, OrderService, SessionService, toaster) {
    
    var investVerify = OrderService.investVerify.get({projectId: $stateParams.projectId, amount: $stateParams.amount, }, function(response) {
        if(response.ret == 1) {
           $scope.projectVo = investVerify.data.projectVo;
           $scope.capital = investVerify.data.capital;
           $scope.distance = investVerify.data.distance;
           $scope.orderId = investVerify.data.orderId;
        } 
    });
}]);
