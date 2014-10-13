hongcaiApp.controller("UserCenterCtrl", ["$scope", "$rootScope", "$stateParams", "UserCenterService", function ($scope, $rootScope, $stateParams, UserCenterService) {
		/*$scope.tabs = [{
            title: 'One',
            url: 'one.tpl.html'
        }, {
            title: 'Two',
            url: 'two.tpl.html'
        }, {
            title: 'Three',
            url: 'three.tpl.html'
    }];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }*/
	$scope.tabs = [
	  {
	    'title': '全部',
	    'content': ''
	  },
	  {
	    'title': '充值',
	    'content': ''
	  },
	  {
	    'title': '提现',
	    'content': ''
	  },
	  {
	    'title': '投资',
	    'content': ''
	  },
	  {
	    'title': '回款',
	    'content': ''
	  }
	];
	$scope.tabs.activeTab = 0;

	// $scope.realNameAuth = function(realName, idNo){
	// 	UserCenterService.yeepayRegister.get({realName:realName, idNo:idNo}, function(response){
	// 		console.log("i am in");
	// 	});
	// }
    

	//Datepickers 
	/*$scope.selectedDate = {{selectedDate}}; 
	$scope.selectedDateAsNumber = {{selectedDateAsNumber}};
	$scope.fromDate = {{fromDate}}; 
	$scope.untilDate = {{untilDate}};*/ 
}]);

