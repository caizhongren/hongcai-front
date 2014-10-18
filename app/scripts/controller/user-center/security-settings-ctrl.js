hongcaiApp.controller("SecuritySettingsCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", "toaster", function ($scope, $state, $rootScope, $stateParams, UserCenterService, toaster) {
        
    $rootScope.selectSide = "security-settings";
    UserCenterService.userSecurityInfo.get({}, function(response) {
        if(response.ret == 1) {
            var userVo = response.data.userVo;
            $scope.email = userVo.email;
            $scope.mobile = userVo.mobile;
            $scope.realName = userVo.realName;
            $scope.idNo = userVo.idNo;
            var realNameAuthStatus = userVo.realNameAuthStatus;
            if(realNameAuthStatus == 1){
                $scope.realNameAuthStatus = "认证中";
                $scope.isRealNameAuth = true;
            }else if(realNameAuthStatus == 2){
                $scope.realNameAuthStatus = "已认证";
                $scope.isRealNameAuth = true;
            }else if(realNameAuthStatus == 3){
                $scope.realNameAuthStatus = "认证失败";
                $scope.isRealNameAuth = false;
            }

            if(userVo.trusteeshipAccountStatus == 1){
                $scope.haveTrusteeshipAccount = true;
            } else {
                $scope.haveTrusteeshipAccount = false;
            }

        } else {
            toaster.pop('warning', "提示", response.msg);
            //$scope.errorMessage = response.msg;
            //$scope.warning = true;
            $state.go('root.login');
        }
    });

    $scope.sendMobileCaptcha = function(mobile){
        UserCenterService.sendMobileCaptcha.get({mobile: mobile}, function(response){
            if (response.ret == 1){
                console.log("sendMobileCaptcha success");
            }
        });
    }; 

    $scope.bindMobile = function(mobile, captcha){
        UserCenterService.bindMobile.get({mobile: mobile, captcha: captcha},function(response){
            if (response.ret == 1){
                $scope.mobile = mobile;
                $scope.changeMobile = false;
            } else {

            }
        });
    };

    $scope.changePassword = function(password){
        UserCenterService.changePassword.get({oldPassword: password.oldPassword, newPassword: password.newPassword, repeatNewPassword: password.repeatNewPassword},function(response){
            if (response.ret == 1){
                $scope.changPwd = false;
                $scope.password = null;
            } else {

            }
        });
    };

     var wait=60;
    function setTime(val) {
        if ( wait == 0 ) {
            val.removeAttribute("disabled");          
            val.value = '获取验证码';
            val.className = 'get-verify-button verify-index';
            wait = 60;
        }else{
            val.setAttribute("disabled", true);
            val.className = 'get-verify-button verify-index grey';
            val.value = wait + "s 后重新发送";
            wait--;
            setTimeout(function() {
                time(val)
            },
            1000)
        }
    }   
}]);


 