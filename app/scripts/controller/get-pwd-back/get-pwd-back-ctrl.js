'use strict';
hongcaiApp.controller('GetPwdCtrl', ['$scope', '$timeout', '$state', '$rootScope', '$stateParams', 'SessionService', 'DEFAULT_DOMAIN', 'toaster','GetPwdService', 'UserCenterService', 'md5', function ($scope, $timeout, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster,GetPwdService, UserCenterService, md5) {
  $scope.areaFlag = 1;
  $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?';
  $scope.refreshCode = function() {
    angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
  };
  // Timer
  // $scope.timerRunning = false;
  // $scope.startTimer = function (){
  //   $scope.$broadcast('timer-start');
  //   $scope.timerRunning = true;
  // };

  $scope.verifyAccount = function(account){
    var dataBoth=[{'CategoryId':0, 'Name':'手机找回' }, {'CategoryId':1, 'Name':'邮箱找回'}];
    var dataPhone=[{'CategoryId':0, 'Name':'手机找回'}];
    var dataEmail=[{'CategoryId':1, 'Name':'邮箱找回'}];

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
      $scope.areaFlag = 2;
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
    }
  }
  // STEP2 根据account通过手机找回
  $scope.sendMobileCaptcha = function(account, mobile){
    UserCenterService.infoVerify.get({account: account, mobile: mobile, email: ''}, function(response) {
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
          };
        });
      };
    });
  };

  $scope.checkMobileCaptcha = function(user){
    if(user.phone && user.account) {
      var mobile = user.phone;
    } else {
      var mobile = user.account;
    };
    UserCenterService.checkMobileCaptcha.get({mobile: mobile, captcha: user.mobileCaptcha }, function(response) {
      if(response.ret == 1) {
        $scope.areaFlag = 3;
      } else {
        // TODO
        console.log('');
      }
    });
  };

  $scope.setPhoneNewPwd = function(user, newPwd){
    if (newPwd.password != newPwd.repeatPassword) {
      return;
    };
    if(user.account && user.phone) {
      var mobile = user.phone;
    } else {
      var mobile = user.account;
    }
    var md5MobPassword = md5.createHash(newPwd.password);
    UserCenterService.resetMobilePassword.get({mobile: mobile, captcha: user.mobileCaptcha, password: md5MobPassword }, function(response) {
      if(response.ret == 1) {
        $scope.areaFlag = 4;
        $scope.counter = 5;
        $scope.onTimeout = function(){
          $scope.counter--;
          mytimeout = $timeout($scope.onTimeout,1000);
          if($scope.counter === 0) {
            $state.go('root.login');
          }
        };
        var mytimeout = $timeout($scope.onTimeout,1000);
        $scope.$on('$stateChangeStart', function(){
          $timeout.cancel(mytimeout);
        });
        // $scope.startTimer();
      } else {
      };
    });
  };
}]);

hongcaiApp.controller('SetNewPwdCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'SessionService', 'toaster','GetPwdService','UserCenterService', '$timeout', 'md5', function ($scope, $state, $rootScope, $stateParams, SessionService, toaster, GetPwdService, UserCenterService, $timeout, md5) {
  $scope.areaFlag = 3;

  $scope.uuId = $stateParams.uuid;
  $scope.etoken = $stateParams.etoken;
  // 通过邮件的方式找回密码
  $scope.setEmailNewPwd = function(user) {
    if(user.password != user.repeatPassword) {
      return;
    }
    var md5EmailPassword = md5.createHash(user.password);
    UserCenterService.resetEmailPassword.get({uuid: $scope.uuId, token: $scope.etoken, password: md5EmailPassword }, function(response){
      if(response.ret == 1) {
        $scope.areaFlag = 4;
        $scope.counter = 5;
        $scope.onTimeout = function(){
          $scope.counter--;
          mytimeout = $timeout($scope.onTimeout,1000);
          if($scope.counter == 0) {
            $state.go('root.login');
          }
        }
        var mytimeout = $timeout($scope.onTimeout,1000);
        $scope.$on('$stateChangeStart', function(){
          $timeout.cancel(mytimeout);
        });
      }
    });
  }
}])
