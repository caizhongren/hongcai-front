hongcaiApp.controller("LoginCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "LoginService", "SessionService", "toaster", function ($scope, $state, $rootScope, $stateParams, LoginService, SessionService, toaster) {
    $scope.login = function(user){
        LoginService.userLogin.get({account: user.account, password: user.password }, function(response) {
            if(response.ret == 1) {
                SessionService.set("user", response.data.user.name);
                $state.go('root.userCenter.account-overview');
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
    $scope.logout = function() {
        SessionService.destory("user");
        $rootScope.loginName = '';
        $rootScope.isLogged = false;
        $state.go('root.login');
    }
    $scope.islogged = function() {
        if(SessionService.get("user")) return true;
    };

}]);
