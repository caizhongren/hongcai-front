'use strict';
angular.module('hongcaiApp')
  .controller('BannerInvPlanCtrl', ['$scope', 'MainService', function($scope, MainService) {
    //  宏金盈列表
    MainService.getIndexFundsProductList.get(function(response) {
      if (response.ret === 1) {
        $scope.fundsProjectStatusMap = response.data.fundsProjectStatusMap;
        $scope.fundsProjectProductList = response.data.fundsProjectProductList;
      }
    });
  }]);
