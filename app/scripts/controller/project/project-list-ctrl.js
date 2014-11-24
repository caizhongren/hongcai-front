hongcaiApp.controller('ProjectListCtrl', ['$scope', '$stateParams', '$rootScope', '$location', 'ProjectService', function ($scope, $stateParams, $rootScope, $location, ProjectService) {
    $scope.sortType = $stateParams.sortType || false ;
    if($scope.sortType === 'true'){
      $scope.sortType = true;
    } else {
      $scope.sortType = false;
    }
    $scope.toggleSort = function() {
      $scope.sortType = !$scope.sortType;
    };
    console.log('status:'+ $stateParams.status);
    console.log('type status:'+ typeof($stateParams.status));
    var response = ProjectService.projectList.get({status: $stateParams.status,
    												  minCycle: $stateParams.minCycle,
    												  maxCycle: $stateParams.maxCycle,
    												  minEarning: $stateParams.minEarning,
    												  maxEarning: $stateParams.maxEarning,
    												  minTotalAmount: $stateParams.minTotalAmount,
    												  maxTotalAmount: $stateParams.maxTotalAmount,
    												  sortCondition: $stateParams.sortCondition,
    												  sortType: $scope.sortType}, function() {
        $scope.projectList = response.data.projectList;
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
        $scope.pageSize = 6;
        $scope.data = [];

        $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
        }
        for (var i = 0; i < $scope.projectList.length; i++) {
            $scope.data.push($scope.projectList[i]);
        }
	});
    $rootScope.selectPage = $location.path().split('/')[1];
}]);



