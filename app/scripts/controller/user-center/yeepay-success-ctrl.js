'use strict';
angular.module('hongcaiApp')
  .controller('YeepaySuccessCtrl', function($scope, $stateParams, ProjectService) {

  	var business = $stateParams.business;
  	$scope.amount = $stateParams.amount;
  	var page = 1;

  	if (business === 'REGISTER'){
  		page == 1;
  	} else if (business == 'RESET_MOBILE'){
  		page = 9;
  	} else if (business === 'RECHARGE'){
  		page = 4;
  	} else if (business === 'WITHDRAW'){
  		page = 6;
  	} else if(business === 'UNBIND_BANK_CARD'){
  		page = 7;
  	} else if(business === 'BIND_BANK_CARD'){
  		page = 5;
  	} else if (business == 'TRANSFER'){
  		page = 2;
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
  		}
  	}


  	$scope.page = page;

  });
