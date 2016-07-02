'use strict';
angular.module('hongcaiApp')
  .controller('InvPlanVerifyTransferCtrl', ['$rootScope', '$scope', 'toaster', '$stateParams', 'OrderService', 'config', function($rootScope, $scope, toaster, $stateParams, OrderService, config) {
    function newForm() {
      var f = document.createElement('form');
      document.body.appendChild(f);
      f.method = 'post';
      // f.target = '_blank';
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
    }

    OrderService.saveFundsOrder.get({
      projectId: $stateParams.projectId,
      amount: $stateParams.amount,
      isRepeat: $stateParams.isRepeat,
      payAmount: $stateParams.payAmount,
      couponNumber: $stateParams.couponNumber
    }, function(response) {
      if (response.ret === 1) {
        var orderId = response.data.orderId;
        // var isRepeat = response.data.isRepeat;
        OrderService.transferFunds.get({
          projectId: $stateParams.projectId,
          orderId: orderId/*,
          isRepeat: isRepeat*/
        }, function(response) {
          if (response.ret === 1) {
            var req = response.data.req;
            var sign = response.data.sign;
            var _f = newForm(); 
            createElements(_f, 'req', req); 
            createElements(_f, 'sign', sign);
            _f.action = config.YEEPAY_ADDRESS + 'toTransfer'; 
            _f.submit(); 
          } else {
            toaster.pop('error', response.msg);
          }
        });
      } else {
        toaster.pop('error', response.msg);
      }
    });
  }]);
