'use strict';
angular.module('hongcaiApp')
  .controller('MainCtrl', function($scope, $state, $interval, $stateParams, $rootScope, $location, Restangular, MainService, AboutUsService, ProjectService, FriendLinkService, $alert, $timeout, DateUtils, toaster, projectStatusMap) {
    $scope.spCountDown = -1;

    $rootScope.pageTitle = '网贷平台，投资理财平台，投资理财项目-宏财网';
    $scope.projectStatusMap = projectStatusMap;

    $scope.coloursList = ['#fd8f3f', '#c0c0c0'];
    $scope.chartOptions = {
      lineWidth:100,
      percentageInnerCutout:75
    };
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
        if (response.ret === 1) {
          $scope.orderProp = 'id';
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
            $scope.jigoubao[i].countdown = new Date($scope.jigoubao[i].releaseStartTime).getTime() - $scope.serverTime;
            $scope.jigoubao[i].showByStatus = $scope.jigoubao[i].status === 6 || $scope.jigoubao[i].status === 7 ? true : false;
            $scope.jigoubao[i]._timeDown = DateUtils.toHourMinSeconds($scope.jigoubao[i].countdown);
            $scope.data.push($scope.jigoubao[i]);
          }

          var interval = $interval(function() {
            for (var i = $scope.jigoubao.length - 1; i >= 0; i--) {
              $scope.jigoubao[i].countdown -= 1000;
              if ($scope.jigoubao[i].countdown <= 0 && $scope.jigoubao[i].status == 2) {
                $state.reload();
              }

              $scope.jigoubao[i]._timeDown = DateUtils.toHourMinSeconds($scope.jigoubao[i].countdown);
            };
          }, 1000);
          $scope.$on('$stateChangeStart', function() {
            clearInterval(interval);
          });
        } else {
          $scope.data = [];
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          //console.log('ask project-list, why projectList did not load data...');
        }
      });
    };

    $scope.jigoubaoList();

    Restangular.one('projects').one('newbieBiaoProject').get().then(function(response) {
      if(response.ret === -1){
          return;
        }

        $scope.newbieBiaoProject = response;
    });

    /**
     * 宏金盈列表
     */
    MainService.getIndexFundsProductList.get({
      types: "1"
    }, function(response) {
      if (response.ret === 1) {
        $scope.fundsProjectStatusMap = response.data.fundsProjectStatusMap;
        $scope.fundsProjectProductList = response.data.fundsProjectProductList;
        $scope.lingcunbao = $scope.fundsProjectProductList[0];
      }
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
        // $scope.project = projectDetails.data.project;
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
.config(['ChartJsProvider', function (ChartJsProvider) {
    ChartJsProvider.setOptions({
      responsive: false,
      scaleFontSize: 8,
      tooltipXOffset: 10,
      segmentStrokeWidth : 1,
      scaleLineWidth:1,
      datasetStrokeWidth: 1,
      barStrokeWidth: 1,
    });
    ChartJsProvider.setOptions('Line', {
      datasetFill: false,
      datasetStrokeWidth: 1,
    });
  }]);
