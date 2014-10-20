hongcaiApp.controller("AccountOverviewCtrl", [ "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", "OrderService", "DEFAULT_DOMAIN", function ($scope, $state, $rootScope, $stateParams, UserCenterService, OrderService, DEFAULT_DOMAIN) {

    $rootScope.selectSide = 'account-overview';
    var totalAssets = 0;
    var receivedProfit = 0;
    var balance = 0;
    UserCenterService.getUserCapital.get(function(response) {
    	if(response.ret == 1) {
    		totalAssets = response.data.totalAssets
    		receivedProfit = response.data.userCapital.receivedProfit;
    		balance = response.data.userCapital.balance;

		    $scope.capital = response.data;
		    if(totalAssets == 0 && receivedProfit == 0 && balance == 0) {
 				$scope.doughnutAccountData = [{
	    			value: 30,
	    			label: '账户总资产',
					//highlight: '#FF5A5E',
					color:"#e94828"
				},
				{
					value : 30,
					label: '累计净收益',
					color : "#f9b81e"
				},
				{
					value : 30,
					label: '账户余额',
					color : "#62cbc6"
				}]
		    } else {
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
					value : response.data.userCapital.balance,
					label: '账户余额',
					color : "#62cbc6"
				}]
		    }

		} else {
            //toaster.pop('warning', "提示", response.msg);
            //$scope.errorMessage = response.msg;
            //$scope.warning = true;
            $state.go('root.login');
        }
    });

    if(totalAssets > 0 && receivedProfit > 0 && balance > 0) {
    	$scope.doughnutOptions = {
	        segmentShowStroke : false,
	        segmentStrokeColor : "#fff",
	        segmentStrokeWidth : 2,
	        percentageInnerCutout : 80,
	        animation : true,
	        animationSteps : 100,
	        animationEasing : "easeOutQuart",
	        animateRotate : true,
	        animateScale : false
	    };
    } else {
    	$scope.doughnutOptions = {
	        segmentShowStroke : false,
	        segmentStrokeColor : "#fff",
	        segmentStrokeWidth : 2,
	        percentageInnerCutout : 80,
	        animation : true,
	        animationSteps : 100,
	        animationEasing : "easeOutQuart",
	        animateRotate : true,
	        animateScale : false, 
	        showTooltips: false
	    };
    }

    OrderService.statisticsByUser.get(function(response) {
    	if (response.ret == 1){
    		var orderNum = response.data.orderNum;
    		if(orderNum){
    			$scope.investingNum = orderNum.isInve;
    			$scope.investedNum = orderNum.overInve;
    			$scope.investNum = orderNum.allInve;
    		};
    		
    	};
    });
    

}]);
