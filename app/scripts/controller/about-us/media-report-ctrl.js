hongcaiApp.controller("MediaReportsCtrl", ["$scope", "$state", "$stateParams", "AboutUsService", function ($scope, $state, $stateParams, AboutUsService) {
	AboutUsService.textList.get({category: 1}, function(response) {
        $scope.textList = response.data;
        $scope.orderProp = 'id';
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.data = [];
        $scope.numberOfPages = function(){
            return Math.ceil($scope.data.length / $scope.pageSize);
        }
        for (var i = 0; i < $scope.textList.textList.length; i++) {
            $scope.data.push($scope.textList.textList[i]);
        }
    });

}]);
