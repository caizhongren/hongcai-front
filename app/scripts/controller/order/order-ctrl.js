hongcaiApp.controller("OrderCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "OrderService", "SessionService", "toaster", function ($scope, $state, $rootScope, $stateParams, OrderService, SessionService, toaster) {
    alert("cccccc");
    $scope.isAvailableInvest = function(user){
        alert("dddddddd");
        OrderService.isAvailableInvest.get({user: user.amount }, function(response) {
            if(response.msg == 'success') {
                SessionService.set("user", response.data.user.name);
                $state.go('root.account-overview');
                $rootScope.loginName = response.data.user.name;
                $rootScope.isLogged = true;
            } else {
                toaster.pop('warning', "提示", response.msg);
                //$scope.errorMessage = response.msg;
                //$scope.warning = true;
                $state.go('root.login');
            }
        });
    };
}]);
