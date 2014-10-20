hongcaiApp.controller("UserCenterCtrl", [ "$location", "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", "DEFAULT_DOMAIN", function ( $location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN) {
	
    $scope.selectedDate = "2014-10-16T08:50:36.394Z"; // <- [object Date]
    $scope.selectedDateAsNumber = 509414400000; // <- [object Number]
    $scope.fromDate = "2014-10-07T16:00:00.000Z"; // <- [object Date]
    $scope.untilDate = "2014-10-07T16:00:00.000Z"; // <- [object Date]

    UserCenterService.userSecurityInfo.get({},function(response){
        if (response.ret == 1){
            var userVo = response.data.userVo;
            $scope.userMobile = userVo.mobile;
            $scope.userEmail = userVo.emai;
            $scope.userRealNameAuthStatus = userVo.realNameAuthStatus;
            $scope.userTrusteeshipAccountStatus = userVo.trusteeshipAccountStatus;
        }

    });

    /***************************** sidebar start *************************/
    $rootScope.selectSide = $location.path().substr($location.path().indexOf("/") + 1);
    UserCenterService.userSecurityInfo.get({}, function(response) {
            if(response.ret == 1) {
                var securityLevel = 0;
                var userVo = response.data.userVo;
                $scope.email = userVo.email;
                $scope.mobile = userVo.mobile;
                $scope.realName = userVo.realName;
                $scope.idNo = userVo.idNo;
                var realNameAuthStatus = userVo.realNameAuthStatus;
                if(realNameAuthStatus == 1){
                    $scope.realNameAuthStatus = "认证中";
                    $scope.isRealNameAuth = true;
                }else if(realNameAuthStatus == 2){
                    $scope.realNameAuthStatus = "已认证";
                     $scope.isRealNameAuth = true;
                }else if(realNameAuthStatus == 3){
                    $scope.realNameAuthStatus = "认证失败";
                     $scope.isRealNameAuth = false;
                }

                if(userVo.trusteeshipAccountStatus == 1){
                    $scope.haveTrusteeshipAccount = true;
                } else {
                    $scope.haveTrusteeshipAccount = false;
                }

                if (userVo.email){
                    securityLevel = securityLevel +1;
                }
                if(userVo.mobile){
                    securityLevel = securityLevel +1;
                }
                if($scope.isRealNameAuth){
                    securityLevel = securityLevel +1;
                }
                $scope.securityLevel = securityLevel - 1;

            } else {
                //toaster.pop('warning', "提示", response.msg);
                //$scope.errorMessage = response.msg;
                //$scope.warning = true;
                $state.go('root.login');
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

    $scope.getPicCaptcha = DEFAULT_DOMAIN + "/siteUser/getPicCaptcha?" + Math.random();
    $scope.refreshCode = function() {
        angular.element("#checkCaptcha").attr("src", angular.element("#checkCaptcha").attr("src").substr(0, angular.element("#checkCaptcha").attr("src").indexOf('?')) + "?code=" + Math.random());
    };



    $scope.bindBankCard = function() {
    	UserCenterService.bindBankCard.get({}, function(response) {
    		if(response.ret == 1) {
    			var req = response.data.req;
    			var sign = response.data.sign;
                var _f=new_form();
                create_elements(_f,"req",req);
                create_elements(_f,"sign",sign);
                _f.action="http://qa.yeepay.com/member/bha/toBindBankCard";
                _f.submit();

            } else {

            }
        });
    };

}]);
