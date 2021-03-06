'use strict';

angular.module('hongcaiApp')
  .controller('SecuritySettingsCtrl', function(ipCookie, $scope, $state, $http, $rootScope, $stateParams, checkPwdUtil, UserCenterService, SecuritySettingService, config, md5, $alert, DEFAULT_DOMAIN,$modal, toaster, ProjectService) {

    $scope.userbusiness = 2;
    $scope.strength = 1;
    $scope.setAutoTender = false;
   
    $scope.getUserInfo = function () {
      //认证信息
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
            $scope.cardNo = card.cardNo ? card.cardNo.slice(-7) : '';
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
    }
    $rootScope.isLogged ? $scope.getUserInfo() : null;
    //解绑银行卡
    $scope.confirmUnbindBankCard = function(){
      if($rootScope.account.tTotalAssets > 2){
        UserCenterService.unbindBankCardApply.get({}, function(response) {
          if (response && response.ret !== 1) {
            $scope.unbindBankCardApply = response;
            if($scope.unbindBankCardApply.status === 1){
              window.open('/#!/bankcard-transfer/1');
            }else{
              var act =  function () {
                $scope.msg = '11';
                $alert({
                  scope: $scope,
                  template: 'views/modal/alertYEEPAY.html',
                  show: true
                });
              }

              $rootScope.migrateStatus(act);
            }
          }
        });
      }else{
        window.open('/#!/bankcard-transfer/1');
      }
    };
    $scope.unbindBankCard = function() {
      // $rootScope.toNotice();
      var act = function () {
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
      }
      $rootScope.migrateStatus(act);
    };
    //绑定银行卡
    $scope.bindBankCard = function() {
      // $rootScope.toNotice();
      var act = function () {
        $scope.msg = '5';
        $alert({
          scope: $scope,
          template: 'views/modal/alertYEEPAY.html',
          show: true
        });
        window.open('/#!/bankcard-transfer/0');
      }
      $rootScope.migrateStatus(act);
    };

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
          } else {
            toaster.pop('error', response.msg);
          }
        } else {
          //console.log('ask security-settings, why changePassword did not load data...');
        }
      });
    };
    // 新密码强度
    var pwdParttern = /^(?=.*[a-zA-Z])(?=.*[0-9])[\da-zA-Z~!@#$%^&*]{6,22}$/
    $scope.$watch('password.newPassword', function (newVal, oldVal) {
      $scope.pwdErrMsg = ''
      if (!pwdParttern.test(newVal)) {
        $scope.pwdErrMsg = '长度6-22，数字或字母的组合，可以包含特殊字符~!@#$%^&*'
      }
      if (newVal && newVal.length > 21) {
        $scope.password.newPassword = newVal.substr(0, 21);
      }
      $scope.strength = checkPwdUtil.getStrength(newVal, oldVal)
    })
    
    /**
      * 校验图形验证码只能输入数字
      */
    $scope.$watch('user.picCaptcha', function (newVal, oldVal) {
      var captchaPattern = /^\d{1,4}$/
      if (newVal && !captchaPattern.test(newVal)) {
        $scope.user.picCaptcha = newVal.replace(/\D/g, '').toString().slice(0, 4)
      }
    })

    /**
     * 修改手机号码
     */
   
    $scope.resetMobile = SecuritySettingService.getter().reset?true:false;
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
        UserCenterService.userSecurityInfo.get({}, function(response) {
          if (response.ret === 1) {
            var user = response.data.user;
            $scope.mobile = user.mobile;
          }
        });
      })
    };


    $scope.openTrusteeshipAccount = SecuritySettingService.getter().realName?true:false;
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
      var act = function () {
        $scope.msg = '1';
        $alert({
          scope: $scope,
          template: 'views/modal/alertYEEPAY.html',
          show: true
        });
        $scope.openTrusteeshipAccount = false;
        window.open('/#!/righs-transfer/' + user.realName + '/' + user.idCardNo + '/0');
      }
      $rootScope.migrateStatus(act);
    };

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?' + Math.random();
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };

    // document.getElementsByTagName("html")[0].style.overflow="hidden";
     $scope.blurUl = function($event) {
      var _con = angular.element('#projectTypeUl');   // 设置目标区域
      var input = angular.element('#input');   // 设置目标区域
      if(!_con.is($event.target) && _con.has($event.target).length === 0 && !input.is($event.target) && input.has($event.target).length === 0){ 
        $scope.showProjectType = false;
      }
      if (!_con.is($event.target) && _con.has($event.target).length === 0 && !input.is($event.target) && input.has($event.target).length === 0 && $scope.autoTender.investType.length == 0){
        $scope.noType = false;
      }
    }

    $scope.reload = function () {
      $state.reload();
    }
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
      var act = function () {
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
          $scope.setAutoTender = false 
          return;
        }else {
          if ($scope.openTrustReservation === 0 || $scope.openTrustReservation === 1) { //已开启
            $scope.goToTender();
            $scope.setAutoTender = true;
          } else { // 未开启
            $scope.goToTender();
            $scope.setAutoTender = false
          }
        }
      }
      $rootScope.migrateStatus(act);
    };
  
    //自动投标
    $scope.autoTender = [];
    $scope.dateLine = [90,120,180,270,360,720];
    $scope.interestRate = [7,8,9,10,11,12];
    $scope.projectType = {
        '5': '宏财精选', 
        '6': '宏财尊贵', 
        '2': '债权转让',
        '0': '全部',
        '7': '新手标'
    };

    $scope.autoTender.investType = [];
    $scope.selectTypeText = '';
    $scope.showDateLine = false;
    $scope.showInterestRate = false;
    $scope.showProjectType = false;
    $scope.noType = true;

    $scope.dateLineFn = function(){
      $scope.showDateLine =!$scope.showDateLine;
    };
    $scope.interestRateFn = function(){
      $scope.showInterestRate =!$scope.showInterestRate;
    };
    $scope.projectTypeFn = function(enter){
      if(enter && $scope.autoTender.investType.length == 0){
          $scope.noType = false;
      } else {
        $scope.showProjectType =!$scope.showProjectType;
      }
    }
    $scope.selectDateLine = function(date){
      $scope.autoTender.selectedDateLine = date;
    };

    // 标的类型

    $scope.multiSelect = function(type,ev){
      if($scope.autoTender.investType.length <= 0){
        $scope.autoTender.investType.push(type);
      }else{
        if($scope.autoTender.investType.indexOf(type) == -1){
          $scope.autoTender.investType.push(type);
        }else{
          $scope.autoTender.investType.splice($scope.autoTender.investType.indexOf(type),1);
        }
      }
      
      $scope.selectTypeText = '';
      if($scope.autoTender.investType.length >= $scope.projectTypeNo.length){
        $scope.selectTypeText = '全部';
      }else{
        for(var i = 0; i< $scope.autoTender.investType.length; i++){
          $scope.selectTypeText += ',' + $scope.projectType[$scope.autoTender.investType[i]];
        }
        $scope.selectTypeText = $scope.selectTypeText.split('');
        $scope.selectTypeText.splice(0,1);
        $scope.selectTypeText = $scope.selectTypeText.join('');
      }
      if ($scope.autoTender.investType.length > 0) {
        $scope.noType = true;
      }
      if($scope.autoTender.investType.length == 1 && $scope.autoTender.investType[0] == '7' && $scope.autoTender.minInvestAmount > 10000){
        $scope.errorMsg1 = '最大投标金额为10000元';
      } else if ($scope.autoTender.minInvestAmount <= 1000000){
        $scope.errorMsg1 = '';
      }
    };

    //最小投标金额
    var pattern=/^[0-9]*(\.[0-9]{1,2})?$/;
    var pattern2= /^\+?[1-9][0-9]*$/;
    $scope.errorMsg1 = '';
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
        }else if (newVal && newVal > 10000 && $scope.autoTender.investType.length == 1 && $scope.autoTender.investType[0] == '7') {
          $scope.errorMsg1 = '最大投标金额为10000元';
        }
      }
      
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
    
    // 判断是否第一次投资
    $scope.isExist = false;
    ProjectService.isExist.get({userId: 0},function(response){
      if(!response.exist){
        $scope.projectTypeNo = [
          {
            type: '7'
          },
          {
            type: '5'
          },
          {
            type: '6'
          },
          {
            type: '2'
          }
        ];
      }else{
        $scope.isExist = true;
        $scope.projectTypeNo = [
          {
            type: '5'
          },
          {
            type: '6'
          },
          {
            type: '2'
          }
        ];
      }
      $rootScope.isLogged ? $scope.AutoTender() : null;
      
    })
    $scope.AutoTender = function () {
      //自动投标详情
      UserCenterService.autoTender.get({
        userId: 0
      }, function(response){
        //1.开启  2. 过期 3.禁用 0已开启还未到开始日期
        $scope.openTrustReservation = response.status;
        if (response.userId !== null) {
          $scope.autoTenderDetail = response;
          $scope.autoTender.investType = $scope.autoTenderDetail.investType.split('');
          $scope.autoTender.minInvestAmount = $scope.autoTenderDetail.minInvestAmount;
          $scope.autoTender.retentionAmount = $scope.autoTenderDetail.remainAmount;
          $scope.autoTender.selectedDateLine = $scope.autoTenderDetail.maxRemainDay;
          $scope.autoTender.annualEarnings = $scope.autoTenderDetail.annualEarnings;
          $scope.autoTenderDetail.startTime = $scope.autoTenderDetail.startTime;
          $scope.autoTenderDetail.endTime = $scope.autoTenderDetail.endTime;
          
          for(var i=0;i<$scope.autoTender.investType.length;i++){
            if($scope.autoTender.investType[i] === ','){
              $scope.autoTender.investType.splice(i,1);
            }
          }
          if($scope.isExist){
            if($scope.autoTender.investType.indexOf('7') !== -1){
              $scope.autoTender.investType.splice($scope.autoTender.investType.indexOf('7'),1);
            }
          }
          if($scope.autoTender.investType.length >= $scope.projectTypeNo.length){
            $scope.selectTypeText = '全部';
          }else{
            for(var i=0;i<$scope.autoTender.investType.length;i++){
              $scope.selectTypeText += (',' +  $scope.projectType[$scope.autoTender.investType[i]]);
            }
            $scope.selectTypeText = $scope.selectTypeText.split('').splice(1).join('');
          }
          $scope.openTrustReservation === 3 ? $scope.setAutoTender = false : $scope.setAutoTender = true;
        }else {
          $scope.setAutoTender = false;
          $scope.autoTender.selectedDateLine = '720';
          $scope.autoTender.annualEarnings = '7';
          $scope.isExist ? $scope.autoTender.investType = ['2', '5', '6'] : $scope.autoTender.investType = ['2', '5', '6', '7'];
          $scope.selectTypeText = '全部';
          $scope.autoTender.minInvestAmount = 100;
          $scope.autoTender.retentionAmount = 0;
          $scope.currentTime = new Date();
          $scope.endTime = new Date().setFullYear(new Date().getFullYear()+1);
        }
      });
    }
      
    $scope.disableDubble = true;
    //开启自动投标

    $scope.openReservation2 = function(autoTender){
      var startTime = new Date(new Date($('#start').val().split('-').join('/')).setHours(0,0,0)).getTime();
      var endTime = new Date(new Date($('#end').val().split('-').join('/')).setHours(23,59,59)).getTime();
      var updateTime_t = new Date().getTime();
      if (!$rootScope.isLogged) {
        return;
      }
      if(startTime > endTime){
        $scope.errorMsg3 = '结束时间要大于开始时间';
        toaster.pop('error', '结束时间要大于开始时间');
      } else if(endTime < updateTime_t){
        $scope.errorMsg3 = '结束时间要大于当前时间';
        toaster.pop('error', '结束时间要大于当前时间');
      } else {
        $scope.errorMsg3 = '';
      }
      
      if($scope.errorMsg3 != ''){
        return;
      }
      if(autoTender.investType.length == 0){
        return;
      }
      if(autoTender.investType.length == 1 && autoTender.investType[0] == '7' && autoTender.minInvestAmount > 10000){
        $scope.errorMsg1 = '最大投标金额为10000元';
        return;
      }
      //开启
      UserCenterService.autoTenders.post({
        userId: 0,
        minInvestAmount: autoTender.minInvestAmount,
        minRemainDay: 0,
        maxRemainDay: autoTender.selectedDateLine,
        annualEarnings: autoTender.annualEarnings,
        investType: autoTender.investType.join(','),
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
    var busy = false;
    //禁用自动投标
    $scope.disabledAutoTender = function(){
      if (busy) {
        return;
      }
      busy = true
      setTimeout(function() {
        busy = false
      }, 1000)
      $scope.disableDubble = false;
      UserCenterService.disabledAutoTender.update({
        userId: $rootScope.loginUser.id,
        status: 3
      }, function(response){
        $scope.disableDubble = true;
        if (response.ret !== -1) {
          toaster.pop('success', '已成功禁用自动投标功能');
          $rootScope.reload();
        }
      })
    }
    if (ipCookie('modal')) {
      $scope.goToTender();
      ipCookie.remove('modal');
    }

    //显示取消自动投标授权弹窗
    $scope.showCancelAuthorization = function() {
      if (busy) {
        return;
      }
      busy = true
      setTimeout(function() {
        busy = false
      }, 1000)
      $modal({
        scope: $scope,
        template: 'views/modal/modal-cancelAuthorization.html',
        show: true
      });
    }

    // 取消自动投标授权
    $scope.cancelAuthorization = function() {
      if (busy) {
        return;
      }
      busy = true
      setTimeout(function() {
        busy = false
      }, 1000)
      UserCenterService.cancelUserAuthorization.post({
        userId: $rootScope.loginUser.id,
        device: 0
      }, function(response) {
        if (response && response.ret !== -1) {
          toaster.pop('success', '已成功取消自动投标授权');
          $rootScope.reload();
        } else {
          toaster.pop('warning', response.msg)
        }
      })
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
