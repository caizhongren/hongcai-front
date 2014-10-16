hongcaiApp.controller("UserCenterCtrl", [ "$location", "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", "DEFAULT_DOMAIN", function ( $location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN) {
	


    /***************************** sidebar start *************************/
    $rootScope.selectSide = $location.path().substr($location.path().indexOf("/") + 1);
    console.log($location.path().substr($location.path().indexOf("/") + 1));
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

                $scope.securityLevel = 2;

            } else {
                toaster.pop('warning', "提示", response.msg);
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

    $scope.realNameAuth = function(user) {
    	UserCenterService.yeepayRegister.get({realName:user.realName, idCardNo:user.idCardNo}, function(response) {
    		if(response.ret == 1) {
    			var req = response.data.req;
    			var sign = response.data.sign;
             	var _f=new_form();
                create_elements(_f,"req",req);
                create_elements(_f,"sign",sign);
                _f.action="http://qa.yeepay.com/member/bha/toRegister";
                _f.submit();

            } else {

            }
        });
    };
    
    $scope.recharge = function(amount, captcha) {
    	UserCenterService.yeepayRecharge.get({amount:amount, captcha: captcha}, function(response) {
    		if(response.ret == 1) {
    			var req = response.data.req;
    			var sign = response.data.sign;
                var _f=new_form();
                create_elements(_f,"req",req);
                create_elements(_f,"sign",sign);
                _f.action="http://qa.yeepay.com/member/bha/toRecharge";
                _f.submit();

            } else {

            }
        });
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

    $scope.withdraw = function(amount, captcha) {
    	UserCenterService.yeepayWithdraw.get({amount: amount, captcha: captcha}, function(response) {
    		if(response.ret == 1) {
    			var req = response.data.req;
    			var sign = response.data.sign;
                var _f=new_form();
                create_elements(_f,"req",req);
                create_elements(_f,"sign",sign);
                _f.action="http://qa.yeepay.com/member/bha/toWithdraw";
                _f.submit();

            } else {

            }
        });
    };   


    UserCenterService.getUserCapital.get(function(response) {
    	if(response.ret == 1) {
    		$scope.capital = response.data;
    		$scope.doughnutAccountData = [{
	    			value: response.data.totalAssets,
	    			label: '账户总资产',
					//highlight: '#FF5A5E',
					color:"#e94828"
				},
				{
					value : response.data.userCapital.receivedProfit,
					label: '累计净收益',
					color : "#f9b81e"
				},
				{
					value : response.data.userCapital.balance + response.data.userCapital.freezeCapital,
					label: '账户余额',
					color : "#62cbc6"
				}]

				$scope.doughnutAssetsData = [{
					value : response.data.userCapital.balance,
					label: '可用余额',
					color : "#d2cb3f"
				},
				{
					value : response.data.userCapital.waitingProfit,
					label: '待收收益',
					color : "#62cbc6"
				},
				{
					value : response.data.userCapital.waitingCapital,
					label: '待收本金',
					color : "#f9b81e"
				},
				{
					value : response.data.userCapital.freezeCapital,
					label: '冻结资金',
					color : "#6aabe1"
				},
				{
					value: response.data.userCapital.receivedProfit,
					label: '已收收益',
					//highlight: '#FF5A5E',
					color:"#913969"
				},
				{
					value : response.data.userCapital.amount,
					label: '累计投资',
					color : "#e94828"
				}]

				$scope.doughnutOptions = {
				    //Boolean - Whether we should show a stroke on each segment
				    segmentShowStroke : false,

					//String - The colour of each segment stroke
					segmentStrokeColor : "#fff",
					
					//Number - The width of each segment stroke
					segmentStrokeWidth : 2,
					
					//The percentage of the chart that we cut out of the middle.
					percentageInnerCutout : 50,
					
					//Boolean - Whether we should animate the chart	
					animation : false,
					
					//Number - Amount of animation steps
					animationSteps : 100,
					
					//String - Animation easing effect
					animationEasing : "easeOutBounce",
					
					//Boolean - Whether we animate the rotation of the Doughnut
					animateRotate : true,

					//Boolean - Whether we animate scaling the Doughnut from the centre
					animateScale : false,
					
					//Function - Will fire on animation completion.
					onAnimationComplete : null
				};
			} else {
            //toaster.pop('warning', "提示", response.msg);
            //$scope.errorMessage = response.msg;
            //$scope.warning = true;
            $state.go('root.login');
        }

    });
}]);
