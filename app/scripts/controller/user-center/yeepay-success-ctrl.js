'use strict';
angular.module('hongcaiApp')
  .controller('YeepaySuccessCtrl', function($scope, $stateParams, ProjectService) {

  	var business = $stateParams.business;
  	$scope.amount = $stateParams.amount;
    $scope.profit = $stateParams.profit;
  	var page = 1;

  	if (business === 'PERSONAL_REGISTER'){
  		page == 1;
  	} else if (business == 'RESET_MOBILE'){
  		page = 9;
  	} else if (business === 'RECHARGE'){
  		page = 4;
  	} else if (business === 'WITHDRAW'){
  		page = 6;
  	} else if(business === 'UNBIND_CARD'){
  		page = 7;
  	} else if(business === 'BIND_BANK_CARD'){
  		page = 5;
  	} else if (business == 'TRANSFER'){
  		page = 2;
  		if($stateParams.number){
  		  /*ProjectService.getOneDayProfitAndNextRate.get({
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
  		  });*/

        ProjectService.investSuccessCoupons.get({
          orderNumber: $stateParams.number
        }, function(response){
          $scope.usedCoupon = response.coupon;
          if($scope.usedCoupon){
            $scope.usedCoupon.tpye = response.coupon.type;
            $scope.usedCoupon.value = response.coupon.value;
          }
        })
  		}

  	}else if(business === 'EXPERIENCE'){
      page = 10;
    } else if(business === 'USER_ACTIVE'){
      page = 11;
    } else if(business === 'AUTHORIZATION_AUTO_TRANSFER'){
      page = 12
    }


  	$scope.page = page;

  });
