hongcaiApp.controller("AssetsOverviewCtrl", [ "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", "DEFAULT_DOMAIN", function ($scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN) {

	$rootScope.selectSide = 'assets-overview';
    var balance = 0;
    var waitingProfit = 0;
    var waitingCapital = 0;
    var freezeCapital = 0;
    var receivedProfit = 0;
    var amount = 0;
    UserCenterService.getUserCapital.get(function(response) {
    	if(response.ret == 1) {
    		balance = response.data.userCapital.balance;
    		waitingProfit = response.data.userCapital.waitingProfit;
    		waitingCapital = response.data.userCapital.waitingCapital;
    		freezeCapital = response.data.userCapital.freezeCapital;
    		receivedProfit = response.data.userCapital.receivedProfit;
    		amount = response.data.userCapital.amount;
    		
		    $scope.capital = response.data;
		    if(balance == 0 && waitingProfit == 0 && waitingCapital == 0 && freezeCapital == 0 && receivedProfit == 0 && amount == 0) {
 				$scope.doughnutAssetsData = [{
					value : 20,
					label: '可用余额',
					color : "#d2cb3f"
				},
				{
					value : 20,
					label: '待收收益',
					color : "#62cbc6"
				},
				{
					value : 20,
					label: '待收本金',
					color : "#f9b81e"
				},
				{
					value : 20,
					label: '冻结资金',
					color : "#6aabe1"
				},
				{
					value: 20,
					label: '已收收益',
					//highlight: '#FF5A5E',
					color:"#913969"
				},
				{
					value : 20,
					label: '累计投资',
					color : "#e94828"
				}]
		    } else {
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
		    }

		} else {
            //toaster.pop('warning', "提示", response.msg);
            //$scope.errorMessage = response.msg;
            //$scope.warning = true;
            $state.go('root.login');
        }
    });

    if(balance > 0 && waitingProfit > 0 && waitingCapital > 0 && freezeCapital > 0 && receivedProfit > 0 && amount > 0) {
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

}]);
