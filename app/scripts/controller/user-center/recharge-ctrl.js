'use strict';
angular.module('hongcaiApp')
  .controller('RechargeCtrl',  function($location, $scope, $state, $rootScope, UserCenterService, DEFAULT_DOMAIN, $alert) {
    $scope.balance = 0;
    UserCenterService.getUserBalance.get({}, function(response) {
      if (response.ret === 1) {
        $scope.balance = response.data.balance;
      } else {
        //console.log('ask recharge, why getUserBalance did not load data...');
      }
    });

    $scope.bankCodeList = {
      'ICBK':{
      'imgUrl': '/images/user-center/ICBK.png',
      'limit': '5w/5w/20w'
      },
      'BKCH':{
      'imgUrl': '/images/user-center/BKCH.png',
      'limit': '5w/10w/20w'
      },
      'PCBC':{
      'imgUrl': '/images/user-center/PCBC.png',
      'limit': '5w/10w/20w'
      },
      'ABOC':{
      'imgUrl': '/images/user-center/ABOC.png',
      'limit': '5w/10w/20w'
      },
      'COMM':{
      'imgUrl': '/images/user-center/COMM.png',
      'limit': '5w/10w/20w'
      },
      'CMBC':{
      'imgUrl': '/images/user-center/CMBC.png',
      'limit': '5w/5w/20w'
      },
      'CIBK':{
      'imgUrl': '/images/user-center/CIBK.png',
      'limit': '5w/20w/20w'
      },
      'SZDB':{
      'imgUrl': '/images/user-center/SZDB.png',
      'limit': '5w/20w/20w'
      },
      'MSBC':{
      'imgUrl': '/images/user-center/MSBC.png',
      'limit': '5w/20w/20w'
      },
      'EVER':{
      'imgUrl': '/images/user-center/EVER.png',
      'limit': '5w/20w/20w'
      },
      'HXBK':{
      'imgUrl': '/images/user-center/HXBK.png',
      'limit': '5w/20w/20w'
      },
      'GDBK':{
      'imgUrl': '/images/user-center/GDBK.png',
      'limit': '5w/20w/20w'
      },
      'PSBC':{
      'imgUrl': '/images/user-center/PSBC.png',
      'limit': '5w/20w/20w'
      },
      'FJIB':{
      'imgUrl': '/images/user-center/FJIB.png',
      'limit': '5w/5w/20w'
      },
      'SPDB':{
      'imgUrl': '/images/user-center/SPDB.png',
      'limit': '5w/5w/20w'
      },
    }
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
            payCompany: 'FUIOU'
          },function(response){
            $scope.bankRemain = response.data.bankRemain;
          });
        }
      }
    });

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?' + Math.random();
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };

    $scope.unbindBankCard = function() {
      $acope.showBankCardTip = false;
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
    $scope.showBankCardTip = false;

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
      if(amount <= 0){
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

    //记录选择支付方式 'FUIOU':富友，'ALLINPAY'：通联，'UMPAY':通联优势
    $scope.selectPay = function(payment) {
      $scope.payment = payment;
      if(payment ===1){
        $scope.rechargeWay = 'SWIFT';
        $scope.expectPayCompany = 'FUIOU';
      }else {
        $scope.rechargeWay = 'WEB';
        $scope.expectPayCompany = 'UMPAY';
      }
    }
    $scope.selectPay(1);

  });
