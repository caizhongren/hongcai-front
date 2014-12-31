'use strict';
hongcaiApp.controller('HongcaiTrendsDetailCtrl', ['$scope', '$state', '$stateParams', 'AboutUsService', '$http', 'analytics', function ($scope, $state, $stateParams, AboutUsService, $http, analytics) {
    AboutUsService.textDetail.get({textId: $stateParams.textId}, function(response) {
        $scope.text = response.data.text;
        $scope.baseFileUrl = response.data.baseFileUrl;
        console.log(response.data)
    });
}]);
