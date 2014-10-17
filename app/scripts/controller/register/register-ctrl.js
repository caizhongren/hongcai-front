hongcaiApp.controller("RegisterCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "RegisterService", "SessionService", "DEFAULT_DOMAIN", "toaster", function ($scope, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster) {

    $scope.getPicCaptcha = DEFAULT_DOMAIN + "/siteUser/getPicCaptcha?";

    $scope.submitRegisterMobile = function(user) {
        RegisterService.saveRegister.save({name: user.name, type:0, account: user.mobile, password: user.password }, function(response) {
            if(response.ret == 1) {
                SessionService.set("user", response.data.user.name);
                $state.go('root.userCenter.account-overview');
                $rootScope.loginName = response.data.user.name;
                $rootScope.isLogged = true;
            } else {
                toaster.pop('warning', "提示", response.msg);
                $state.go('root.registerMobile');
            }
        });
    };

    $scope.submitRegisterMail = function(user) {
        RegisterService.saveRegister.save({name: user.name, type: 1, account: user.email, password: user.password, captcha: user.captcha }, function(response) {
            if(response.ret == 1) {
                SessionService.set("user", response.data.user.name);
                $state.go('root.userCenter.account-overview');
                $rootScope.loginName = response.data.user.name;
                $rootScope.isLogged = true;
            } else {
                toaster.pop('warning', "提示", response.msg);
                $state.go('root.registerMail');
            }
        });
    };

    $scope.refreshCode = function() {
        angular.element("#checkCaptcha").attr("src", angular.element("#checkCaptcha").attr("src").substr(0, angular.element("#checkCaptcha").attr("src").indexOf('?')) + "?code=" + Math.random());
    };
}]);
    var wait=60;
        function time(val) {
        if ( wait == 0 ) {
            val.removeAttribute("disabled");          
            val.value = '获取验证码';
            val.className = 'white-button';
            wait = 60;
        }else{
            val.setAttribute("disabled", true);
            val.className = 'white-button grey';
            val.value = wait + "s 后重新发送";
            wait--;
            setTimeout(function() {
                time(val)
            },
            1000)
        } 
    }
 
