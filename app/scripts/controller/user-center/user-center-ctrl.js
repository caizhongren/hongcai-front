
	hongcaiApp.controller("UserCenterCtrl", ["$scope", "$rootScope", "$stateParams", "UserCenterService", function ($scope, $rootScope, $stateParams, UserCenterService) {
		var username;
		$scope.username = $rootScope.loginName;
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
	}]);
