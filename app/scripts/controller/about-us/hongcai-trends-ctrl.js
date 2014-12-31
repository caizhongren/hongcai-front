'use strict';
hongcaiApp.controller('HongcaiTrendsCtrl', ['$scope', '$state', '$stateParams', 'AboutUsService', '$http', 'analytics', function ($scope, $state, $stateParams, AboutUsService, $http, analytics) {
	AboutUsService.textList.get({category: 3}, function(response) {
        $scope.textList = response.data;
        $scope.baseFileUrl = response.data.baseFileUrl;
        $scope.orderProp = 'id';
        $scope.currentPage = 0;
        $scope.pageSize = 6;
        $scope.data = [];
        $scope.numberOfPages = function(){
            return Math.ceil($scope.data.length / $scope.pageSize);
        }
        for (var i = 0; i < $scope.textList.textList.length; i++) {
            $scope.data.push($scope.textList.textList[i]);
        }
    });

}]);
