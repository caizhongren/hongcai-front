hongcaiApp.controller("ProjectSponsorInstitutionCtrl", ["$scope", "$stateParams", "$location", "ProjectService", function ($scope, $stateParams, $location, ProjectService) {
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
        $scope.status = $stateParams.status;
        $scope.minCycle = $stateParams.minCycle;
        $scope.maxCycle = $stateParams.maxCycle;
        $scope.minEarning = $stateParams.minEarning;
        $scope.maxEarning = $stateParams.maxEarning;
        $scope.minTotalAmount = $stateParams.minTotalAmount;
        $scope.maxTotalAmount = $stateParams.maxTotalAmount;
        $scope.sortCondition = $stateParams.sortCondition;
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



