hongcaiApp.controller("investVerifyCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "OrderService", "SessionService", "toaster", "$modal",function ($scope, $state, $rootScope, $stateParams, OrderService, SessionService, toaster,$modal) {
    
    var investVerify = OrderService.investVerify.get({projectId: $stateParams.projectId, amount: $stateParams.amount, }, function(response) {
        if(response.ret == 1) {
           $scope.projectVo = investVerify.data.projectVo;
           $scope.capital = investVerify.data.capital;
           $scope.distance = investVerify.data.distance;
           $scope.orderId = investVerify.data.orderId;
           $scope.amount = investVerify.data.amount;
        } 
    });

	function new_form(){
		var f = document.createElement("form");
		document.body.appendChild(f);
		f.method = "post";
        //f.target = "_blank";
        return f;
    }

    function create_elements(eForm,eName,eValue){
    	var e=document.createElement("input");
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

    $scope.transfer = function(orderId){
    	OrderService.transfer.get({orderId: orderId, }, function(response) {
        	if(response.ret == 1) {
    			var req = response.data.req;
    			var sign = response.data.sign;
             	var _f=new_form();//创建一个form表单
                create_elements(_f,"req",req);//创建form中的input对象
                create_elements(_f,"sign",sign);
                _f.action="http://qa.yeepay.com/member/bha/toTransfer";//form提交地址
                _f.submit();//提交
       		} 
    	});

    }

    var myOtherModal = $modal({scope: $scope, template: 'views/modal/modal-invest-verify.html', show: false});
    $scope.showModal = function() {
        myOtherModal.$promise.then(myOtherModal.show);
    };


}]);
