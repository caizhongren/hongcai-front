'use strict';
hongcaiApp.controller('MessageCtrl', [ '$location', '$scope', 'toaster', '$state', '$rootScope', '$stateParams', 'UserCenterService', function ( $location, $scope, toaster, $state, $rootScope, $stateParams, UserCenterService) {
  $rootScope.selectSide = 'message';
}]);
