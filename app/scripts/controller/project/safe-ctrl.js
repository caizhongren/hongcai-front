hongcaiApp.controller("SafeCtrl", ["$scope", "$state", "$rootScope", "$location", "$stateParams", function ($scope, $state, $rootScope, $location, $stateParams) {
            
    $rootScope.selectPage = $location.path().split('/')[1];

}]);
