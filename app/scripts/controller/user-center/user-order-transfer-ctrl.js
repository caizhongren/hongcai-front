'use strict';
angular.module('hongcaiApp')
  .controller('UserOrderTransferCtrl', ['$rootScope', '$scope', 'toaster', '$stateParams', 'OrderService', 'config', function ($rootScope, $scope, toaster, $stateParams, OrderService, config) {
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
    
    OrderService.transfer.get({
      projectId: $stateParams.projectId,
      orderId: $stateParams.orderId
    }, function(response) {
      if (response.ret === 1) {
        var req = response.data.req;
        var sign = response.data.sign;
        var _f = newForm(); //创建一个form表单
        createElements(_f, 'req', req); //创建form中的input对象
        createElements(_f, 'sign', sign);
        _f.action = config.YEEPAY_ADDRESS + 'toTransfer'; //form提交地址
        _f.submit(); //提交
      } else {
        toaster.pop('warning', response.msg);
      }
    });

  }]);