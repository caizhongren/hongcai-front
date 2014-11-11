hongcaiApp.controller("SecuritySettingsCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", "toaster", function ($scope, $state, $rootScope, $stateParams, UserCenterService, toaster) {
        
    $rootScope.selectSide = "security-settings";
    UserCenterService.userSecurityInfo.get({}, function(response) {
        if(response.ret == 1) {
            var userAuth = response.data.userAuth;
            var user = response.data.user;
            $scope.email = user.email;
            $scope.mobile = user.mobile;
            $scope.realName = userAuth.realName;
            $scope.idNo = userAuth.idNo;

            if(userAuth.yeepayAccountStatus == 1){
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

    $scope.bindMobile = function(mobileNo, captcha){
        UserCenterService.bindMobile.get({mobile: mobileNo, captcha: captcha},function(response){
            if (response.ret == 1){
                $scope.mobile = mobileNo.substr(0,3) + "****" + mobileNo.substr(7,11);
                $scope.changeMobile = false;
                $scope.mobileNo = null;
                $scope.inputCaptcha = null;
            } else {

            }
        });
    };


    $scope.bindEmail = function(email){
        UserCenterService.bindEmail.get({email: email},function(response){
            if (response.ret == 1){
                $scope.email = email.substr(0,2) + "****" + email.substr(email.indexOf("@"));
                $scope.changeEmail = false;
                $scope.newEmail = null;
            } else {

            }
        });
    };

    $scope.checkTwoPassword = function(password){
        if(password.repeatNewPassword != password.newPassword){
            return false;
        }else{
            return true;
        }

    }

    $scope.changePassword = function(password){
        if (password.repeatNewPassword != password.newPassword) {
            return;
        };
        UserCenterService.changePassword.get({oldPassword: password.oldPassword, newPassword: password.newPassword, repeatNewPassword: password.repeatNewPassword},function(response){
            if (response.ret == 1){
                $scope.changPwd = false;
                $scope.password = null;
            } else if(response.ret == -1) {
                if(response.code == -1021){
                    $scope.isOldPasswordTrue = false;
                }
            }
        });
    };


    function new_form(){
        var f = document.createElement("form");
        document.body.appendChild(f);
        f.method = "post";
        //f.target = "_blank";
        return f;
    }

    function create_elements(eForm,eName,eValue){
        var e=document.createElement("input");
        eForm.appendChild(e);
        e.type='text';
        e.name=eName;
        if(!document.all){
            e.style.display='none';
        }else{
            e.style.display='block';
            e.style.width='0px';
            e.style.height='0px';
        }
        e.value=eValue;
        return e;
    }

    $scope.checkEmailAndMobile = function(){
        if(!$scope.email || !$scope.mobile){
            $scope.openTrusteeshipAccount = false;
            alert("请先绑定邮箱和手机号码");
        }
    }

    $scope.realNameAuth = function(user) {
        UserCenterService.yeepayRegister.get({realName:user.realName, idCardNo:user.idCardNo}, function(response) {
            if(response.ret == 1) {
                var req = response.data.req;
                var sign = response.data.sign;
                var _f=new_form();
                create_elements(_f,"req",req);
                create_elements(_f,"sign",sign);
                _f.action="http://qa.yeepay.com/member/bha/toRegister";
                _f.submit();

            } else {

            }
        });
    };   
}]);


 