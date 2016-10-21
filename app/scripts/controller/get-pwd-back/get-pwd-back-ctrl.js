'use strict';
angular.module('hongcaiApp')
  .controller('GetPwdCtrl', function($scope, $timeout, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster, UserCenterService, md5, $alert, ipCookie) {
    $scope.areaFlag = 1;
    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?';
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };
    $scope.refreshCode2 = function() {
      angular.element('#checkCaptcha2').attr('src', angular.element('#checkCaptcha2').attr('src').substr(0, angular.element('#checkCaptcha2').attr('src').indexOf('?')) + '?code=' + Math.random());
    };

    $scope.verifyAccount = function(account, captcha) {
      var dataBoth = [{
        'CategoryId': 0,
        'Name': '手机找回'
      }, {
        'CategoryId': 1,
        'Name': '邮箱找回'
      }];
      var dataPhone = [{
        'CategoryId': 0,
        'Name': '手机找回'
      }];
      var dataEmail = [{
        'CategoryId': 1,
        'Name': '邮箱找回'
      }];

      var mobilePattern = /^((13[0-9])|(15[^4,\D])|(18[0-9])|(17[0678]))\d{8}$/;
      var emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      /**
       * 说明是手机号码找回
       */
      if (mobilePattern.test(account)) { 
        UserCenterService.sendMobileCaptcha.save({
          picCaptcha: captcha,
          mobile: account,
          business: 1,
          guestId: ipCookie('guestId')
        }, function(response) {
          if (response.ret !== -1) {
            toaster.pop('success', '短信验证码发送成功！');
            $scope.areaFlag = 21;
            $scope.phoneNum = account;
          } else {
            toaster.pop('warning', '发送失败，' + response.msg);
          }

        });
        /**
         * 说明是邮箱
         */
      } else if (emailPattern.test(account)) { 
        UserCenterService.sendResetPwdEmail.get({
          email: account
        }, function(response) {
          if (response.ret === 1) {
            $scope.areaFlag = 22;
            $scope.emailAddr = account;
          } else {
            // TODO
            // console.log('');
          }
        });
      } else {
        $scope.areaFlag = 2;
        if ($scope.usermessage.mobile && $scope.usermessage.email) {
          $scope.Category = dataBoth;
        } else if ($scope.usermessage.mobile) {
          $scope.Category = dataPhone;
        } else if ($scope.usermessage.email) {
          $scope.Category = dataEmail;
        }

        $scope.CategoryVal = $scope.Category[0].CategoryId;

        $scope.$watch('CategoryVal', function(CategoryId) {
          if (CategoryId !== 0) {
            $scope.isDisplay = false;
          } else {
            $scope.isDisplay = true;
          }
        });
      }
    };
    /**
     * STEP2 根据account通过手机找回
     */
    $scope.sendMobileCaptcha = function(account, mobile,captcha) {
      UserCenterService.infoVerify.get({
        account: account,
        mobile: mobile,
        email: ''
      }, function(response) {
        if (response.ret === 1) {
          UserCenterService.sendMobileCaptcha.save({
            mobile: mobile,
            picCaptcha: captcha,
            business: 1,
            guestId: ipCookie('guestId')
          }, function(response) {
            if (response.ret !== -1) {
              toaster.pop('success', '短信验证码发送成功，请注意查收！');
            } else {
              toaster.pop('warning', '发送失败，' + response.msg);
            }
            // if (response.ret === 1) {
            //   toaster.pop('success', '验证码发送成功！');
            // } else {
            //   $scope.msg = response.msg;
            //   alert($scope.msg);
            //   $alert({
            //     scope: $scope,
            //     template: 'views/modal/alert-dialog.html',
            //     show: true
            //   });
            // }
          });
        }
      });
    };
    /**
     * SETP2 根据account通过邮箱找回
     */
    $scope.infoVerifyEmail = function(account, email) {
      UserCenterService.infoVerify.get({
        account: account,
        email: email,
        mobile:null
      }, function(response) {
        if (response.ret === 1) {
          $scope.emailAddr = email;
          UserCenterService.sendResetPwdEmail.get({
            email: email
          }, function(response) {
            if (response.ret === 1) {
              $scope.areaFlag = 22;
            }
          });
        }
      });
    };

    $scope.checkMobileCaptcha = function(user) {
      var mobile;
      if (user.phone && user.account) {
        mobile = user.phone;
      } else {
        mobile = user.account;
      }
      UserCenterService.checkMobileCaptcha.get({
        mobile: mobile,
        captcha: user.mobileCaptcha,
        business: 1
      }, function(response) {
        if (response.ret === 1) {
          $scope.areaFlag = 3;
        } else {
          toaster.pop('error', response.msg);
        }
      });
    };

    $scope.setPhoneNewPwd = function(user, newPwd) {
      if (newPwd.password !== newPwd.repeatPassword) {
        return;
      }
      var mobile;
      if (user.account && user.phone) {
        mobile = user.phone;
      } else {
        mobile = user.account;
      }
      var md5MobPassword = md5.createHash(newPwd.password);
      UserCenterService.resetMobilePassword.get({
        mobile: mobile,
        captcha: user.mobileCaptcha,
        password: md5MobPassword
      }, function(response) {
        if (response.ret === 1) {
          $scope.areaFlag = 4;
          $scope.counter = 5;
          $scope.onTimeout = function() {
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout, 1000);
            if ($scope.counter === 0) {
              $state.go('root.login');
            }
          };
          var mytimeout = $timeout($scope.onTimeout, 1000);
          $scope.$on('$stateChangeStart', function() {
            $timeout.cancel(mytimeout);
          });
          // $scope.startTimer();
        } else {

        }
      });
    };
  })

  .controller('SetNewPwdCtrl', function($scope, $state, $rootScope, $stateParams, SessionService, toaster, UserCenterService, $timeout, md5) {
    $scope.areaFlag = 3;

    $scope.uuId = $stateParams.uuid;
    $scope.etoken = $stateParams.etoken;

    /**
     * 通过邮件的方式找回密码
     */
    $scope.setEmailNewPwd = function(user) {
      if (user.password !== user.repeatPassword) {
        return;
      }
      var md5EmailPassword = md5.createHash(user.password);
      UserCenterService.resetEmailPassword.get({
        uuid: $scope.uuId,
        etoken: $scope.etoken,
        password: md5EmailPassword
      }, function(response) {
        if (response.ret === 1) {
          $scope.areaFlag = 4;
          $scope.counter = 5;
          $scope.onTimeout = function() {
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout, 1000);
            if ($scope.counter === 0) {
              $state.go('root.login');
            }
          };
          var mytimeout = $timeout($scope.onTimeout, 1000);
          $scope.$on('$stateChangeStart', function() {
            $timeout.cancel(mytimeout);
          });
        }
      });
    };
  });
