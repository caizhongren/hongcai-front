'use strict';
angular.module('hongcaiApp')
  .controller('BankCardManagementCtrl', ['$location', '$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'DEFAULT_DOMAIN', 'config', '$alert', function($location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, config, $alert) {
    $rootScope.selectSide = 'bankcard-management';
    $scope.dosi = true;
    UserCenterService.getUserBankCard.get({}, function(response) {
      if (response.ret === 1) {
        var card = response.data.card;
        if (card) {
          $scope.haveCard = (card.status === 'VERIFIED');
          $scope.bankName = card.openBank;
          $scope.cardNo = card.cardNo;
          $scope.isVerifying = (card.status === 'VERIFYING');
        } else {
          $scope.haveCard = false;
          $scope.isVerifying = false;
        }
        $scope.isAuth = response.data.isAuth;
      } else {
        console.log('ask bankcard-management, why getUserBankCard did not load data...');
      }
    });

    function newForm() {
      var f = document.createElement('form');
      document.body.appendChild(f);
      f.method = 'post';
      //f.target = '_blank';
      return f;
    }

    function createElements(eForm, eName, eValue) {
      var e = document.createElement('input');
      eForm.appendChild(e);
      e.type = 'text';
      e.name = eName;
      if (!document.all) {
        e.style.display = 'none';
      } else {
        e.style.display = 'block';
        e.style.width = '0px';
        e.style.height = '0px';
      }
      e.value = eValue;
      return e;
    };

    $scope.reload = function() {
      window.location.reload();
    };

    $scope.bindBankCard = function() {
      $scope.msg = '5';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      UserCenterService.bindBankCard.get({}, function(response) {
        if (response.ret === 1) {
          var req = response.data.req;
          var sign = response.data.sign;
          var _f = newForm();
          createElements(_f, 'req', req);
          createElements(_f, 'sign', sign);
          _f.action = config.YEEPAY_ADDRESS + 'toBindBankCard';
          $scope.dosi = false;
          _f.submit();
        } else {
          console.log('ask bankcard-management, why bindBankCard did not load data...');
        }
      });
    };

    $scope.unbindBankCard = function() {
      UserCenterService.unbindBankCard.get({}, function(response) {
        if (response.ret === 1) {
          var req = response.data.req;
          var sign = response.data.sign;
          // console.log(req)
          // console.log(sign)
          var _f = newForm();
          createElements(_f, 'req', req);
          createElements(_f, 'sign', sign);
          _f.action = config.YEEPAY_ADDRESS + 'toUnbindBankCard';
          $scope.dosi = true;
          _f.submit();
        } else {
          console.log('ask bankcard-management, why bindBankCard did not load data...');
        }
      });
    };

    angular.element('.bankCard .bank-card-show-verify').hover(function(event) {
      $(event.target).parent().find('a').height('78px');
    }, function(event) {
      $(event.target).parent().find('a').height('0');
    });

  }]);
