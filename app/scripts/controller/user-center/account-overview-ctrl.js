hongcaiApp.controller("AccountOverviewCtrl", [ "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", "DEFAULT_DOMAIN", function ($scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN) {
	/*
    $scope.doughnutData = [{
        value: 50,
        color: '#333'
    }, {
        value: 100,
        color: '#666'
    }];

    $scope.doughnutOptions = {
        segmentShowStroke : false,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 2,
        percentageInnerCutout : 50,
        animation : false,
        animationSteps : 100,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false
    };
*/
    $rootScope.selectSide = 'account-overview';
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
				value : response.data.userCapital.balance,
				label: '账户余额',
				color : "#62cbc6"
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
