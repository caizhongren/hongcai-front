'use strict';
angular.module('hongcaiApp')
  .controller('MainCtrl', ['$scope', '$stateParams', '$rootScope', '$location', 'MainService', 'AboutUsService', 'ProjectService', 'ipCookie','FriendLinkService', '$alert', '$timeout', function($scope, $stateParams, $rootScope, $location, MainService, AboutUsService, ProjectService, ipCookie,FriendLinkService, $alert, $timeout) {
    $scope.spCountDown = -1;


    // $scope.projectList = function() {
    //   MainService.projectList.get(function(response) {
    //     if (response.ret === 1) {
    //       $scope.serverTime = response.data.serverTime;
    //       $scope.projectList = response.data.recommend;
    //       $scope.projectVo = response.data.specialRecommend[0];
    //       $scope.baseFileUrl = response.data.baseFileUrl;
    //       if ($location.protocol() === 'https') {
    //         $scope.baseFileUrl = $location.protocol() + '://' + $scope.baseFileUrl.split('://')[1];
    //       }
    //       if ($scope.projectVo.releaseStartTime) {
    //         $scope.spCountDown = moment($scope.projectVo.releaseStartTime).diff(moment($scope.serverTime), 'seconds') + 1;
    //       }
    //       $scope._timeVoDown = 0;
    //       $scope.counter = 0;
    //       var interval = window.setInterval(function() {
    //         $scope.counter++;
    //         // 特殊推荐倒计时
    //         $scope._timeVoDown = $scope.mainTimeUntil($scope.spCountDown);
    //         $scope.$apply();
    //       }, 1000);
    //       // 页面跳转暂停倒计时。
    //       $scope.$on('$stateChangeStart', function() {
    //         clearInterval(interval);
    //       });
    //     } else {}
    //   });
    // };
    // $scope.projectList();

    $scope.hongjinbaoList = function() {
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
        pageSize: 5
      }, function(response) {
        if (response.ret === 1) {
          $scope.orderProp = 'id';
          $scope.currentPage = 0;
          $scope.pageSize = 5;
          $scope.hongjinbao = response.data.projectList;
          $scope.data = [];
          $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
          };
          for (var i = 0; i < $scope.hongjinbao.length; i++) {
            $scope.hongjinbao[i].countdown = moment($scope.hongjinbao[i].releaseStartTime).diff(moment($scope.serverTime), 'seconds') + 2;
            $scope.hongjinbao[i].showByStatus = $scope.hongjinbao[i].status === 6 || $scope.hongjinbao[i].status === 7 ? true : false;
            $scope.hongjinbao[i]._timeDown = $scope.timeUntil($scope.hongjinbao[i].countdown);
            $scope.data.push($scope.hongjinbao[i]);
          }
          $scope._timeDown = [];
          $scope.counter = 0;
          var interval = window.setInterval(function() {
            $scope.counter++;
            for (var i = 0; i < $scope.data.length; i++) {
              $scope._timeDown[i] = $scope.timeUntil($scope.data[i].countdown);
            }
            $scope.$apply();
          }, 1000);

          $scope.$on('$stateChangeStart', function() {
            clearInterval(interval);
          });
        } else {
          $scope.data = [];
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          console.log('ask project-list, why projectList did not load data...');
        }
      });
    };

    $scope.hongjinbaoList();


    $scope.mainTimeUntil = function(stDate) {
      var collectTime = {};
      stDate = stDate - $scope.counter;
      if (stDate === 0) {
        $scope.projectList();
        window.location.reload();
      }
      collectTime.day = moment().startOf('month').seconds(stDate).format('DD') - 1;
      collectTime.hour = moment().startOf('month').seconds(stDate).format('HH');
      collectTime.second = moment().startOf('month').seconds(stDate).format('mm');
      collectTime.min = moment().startOf('month').seconds(stDate).format('ss');
      return collectTime;
      // function z(n) {
      //   return (n < 10 ? '0' : '') + n;
      // }
      // var d = new Date(stDate);
      // var diff = d - new Date();
      // var sign = diff < 0 ? '-' : '';
      // diff = Math.abs(diff);
      // var days = diff / 3.6e6 / 24 | 0;
      // var hours = (diff - days*3.6e6*24) / 3.6e6 | 0;
      // var mins = diff % 3.6e6 / 6e4 | 0;
      // var secs = Math.round(diff % 6e4 / 1e3);
      // return sign + days + '天,' + z(hours) + '时,' + z(mins) + '分,' + z(secs) + '秒';
    };

    $scope.timeUntil = function(stDate) {
      var collectTime = {};
      stDate = stDate - $scope.counter;
      if (stDate === 0) {
        $scope.getProjectList();
        window.location.reload();
      }
      collectTime.day = moment().startOf('month').seconds(stDate).format('DD') - 1;
      collectTime.hour = moment().startOf('month').seconds(stDate).format('HH') + (collectTime.day >= 0 ? collectTime.day * 24 : 0);
      collectTime.second = moment().startOf('month').seconds(stDate).format('mm');
      collectTime.min = moment().startOf('month').seconds(stDate).format('ss');
      return collectTime;
    };

    // 宏包标列表
    // ProjectService.getGiftProjectList.get(function(response) {
    //   if (response.ret === 1) {
    //     $scope.activityList = response.data.projectList;
    //     $scope.stampMap = response.data.stampMap;
    //     $scope.projectStatusMap = response.data.projectStatusMap;
    //     $scope.newbieProjectList = response.data.newbieProjectList;
    //   }
    // });
    //  宏金盈列表
    MainService.getIndexFundsProductList.get(function(response) {
      // console.log(response.data.fundsProjectProductList);

      if (response.ret === 1) {
      //    response.data.fundsProjectProductList.slice(0,1);
       console.log(response.data.fundsProjectProductList);
        $scope.fundsProjectStatusMap = response.data.fundsProjectStatusMap;
        $scope.fundsProjectProductList = response.data.fundsProjectProductList;
        //
      }
    });

    var indexStatistics = MainService.indexStatistics.get(function(response) {
      if (response.ret === 1) {
        $scope.indexStatic = indexStatistics.data.indexStatic;
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
      }
    });

    // 宏财动态
    AboutUsService.indexTextList.get({
      category: 3
    }, function(response) {
      if (response.ret === 1) {
        $scope.trendList = response.data.textList;
        for (var i = 0; i <= $scope.trendList.length - 1; i++) {
          $scope.searchList.push($scope.trendList[i]);
        };
        $scope.searchList = $scope.searchList.slice(0,5);
      }
    });

    $rootScope.selectPage = $location.path().split('/')[1];


    // 债权转让列表
    var creditRightGroup = MainService.indexCreditRightList.get(function() {
      if (creditRightGroup.ret === 1) {
        $scope.creditRightList = creditRightGroup.data.creditAssignmentList;
      }
    });

    // 获取最后一个公告
    AboutUsService.getLatestNotice.get(function(response) {
      if (response.ret === 1) {
        $scope.latestNotice = response.data.latestNotice;
      }
    });

    //获取友情链接
    FriendLinkService.friendLinkList.get(function(response) {
      if (response.ret === 1) {
        $scope.friendLinks = response.data.friendLinks;
      } else {
        $scope.msg = response.msg;
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
      }
    });

    // 最近30天投资排行
    MainService.monthInvest.get(function(response){
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

  }]);
