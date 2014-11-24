hongcaiApp.controller('RegisterMobileCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'RegisterService', 'SessionService', 'DEFAULT_DOMAIN', 'toaster', function ($scope, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster) {


    if ($stateParams.inviteCode){
        $scope.user= {inviteCode:  $stateParams.inviteCode};
    }
    $scope.submitRegisterMobile = function(user) {
        RegisterService.saveRegister.save({name: user.name, 
                                            type:0, 
                                            account: user.mobile, 
                                            captcha: user.mobileCaptcha, 
                                            password: user.password, 
                                            inviteCode: user.inviteCode }, function(response) {
            if(response.ret == 1) {
                SessionService.set('user', response.data.user.name);
                $state.go('root.newbie-guide');
                //$rootScope.loginName = response.data.user.name;
                //$rootScope.isLogged = true;
            } else {
                toaster.pop('warning', '提示', response.msg);
                $state.go('root.registerMobile');
            }
        });
    };

    $scope.sendMobileCaptcha = function() {
        RegisterService.sendMobileCaptcha.save({mobile: angular.element('#mobile').val() }, function(response) {
            if(response.ret == 1) {
                
            } else {
                
            }
        });
    };
}]);
 
