'use strict';
angular.module('hongcaiApp')
  .controller('MainCtrl', ['$scope', '$stateParams', '$rootScope', '$location', 'MainService', 'AboutUsService', 'ProjectService', 'ipCookie', function($scope, $stateParams, $rootScope, $location, MainService, AboutUsService, ProjectService, ipCookie) {
    $scope.spCountDown = -1;
    $scope.projectList = function() {
      MainService.projectList.get(function(response) {
        if (response.ret === 1) {
          $scope.serverTime = response.data.serverTime;
          $scope.projectList = response.data.recommend;
          $scope.projectVo = response.data.specialRecommend[0];
          $scope.baseFileUrl = response.data.baseFileUrl;
          if ($location.protocol() === 'https') {
            $scope.baseFileUrl = $location.protocol() + '://' + $scope.baseFileUrl.split('://')[1];
          }
          if ($scope.projectVo.releaseStartTime) {
            $scope.spCountDown = moment($scope.projectVo.releaseStartTime).diff(moment($scope.serverTime), 'seconds') + 1;
          }
          $scope._timeVoDown = 0;
          $scope.counter = 0;
          var interval = window.setInterval(function() {
            $scope.counter++;
            // 特殊推荐倒计时
            $scope._timeVoDown = $scope.mainTimeUntil($scope.spCountDown);
            $scope.$apply();
          }, 1000);
          // 页面跳转暂停倒计时。
          $scope.$on('$stateChangeStart', function() {
            clearInterval(interval);
          });
        } else {}
      });
    };
    $scope.projectList();
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

    // 宏包标列表
    ProjectService.getGiftProjectList.get(function(response) {
      if (response.ret === 1) {
        $scope.activityList = response.data.projectList;
        $scope.stampMap = response.data.stampMap;
        $scope.projectStatusMap = response.data.projectStatusMap;
        $scope.newbieProjectList = response.data.newbieProjectList;
      }
    });
    //  宏金盈列表
    MainService.getIndexFundsProductList.get(function(response) {
      if (response.ret === 1) {
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

    AboutUsService.indexTextList.get({
      category: 1
    }, function(response) {
      if (response.ret === 1) {
        $scope.textList = response.data.textList;
        $scope.mediaList = $scope.textList.slice(0, 4);
      }
    });

    AboutUsService.indexTextList.get({
      category: 2
    }, function(response) {
      if (response.ret === 1) {
        $scope.textList = response.data.textList;
        $scope.noticeList = $scope.textList.slice(0, 4);
      }
    });

    AboutUsService.indexTextList.get({
      category: 3
    }, function(response) {
      if (response.ret === 1) {
        $scope.textList = response.data.textList;
        $scope.trendList = $scope.textList.slice(0, 4);
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
