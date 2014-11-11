hongcaiApp.controller("LoginCtrl", ["$scope", "$location","$state", "$rootScope", "$stateParams", "LoginService", "SessionService", "toaster", function ($scope, $location, $state, $rootScope, $stateParams, LoginService, SessionService, toaster) {
    
    $scope.login = function(user){
        LoginService.userLogin.get({account: user.account, password: user.password }, function(response) {
            if(response.ret == 1) {
                SessionService.set("user", response.data.user.name);
                $rootScope.loginName = response.data.user.name;
                $rootScope.isLogged = true;
                $rootScope.securityStatus = response.data.securityStatus;
                if($stateParams.isRedirect){
                    $location.path($rootScope.redirectUrl);
                } else {
                   $state.go('root.userCenter.account-overview'); 
                }
            } else {
                if (response.code == -1009){
                    $scope.isPasswordError = true;
                }
                //toaster.pop('warning', "提示", response.msg);
                //$scope.errorMessage = response.msg;
                //$scope.warning = true;
                //$state.go('root.login');
            }
        });
    };

    $scope.$watch('user.password', function(){
        $scope.isPasswordError = false;
    });
    
    $scope.$watch('user.account', function(){
        $scope.isPasswordError = false;
    });

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
