'use strict';
angular.module('hongcaiApp')
  .controller('CreditSecurityCtrl', ['$location', '$scope', '$http', '$rootScope', '$state', '$stateParams', 'UserCenterService', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService) {
    $scope.type = $stateParams.type;
    $scope.number = $stateParams.number;
    $scope.detailStatus = 1;
    $scope.getCreditDetail = function() {
      UserCenterService.getCreditDetail.get({status: $scope.type,number: $scope.number}, function(response) {
        // console.log(response);
        if (response.ret === 1) {
          $scope.order = response.data.order;
          $scope.project = response.data.project;
          $scope.creditRight = response.data.creditRight;
          $scope.creditRightBillList = response.data.creditRightBillList;
          $scope.category = response.data.category;
          $scope.investorMatchOfflineRights = response.data.investorMatchOfflineRights;
          // $scope.order = response.data.order;

          var invTotal = response.data.order.orderAmount;
          if (response.data.project) {
            var rdp = response.data.project;
            //总融资额
            var invType = rdp.repaymentType;
            var multiNum = 1;
            if(invType === 3){
              multiNum = 3;
            }else if(invType === 4){
              multiNum = 6;
            }
            var invInitDate = moment(rdp.valueDate).toString();
            var accountDay = rdp.accountDay;
            var invStartDate = moment([moment(invInitDate).year(), moment(invInitDate).month(), accountDay]).toString();
            invStartDate = moment(invStartDate).add(1 * multiNum, 'month').toString();
            var invEndDate = moment(rdp.repaymentDate).toString();
            var invCycle = rdp.cycle;
            var invRate = rdp.annualEarnings / 100;

            if (invType !== 2) {
              // 先息后本
              everyMonthInterestPri(invTotal, invInitDate, invStartDate, invEndDate, invCycle, invRate, multiNum);
            } else if (invType === 2) {
              everyMonthInterestEq(invTotal, invInitDate, invStartDate, invEndDate, invCycle, invRate);
              // 等额本息
            }
            if ($scope.creditRightBillList.length) {
              $scope.listInvPond.splice(0, $scope.creditRightBillList.length);
            }
            /*if (response.data.billList) {
              var bill = response.data.billList;
              var billList = {};
              for (var i = 0; i < bill.length; i++) {
                billList = {
                  'payDate': moment(bill[i].successTime).format('YYYY-MM-DD'),
                  'invEarnings': bill[i].amount,
                  'invStatus': bill[i].status
                };
                $scope.listInvPond.splice(i, 1, billList);
              }
            }
            $scope.paid = 0;
            $scope.unpaid = 0;
            for (var x = 0; x < $scope.listInvPond.length; x++) {
              var status = $scope.listInvPond[x].invStatus;
              if (status === 1) {
                $scope.paid += $scope.listInvPond[x].invEarnings;
              } else {
                $scope.unpaid = $scope.unpaid + $scope.listInvPond[x].invEarnings;
              }
            }*/
          }
        }

      });
    };

    var everyMonthInterestPri = function(invTotal, invInitDate, invStartDate, invEndDate, invCycle, invRate, multiNum) {
      // 每月的付费天数，付费日期，上次支付日期，该月的利息；
      $scope.listInvPond = [];
      var invDays, payDate, prevDate, invEarnings;
      var invList = {};
      if (invCycle === 1) {
        invDays = moment(invEndDate).diff(moment(invInitDate), 'days', true);
        invEarnings = invTotal + invTotal * invRate * Math.round(invDays) / 365; //计算利率
        invList = {
          'payDate': moment(invEndDate).format('YYYY-MM-DD'),
          'invEarnings': invEarnings,
          'invStatus': '0'
        };
        $scope.listInvPond.push(invList);
      } else {
        // var LastPayDate = moment(invStartDate).add((invCycle - 1), 'month').toString();
        // LastPayDate 永远等于 invEndDate?
        // var diffDate = moment(LastPayDate).diff(moment(invEndDate), 'days');
        // if (diffDate === 0) {
        //   invCycle = invCycle - 1;
        // }
        // 原先是这样
        invCycle = invCycle - 1;
        for (var i = 0; i <= invCycle; i++) {
          payDate = moment(invStartDate).add(i * multiNum, 'month').toString();
          if (moment(payDate) > moment(invEndDate)) {
            payDate = invEndDate;
          }
          if (i === 0) {
            invDays = moment(payDate).diff(moment(invInitDate), 'days', true) + 1;
          } else if(i === invCycle){
            payDate = invEndDate;
            invDays = moment(invEndDate).diff(moment(prevDate), 'days', true);
          }else{
            invDays = moment(payDate).diff(moment(prevDate), 'days', true);
          }

          invEarnings = invTotal * invRate * parseInt(invDays) / 365; //计算利率
          if (i === invCycle) {
            invEarnings = invEarnings + invTotal;
          }

          prevDate = payDate;

          invList = {
            'payDate': moment(payDate).format('YYYY-MM-DD'),
            'invEarnings': invEarnings,
            'invStatus': '0'
          };
          $scope.listInvPond.push(invList);
        }
      }
    };
    // 等额本息  intType = 2
    var everyMonthInterestEq = function(invTotal, invInitDate, invStartDate, invEndDate, invCycle, invRate) {
      $scope.listInvPond = [];
      var invDays, payDate, prevDate, invEarnings, currentMonthInterest, payDiffDate; //每月的付费天数，付费日期，上次支付日期，该月的付款金额, 当月生成的的利息；
      var invList = {};
      invEarnings = (invTotal * invRate * Math.pow((1 + invRate / invCycle), invCycle)) / (Math.pow((1 + invRate / invCycle), invCycle) - 1) / invCycle;
      var LastPayDate = moment(invStartDate).add(invCycle, 'month').toString();
      var diffDate = moment(LastPayDate).diff(moment(invEndDate), 'days');
      if (diffDate === 0) {
        invCycle = invCycle - 1;
      }
      invCycle = invCycle - 1;
      for (var i = 0; i <= invCycle; i++) {
        payDate = moment(invStartDate).add(i, 'month').toString();
        if (diffDate !== 0) {
          payDiffDate = moment(payDate).diff(moment(invEndDate), 'days');
          if (payDiffDate > 0) {
            payDate = invEndDate;
            invDays = moment(payDate).diff(moment(prevDate), 'days', true);
            invEarnings = invTotal + invTotal * invRate * parseInt(invDays) / 365;
            invList = {
              'payDate': moment(payDate).format('YYYY-MM-DD'),
              'invEarnings': invEarnings,
              'invStatus': '0'
            };
            $scope.listInvPond.push(invList);
            break;
          } else {
            currentMonthInterest = invTotal * invRate / 12;
            invTotal = invTotal - (invEarnings - currentMonthInterest);
          }
        }
        prevDate = payDate;
        invList = {
          'payDate': moment(payDate).format('YYYY-MM-DD'),
          'invEarnings': invEarnings,
          'invStatus': '0'
        };
        $scope.listInvPond.push(invList);
      }
    };

    $scope.getCreditDetail ();

  }]);
