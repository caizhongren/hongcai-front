'use strict';
angular.module('hongcaiApp')
  .controller('TransferSuccessCtrl', ['$scope', '$stateParams', 'ProjectService', 'toaster', function ($scope, $stateParams, ProjectService, toaster) {
    $scope.page = 2;
    if($stateParams.number){
      ProjectService.getOneDayProfitAndNextRate.get({
        number: $stateParams.number
      }, function(response) {
        if (response.ret === 1) {
          $scope.oneDayProfit = response.data.oneDayProfit;
          $scope.nextRate = response.data.nextRate;
          $scope.isRepeat = response.data.isRepeat;
          $scope.rightType = response.data.rightType;
        } else {
          toaster.pop('warning', response.msg);
        }
      });
      // ProjectService.generateRedPacketByInvest.get({
      //   number: $stateParams.number
      // }, function(response){
      //   if (response.ret === 1) {
      //     $scope.getMoney = 1;
      //   } else {
      //     toaster.pop('warning', response.msg);
      //   }
      // });
    }
  }]);

