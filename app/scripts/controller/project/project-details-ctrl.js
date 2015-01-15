'use strict';
angular.module('hongcaiApp')
  .controller('ProjectDetailsCtrl', ['$scope', '$state', '$rootScope', '$location', '$stateParams', 'ProjectService', 'OrderService', '$modal', '$alert', 'toaster', '$timeout', 'ipCookie', 'MainService', function($scope, $state, $rootScope, $location, $stateParams, ProjectService, OrderService, $modal, $alert, toaster, $timeout, ipCookie, MainService) {
    $rootScope.redirectUrl = $location.path();

    var projectDetails = ProjectService.projectDetails.get({
      projectId: $stateParams.projectId
    }, function() {
      if (projectDetails.ret === 1) {
        $scope.statSecond = parseInt(projectDetails.data.countDownTime / 1000 + 1) || 1;
        $scope.onTimeout = function() {
          $scope.statSecond--;
          mytimeout = $timeout($scope.onTimeout, 1000);
          $scope.statDay = moment().startOf('month').seconds($scope.statSecond).format('DD') - 1 + '天,';
          $scope.statTime = moment().startOf('month').seconds($scope.statSecond).format('HH时,mm分,ss秒');
          if ($scope.statSecond === 0) {
            ProjectService.projectDetails.get({
              projectId: $stateParams.projectId
            }, function(response) {
              if (response.ret === 1) {
                $scope.project = response.data.project;
              }
            });
            window.location.reload();
          }
        };
        var mytimeout = $timeout($scope.onTimeout, 1000);
        $scope.$on('$stateChangeStart', function() {
          $timeout.cancel(mytimeout);
        });
        $scope.project = projectDetails.data.project;

        $scope.totalType = $scope.project.status === 6 && $scope.project.progress < 100 ? '可预约金额':'可投金额';
        console.log($scope.project);
        // 项目可投金额
        $scope.projectInvestNum = $scope.project.currentStock * $scope.project.increaseAmount;
        // 用户可用金额
        if ($rootScope.userCapital) {
          $scope.userCanInvestNum = $scope.projectInvestNum > $rootScope.userCapital.balance ? $rootScope.userCapital.balance : $scope.projectInvestNum;
        } else {
          $scope.userCanInvestNum = 0;
        }

        $scope.projectInfo = projectDetails.data.projectInfo;
        $scope.projectRank = projectDetails.data.projectRank;

        // $scope.pledges = projectDetails.data.pledges;
        $scope.isAvailable = projectDetails.data.isAvailable;
        console.log($scope.isAvailable);
        $scope.enterprise = projectDetails.data.enterprise;
        $scope.orderList = projectDetails.data.orderList;
        $scope.enterpriseThumbnailFileList = projectDetails.data.enterpriseThumbnailFileList;
        $scope.enterpriseOriginalFileList = projectDetails.data.enterpriseOriginalFileList;
        $scope.contractOriginalFileList = projectDetails.data.contractOriginalFileList;
        $scope.contractThumbnailFileList = projectDetails.data.contractThumbnailFileList;
        $scope.preRepaymentList = projectDetails.data.preRepaymentList;
        $scope.billCount = projectDetails.data.billCount;
        $scope.remainInterest = projectDetails.data.remainInterest;
        $scope.remainPrincipal = projectDetails.data.remainPrincipal;
        $scope.baseFileUrl = projectDetails.data.baseFileUrl;
        // 处理投资记录分页
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.data = [];

        $scope.numberOfPages = function() {
          return Math.ceil($scope.data.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.orderList.length; i++) {
          $scope.data.push($scope.orderList[i]);
        }
      } else {
        toaster.pop('warning', projectDetails.msg);
      }
    });
    // $scope.currentAmount = $scope.project.currentStock * $scope.project.increaseAmount
    /*$scope.statDate = new Date('2014', '10', '21', '20','17','10');*/ //假数据
    $scope.finished = function() {
      ProjectService.projectDetails.get({
        projectId: $stateParams.projectId
      }, function(response) {
        if (response.ret === 1) {
          $scope.project = response.data.project;
        }
        // 刷新页面
        if ($scope.statSecond === 0) {
          window.location.reload();
        }
      });
    };
    $scope.Alertdata = function() {
      $alert({
        scope: $scope,
        template: 'views/modal/alert-perfectinformation.html',
        show: true
      });
    };
    $scope.toInvest = function(project) { //验证用户权限
      $scope.amount = project.status === 6? project.reserveAmount : project.amount;
      if ($scope.amount <= $scope.project.minInvest) {
        // alert('投资金额必须大于最小投资金额' + $scope.project.minInvest + '！');
        // $scope.msg = '投资金额必须大于最小投资金额' + $scope.project.minInvest + '！';
        $scope.msg = '投资金额必须大于最小投资金额:100元！';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
        return;
      } else if ($scope.amount % $scope.project.increaseAmount) {
        // alert('投资金额必须为' + $scope.project.increaseAmount + '的整数倍！');
        $scope.msg = '投资金额必须为' + $scope.project.increaseAmount + '的整数倍！';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
        return;
      }

      if (project.status === 6) {
        // 预约项目投资
        console.log(project.reserveAmount,project.id)
        ProjectService.reserve.get({
          amount:  project.reserveAmount,
          projectId: project.id
        }, function(response) {
          if (response.ret === 1) {
            if (response.data.flag) {
              if (response.data.isBalance) {
                $state.go('root.invest-verify', {
                  projectId: response.data.projectId,
                  amount: response.data.amount
                });
              } else {
                $state.go('root.invest-verify', {
                  projectId: response.data.projectId,
                  amount: response.data.amount
                });
              }
            } else {
              $state.go('root.userCenter.account-overview');
            }
          } else {
            //$scope.errorMessage = response.msg;
            //$scope.warning = true;
            // $state.go('root.login');
            alert('预约error!')
          }
        });
      } else {
        // 非预约项目投资
        ProjectService.isAvailableInvest.get({
          amount:  project.amount,
          projectId: project.id
        }, function(response) {
          if (response.ret === 1) {
            if (response.data.flag) {
              if (response.data.isBalance) {
                $state.go('root.invest-verify', {
                  projectId: response.data.projectId,
                  amount: response.data.amount
                });
              } else {
                $state.go('root.invest-verify', {
                  projectId: response.data.projectId,
                  amount: response.data.amount
                });
              }
            } else {
              $state.go('root.userCenter.account-overview');
            }
          } else {
            //$scope.errorMessage = response.msg;
            //$scope.warning = true;
            // $state.go('root.login');
            alert('非预约')
          }
        });
      }
      
      
    };
    $rootScope.selectPage = $location.path().split('/')[1];


    $scope.tabs = [{
      title: '项目信息',
      // url: 'one.tpl.html'
    }, {
      title: '企业信息',
      // url: 'two.tpl.html'
    }, {
      title: '风控信息',
      // url: 'three.tpl.html'
    }, {
      title: '相关文件',
      // url: 'four.tpl.html'
    }, {
      title: '项目历程',
      // url: 'five.tpl.html'
    }];

    $scope.tabsRight = [{
      title: '投资记录',
      // url: 'one.tpl.html'
    }, {
      title: '还款计划',
      // url: 'two.tpl.html'
    }];

    $scope.switchTab = function(tabIndex) {
      $scope.activeTab = tabIndex;
      // $scope.currentTab = tab.url;
    };

    $scope.switchTabRight = function(tabIndexRight) {
      $scope.activeTabRight = tabIndexRight;
      // $scope.currentTab = tab.url;
    };

    // $scope.currentTab = 'one.tpl.html';

    // $scope.onClickTab = function (tab) {
    //     $scope.currentTab = tab.url;
    // }

    // $scope.isActiveTab = function(tabUrl) {
    //     return tabUrl == $scope.currentTab;
    // }

    $scope.image = 'images/test/0.png';
    var myOtherModal = $modal({
      scope: $scope,
      template: 'views/modal/modal-imageEnlarge.html',
      show: false
    });
    $scope.showModal = function(image) {
      $scope.targetImg = image;
      myOtherModal.$promise.then(myOtherModal.show);
    };

    // 处理推广流量统计
    var from = $stateParams.from;
    if (from) {
      ipCookie('utm_from', from, {
        expires: 1
      });
      MainService.trafficStats.get({
        from: from
      });
    }


  }]);

