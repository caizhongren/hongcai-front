'use strict';
angular.module('hongcaiApp')
  .controller('SecuritySettingsCtrl', function(ipCookie, $scope, $state, $http, $rootScope, $stateParams, UserCenterService, config, md5, $alert, DEFAULT_DOMAIN,$modal, toaster) {

    $scope.userbusiness = 2;
    UserCenterService.userSecurityInfo.get({}, function(response) {
      if (response.ret === 1) {
        var userAuth = response.data.userAuth;
        var user = response.data.user;
        $scope.email = user.email;
        $scope.mobile = user.mobile;
        $scope.userId = user.id;
        if (userAuth && userAuth.authStatus === 2) {
          $scope.haveTrusteeshipAccount = true;
          // $scope.openTrustReservation = userAuth.autoTransfer;
        } else {
          $scope.haveTrusteeshipAccount = false;
        }

      } else {
        //console.log('ask security-settings, why userSecurityInfo did not load data...');
      }
    });
    //绑卡信息
    UserCenterService.getUserBankCard.get({}, function(response) {
      if (response.ret === 1) {

        var card = response.data.card;
        $scope.isAuth = response.data.isAuth;
        if (card) {
          $scope.haveCard = (card.status === 'VERIFIED');
          $scope.bankName = card.openBank;
          $scope.cardNo = card.cardNo.slice(-7);
          $scope.isVerifying = (card.status === 'VERIFYING');
          $scope.unbinding = (card.status === 'INIT');
        } else {
          $scope.haveCard = false;
          $scope.isVerifying = false;
          $scope.unbinding = false;
        }
        
      } else {
        toaster.pop('error', response.msg);
      }
    });
    console.log($scope.isAuth);

    //解绑银行卡
    $scope.confirmUnbindBankCard = function(){
      // $rootScope.toNotice();
      $scope.msg = '11';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
    };
    $scope.unbindBankCard = function() {
      // $rootScope.toNotice();
      UserCenterService.unbindBankCard.get({}, function(response) {
        if (response.ret === 1) {
          $state.go('root.yeepay-callback', {
            business: 'UNBIND_CARD',
            status: 'SUCCESS'
          });
        } else {
          toaster.pop('error', response.msg);
        }
      });
    };
    //绑定银行卡
    $scope.bindBankCard = function() {
      // $rootScope.toNotice();
      $scope.msg = '5';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/bankcard-transfer/0');
    };

    $scope.changeMobile = ipCookie('changeMobile')?true:false;
    $scope.bindMobile = function(mobileNo, captcha) {
      UserCenterService.bindMobile.get({
        mobile: mobileNo,
        captcha: captcha,
        business: 2
      }, function(response) {
        if (response.ret === 1) {
          $scope.mobile = mobileNo.substr(0, 3) + '****' + mobileNo.substr(7, 11);
          $scope.changeMobile = false;
          $scope.mobileNo = null;
          $scope.inputCaptcha = null;
          $rootScope.securityStatus.mobileStatus = 1;
        } else {
          //console.log('ask security-settings, why bindMobile did not load data...');
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
          //console.log('ask security-settings, why bindEmail did not load data...');
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
          $state.go('root.login');
        } else if (response.ret === -1) {
          if (response.code === -1021) {
            $scope.isOldPasswordTrue = false;
          }
        } else {
          //console.log('ask security-settings, why changePassword did not load data...');
        }
      });
    };

    /**
     * 修改手机号码
     */
    $scope.resetMobile = ipCookie('resetMobile')? true:false;
    $scope.resetMobilenum = function(user) {
      var regexp = new RegExp('^((13[0-9])|(15[^4,\\D])|(18[0-9])|(17[0678])|(14[0-9]))\\d{8}$');
      if(!regexp.test(user.mobile)) {
        return;
      }

      UserCenterService.resetMobile.post({
        mobile: user.mobile,
        captcha: user.inputCaptcha
      }, function(response){
        $scope.showMsg = false;
        if(response.ret && response.ret !==1){
          $scope.showMsg = true;
          $scope.captchaErrMsg = response.msg;
          return;
        }
        toaster.pop('success', '恭喜您，修改成功！');
        $scope.user.mobile = null;
        $scope.user.picCaptcha = null;
        $scope.user.inputCaptcha = null;
        $scope.resetMobile = false;
        ipCookie.remove('resetMobile');
        UserCenterService.userSecurityInfo.get({}, function(response) {
          if (response.ret === 1) {
            var user = response.data.user;
            $scope.mobile = user.mobile;
          }
        });
      })
    };


    $scope.openTrusteeshipAccount = ipCookie('openTrusteeshipAccount')?true:false;
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

    // document.getElementsByTagName("html")[0].style.overflow="hidden";
    //设置自动投标弹窗
    $scope.goToTender = function(){
      $scope.msg = '6';
      $alert({
        scope: $scope,
        template: 'views/modal/alert-autoReservation.html',
        show: true
      });
    }

    //开通自动投标
    $scope.openReservation = function() {
      if ($rootScope.securityStatus.realNameAuthStatus !== 1) {
        $modal({
          scope: $scope,
          template: 'views/modal/modal-realNameAuth.html',
          show: true
        });
      }else if($rootScope.securityStatus.autoTransfer === 0){
        var user = {
          'realName': 'default',
          'idCardNo': 'default'
        };

        window.open('/#!/righs-transfer/' + user.realName + '/' + user.idCardNo + '/1');
        $scope.goToTender();
        
      }else {
        $scope.goToTender();
        UserCenterService.autoTender.get({
          userId: $rootScope.loginUser.id
        }, function(response){
          if(response.status != null){
            $scope.setAutoTender = true;
          }else {
            $scope.setAutoTender = false;
          }
        });
      }

    };
  
    //自动投标
    $scope.autoTender = [];
    $scope.dateLine = [ 30,90,120,180,360];
    $scope.interestRate = [7,8,9,10,11,12];
    $scope.projectType = ['宏金保','债权转让','全部',];
    $scope.showDateLine = false;
    $scope.showInterestRate = false;
    $scope.showProjectType = false;

    $scope.dateLineFn = function(){
      $scope.showDateLine =!$scope.showDateLine;
    };
    $scope.interestRateFn = function(){
      $scope.showInterestRate =!$scope.showInterestRate;
    };
    $scope.projectTypeFn = function(){
      $scope.showProjectType =!$scope.showProjectType;
    };
    
    $scope.selectDateLine = function(date){
      $scope.autoTender.selectedDateLine = date;
    };
    $scope.selectInterestRate = function(interestRate){
      $scope.autoTender.selectedInterestRate = interestRate;
    };
    $scope.selectProjectType = function(projectType){
      $scope.autoTender.selectedProjectType = projectType;
    };

    //最小投标金额
    var pattern=/^[0-9]*(\.[0-9]{1,2})?$/;
    var pattern2= /^\+?[1-9][0-9]*$/;
    $scope.error1 = false;
    $scope.watchInvestAmount= function(newVal) {
      $scope.errorMsg1 = '';
      if (!$rootScope.isLogged) {
        return;
      }
      if (newVal === null) {
        $scope.errorMsg1 = '请输入最小投标金额';
      }
      if (newVal == 0) {
          $scope.errorMsg1 = '请输入大于0的数字';
      }
      if (newVal) {
        if (newVal >=0 && !pattern.test(newVal)) {
          $scope.errorMsg1 = '最多精确到小数点后两位';
        }else if(newVal % 100 !== 0 || !pattern2.test(newVal)){
          $scope.errorMsg1 = '请输入100元的正整数倍';
        }else if (newVal > 1000000) {
          $scope.errorMsg1 = '最大投标金额为1000000元';
        }
      } 
      $scope.error1 = $scope.errorMsg1 === '' ? false : true;      
    };
    //账户保留金额
    $scope.error2 = false;
    $scope.watchRetentionAmount= function(newVal) {
      $scope.errorMsg2 = '';
      if (!$rootScope.isLogged) {
        return;
      }
      if (newVal === null) {
        $scope.errorMsg2 = '请输入账户保留金额';
      }
      if (newVal) {
        if (newVal >=0 && !pattern.test(newVal)) {
          $scope.errorMsg2 = '最多精确到小数点后两位';
        }else if(newVal<= 0){
          $scope.errorMsg2 = '请输入大于0的数字';
        }else if (newVal > 1000000) {
          $scope.errorMsg2 = '最大保留金额为1000000元';
        }
      } 
      $scope.error2 = $scope.errorMsg2 === '' ? false : true;   
    };
    
    //自动投标详情
    UserCenterService.autoTender.get({
      userId: 0
    }, function(response){
      $scope.openTrustReservation = response.status;
      if (response.userId !== null) {
        $scope.setAutoTender = true;
        $scope.autoTenderDetail = response;
        var investType = $scope.autoTenderDetail.investType;
        if (investType ===1) {
          $scope.autoTender.selectedProjectType = '宏金保';
        }else if (investType ===2) {
          $scope.autoTender.selectedProjectType = '债权转让';
        }else {
          $scope.autoTender.selectedProjectType = '全部';
        }
        $scope.autoTender.minInvestAmount = $scope.autoTenderDetail.minInvestAmount;
        $scope.autoTender.retentionAmount = $scope.autoTenderDetail.remainAmount;
        $scope.autoTender.selectedDateLine = $scope.autoTenderDetail.maxRemainDay;
        $scope.autoTender.selectedInterestRate = $scope.autoTenderDetail.annualEarnings;
        $scope.autoTenderDetail.startTime = $scope.autoTenderDetail.startTime;
        $scope.autoTenderDetail.endTime = $scope.autoTenderDetail.endTime;
      }else {
        $scope.setAutoTender = false;
        $scope.autoTender.selectedDateLine = '360';
        $scope.autoTender.selectedInterestRate = '7';
        $scope.autoTender.selectedProjectType = '全部';
        $scope.autoTender.minInvestAmount = 100;
        $scope.autoTender.retentionAmount = 0;
        $scope.currentTime = new Date();
        $scope.endTime = new Date().setFullYear(new Date().getFullYear()+1);
      }
    });
    $scope.disableDubble = true;
    //开启自动投标
    $scope.openReservation2 = function(autoTender){
      $scope.disableDubble = false;
      var startTime = new Date($('#start').val()).getTime();
      var endTime = new Date($('#end').val()).getTime();
     
      if (!$rootScope.isLogged) {
        return;
      }
      
      if (autoTender.selectedProjectType ==='宏金保') {
        var projectType = 1;
      }else if (autoTender.selectedProjectType ==='债权转让') {
        var projectType = 2;
      }else {
        var projectType = 0;
      }

      //开启
      UserCenterService.autoTenders.post({
        userId: 0,
        minInvestAmount: autoTender.minInvestAmount,
        minRemainDay: 0,
        maxRemainDay: autoTender.selectedDateLine,
        annualEarnings: autoTender.selectedInterestRate,
        investType: projectType,
        remainAmount: autoTender.retentionAmount,
        startTime: startTime,
        endTime: endTime
      }, function(response) {
        $scope.disableDubble = true;
        if (response.ret !== -1) {
          toaster.pop('success', '已开启自动投标');
          $rootScope.reload();
        }
      })
    }
    //修改到编辑状态
    $scope.modify = function(){
      $scope.setAutoTender = false;
      $scope.currentTime = $scope.autoTenderDetail.startTime;
      $scope.endTime = $scope.autoTenderDetail.endTime;
    }
    //禁用自动投标
    $scope.disabledAutoTender = function(){
      $scope.disableDubble = false;
      UserCenterService.disabledAutoTender.update({
        userId: $rootScope.loginUser.id,
        status: 3
      }, function(response){
        $scope.disableDubble = true;
        if (response.ret !== -1) {
          toaster.pop('success', '已禁用自动投标');
          $rootScope.reload();
        }
      })
    }
    if (ipCookie('modal')) {
      $scope.goToTender();
      ipCookie.remove('modal');
    }

    //风险测评显示
   
    UserCenterService.recentlyQuestionnaire.get({userId: 0}, function(response){
      $scope.score1 = response.score1;
      $scope.score2 = response.score2;
      if($scope.score1 == -1 && $scope.score2 == -1 || !$rootScope.isLogged) {
        $scope.questionnareStatus = '未测评';
      }
      if($scope.score1 !== -1 && $scope.score2 !== -1){
        if($scope.score2 < 35) {
          $scope.questionnareStatus = '保守型';
        }
        if($scope.score2 > 34 && $scope.score2 < 60) {
          $scope.questionnareStatus = '稳健型';
        }
        if($scope.score2 > 59) {
          $scope.questionnareStatus = '进取型';
        }
      }
    })

    //去风险测评
    $scope.toQuestionnare = function() {
      $state.go('root.userCenter.questionnaire');
    }
    
  });
