hongcaiApp.controller("SecuritySettingsCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", "toaster", function ($scope, $state, $rootScope, $stateParams, UserCenterService, toaster) {
        
        $rootScope.selectSide = "security-settings";
        console.log("security-settings");
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
    

}]);
