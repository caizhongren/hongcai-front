'use strict';
hongcaiApp.controller('BankCardManagementCtrl', [ '$location', '$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'DEFAULT_DOMAIN', 'config', 'toaster', function ( $location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, config, toaster) {
  $rootScope.selectSide = 'bankcard-management';
  $scope.dosi = true;
  UserCenterService.getUserBankCard.get({}, function(response) {
    if(response.ret === 1) {
      var card = response.data.card;
      if(card){
        $scope.haveCard = (card.status == 'VERIFIED');
        $scope.bankName = card.openBank;
        $scope.cardNo = card.cardNo;
        $scope.isVerifying = (card.status == 'VERIFYING');
      } else {
        $scope.haveCard = false;
        $scope.isVerifying = false;
      }
      $scope.isAuth = response.data.isAuth;
    } else {
      console.log('ask bankcard-management, why getUserBankCard did not load data...');
    }
  });

	function new_form(){
		var f = document.createElement('form');
		document.body.appendChild(f);
		f.method = 'post';
      //f.target = '_blank';
      return f;
  }

  function create_elements(eForm,eName,eValue){
  	var e=document.createElement('input');
  	eForm.appendChild(e);
  	e.type='text';
  	e.name=eName;
  	if(!document.all){
  		e.style.display='none';
  	} else {
  		e.style.display='block';
  		e.style.width='0px';
  		e.style.height='0px';
  	}
  	e.value=eValue;
  	return e;
  }

  $scope.bindBankCard = function() {
    UserCenterService.bindBankCard.get({}, function(response) {
      if(response.ret === 1) {
        var req = response.data.req;
        var sign = response.data.sign;
        var _f=new_form();
        create_elements(_f,'req',req);
        create_elements(_f,'sign',sign);
        _f.action= config.YEEPAY_ADDRESS + 'toBindBankCard';
        $scope.dosi = false;
        $scope.page = 5;
        _f.submit();
      } else {
        console.log('ask bankcard-management, why bindBankCard did not load data...');
      }
    });
  };

  $scope.unbindBankCard = function() {
  	UserCenterService.unbindBankCard.get({}, function(response) {
  		if(response.ret === 1) {
  			var req = response.data.req;
  			var sign = response.data.sign;
        // console.log(req)
        // console.log(sign)
        var _f=new_form();
        create_elements(_f,'req',req);
        create_elements(_f,'sign',sign);
        _f.action= config.YEEPAY_ADDRESS + 'toUnbindBankCard';
        $scope.dosi = true;
        _f.submit();
      } else {
        console.log('ask bankcard-management, why bindBankCard did not load data...');
      }
    });
  };

  angular.element('.bankCard .bank-card-show-verify').hover(function(event){
      $(event.target).parent().find('a').height('78px');
  },function(event){
      $(event.target).parent().find('a').height('0');
  });

}]);
