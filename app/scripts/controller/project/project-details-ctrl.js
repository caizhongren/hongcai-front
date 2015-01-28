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
        $scope.categoryCode = $scope.project.categoryCode;
        if ($scope.categoryCode !== '04') {
          $scope.tabs = [{
            title: '项目信息',
          }, {
            title: '企业信息',
          }, {
            title: '风控信息',
          }, {
            title: '相关文件',
          }, {
            title: '项目历程',
          }];
        } else {
          $scope.tabs = [{
            title: '项目信息',
          }, {
            title: '企业信息',
          }, {
            title: '相关文件',
          }];
        }
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
    $scope.isAvailableInvest = function(project) { //验证用户权限
      if (project.amount <= $scope.project.minInvest) {
        // alert('投资金额必须大于最小投资金额' + $scope.project.minInvest + '！');
        // $scope.msg = '投资金额必须大于最小投资金额' + $scope.project.minInvest + '！';
        $scope.msg = '投资金额必须大于最小投资金额:100元！';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
        return;
      } else if (project.amount % $scope.project.increaseAmount) {
        // alert('投资金额必须为' + $scope.project.increaseAmount + '的整数倍！');
        $scope.msg = '投资金额必须为' + $scope.project.increaseAmount + '的整数倍！';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
        return;
      }
      ProjectService.isAvailableInvest.get({
        amount: project.amount,
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
          $state.go('root.login');
        }
      });
    };
    $rootScope.selectPage = $location.path().split('/')[1];

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

