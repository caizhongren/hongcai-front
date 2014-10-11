hongcaiApp.controller("RegisterCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "RegisterService", "SessionService", "DEFAULT_DOMAIN", function ($scope, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN) {

    $scope.getPicCaptcha = DEFAULT_DOMAIN + "/siteUser/getPicCaptcha?";

    $scope.submitRegisterMobile = function(user) {
        RegisterService.saveRegister.save({name: user.name, type:0, account: user.mobile, password: user.password }, function(response) {
            if(response.msg) {
                SessionService.set("user", response.data.user.name);
                $state.go('root.account-overview');
                $rootScope.loginName = response.data.user.name;
                $rootScope.isLogged = true;
            } else {
                $scope.errorMessage = response.msg;
                $state.go('root.registerMobile');
            }
        });
    };

    $scope.submitRegisterMail = function(user) {
        RegisterService.saveRegister.save({name: user.name, type: 1, account: user.email, password: user.password, captcha: user.captcha }, function(response) {
            if(response.msg) {
                SessionService.set("user", response.data.user.name);
                $state.go('root.account-overview');
                $rootScope.loginName = response.data.user.name;
                $rootScope.isLogged = true;
            } else {
                $scope.errorMessage = response.msg;
                $state.go('root.registerMail');
            }
        });
    };

    $scope.refreshCode = function() {
        angular.element("#captcha").attr("src", angular.element("#captcha").attr("src").substr(0, angular.element("#captcha").attr("src").indexOf('?')) + "?code=" + Math.random());
    };

}]);

