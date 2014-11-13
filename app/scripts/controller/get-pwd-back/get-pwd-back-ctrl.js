hongcaiApp.controller("GetPwdCtrl", ["$scope", "$timeout", "$state", "$rootScope", "$stateParams", "SessionService", "DEFAULT_DOMAIN", "toaster","GetPwdService", "UserCenterService", function ($scope, $timeout, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster,GetPwdService, UserCenterService) {
  $scope.countDown = 100;
  $scope.areaFlag = 1;
  $scope.getPicCaptcha = DEFAULT_DOMAIN + "/siteUser/getPicCaptcha?";

  $scope.refreshCode = function() {
    angular.element("#checkCaptcha").attr("src", angular.element("#checkCaptcha").attr("src").substr(0, angular.element("#checkCaptcha").attr("src").indexOf('?')) + "?code=" + Math.random());
  };

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
    }
  }

  $scope.sendMobileCaptcha = function(mobile){
    UserCenterService.sendMobileCaptcha.get({mobile: mobile}, function(response){
      if(response.ret == 1) {
        console.log('sendMobileCaptcha success!');
      };
    });
  };

  $scope.checkMobileCaptcha = function(mobile, mobileCaptcha){
    UserCenterService.checkMobileCaptcha.get({mobile: mobile, captcha: mobileCaptcha }, function(response) {
      if(response.ret == 1) {
        $scope.areaFlag = 3;
      } else {
        // TODO
        console.log('');
      }
    });
  };

  $scope.setPhoneNewPwd = function(mobile, mobileCaptcha, user){
    // console.log(mobile);
    // console.log(mobileCaptcha);
    // console.log(user);
    if (user.password != user.repeatPassword) {
      return;
    };
    UserCenterService.resetPassword.get({mobile: mobile, captcha: mobileCaptcha, password: user.password }, function(response) {
      if(response.ret == 1) {
        $scope.countDown = 5;
        $scope.areaFlag = 4;
      } else {
        // console.log("error auth");
      };
    });
  };
}])

// .controller("SetPwdCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "SessionService", "DEFAULT_DOMAIN", "toaster","GetPwdService", function ($scope, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster,GetPwdService) {
//     $scope.areaFlag = 3;
// }]);
