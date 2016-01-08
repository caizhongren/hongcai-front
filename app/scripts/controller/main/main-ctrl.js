'use strict';
angular.module('hongcaiApp')
  .controller('MainCtrl', function($scope, $state, $interval, $stateParams, $rootScope, $location, MainService, AboutUsService, ProjectService, ipCookie, FriendLinkService, $alert, $timeout, DateUtils) {
    $scope.spCountDown = -1;

    $rootScope.pageTitle = '网贷平台，投资理财平台，投资理财项目-宏财网';


//     // 宏金宝列表
//     $scope.hongjinbaoList = function() {
// =======
//     $scope.dataList = [50, 50];
//     $scope.coloursList = ['#fd8f3f', '#c0c0c0'];

    // 机构保列表
    $scope.jigoubaoList = function() {

      $scope.showFlag = 1;
      ProjectService.projectList.get({
        status: '6,7,8,9,10,11,12',
        minCycle: 0,
        maxCycle: 100,
        minEarning: 0,
        maxEarning: 100,
        minTotalAmount: 0,
        maxTotalAmount: 200000000,
        sortCondition: 'release_start_time',
        sortType: false,
        pageSize: 5,
        categoryCode: "01"
      }, function(response) {
        if (response.ret === 1) {
          $scope.orderProp = 'id';
          $scope.currentPage = 0;
          $scope.pageSize = 5;
          $scope.serverTime = response.data.serverTime;
          $scope.jigoubao = response.data.projectList;
          $scope.projectStatusMap = response.data.projectStatusMap;
          $scope.repaymentTypeMap = response.data.repaymentTypeMap;
          $scope.data = [];
          $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
          };
          for (var i = 0; i < $scope.jigoubao.length; i++) {
            $scope.jigoubao[i].countdown = new Date($scope.jigoubao[i].releaseStartTime).getTime() - $scope.serverTime;
            $scope.jigoubao[i].showByStatus = $scope.jigoubao[i].status === 6 || $scope.jigoubao[i].status === 7 ? true : false;
            $scope.jigoubao[i]._timeDown = DateUtils.toHourMinSeconds($scope.jigoubao[i].countdown);
            $scope.data.push($scope.jigoubao[i]);
          }
          $scope._timeDown = [];
          $scope.counter = 0;

          $interval(function() {
            for (var i = $scope.jigoubao.length - 1; i >= 0; i--) {
              $scope.jigoubao[i].countdown -= 1000;
              if ($scope.jigoubao[i].countdown <= 0 && $scope.jigoubao[i].status == 2) {
                $state.reload();
              }

              // 已投金额
              $scope.investmentMoney = $scope.jigoubao[i].soldStock * $scope.jigoubao[i].increaseAmount;
              
              // 剩余金额
              $scope.remainingMoney = $scope.jigoubao[i].total - $scope.investmentMoney;
              $scope.jigoubao[i].chartData = [$scope.investmentMoney,$scope.remainingMoney];
  
              $scope.labelsList = ['已投', '剩余'];

              $scope.jigoubao[i]._timeDown = DateUtils.toHourMinSeconds($scope.jigoubao[i].countdown);
              $scope.jigoubaoHour = $scope.jigoubao[i]._timeDown.hour;
              $scope.jigoubaoMinute = $scope.jigoubao[i]._timeDown.min;
              $scope.jigoubaoSecond = $scope.jigoubao[i]._timeDown.seconds;
            };
          }, 1000);
          // $scope.$on('$stateChangeStart', function() {
          //   clearInterval(interval);
          // });
        } else {
          $scope.data = [];
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          //console.log('ask project-list, why projectList did not load data...');
        }
      });
    };

    $scope.jigoubaoList();

    // 宏包标列表
    // ProjectService.getGiftProjectList.get(function(response) {
    //   if (response.ret === 1) {
    //     $scope.activityList = response.data.projectList;
    //     $scope.stampMap = response.data.stampMap;
    //     $scope.projectStatusMap = response.data.projectStatusMap;
    //     $scope.newbieProjectList = response.data.newbieProjectList;
    //   }
    // });
    // 


    //  宏金盈列表
    MainService.getIndexFundsProductList.get(function(response) {
      if (response.ret === 1) {
        $scope.fundsProjectStatusMap = response.data.fundsProjectStatusMap;
        $scope.fundsProjectProductList = response.data.fundsProjectProductList;
        $scope.lingcunbao = $scope.fundsProjectProductList[0];
        $scope.serverTime = response.data.serverTime;

        var nextDay = new Date();
        nextDay.setHours(0);
        nextDay.setMinutes(0);
        nextDay.setSeconds(0);
        var intervalDay = 1;
        if (response.data.period != null) {
          intervalDay = response.data.period.frequency;
        }

        var nextDayTime = nextDay.getTime() + intervalDay * 24 * 60 * 60 * 1000;
        var intervalTimeInMills = nextDayTime - $scope.serverTime;
        $scope.lingcunbao._timeDown = DateUtils.toHourMinSeconds(intervalTimeInMills);
        $scope.lingcunbao.interval = intervalTimeInMills;
        $interval(function() {
          $scope.lingcunbao.interval = $scope.lingcunbao.interval - 1000;
          if ($scope.lingcunbao.interval <= 0) {
            $state.reload();
          }
          $scope.lingcunbao._timeDown = DateUtils.toHourMinSeconds($scope.lingcunbao.interval);
        }, 1000);

      }
    });



    // 媒体报道
    AboutUsService.indexTextList.get({
      category: 1
    }, function(response) {
      if (response.ret === 1) {
        $scope.mediaList = response.data.textList;
      }
    });

    // 宏财研究院
    AboutUsService.indexTextList.get({
      category: 4
    }, function(response) {
      if (response.ret === 1) {
        $scope.searchList = response.data.textList;
        // 宏财动态
        AboutUsService.indexTextList.get({
          category: 3
        }, function(response) {
          if (response.ret === 1) {
            $scope.trendList = response.data.textList;
            for (var i = 0; i <= $scope.trendList.length - 1; i++) {
              $scope.searchList.push($scope.trendList[i]);
            };
            $scope.searchList = $scope.searchList.slice(0, 5);
          }
        });
      }
    });



    $rootScope.selectPage = $location.path().split('/')[1];


    // 债权转让列表
    // var creditRightGroup = MainService.indexCreditRightList.get(function() {
    //   if (creditRightGroup.ret === 1) {
    //     $scope.creditRightList = creditRightGroup.data.creditAssignmentList;
    //   }
    // });

    // 获取最后一个公告
    AboutUsService.getLatestNotice.get(function(response) {
      if (response.ret === 1) {
        $scope.latestNotice = response.data.latestNotice;
      }
    });

    //获取友情链接
    // FriendLinkService.friendLinkList.get(function(response) {
    //   if (response.ret === 1) {
    //     $scope.friendLinks = response.data.friendLinks;
    //   } else {
    //     $scope.msg = response.msg;
    //     $alert({
    //       scope: $scope,
    //       template: 'views/modal/alert-dialog.html',
    //       show: true
    //     });
    //   }
    // });

    // 最近30天投资排行
    MainService.monthInvest.get(function(response) {
      $scope.monthInvestList = response.data.investAmounts;
    });

    // 处理推广流量统计
    var from = $stateParams.from;
    if (from) {
      ipCookie('utm_from', from, {
        expires: 1
      });
    }
    MainService.trafficStats.get({
      from: from
    });

  });
