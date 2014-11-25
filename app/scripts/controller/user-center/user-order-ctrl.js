hongcaiApp.controller('UserOrderCtrl', ['$location', '$scope', '$rootScope', '$state', '$stateParams', 'UserCenterService', '$aside', function ($location,$scope,$rootScope, $state, $stateParams, UserCenterService, $aside) {

    $rootScope.redirectUrl = $location.path();
    $rootScope.selectSide = 'userCenter-investment';
    var dateStart = 0;
    var dateEnd = 0;
    $scope.status = $stateParams.status || 0;
    $scope.dateInterval = $stateParams.dateInterval || 0;

    $scope.showListNameInfo = function() {
      angular.element('#investment-list').animate({width:'show'},300);
    };

    $scope.showListDetails =  function() {
      angular.element('#investment-detail').animate({width:'show'},300);
    }
    // 时间组件 先注释
    // $scope.openStartTime = function($event) {
    //   $event.preventDefault();
    //   $event.stopPropagation();

    //   $scope.openedStartTime = true;
    // };
    // $scope.openEndTime = function($event) {
    //   $event.preventDefault();
    //   $event.stopPropagation();

    //   $scope.openedEndTime = true;
    // };

    //  时间组件结束
    $scope.fromDateChanged = function () {
      dateStart = $scope.invFromDate;
    };

    $scope.untilDealDateChanged = function (status,dateInterval) {
      dateEnd = $scope.invUntilDate;
      $location.path('userCenter-investment/'+dateInterval+'/'+status+'/'+dateStart+'/'+dateEnd)
    };

    var getOrderByUser = UserCenterService.getOrderByUser.get({type: $stateParams.type, dateInterval: $stateParams.dateInterval,
    															status: $stateParams.status,dateStart: $stateParams.dateStart,dateEnd: $stateParams.dateEnd},
    															function(response) {
        $scope.orderList = getOrderByUser.data.orderVoList;
        $scope.orderCount = getOrderByUser.data.orderCount;
        $scope.amount = getOrderByUser.data.amount;
        $scope.dateInterval = getOrderByUser.data.dateInterval;
        $scope.status = getOrderByUser.data.status;
        $scope.invFromDate = getOrderByUser.data.dateStart;
        $scope.invUntilDate = getOrderByUser.data.dateEnd;

        $scope.currentPage = 0;
        $scope.pageSize = 6;
        $scope.data = [];

        $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
        }
        for (var i = 0; i < $scope.orderList.length; i++) {
            $scope.data.push($scope.orderList[i]);
        }
    });
    // 获取详情按钮
    $scope.getOrderBillByOrderId = function(orderId) {
      UserCenterService.getOrderBillByOrderId.get({orderId: orderId}, function(response) {
        if(response.ret == 1) {
          // $scope.
        }
      });
    };
    // 取消订单
    $scope.cancelOrder = function(orderId) {
      UserCenterService.cancelOrder.get({orderId: orderId}, function(response){
        if(response.ret == 1) {
          console.log('cancelOrder sucess!');
        }
      });
    };

    // 右侧弹窗 以防今后拿出来重做。
    // 周期，时间，金额，支付状态
    // 现有一笔10w的投资，年化利率为12%，项目放款日为2014-1-18，期限6个月，项目完结日为2014-7-12，首次付息日为2014-2-15。
    // {预计支付时间:'',预计支付金额:'',实际支付状态:''}
    // 总钱*利息*该月天数/365

    // var invCountNo = 100000;
    // var invInitDate = '2014-1-18'
    // var invStartDate = '2014-2-15';
    // var invEndDate = '2014-7-12';
    // var invCycle = 6;
    // var PayDate = '';
    // var invType = 0;
    // var invDays = 0;
    // var invEarnings = 0;
    // var invRate = 0.12
    // moment([2012, 0, 31]).month(1).format('YYYY-MM-DD');
    // moment([2010, 0, 31]).add(1, 'months'); // February 28
    // var m = moment(new Date(2011, 2, 12, 5, 0, 0)); // the day before DST in the US
    // m.hours(); // 5
    // m.add(1, 'days').hours(); // 5
    // $scope.listInvPond = [];
    // prevDate = '';

    // for (var i=0;i<=invCycle,i++) {
    //     var invList = {};
    //     // moment([2012, 0, 31]).month(1).format('YYYY-MM-DD');
    //     PayDate = moment(invStartDate).month(i).('YYYY-MM-DD');
    //     if( invType == 1) {
    //     if(i == 0){
    //         invDays = PayDate - invInitDate;
    //     } else {
    //         invDays = PayDate - prevDate;
    //     }
    //     if(PayDate >= invEndDate) {
    //         PayDate = invEndDate;
    //         invDays = PayDate - prevDate;
    //         invEarnings = invCountNo * invRate * invDays / 365 + invCountNo;
    //     } else {
    //         invEarnings = invCountNo * invRate * invDays / 365;
    //     }
    //         //
    //     } else if(invType == 2) {
    //         //
    //     }
    //     invList = {'PayDate': PayDate, 'invEarnings': invEarnings, 'invStatus': '未支付'};
    //     prevDate = PayDate;
    //     $scope.listInvPond.push(invList);
    // }
    // }
    // 先息后本
    // 每月 总钱*利息*该月天数/365
    // 期限
    // 首次付息日
    // 到息日

    // // 等额本息
    // 每月
    // 期限
    // 首次付息日
    // 到息日





























}]);

