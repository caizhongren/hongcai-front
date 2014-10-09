define(['scripts/app', 'ngload!scripts/service/project/project-service'], function(hongcaiApp) {
    hongcaiApp.register.controller("ProjectListCtrl", ["$scope", "$stateParams", "$routeParams", "$location", "ProjectService", function ($scope, $stateParams, $routeParams, $location, ProjectService) {
        $scope.sortType = $stateParams.sortType || false ;
        var projectList = ProjectService.projectList.get({status: $stateParams.status, 
        												  minCycle: $stateParams.minCycle, 
        												  maxCycle: $stateParams.maxCycle, 
        												  minEarning: $stateParams.minEarning, 
        												  maxEarning: $stateParams.maxEarning, 
        												  minTotalAmount: $stateParams.minTotalAmount, 
        												  maxTotalAmount: $stateParams.maxTotalAmount, 
        												  sortCondition: $stateParams.sortCondition, 
        												  sortType: $scope.sortType}, function() {
        $scope.orderProp = 'id';
        $scope.currentPage = 0;
          $scope.pageSize = 15;
          $scope.data = [];

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
