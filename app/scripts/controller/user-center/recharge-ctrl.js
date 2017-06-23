'use strict';
angular.module('hongcaiApp')
  .controller('RechargeCtrl',  function($location, $scope, $state, $rootScope, UserCenterService, DEFAULT_DOMAIN, $alert, $timeout, toaster, $window) {
    $scope.balance = 0;
    $scope.showSupportBank = false;
    UserCenterService.getUserBalance.get({}, function(response) {
      if (response.ret === 1) {
        $scope.balance = response.data.balance;
      } else {
        //console.log('ask recharge, why getUserBalance did not load data...');
      }
    });

    //提示更换银行卡弹窗
    $scope.changeCard =  function(){
      $alert({
        scope: $scope,
        template: 'views/modal/alert-changeBankCard.html',
        show: true
      });
    }

    

    //查询银行卡限额
    $scope.bankCodeList = [];
    var userCurrenBank = {bankCode:'ICBK',dayLimit:0,monthLimit:0,singleLimit:0};
    sessionStorage.getItem('userCurrenBank') ? angular.fromJson(sessionStorage.getItem('userCurrenBank')) : userCurrenBank;
    $scope.userCurrenBank = [];
    $scope.getBankLimit = function(payCompany,bankCode) {
      UserCenterService.getBankCardLimit.get({
        payCompany: payCompany,
        bankCode: bankCode
      }, function(response) {
        if(!response || response.ret == -1) {
          return;
        }
        
        $scope.bankCodeList = response.data.bankLimit;
        //当前绑定银行卡限额
        var bankLimit = response.data.bankLimit;

        /*
         *获取用户已绑定银行卡信息
         */
        UserCenterService.getUserBankCard.get({}, function(response) {
          if (response.ret === 1 && response.data.card) {
            var cardStatus = response.data.card.status;
            $scope.userCard = response.data.card;
            var userId = response.data.card.userId;
            if (cardStatus === 'VERIFIED') {
              $scope.bankCode = response.data.card.bankCode;
              //获取单笔充值限额信息
              UserCenterService.getUserRechargeRemainLimit.get({
                userId: userId,
                payCompany: payCompany
              },function(response){
                $scope.bankRemain = response.data.bankRemain;
                $scope.bankRemainHolder = $scope.payment !== 2? '该卡可充值' + $scope.bankRemain + '元' : '';
                $scope.bankStatus = response.data.bankStatus;
                for(var i = 0; i < bankLimit.length; i++) {
                  if(bankLimit[i].bankCode == $scope.userCard.bankCode) {
                    $scope.userCurrenBank = bankLimit[i];
                    sessionStorage.setItem('userCurrenBank', angular.toJson($scope.userCurrenBank));
                  }
                  //图片地址
                  $scope.bankCodeList[i].src = $scope.bankLimitList[bankLimit[i].bankCode];
                }
              });
            }
          }
        })
      })
    }
    
    $scope.bankLimitList = {
      'ICBK': '/images/user-center/ICBK.png',
      'BKCH': '/images/user-center/BKCH.png',
      'PCBC': '/images/user-center/PCBC.png',
      'ABOC': '/images/user-center/ABOC.png',
      'COMM': '/images/user-center/COMM.png',
      'CMBC': '/images/user-center/CMBC.png',
      'CIBK': '/images/user-center/CIBK.png',
      'SZDB': '/images/user-center/SZDB.png',
      'MSBC': '/images/user-center/MSBC.png',
      'EVER': '/images/user-center/EVER.png',
      'HXBK': '/images/user-center/HXBK.png',
      'GDBK': '/images/user-center/GDBK.png',
      'PSBC': '/images/user-center/PSBC.png',
      'FJIB': '/images/user-center/FJIB.png',
      'SPDB': '/images/user-center/SPDB.png',
      'BOB': '/images/user-center/BOB.png'
    }

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?' + Math.random();
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };
    $scope.showBankCardTip = false;

    /*
    * 解绑银行卡
    */
    var goBindCard = function() {
      $window.open('/#!/bankcard-transfer/0');
    }
    $scope.unbindBankCard = function() {
      $scope.showBankCardTip = false;
      // 使用同步请求， 解决有可能弹窗被浏览器拦截的问题
      $.ajax({
        url: DEFAULT_DOMAIN + '/yeepay/unbindBankCard',
        'type': 'get',
        async: false,
        dataType: 'json',
        success: function(response) {
          if (response.ret === 1) {
            $scope.msg = '5';
            $alert({
              scope: $scope,
              template: 'views/modal/alertYEEPAY.html',
              show: true
            });
            $timeout(function() {
              goBindCard();
            }, 100);
            // $window.open('/#!/bankcard-transfer/0');
          } else {
            toaster.pop('error', response.msg);
          }
        }
      });
      
    };

    $scope.transferToPlaform = function(amount) {
      $scope.msg = '8';
      $scope.transferAmount = amount;
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/transfer-transfer/' + amount);
    };
    $scope.recharge = function(amount) {
      // $rootScope.toNotice();
      var curHours = new Date().getHours(); //当前小时值
      var curMinutes = new Date().getMinutes(); //当前分钟值
      var act = function () {
        if(amount <= 0 && $scope.payment == 2){
          return;
        }
        if(amount < 3 && ($scope.payment == 1 || $scope.payment == 3)){
          return;
        }
        if($rootScope.pay_company == 'cgt' && $rootScope.securityStatus.userAuth.active === false) {
          $rootScope.migrateStatus();
          return;
        }
        if(amount > $scope.bankRemain && $scope.rechargeWay == 'SWIFT'){
          return;
        }
        if((curHours === 23 && curMinutes >= 54) || (curHours === 0 && curMinutes <= 6)) {
          $scope.msg = '尊敬的用户，23:55 — 00:05是充值系统维护期，请稍后操作。';
          $alert({
            scope: $scope,
            template: 'views/modal/alert-dialog.html',
            show: true
          });
          return;
        }
        if($scope.bankStatus == 1 && $scope.payment !== 2){
          $alert({
            scope: $scope,
            template: 'views/modal/alert-maintenance.html',
            show: true
          });
          return;
        }
        $scope.msg = '2';
        $scope.rechargeAmount = amount;

        $alert({
          scope: $scope,
          template: 'views/modal/alertYEEPAY.html',
          show: true
        });
        
        window.open('/#!/recharge-transfer/' + amount +"/"+ $scope.rechargeWay +"/" + $scope.expectPayCompany);
      }
      $rootScope.migrateStatus(act)

    };

    $scope.toBindBank = function(){
      if($rootScope.bankCardStatus !== 'VERIFIED') {
        $scope.msg = '5';
        $alert({
          scope: $scope,
          template: 'views/modal/alertYEEPAY.html',
          show: true
        });
        window.open('/#!/bankcard-transfer/0');
        return;
      }
    }


    //记录选择支付方式 'FUIOU':富友，'ALLINPAY'：通联，'UMPAY':通联优势， 'UCFPAY': 先锋支付
    //payment 1: 富友，2: 易宝网银，3: 先锋支付，4：易宝
    $scope.selectPay = function(payment) {
      $scope.payment = payment;
      $scope.bankRemainHolder = $scope.payment !== 2 ? '该卡可充值' + $scope.bankRemain + '元' : '';
      if(payment ===1){
        $scope.rechargeWay = 'SWIFT';
        $scope.expectPayCompany = 'FUIOU';
      }else if (payment === 2) {
        $scope.rechargeWay = 'WEB';
        $scope.expectPayCompany = 'YEEPAY';
      }else if (payment === 3) {
        $scope.rechargeWay = 'SWIFT';
        $scope.expectPayCompany = 'UCFPAY';

      }else if (payment === 4) {
        $scope.rechargeWay = 'SWIFT';
        $scope.expectPayCompany = 'YEEPAY';
      }
       $scope.getBankLimit($scope.expectPayCompany);
    }
    $scope.selectPay(3);

  });
