'use strict';
angular.module('hongcaiApp')
  .controller('YeepaySuccessCtrl', function($scope, $stateParams) {

  	var business = $stateParams.business;
  	if (business == 'RESET_MOBILE'){
  		$scope.page = 9;
  	} else {
    	$scope.page = 1;
  	}
  });
