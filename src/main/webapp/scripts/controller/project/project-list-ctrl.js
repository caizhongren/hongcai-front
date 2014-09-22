define(['scripts/app', 'scripts/factory/project/project-factory'], function(app) {
    app.controller("ProjectListCtrl", ["$scope", "$routeParams", "$location", "ProjectFactory", function ($scope, $routeParams, $location, ProjectFactory) {
        var projectList = ProjectFactory.projectList.get({status: $routeParams.status, 
        												  minCycle: $routeParams.minCycle, 
        												  maxCycle: $routeParams.maxCycle, 
        												  minEarning: $routeParams.minEarning, 
        												  maxEarning: $routeParams.maxEarning, 
        												  minTotalAmount: $routeParams.minTotalAmount, 
        												  maxTotalAmount: $routeParams.maxTotalAmount, 
        												  sortCondition: $routeParams.sortCondition, 
        												  sortType: $routeParams.sortType}, function() {
    		$scope.projectList = projectList.data;
    		$scope.status = $routeParams.status;
    		$scope.minCycle = $routeParams.minCycle;
    		$scope.maxCycle = $routeParams.maxCycle;
    		$scope.minEarning = $routeParams.minEarning;
    		$scope.maxEarning = $routeParams.maxEarning;
    		$scope.minTotalAmount = $routeParams.minTotalAmount;
    		$scope.maxTotalAmount = $routeParams.maxTotalAmount;
    		$scope.sortCondition = $routeParams.sortCondition;
    		$scope.sortType = $routeParams.sortType;
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