'use strict';
angular.module('hongcaiApp')
  .controller('SecuritySettingsCtrl', function($scope, $state, $rootScope, $stateParams, UserCenterService, config, md5, $alert, DEFAULT_DOMAIN) {

    UserCenterService.userSecurityInfo.get({}, function(response) {
      if (response.ret === 1) {
        var userAuth = response.data.userAuth;
        var user = response.data.user;
        $scope.email = user.email;
        $scope.mobile = user.mobile;
        if (userAuth && userAuth.yeepayAccountStatus === 1) {
          $scope.haveTrusteeshipAccount = true;
          $scope.openTrustReservation = userAuth.autoTransfer;
        } else {
          $scope.haveTrusteeshipAccount = false;
        }

      } else {
        console.log('ask security-settings, why userSecurityInfo did not load data...');
      }
    });

    $scope.sendMobileCaptcha = function(mobile, picCaptcha) {
      UserCenterService.sendMobileCaptcha.get({
        mobile: mobile,
        picCaptcha: picCaptcha
      }, function(response) {
        if (response.ret === 1) {
          console.log('sendMobileCaptcha success');
        } else {
          console.log('ask security-settings, why sendMobileCaptcha did not load data...');
        }
      });
    };

    $scope.bindMobile = function(mobileNo, captcha) {
      UserCenterService.bindMobile.get({
        mobile: mobileNo,
        captcha: captcha
      }, function(response) {
        if (response.ret === 1) {
          $scope.mobile = mobileNo.substr(0, 3) + '****' + mobileNo.substr(7, 11);
          $scope.changeMobile = false;
          $scope.mobileNo = null;
          $scope.inputCaptcha = null;
          $rootScope.securityStatus.mobileStatus = 1;
        } else {
          console.log('ask security-settings, why bindMobile did not load data...');
        }
      });
    };

    $scope.bindEmail = function(email) {
      UserCenterService.bindEmail.get({
        email: email
      }, function(response) {
        if (response.ret === 1) {
          $scope.msg = '操作成功';
          $alert({
            scope: $scope,
            template: 'views/modal/alert-dialog.html',
            show: true
          });
          $scope.email = email.substr(0, 2) + '****' + email.substr(email.indexOf('@'));
          $scope.changeEmail = false;
          $scope.newEmail = null;
          $rootScope.securityStatus.emailStatus = 1;
        } else {
          console.log('ask security-settings, why bindEmail did not load data...');
        }
      });
    };

    $scope.checkTwoPassword = function(password) {
      if (password) {
        if (password.repeatNewPassword !== password.newPassword) {
          return false;
        } else {
          return true;
        }
      }
    };

    var md5Password = function(password) {
      return md5.createHash(password);
    };
    $scope.changePassword = function(password) {
      if (password.repeatNewPassword !== password.newPassword) {
        return;
      }
      UserCenterService.changePassword.get({
        oldPassword: md5Password(password.oldPassword),
        newPassword: md5Password(password.newPassword),
        repeatNewPassword: md5Password(password.repeatNewPassword)
      }, function(response) {
        if (response.ret === 1) {
          $scope.changPwd = false;
          $scope.password = null;
        } else if (response.ret === -1) {
          if (response.code === -1021) {
            $scope.isOldPasswordTrue = false;
          }
        } else {
          console.log('ask security-settings, why changePassword did not load data...');
        }
      });
    };

    /**
     * 修改手机号码
     */
    $scope.resetMobilenum = function(mobileNum) {
      var regexp = new RegExp('^((13[0-9])|(15[^4,\\D])|(18[0-9])|(17[0678])|(14[0-9]))\\d{8}$');
      if(!regexp.test(mobileNum)) {
        return;
      }
      $scope.msg = '9';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      var url = $state.href('root.yeepay', {
        business: 'RESET_MOBILE',
        mobile: mobileNum
      });
      window.open(url, '_blank');
    };



    $scope.checkEmailAndMobile = function() {
      if (!$scope.mobile) {
        $scope.openTrusteeshipAccount = false;
        $scope.msg = '请先绑定手机号码';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
      }
    };

    $scope.realNameAuth = function(user) {
      $scope.msg = '1';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });

      window.open('/#!/righs-transfer/' + user.realName + '/' + user.idCardNo + '/0');
    };

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?' + Math.random();
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };

    $scope.openReservation = function() {
      $scope.msg = '6';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });

      var user = {
        'realName': 'default',
        'idCardNo': 'default'
      };

      window.open('/#!/righs-transfer/' + user.realName + '/' + user.idCardNo + '/1');

    };
  });
