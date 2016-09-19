'use strict';
angular.module('hongcaiApp')
  .controller('BankCardManagementCtrl', ['$location', '$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'DEFAULT_DOMAIN', 'config', '$alert', 'toaster', function($location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, config, $alert, toaster) {
    $scope.dosi = true;
    UserCenterService.getUserBankCard.get({}, function(response) {
      if (response.ret === 1) {
        var card = response.data.card;
        if (card) {
          $scope.haveCard = (card.status === 'VERIFIED');
          $scope.bankName = card.openBank;
          $scope.cardNo = card.cardNo;
          $scope.isVerifying = (card.status === 'VERIFYING');
          $scope.unbinding = (card.status === 'INIT');
        } else {
          $scope.haveCard = false;
          $scope.isVerifying = false;
          $scope.unbinding = false;
        }
        $scope.isAuth = response.data.isAuth;
      } else {
        toaster.pop('error', response.msg);
      }
    });



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

    angular.element('.bankCard .bank-card-show-verify').hover(function(event) {
      $(event.target).parent().find('a').height('78px');
    }, function(event) {
      $(event.target).parent().find('a').height('0');
    });

  }]);
