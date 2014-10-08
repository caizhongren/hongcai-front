define(['scripts/app', 'scripts/service/project/project-factory'], function(hongcaiApp) {
    hongcaiApp.register.controller("ProjectListCtrl", ["$scope", "$stateParams", "$location", "ProjectFactory", function ($scope, $stateParams, $location, ProjectFactory) {
        var projectList = ProjectFactory.projectList.get({status: $stateParams.status, 
        												  minCycle: $stateParams.minCycle, 
        												  maxCycle: $stateParams.maxCycle, 
        												  minEarning: $stateParams.minEarning, 
        												  maxEarning: $stateParams.maxEarning, 
        												  minTotalAmount: $stateParams.minTotalAmount, 
        												  maxTotalAmount: $stateParams.maxTotalAmount, 
        												  sortCondition: $stateParams.sortCondition, 
        												  sortType: $stateParams.sortType}, function() {
    		$scope.projectList = projectList.data;
    		$scope.status = $stateParams.status;
    		$scope.minCycle = $stateParams.minCycle;
    		$scope.maxCycle = $stateParams.maxCycle;
    		$scope.minEarning = $stateParams.minEarning;
    		$scope.maxEarning = $stateParams.maxEarning;
    		$scope.minTotalAmount = $stateParams.minTotalAmount;
    		$scope.maxTotalAmount = $stateParams.maxTotalAmount;
    		$scope.sortCondition = $stateParams.sortCondition;
    		$scope.sortType = $stateParams.sortType;
    		$scope.orderProp = 'id';
    		$scope.currentPage = 0;
    	    $scope.pageSize = 15;
    	    $scope.data = [];
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