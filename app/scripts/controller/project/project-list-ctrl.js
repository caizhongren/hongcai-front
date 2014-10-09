define(['scripts/app', 'scripts/service/project/project-factory','jquery'], function(hongcaiApp) {
    hongcaiApp.register.controller("ProjectListCtrl", ["$scope", "$stateParams", "$location", "ProjectFactory", function ($scope, $stateParams, $location, ProjectFactory) {
        $scope.status = $stateParams.status;
        $scope.minCycle = $stateParams.minCycle;
        $scope.maxCycle = $stateParams.maxCycle;
        $scope.minEarning = $stateParams.minEarning;
        $scope.maxEarning = $stateParams.maxEarning;
        $scope.minTotalAmount = $stateParams.minTotalAmount;
        $scope.maxTotalAmount = $stateParams.maxTotalAmount;
        $scope.sortCondition = $stateParams.sortCondition;
        $scope.sortType = $stateParams.sortType || false ;
        $scope.orderProp = 'id';
        $scope.currentPage = 0;
          $scope.pageSize = 15;
          $scope.data = [];
        console.log($stateParams);
        var projectList = ProjectFactory.projectList.get({status: $stateParams.status,
        												  minCycle: $stateParams.minCycle,
        												  maxCycle: $stateParams.maxCycle,
        												  minEarning: $stateParams.minEarning,
        												  maxEarning: $stateParams.maxEarning,
        												  minTotalAmount: $stateParams.minTotalAmount,
        												  maxTotalAmount: $stateParams.maxTotalAmount,
        												  sortCondition: $stateParams.sortCondition,
        												  sortType: $scope.sortType}, function() {
    		$scope.projectList = projectList.data;
    	    $scope.numberOfPages = function() {
    	        return Math.ceil($scope.data.length / $scope.pageSize);
    	    }
    	    for (var i = 0; i < $scope.projectList.projectList.length; i++) {
    	        $scope.data.push($scope.projectList.projectList[i]);
    	    }

    	    $scope.sortType = false;
    	    $scope.toggleSort = function() {
    	    	$scope.sortType = !$scope.sortType;
	    	};
    	});
    }]);

});
