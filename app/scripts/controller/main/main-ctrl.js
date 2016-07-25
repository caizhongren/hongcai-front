'use strict';
angular.module('hongcaiApp')
  .controller('MainCtrl', function($scope, $state, $rootScope, $location, MainService, AboutUsService, ProjectService, ProjectUtils, FriendLinkService, DateUtils, toaster, projectStatusMap) {
    $scope.spCountDown = -1;

    $rootScope.pageTitle = '网贷平台，投资理财平台，投资理财项目-宏财网';
    $scope.projectStatusMap = projectStatusMap;
    /**
     * 机构保列表
     */
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
        pageSize: 3,
        categoryCode: "01"
      }, function(response) {
        if ( !response || response.ret === -1) {
          $scope.data = [];
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          return;
        }
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.serverTime = response.data.serverTime;
        $scope.jigoubao = response.data.projectList;
        $scope.repaymentTypeMap = response.data.repaymentTypeMap;
        $scope.baseFileUrl = response.data.baseFileUrl;
        $scope.data = [];
        $scope.numberOfPages = function() {
          return Math.ceil($scope.data.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.jigoubao.length; i++) {
          ProjectUtils.projectTimedown($scope.jigoubao[i], $scope.serverTime);
          $scope.data.push($scope.jigoubao[i]);
        }
      });
    };

    $scope.jigoubaoList();

    /**
     * 新手标
     */
    ProjectService.newbieBiaoProject.get({}, function(response) {
      if (response.ret === -1) {
        return;
      }
      $scope.newbieBiaoProject = response;
      // var serverTime = response.createTime || (new Date().getTime());
      // ProjectUtils.projectTimedown($scope.newbieBiaoProject, serverTime);
    });


    /**
     * 媒体报道
     */
    AboutUsService.indexTextList.get({
      category: 1,
      pageSize: 4
    }, function(response) {
      if (response.ret === 1) {
        $scope.mediaList = response.data.textList;
      }
    });

    /**
     * 宏财研究院
     */
    AboutUsService.indexTextList.get({
      category: 4,
      pageSize: 4
    }, function(response) {
      if (response.ret === 1) {
        $scope.searchList = response.data.textList;
        /**
         * 宏财动态
         */
        AboutUsService.indexTextList.get({
          category: 3,
          pageSize: 4
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


    /**
     * 获取最后一个公告
     */
    AboutUsService.getLatestNotice.get(function(response) {
      if (response.ret === 1) {
        $scope.latestNotice = response.data.latestNotice;
      }
    });


    /**
     * 最近30天投资排行
     */
    MainService.monthInvest.get(function(response) {
      $scope.monthInvestList = response.data.investAmounts;
    });

    /**
     * 体验金项目数据
     */
    ProjectService.getExperienceProjectDetail.get({}, function(projectDetails) {
      if (projectDetails.ret === 1) {
        $scope.experienceInvestCount = projectDetails.data.investCount;
      }
    });

    /**
     * 处理推广流量统计
     */
    if ($rootScope.channelCode) {
      MainService.trafficStats.get({
        from: $rootScope.channelCode
      });
    }

  })
