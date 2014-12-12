'use strict';
hongcaiApp.controller('UserGiftCtrl', ['$location', '$scope', '$rootScope', '$state', '$stateParams', 'UserCenterService', function ($location,$scope,$rootScope, $state, $stateParams, UserCenterService) {
    $rootScope.redirectUrl = $location.path();
    $rootScope.selectSide = 'gift-rebate';
    $scope.typeInvStatus = { '0': '未支付', '1': '已支付'};
    var dateStart = 0;
    var dateEnd = 0;
    $scope.status = $stateParams.status || 0;
    $scope.dateInterval = $stateParams.dateInterval || 0;
    $scope.fromDateChanged = function () {
      dateStart = moment($scope.invFromDate).valueOf();
    };
    $scope.untilDealDateChanged = function (status,dateInterval) {
      dateEnd = moment($scope.invUntilDate).add(1,'day').subtract(1,'second').valueOf();
      $location.path('gift-rebate/'+'99'+'/'+dateInterval+'/'+status+'/'+dateStart+'/'+dateEnd);
    };

    var getOrderByUser = UserCenterService.getOrderByUser.get({ type: $stateParams.type,dateInterval: $stateParams.dateInterval,
    															status: $stateParams.status,dateStart: $stateParams.dateStart,dateEnd: $stateParams.dateEnd},
    															function() {
      if (getOrderByUser.ret === 1 ) {
        $scope.orderList = getOrderByUser.data.orderVoList;
        $scope.orderCount = getOrderByUser.data.orderCount;
        $scope.amount = getOrderByUser.data.amount;
        $scope.dateInterval = getOrderByUser.data.dateInterval;
        $scope.status = getOrderByUser.data.status;
        // $scope.invFromDate = getOrderByUser.data.dateStart;
        // $scope.invUntilDate = getOrderByUser.data.dateEnd;
        $scope.currentPage = 0;
        $scope.pageSize = 6;
        $scope.data = [];
        $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
        }
        for (var i = 0; i < $scope.orderList.length; i++) {
            $scope.data.push($scope.orderList[i]);
        }
      } else {
        console.log('ask gift-rebate, why getOrderByUser did not load data...');
      }
    });

    $scope.showListDetails =  function(orderId) {
      angular.element('#investment-detail').animate({width:'show'},300);
      $scope.getOrderBillByOrderId(orderId);
    }

    $scope.getOrderBillByOrderId = function(orderId) {
      UserCenterService.getOrderBillByOrderId.get({orderId: orderId}, function(response) {
        if(response.ret === 1) {
          if(response.data.order) {
            var invTotal = response.data.order.orderAmount;
          }
          if(response.data.project) {
            var rdp = response.data.project;
             //总融资额
            var invInitDate = moment(rdp.valueDate).toString();
            var accountDay = rdp.accountDay;
            var invStartDate = moment([moment(invInitDate).year(), moment(invInitDate).month(), accountDay]).toString();
            var idiffDay = moment(invStartDate).diff(moment(invInitDate), 'days');
            invStartDate = moment(invStartDate).add(1,'month').toString();
            var invEndDate = moment(rdp.repaymentDate).toString();
            var invCycle = rdp.cycle;
            var invType = rdp.type;
            var invRate = rdp.annualEarnings / 100;
            if (invType === 1 ) {
              // 先息后本
              everyMonthInterestPri(invTotal, invInitDate, invStartDate, invEndDate, invCycle, invRate);
            }
            if (response.billList) {
              var bill = response.billList;
              var billList = {};
              for(var i=0;i<bill.length; i++) {
                billList = {'payDate': moment(bill[i].successTime).format('YYYY-MM-DD'), 'invEarnings': bill[i].amount, 'invStatus': bill[i].status}
                $scope.listInvPond.splice(i,1,billList);
              }
            }
            $scope.paid = 0;
            $scope.unpaid = 0;
            for(var i=0; i<$scope.listInvPond.length; i++) {
              var status = $scope.listInvPond[i]['invStatus'];
              if( status === '1') {
                $scope.paid += $scope.listInvPond[i]['invEarnings'];
              } else {
                $scope.unpaid = $scope.unpaid + $scope.listInvPond[i]['invEarnings'];
              }
            }
          }
        }
      });
    };
    var everyMonthInterestPri = function(invTotal,invInitDate,invStartDate,invEndDate,invCycle,invRate){
      // 每月的付费天数，付费日期，上次支付日期，该月的利息；
      $scope.listInvPond = [];
      var invDays, payDate, prevDate, invEarnings;
      var invList = {};
      var LastPayDate = moment(invStartDate).add((invCycle-1),'month').toString();
      var diffDate = moment(LastPayDate).diff(moment(invEndDate),'days');
      if(diffDate === 0) {
        invCycle = invCycle - 1;
      }
      invCycle = invCycle - 1;
      for(var i = 0; i <= invCycle; i++) {
        payDate = moment(invStartDate).add(i,'month').toString();
        if (moment(payDate) > moment(invEndDate)) {
          payDate = invEndDate;
        }
        if (i === 0) {
          invDays = moment(payDate).diff(moment(invInitDate),'days', true);
        } else {
          invDays = moment(payDate).diff(moment(prevDate), 'days', true);
        }
        // console.log('invDays: ' + invDays);
        invEarnings = invTotal * invRate * Math.round(invDays) / 365;   //计算利率
        // console.log('invEarnings: ' + invEarnings);
        prevDate = payDate;
        invList = {'payDate': moment(payDate).format('YYYY-MM-DD'), 'invEarnings': invEarnings, 'invStatus': '0'};
        $scope.listInvPond.push(invList);
      }
    };
}]);

