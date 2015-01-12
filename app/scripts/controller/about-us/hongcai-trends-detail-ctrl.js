'use strict';
angular.module('hongcaiApp')
  .controller('HongcaiTrendsDetailCtrl', ['$scope', '$state', '$stateParams', 'AboutUsService', function($scope, $state, $stateParams, AboutUsService) {
    AboutUsService.textDetail.get({
      textId: $stateParams.textId
    }, function(response) {
      $scope.text = response.data.text;
      $scope.baseFileUrl = response.data.baseFileUrl;
    });
  }]);
