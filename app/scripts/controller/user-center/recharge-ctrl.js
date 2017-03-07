'use strict';
angular.module('hongcaiApp')
  .controller('RechargeCtrl',  function($location, $scope, $state, $rootScope, UserCenterService, DEFAULT_DOMAIN, $alert, $timeout, toaster, $window) {
    $scope.balance = 0;
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

    $scope.bankCodeList_FU = {
      'ICBK':{
        'card': 'ICBK',
        'name': '工商银行',
        'imgUrl': '/images/user-center/ICBK.png',
        'limit': '5w/5w/20w'
      },
      'BKCH':{
        'card': 'BKCH',
        'name': '中国银行',
        'imgUrl': '/images/user-center/BKCH.png',
        'limit': '5w/10w/20w'
      },
      'PCBC':{
        'card': 'PCBC',
        'name': '建设银行',
        'imgUrl': '/images/user-center/PCBC.png',
        'limit': '5w/10w/20w'
      },
      'ABOC':{
        'card': 'ABOC',
        'name': '农业银行',
        'imgUrl': '/images/user-center/ABOC.png',
        'limit': '5w/10w/20w'
      },
      'COMM':{
        'card': 'COMM',
        'name': '交通银行',
        'imgUrl': '/images/user-center/COMM.png',
        'limit': '5w/10w/20w'
      },
      'CMBC':{
        'card': 'CMBC',
        'name': '招商银行',
        'imgUrl': '/images/user-center/CMBC.png',
        'limit': '5w/5w/20w'
      },
      'CIBK':{
        'card': 'CIBK',
        'name': '中信银行',
        'imgUrl': '/images/user-center/CIBK.png',
        'limit': '1w/1w/2w'
      },
      'SZDB':{
        'card': 'SZDB',
        'name': '平安银行',
        'imgUrl': '/images/user-center/SZDB.png',
        'limit': '5w/20w/20w'
      },
      'MSBC':{
        'card': 'MSBC',
        'name': '民生银行',
        'imgUrl': '/images/user-center/MSBC.png',
        'limit': '5w/20w/20w'
      },
      'EVER':{
        'card': 'EVER',
        'name': '光大银行',
        'imgUrl': '/images/user-center/EVER.png',
        'limit': '5w/20w/20w'
      },
      'HXBK':{
        'card': 'HXBK',
        'name': '华夏银行',
        'imgUrl': '/images/user-center/HXBK.png',
        'limit': '5w/20w/20w'
      },
      'GDBK':{
        'card': 'GDBK',
        'name': '广发银行',
        'imgUrl': '/images/user-center/GDBK.png',
        'limit': '5w/20w/20w'
      },
      'PSBC':{
        'card': 'PSBC',
        'name': '邮政银行',
        'imgUrl': '/images/user-center/PSBC.png',
        'limit': '5w/20w/20w'
      },
      'FJIB':{
        'card': 'FJIB',
        'name': '兴业银行',
        'imgUrl': '/images/user-center/FJIB.png',
        'limit': '5w/5w/20w'
      },
      'SPDB':{
        'card': 'SPDB',
        'name': '浦发银行',
        'imgUrl': '/images/user-center/SPDB.png',
        'limit': '5w/5w/20w'
      }
    }

    $scope.bankCodeList_UCF = {
      'ICBK':{
        'card': 'ICBK',
        'name': '工商银行',
        'imgUrl': '/images/user-center/ICBK.png',
        'limit': '5w/5w/不限'
      },
      'BKCH':{
        'card': 'BKCH',
        'name': '中国银行',
        'imgUrl': '/images/user-center/BKCH.png',
        'limit': '5w/50w/不限'
      },
      'PCBC':{
        'card': 'PCBC',
        'name': '建设银行',
        'imgUrl': '/images/user-center/PCBC.png',
        'limit': '20w/50w/不限'
      },
      'ABOC':{
        'card': 'ABOC',
        'name': '农业银行',
        'imgUrl': '/images/user-center/ABOC.png',
        'limit': '20w/50w/不限'
      },
      'COMM':{
        'card': 'COMM',
        'name': '交通银行',
        'imgUrl': '/images/user-center/COMM.png',
        'limit': '9999/9999/不限'
      },
      'CMBC':{
        'card': 'CMBC',
        'name': '招商银行',
        'imgUrl': '/images/user-center/CMBC.png',
        'limit': '5000/10w/不限'
      },
      'CIBK':{
        'card': 'CIBK',
        'name': '中信银行',
        'imgUrl': '/images/user-center/CIBK.png',
        'limit': '1w/1w/2w'
      },
      'SZDB':{
        'card': 'SZDB',
        'name': '平安银行',
        'imgUrl': '/images/user-center/SZDB.png',
        'limit': '50w/500w/不限'
      },
      'MSBC':{
        'card': 'MSBC',
        'name': '民生银行',
        'imgUrl': '/images/user-center/MSBC.png',
        'limit': '2000w/10000w/不限'
      },
      'EVER':{
        'card': 'EVER',
        'name': '光大银行',
        'imgUrl': '/images/user-center/EVER.png',
        'limit': '50w/不限/不限'
      },
      'HXBK1':{
        'card': 'BOB',
        'name': '北京银行',
        'imgUrl': '/images/user-center/BOB.png',
        'limit': '5000/5000/不限'
      },
      'GDBK':{
        'card': 'GDBK',
        'name': '广发银行',
        'imgUrl': '/images/user-center/GDBK.png',
        'limit': '不限/不限/不限'
      },
      'PSBC':{
        'card': 'PSBC',
        'name': '邮政银行',
        'imgUrl': '/images/user-center/PSBC.png',
        'limit': '10w/100w/不限'
      },
      'FJIB':{
        'card': 'FJIB',
        'name': '兴业银行',
        'imgUrl': '/images/user-center/FJIB.png',
        'limit': '5w/5w/不限'
      },
      'SPDB':{
        'card': 'SPDB',
        'name': '浦发银行',
        'imgUrl': '/images/user-center/SPDB.png',
        'limit': '5w/30w/不限'
      },
      'HXBK':{
        'card': 'HXBK',
        'name': '华夏银行',
        'imgUrl': '/images/user-center/HXBK.png',
        'limit': '50w/150w/不限'
      }
    }
    /*
     *获取用户已绑定银行卡信息
     */
    $scope.getUserBankCard = function(expectPayCompany){
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
              payCompany: expectPayCompany
            },function(response){
              $scope.bankRemain = response.data.bankRemain;
              $scope.bankRemainHolder = $scope.payment !== 2? '该卡可充值' + $scope.bankRemain + '元' : '';

            });
          }
        }
      });
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
      if(amount <= 0 && $scope.payment == 2){
        return;
      }
      if(amount < 3 && ($scope.payment == 1 || $scope.payment == 3)){
        return;
      }
      if($rootScope.pay_company == 'cgt' && $rootScope.securityStatus.userAuth.active === false) {
        $rootScope.toActivate();
        return;
      }
      if(amount > $scope.bankRemain){
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
    //payment 1: 富友，2: 通联优势，3: 先锋支付
    $scope.selectPay = function(payment) {
      $scope.payment = payment;
      $scope.bankRemainHolder = $scope.payment == 1? '该卡可充值' + $scope.bankRemain + '元' : '';
      if(payment ===1){
        $scope.rechargeWay = 'SWIFT';
        $scope.expectPayCompany = 'FUIOU';
      }else if (payment === 2) {
        $scope.rechargeWay = 'WEB';
        $scope.expectPayCompany = 'UMPAY';
      }else if (payment === 3) {
        $scope.rechargeWay = 'SWIFT';
        $scope.expectPayCompany = 'UCFPAY';
      }
      if(payment !== 2){
        $scope.getUserBankCard($scope.expectPayCompany);
      }
      
    }
    $scope.selectPay(3);

  });
