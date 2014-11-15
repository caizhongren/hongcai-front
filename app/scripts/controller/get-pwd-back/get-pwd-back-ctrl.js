hongcaiApp.controller("GetPwdCtrl", ["$scope", "$timeout", "$state", "$rootScope", "$stateParams", "SessionService", "DEFAULT_DOMAIN", "toaster","GetPwdService", "UserCenterService", function ($scope, $timeout, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster,GetPwdService, UserCenterService) {
  $scope.areaFlag = 1;
  $scope.getPicCaptcha = DEFAULT_DOMAIN + "/siteUser/getPicCaptcha?";

  $scope.refreshCode = function() {
    angular.element("#checkCaptcha").attr("src", angular.element("#checkCaptcha").attr("src").substr(0, angular.element("#checkCaptcha").attr("src").indexOf('?')) + "?code=" + Math.random());
  };

  // $scope.reLoadProcessBar = function() {
  //   if($scope.areaFlag == 1) {

  //   }

  // };

  var reLoadProcessBar = function() {
    if($scope.areaFlag == 1) {
      $scope.step1Flag = "complete";
      $scope.step2Falg = $scope.step3Falg = $scope.step4Falg =  "disabled";
    } else if( $scope.areaFlag == 2 || $scope.areaFlag == 21 || $scope.areaFlag == 22) {
      $scope.step1Flag = "complete";
      $scope.step2Flag = "active";
      $scope.step3Flag = $scope.step4Flag = "disabled";
    } else if( $scope.areaFlag == 3) {
      $scope.step1Flag = $scope.step2Flag = "complete";
      $scope.step3Flag = "active";
      $scope.step4Flag = "disabled";
    } else {
      $scope.step1Flag = $scope.step2Flag =  $scope.step3Flag = $scope.step4Flag= "complete";
    }

  }

  $scope.verifyAccount = function(account){
    var dataBoth=[{"CategoryId":0, "Name":"手机找回" }, {"CategoryId":1, "Name":"邮箱找回"}];
    var dataPhone=[{"CategoryId":0, "Name":"手机找回"}];
    var dataEmail=[{"CategoryId":1, "Name":"邮箱找回"}];

    var mobilePattern = /^((13[0-9])|(15[^4,\D])|(18[0-9])|(17[0678]))\d{8}$/;
    var emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (mobilePattern.test(account)){ // 说明是手机号码找回
      UserCenterService.sendMobileCaptcha.get({mobile: account }, function(response) {
        if(response.ret == 1) {
          $scope.areaFlag = 21;
          reLoadProcessBar();
          $scope.phoneNum = account;
        } else {
          // TODO
          console.log('');
        }
      });
    } else if(emailPattern.test(account)){// 说明是邮箱
      UserCenterService.sendResetPwdEmail.get({email: account }, function(response) {
        if(response.ret == 1) {
            $scope.areaFlag = 22;
            reLoadProcessBar();
            $scope.emailAddr = account;
        } else {
          // TODO
          console.log('');
        }
      });
    } else {
      if($scope.usermessage.mobile && $scope.usermessage.email){
        $scope.Category = dataBoth;
      }else if($scope.usermessage.mobile){
        $scope.Category = dataPhone;
      }else if($scope.usermessage.email){
        $scope.Category = dataEmail;
      }
      $scope.$watch('CategoryVal', function (CategoryId) {
        if(CategoryId != 0) {
          $scope.isDisplay = false;
        }else{
          $scope.isDisplay = true;
        }
      });
      $scope.areaFlag = 2;
      reLoadProcessBar();
    }
  }
  // STEP2 根据account通过手机找回
  $scope.sendMobileCaptcha = function(account, mobile){
    UserCenterService.infoVerify.get({account: account, mobile: mobile, email: ""}, function(response) {
      if(response.ret == 1){
        UserCenterService.sendMobileCaptcha.get({mobile: mobile}, function(response){
          if(response.ret == 1) {
            // TODO
            console.log('sendMobileCaptcha success!');
          };
        });
      };
    });
  };
  // SETP2 根据account通过邮箱找回
  $scope.infoVerifyEmail = function(account, email) {
    UserCenterService.infoVerify.get({account: account, email: email}, function(response){
      if(response.ret == 1) {
        $scope.emailAddr = email;
        UserCenterService.sendResetPwdEmail.get({email: email}, function(response) {
          if(response.ret == 1) {
            $scope.areaFlag = 22;
            reLoadProcessBar();
          };
        });
      };
    });
  };

  $scope.checkMobileCaptcha = function(user, mobileCaptcha){
    if(user.phone && user.account) {
      var mobile = user.phone;
    } else {
      var mobile = user.account;
    };
    UserCenterService.checkMobileCaptcha.get({mobile: mobile, captcha: mobileCaptcha }, function(response) {
      if(response.ret == 1) {
        $scope.areaFlag = 3;
        reLoadProcessBar();
      } else {
        // TODO
        console.log('');
      }
    });
  };

  $scope.setPhoneNewPwd = function(mobile, mobileCaptcha, user){
    if (user.password != user.repeatPassword) {
      return;
    };
    UserCenterService.resetMobilePassword.get({mobile: mobile, captcha: mobileCaptcha, password: user.password }, function(response) {
      if(response.ret == 1) {
        // $scope.startCountDownNo = 5;
        $scope.areaFlag = 4;
        reLoadProcessBar();
      } else {
        // console.log("error auth");
      };
    });
  };
}]);

hongcaiApp.controller("SetNewPwdCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "SessionService", "toaster","GetPwdService","UserCenterService", function ($scope, $state, $rootScope, $stateParams, SessionService, toaster, GetPwdService, UserCenterService) {
  $scope.areaFlag = 3;

  $scope.uuId = $stateParams.uuid;
  $scope.token = $stateParams.token;
  // 通过邮件的方式找回密码
  $scope.setEmailNewPwd = function(user) {
    if(user.password != user.repeatPassword) {
      return;
    };
    UserCenterService.resetEmailPassword.get({uuid: $scope.uuId, token: $scope.token, password: user.password }, function(response){
      if(response.ret == 1) {
        $scope.areaFlag = 4;
        // reLoadProcessBar();
        $scope.startCountDownNo = 5;
      };
    });
  };
}])
