'use strict';
hongcaiApp.controller('BankCardManagementCtrl', [ '$location', '$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'DEFAULT_DOMAIN', 'config', function ( $location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, config) {

    $rootScope.selectSide = 'bankcard-management';
    UserCenterService.getUserBankCard.get({}, function(response) {
            if(response.ret == 1) {
                var card = response.data.card;
                if(card){
                    $scope.haveCard = (card.status == 'VERIFIED');
                    $scope.bankName = card.openBank;
                    $scope.isVerifying = (card.status == 'VERIFYING');
                } else {
                    $scope.haveCard = false
                    $scope.isVerifying = false;
                }
                $scope.isAuth = response.data.isAuth;
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
    	}else{
    		e.style.display='block';
    		e.style.width='0px';
    		e.style.height='0px';
    	}
    	e.value=eValue;
    	return e;
    }

    $scope.bindBankCard = function() {
    	UserCenterService.bindBankCard.get({}, function(response) {
    		if(response.ret == 1) {
    			var req = response.data.req;
    			var sign = response.data.sign;
                var _f=new_form();
                create_elements(_f,'req',req);
                create_elements(_f,'sign',sign);
                _f.action= config.YEEPAY_ADDRESS + 'toBindBankCard';
                _f.submit();

            } else {

            }
        });
    };

}]);
