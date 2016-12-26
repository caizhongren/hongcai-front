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
    $scope.bankCardList = [
      {'card': 'ICBK', 'cardName': '工商银行', 'limit': '5w/5w/20w'},
      {'card': 'BKCH', 'cardName': '中国银行', 'limit': '5w/10w/20w'},
      {'card': 'PCBC', 'cardName': '建设银行', 'limit': '5w/10w/20w'},
      {'card': 'ABOC', 'cardName': '农业银行', 'limit': '5w/10w/20w'},
      {'card': 'COMM', 'cardName': '交通银行', 'limit': '5w/10w/20w'},
      {'card': 'CMBC', 'cardName': '招商银行', 'limit': '5w/5w/20w'},
      {'card': 'CIBK', 'cardName': '中信银行', 'limit': '1w/1w/2w'},
      {'card': 'SZDB', 'cardName': '平安银行', 'limit': '5w/20w/20w'},
      {'card': 'MSBC', 'cardName': '民生银行', 'limit': '5w/20w/20w'},
      {'card': 'EVER', 'cardName': '光大银行', 'limit': '5w/20w/20w'},
      {'card': 'HXBK', 'cardName': '华夏银行', 'limit': '5w/20w/20w'},
      {'card': 'GDBK', 'cardName': '广发银行', 'limit': '5w/20w/20w'},
      {'card': 'PSBC', 'cardName': '邮政银行', 'limit': '5w/20w/20w'},
      {'card': 'FJIB', 'cardName': '兴业银行', 'limit': '5w/5w/20w'},
      {'card': 'SPDB', 'cardName': '浦发银行', 'limit': '5w/5w/20w'},
    ]
    $scope.bankCodeList = {
      'ICBK':{
        'name': '工商银行',
        'imgUrl': '/images/user-center/ICBK.png',
        'limit': '5w/5w/20w'
      },
      'BKCH':{
        'name': '中国银行',
        'imgUrl': '/images/user-center/BKCH.png',
        'limit': '5w/10w/20w'
      },
      'PCBC':{
        'name': '建设银行',
        'imgUrl': '/images/user-center/PCBC.png',
        'limit': '5w/10w/20w'
      },
      'ABOC':{
        'name': '农业银行',
        'imgUrl': '/images/user-center/ABOC.png',
        'limit': '5w/10w/20w'
      },
      'COMM':{
        'name': '交通银行',
        'imgUrl': '/images/user-center/COMM.png',
        'limit': '5w/10w/20w'
      },
      'CMBC':{
        'name': '招商银行',
        'imgUrl': '/images/user-center/CMBC.png',
        'limit': '5w/5w/20w'
      },
      'CIBK':{
        'name': '中信银行',
        'imgUrl': '/images/user-center/CIBK.png',
        'limit': '1w/1w/2w'
      },
      'SZDB':{
        'name': '平安银行',
        'imgUrl': '/images/user-center/SZDB.png',
        'limit': '5w/20w/20w'
      },
      'MSBC':{
        'name': '民生银行',
        'imgUrl': '/images/user-center/MSBC.png',
        'limit': '5w/20w/20w'
      },
      'EVER':{
        'name': '光大银行',
        'imgUrl': '/images/user-center/EVER.png',
        'limit': '5w/20w/20w'
      },
      'HXBK':{
        'name': '华夏银行',
        'imgUrl': '/images/user-center/HXBK.png',
        'limit': '5w/20w/20w'
      },
      'GDBK':{
        'name': '广发银行',
        'imgUrl': '/images/user-center/GDBK.png',
        'limit': '5w/20w/20w'
      },
      'PSBC':{
        'name': '邮政银行',
        'imgUrl': '/images/user-center/PSBC.png',
        'limit': '5w/20w/20w'
      },
      'FJIB':{
        'name': '兴业银行',
        'imgUrl': '/images/user-center/FJIB.png',
        'limit': '5w/5w/20w'
      },
      'SPDB':{
        'name': '浦发银行',
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
            $scope.bankRemainHolder = $scope.payment == 1? '该卡可充值' + $scope.bankRemain + '元' : '';

          });
        }
      }
    });

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
      if(amount < 2 && $scope.payment == 1){
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
      console.log($scope.payment);
      $scope.bankRemainHolder = $scope.payment == 1? '该卡可充值' + $scope.bankRemain + '元' : '';
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
