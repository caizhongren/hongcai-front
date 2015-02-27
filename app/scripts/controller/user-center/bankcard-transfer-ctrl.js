'use strict';
angular.module('hongcaiApp')
  .controller('BankcardTransferCtrl', ['$scope', 'toaster', '$stateParams', 'UserCenterService', 'config', function ( $scope, toaster, $stateParams, UserCenterService, config) {
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

    if ($stateParams.type === '0') {
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
          toaster.pop('error', response.msg);
        }
      });

    } else if ($stateParams.type === '1') {
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
          toaster.pop('error', response.msg);
        }
      });
    }
    
  }]);