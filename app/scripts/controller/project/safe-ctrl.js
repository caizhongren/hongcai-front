hongcaiApp.controller("SafeCtrl", ["$rootScope", "$location", "$stateParams", function ($rootScope, $location, $stateParams) {
    
    $rootScope.selectPage = $location.path().split('/')[1];

}]);

