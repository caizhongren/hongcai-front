'use strict';
hongcaiApp.controller('MainCtrl', ['$scope', '$stateParams', '$rootScope', '$location', 'MainService', 'AboutUsService', 'ProjectService', 'ipCookie', '$timeout', '$http', 'analytics', function($scope, $stateParams, $rootScope, $location, MainService, AboutUsService, ProjectService, ipCookie, $timeout, $http, analytics) {
  var loginName;
  var logout;
  $scope.spCountDown = -1;
  var projectList = MainService.projectList.get(function(response) {
    if (response.ret === 1) {
      $scope.projectList = projectList.data.recommend;
      $scope.serverTime = projectList.data.serverTime;
      $scope.projectVo = projectList.data.specialRecommend[0];
      $scope.baseFileUrl = projectList.data.baseFileUrl;
      if ($location.protocol() === 'https') {
        $scope.baseFileUrl = $location.protocol() + '://' + $scope.baseFileUrl.split('://')[1];
      }
      $scope.projectVo = projectList.data.specialRecommend[0];
      // 特别推荐倒计时 (倒计时需要提炼出来)
      if ($scope.projectVo.releaseStartTime) {
        $scope.spCountDown = moment($scope.projectVo.releaseStartTime).diff(moment($scope.serverTime), 'seconds') + 1;
      }
      // 第一代倒计时
      // $scope.onTimeout = function() {
      //   $scope.spCountDown --;
      //   mytimeout = $timeout($scope.onTimeout, 1000);
      //   $scope.statDay = moment().startOf('month').seconds($scope.spCountDown).format('DD') - 1 + '天,';
      //   $scope.statTime = moment().startOf('month').seconds($scope.spCountDown).format('HH时,mm分,ss秒');
      //   if($scope.spCountDown === 0) {
      //     MainService.projectList.get(function(response) {
      //       if(response.ret === 1) {
      //         $scope.projectVo = projectList.data.specialRecommend[0];
      //       }
      //     });
      //   }
      // };
      // var mytimeout = $timeout($scope.onTimeout,1000);
      $scope.data = [];
      for (var i = 0; i < $scope.projectList.length; i++) {
        $scope.projectList[i].countdown = moment($scope.projectList[i].releaseStartTime).diff(moment($scope.serverTime), 'seconds') + 1;
        $scope.data.push($scope.projectList[i]);
      }

      $scope._timeDown = [];
      $scope._timeVoDown = 0;
      $scope.counter = 0;
      var interval = window.setInterval(function() {
        $scope.counter++;
        // 推荐列表的倒计时
        for (var i = 0; i < $scope.data.length; i++) {
          $scope._timeDown[i] = $scope.mainTimeUntil($scope.data[i].countdown);
        }
        // 特殊推荐倒计时
        $scope._timeVoDown = $scope.mainTimeUntil($scope.spCountDown);
        $scope.$apply();
      }, 1000);
      // 页面跳转暂停倒计时。
      $scope.$on('$stateChangeStart', function() {
        // $timeout.cancel(mytimeout);
        clearInterval(interval);
      });
    } else {
      $scope.data = [];
    }
  });

  $scope.mainTimeUntil = function(stDate) {
    stDate = stDate - $scope.counter;
    if (stDate === 0) {
      MainService.projectList.get(function(response) {
        if (response.ret === 1) {
          $scope.projectVo = projectList.data.specialRecommend[0];
          $scope.projectList = projectList.data.recommend;
        }
      });
      window.location.reload();
    }
    return moment().startOf('month').seconds(stDate).format('DD') - 1 + '天,' + moment().startOf('month').seconds(stDate).format('HH时,mm分,ss秒');
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
  }


  var activityGroup = ProjectService.getGiftProjectList.get(function() {
    if (activityGroup.ret === 1) {
      $scope.activityList = activityGroup.data.projectList;
    }
  });

  var indexStatistics = MainService.indexStatistics.get(function(response) {
    if (response.ret === 1) {
      $scope.indexStatic = indexStatistics.data.indexStatic;
    }
  });

  AboutUsService.textList.get({
    category: 1
  }, function(response) {
    if (response.ret === 1) {
      $scope.textList = response.data.textList;
      $scope.mediaList = $scope.textList.slice(0, 4);
    }
  });

  AboutUsService.textList.get({
    category: 2
  }, function(response) {
    if (response.ret === 1) {
      $scope.textList = response.data.textList;
      $scope.noticeList = $scope.textList.slice(0, 4);
    }
  });

  AboutUsService.textList.get({
    category: 3
  }, function(response) {
    if (response.ret === 1) {
      $scope.textList = response.data.textList;
      $scope.trendList = $scope.textList.slice(0, 4);
    }
  });

  $rootScope.selectPage = $location.path().split('/')[1];

  /**
   * 处理推广流量统计
   */
  var from = $stateParams.from;
  if (from) {
    ipCookie('utm_from', from, {
      expires: 1
    })
  };
  MainService.trafficStats.get({
    from: from
  });

}]);
