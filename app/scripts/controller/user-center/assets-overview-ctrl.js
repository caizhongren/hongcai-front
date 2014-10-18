hongcaiApp.controller("AssetsOverviewCtrl", [ "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", "DEFAULT_DOMAIN", function ($scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN) {

	$rootScope.selectSide = 'assets-overview';
    UserCenterService.getUserCapital.get(function(response) {

    	if(response.ret == 1) {
    		$scope.capital = response.data;

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
