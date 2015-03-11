'use strict';
angular.module('hongcaiApp')
  .controller('CreditProfitCtrl', ['$location', '$scope', '$http', '$rootScope', '$state', '$stateParams', 'UserCenterService', '$aside', '$window', 'OrderService', 'config', 'toaster', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster) {
    $rootScope.redirectUrl = $location.path();
    $scope.type = $stateParams.type;
    $scope.number = $stateParams.number;
    console.log($scope.type);
    $scope.getCreditDetail = function() {
      UserCenterService.getCreditDetail.get({status: $scope.type,number: $scope.number}, function(response) {
        
        /*$scope.order = response.data.order;
        $scope.project = response.data.project;*/
        // $scope.order = response.data.order;
        console.log(response);
      });
    };

    $scope.getCreditDetail ();
    
  }]);
