'use strict';
angular.module('hongcaiApp')
  .controller('assignmentsTransferCtrl',function ($location, $rootScope, $scope, $stateParams, UserCenterService, toaster, $state) {
    $rootScope.selectPage_two = $location.path().split('/')[2].split('-')[0];
    var creditRightNumber = $stateParams.number;
    
    /**
     * 债权转让相关规则
     */
    UserCenterService.assignmentRule.get({},function(response){
      if (response && response.ret !== -1) {
        $scope.discountFeeRate = response.discountFeeRate;
        $scope.borderDay = response.borderDay;
        $scope.minFee = response.minFee;
        $scope.lessThanOrEqualBorderDayFee = response.lessThanOrEqualBorderDayFee;
        $scope.greaterThanBorderDayFee = response.greaterThanBorderDayFee;
        $scope.recycleReward = response.recycleReward;
        $scope.maxReceivedPaymentsRate = response.maxReceivedPaymentsRate;
      }
    });
    /*
     * 债权信息
     */
    UserCenterService.assignmentCreditDetail.get({
      number: creditRightNumber
    }, function(response) {
      if (response && response.ret !== -1) {
        //现金券判断
        $scope.cashCoupon = $scope.recycleReward && response.creditRight.coupon && response.creditRight.coupon.type ===2 ? response.creditRight.coupon.value : 0;
        $scope.creditRight = response.creditRight;
        //原有债权金额
        $scope.creditRightAmount = response.creditRight.transferableAmount;
        $scope.assignmentsNumber = response.creditRight.number;
        //步进值
        $scope.increaseAmount = response.project.increaseAmount;
        //原标利率
        $scope.creditBaseRate = response.creditRight.baseRate;
        $scope.transferPercent = $scope.creditBaseRate;
        //creatTime(ms)
        $scope.createTime = response.creditRight.createTime;
        //当前时间
        $scope.currentDate = new Date().getTime();

        //剩余期限
        $scope.remainDay = Math.ceil(Math.abs((response.project.repaymentDate - $scope.currentDate)) / (1000*60*60*24));

        //利率最大值
        $scope.profitMax = 36500 * (1 - $scope.maxReceivedPaymentsRate) / $scope.remainDay + $scope.creditBaseRate;

        //应收利息天数
        $scope.profitDate = ($scope.currentDate - response.projectBill.lastRepaymentTime) / (1000*60*60*24);
        

        //利差年化收益 = 认购金额 * 剩余期限 * 利率差/36500
      
        //转让奖金=利差年化收益率
        //利差
        // $scope.profitDown = $scope.transferPercent - $scope.creditBaseRate;
      }else {
        $('#amount').attr("disabled", true); 
        $('#percent').attr("disabled", true); 
        $('#transferBtn').attr("disabled", true); 
        $scope.showErrMsg = response.msg;
      }

    });

    //确认转让
    $scope.assignmentsTransfer = function(){
      if ($scope.msg || $scope.errMsg || $scope.transferAmount ==undefined) {
        return;
      }
      UserCenterService.assignmentsTransfer.post({
        number: $scope.assignmentsNumber,
        creditRightId: $scope.creditRight.id,
        amount: $scope.transferAmount,
        annualEarnings: $scope.transferPercent
      }, function(response){
        if(response && response.ret !== -1){
          toaster.pop('success', '转让成功');
          $state.go('root.userCenter.assignments');
        }else {
          $scope.showErrMsg = response.msg;
        }

      });
    }

    

    //监测转让金额
    $scope.$watch('transferAmount', function(newVal, oldVal){
      if(newVal !== oldVal){
        $scope.msg = undefined;
      }

      if(newVal){
        if(newVal < $scope.increaseAmount ){
          $scope.msg = '转让金额必须大于' + $scope.increaseAmount;
        }else if(newVal % $scope.increaseAmount !==0 ){
          $scope.msg = '转让金额必须为'+ $scope.increaseAmount +'的整数倍';
        }else if(newVal > $scope.creditRightAmount){
          $scope.msg = '转让金额必须小于债权金额';
        }
      }
      //手续费计算   
      if ($scope.currentDate - $scope.creatTime <= $scope.borderDay*24*60*60*1000) {
        $scope.counterFee = $scope.transferAmount * $scope.lessThanOrEqualBorderDayFee / 100 * $scope.discountFeeRate > $scope.minFee ? $scope.transferAmount * $scope.lessThanOrEqualBorderDayFee / 100 : $scope.minFee;
      }else {
        $scope.counterFee = $scope.transferAmount * $scope.greaterThanBorderDayFee /100 * $scope.discountFeeRate > $scope.minFee ? $scope.transferAmount * $scope.greaterThanBorderDayFee /100 : $scope.minFee;
      }
      //待收未收利息
      $scope.profit = $scope.creditBaseRate * newVal * $scope.profitDate /36500;
    });

    //监测转让利率
    $scope.$watch('transferPercent', function(newVal, oldVal){
      if(newVal !== oldVal){
        $scope.errMsg = undefined;
      }
      if(newVal){
        if(newVal < $scope.creditBaseRate ){
          $scope.errMsg = '最小转让利率为' + $scope.creditBaseRate + '%';
        }else if(newVal > $scope.profitMax ){
          $scope.errMsg = '最大转让利率为'+ $scope.profitMax.toFixed(2) +'%';
        }
      }
    });

  });
