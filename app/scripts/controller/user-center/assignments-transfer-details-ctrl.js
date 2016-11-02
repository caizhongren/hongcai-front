'use strict';
angular.module('hongcaiApp')
  .controller('assignmentsTransferCtrl',function ( $scope, $stateParams, UserCenterService) {
    
    var assignmentsNumber = $stateParams.number;
    var assignmentsCreditRightId = $stateParams.creditRightId;
    var assignmentsAmount = $stateParams.amount;
    var assignmentsAnnualEarnings = $stateParams.annualEarnings;
    UserCenterService.assignmentsTransfer.post({
      number: assignmentsNumber,
      creditRightId: assignmentsCreditRightId,
      amount: assignmentsAmount,
      annualEarnings:assignmentsAnnualEarnings
    }, function(response){
      if(response && response.ret !== -1){

      }

    });

    //监测转让金额
    $scope.$watch('transferAmount', function(newVal, oldVal){
      if(newVal !== oldVal){
        $scope.msg = undefined;
      }

      if(newVal){
        // if(newVal > $scope.availableAmount){
        //   $scope.msg = '投资金额必须小于' + $scope.availableAmount;
        // }else if(newVal > $rootScope.account.balance){
        //   $scope.msg = '账户余额不足，请先充值';
        // } else if(newVal < $scope.project.minInvest ){
        //   $scope.msg = '投资金额必须大于' + $scope.project.minInvest;
        // } else 
        if(newVal % 100 !==0 ){
          $scope.msg = '投资金额必须为100的整数倍';
        }
      }
    });

  });
