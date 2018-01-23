'use strict';
angular.module('hongcaiApp')
  .controller('MainCtrl', function($scope, $state, $rootScope, $location, $modal, MainService, AboutUsService, ProjectService, ProjectUtils, FriendLinkService, DateUtils, toaster, projectStatusMap) {
    $scope.spCountDown = -1;
    $scope.jingxuanLimit = 3;
    $scope.isExist = true;
    $scope.authorization = false;
    $rootScope.pageTitle = '国资平台，网贷平台，投资平台，投资项目-宏财网';
    var userId = $rootScope.loginUser ? $rootScope.loginUser.id : null;
    $scope.projectStatusMap = projectStatusMap;
    

    /**
     * 引导下载app弹窗
     */
    $scope.showQRcode = function () {
      $rootScope.noticeModal = $modal({
        scope: $rootScope,
        template: 'views/modal/alert-novice.html',
        show: true
      }); 
    }

    /**
     * 查询新手标是否授权
     */
    var authorization = function (num) {
      ProjectService.authorization.get({
        number: num
      }, function (response) {
        if (!response || response.ret === -1) {
          return
        }
        $scope.authorization = response.authorization
      })
    }
    /**
     * 查询新手标  状态码200 有新手标， 204 无新手标项目
     */
    var newbieProject = function () {
      ProjectService.newbieProject.get({}, function (response) {
        if (!response || response.ret === -1) {
          return
        }
        $scope.newbieProject = response
        $scope.jingxuanLimit = !response.number ? 3 : 2
        !response.number ? null : authorization(response.number) 
        if ($rootScope.isLogged) {
          // 查询用户是否投资过
          ProjectService.isExist.get({
            userId: userId
          }, function (res) {
            if (!res || res.ret === -1) {
              return
            }
            $scope.jingxuanLimit = !$scope.newbieProject.number || $scope.newbieProject.number && $rootScope.isLogged && !res.exist ? 3 : 2
          })
        }
        console.log('$scope.jingxuanLimit = ' + $scope.jingxuanLimit)
      })
    }
    newbieProject()
    /**
     * 精选、尊贵列表
     */
    $scope.jingxuanList = function(type) {
      $scope.showFlag = 1;
      ProjectService.main_projectList.get({
        pageSize: 3,
        page: 1,
        type: type
      }, function(response){
        if ( !response || response.ret === -1) {
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          return;
        }
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.serverTime = response.serverTime;
        $scope.repaymentTypeMap = response.repaymentTypeMap;
        $scope.baseFileUrl = response.baseFileUrl;
        if (type == 5) {
          $scope.jingxuan =response.projectList;
        
        }else if (type == 6) {
          $scope.zungui = response.projectList;
        }
      });
    };

    $scope.jingxuanList(5);
    $scope.jingxuanList(6);


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
     * 处理推广流量统计
     */
    if ($rootScope.channelCode) {
      MainService.trafficStats.get({
        from: $rootScope.channelCode
      });
    }

    /**
     * 债权转让列表
     */
    ProjectService.assignmentList.get({
      page:1, 
      pageSize: 3
    },function(response){
      if (response.assignments.length <=0) {
        return;
      }else {
        $scope.assignmentList = response.assignments;
      }
    });

  })
