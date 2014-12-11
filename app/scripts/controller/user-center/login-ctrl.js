'use strict';
hongcaiApp.controller('LoginCtrl', ['$scope', '$location','$state', '$rootScope', '$stateParams', 'LoginService', 'SessionService', 'ipCookie', 'md5', 'toaster', function ($scope, $location, $state, $rootScope, $stateParams, LoginService, SessionService, ipCookie, md5, toaster) {

    if (ipCookie('userName')){
        $scope.user = [];
        $scope.user.account = ipCookie('userName');
    }
    $scope.login = function(user){
        //记住用户名处理
        if ($scope.rememberUserName){
            ipCookie('userName', user.account, { expires: 60 })
        }
        var password = md5.createHash(user.password);
        LoginService.userLogin.get({account: user.account, password: password }, function(response) {
            if(response.ret == 1) {
                SessionService.set('user', response.data.user.name);
                $rootScope.loginName = response.data.user.name;
                $rootScope.isLogged = true;
                $rootScope.securityStatus = response.data.securityStatus;
                toaster.pop('success','恭喜您，登录成功！');
                if($stateParams.isRedirect){
                    $location.path($rootScope.redirectUrl);
                } else {
                   $state.go('root.userCenter.account-overview');
                }

            } else {
                if (response.code == -1009){
                  $scope.isPasswordError = true;
                  toaster.pop('error', response.msg);
                }
                //toaster.pop('warning', '提示', response.msg);
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
        SessionService.destory('user');
        $rootScope.loginName = '';
        $rootScope.isLogged = false;
        $state.go('root.login');
    }
    $scope.islogged = function() {
        if(SessionService.get('user')) return true;
    };

    /*angular.element('.dropdown').hover(function(){
        angular.element('#dropdown').css({"display":"block"});
    },function(){
        angular.element('#dropdown').css({"display":"none"});
    });*/

}]);
