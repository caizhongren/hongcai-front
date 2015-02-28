'use strict';
angular.module('hongcaiApp')
  .controller('CreditCtrl', ['$location', '$scope', '$http', '$rootScope', '$state', '$stateParams', 'UserCenterService', '$aside', '$window', 'OrderService', 'config', 'toaster', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster) {
    $rootScope.redirectUrl = $location.path();
    $rootScope.selectSide = 'credit';
    // 第一步
    $scope.creditStepFlag = 1;
    $scope.Math = window.Math;
    $scope.disabledFlag1 = $scope.disabledFlag2 = $scope.disabledFlag3 = false;
    // 解决ng-click ng-disabled的生效的问题。
    $scope.$watch('creditStepFlag', function() {
      if ($scope.creditStepFlag === 1) {
        $scope.disabledFlag2 = true;
        $scope.disabledFlag3 = true;
      } else if ($scope.creditStepFlag === 2){
        $scope.disabledFlag3 = true;
      } else {
        $scope.disabledFlag2 = false;
      }
    });


    /**
     * 获得持有中债权列表
     */
    $scope.getHeldInCreditRightList = function(){
      $scope.searchStatus = 1;

      UserCenterService.getHeldInCreditRightList.get({}, function(response){
        $scope.heldIdCreditList = response.data.heldIdCreditList;

      });
    };

    $scope.getHeldInCreditRightList();

  }]);
