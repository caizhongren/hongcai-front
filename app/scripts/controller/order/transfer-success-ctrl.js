'use strict';
angular.module('hongcaiApp')
  .controller('TransferSuccessCtrl', ['$scope', '$stateParams', 'ProjectService', function ($scope, $stateParams, ProjectService) {
    $scope.page = 2;
    console.log(3);
    if($stateParams.number){
      ProjectService.getOneDayProfitAndNextRate.get({
        number: $stateParams.number
      }, function(response) {
        if (response.ret === 1) {
          
        } else {
          console.log(response);
        }
      });
    }
      
  }]);

