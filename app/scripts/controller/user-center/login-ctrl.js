
    hongcaiApp.controller("LoginCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "LoginService", "SessionService", function ($scope, $state, $rootScope, $stateParams, LoginService, SessionService) {
        $scope.login = function(user){
            LoginService.userLogin.get({account: user.account, password: user.password }, function(response) {
                if(response.msg) {
                    SessionService.set("user", response.data.user.name);
                    $state.go('root.account-overview');
                    $rootScope.loginName = response.data.user.name;
                    $rootScope.isLogged = true;
                } else {
                    $scope.errorMessage = response.msg;
                    $state.go('root.login');
                }
            });
        }
        $scope.logout = function() {
            SessionService.destory("user");
            $rootScope.loginName = '';
            $rootScope.isLogged = false;
            $state.go('root.login');
        }
        $scope.islogged = function() {
            if(SessionService.get("user")) return true;
        }

    }]);
