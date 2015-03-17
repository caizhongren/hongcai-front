'use strict';
angular.module('hongcaiApp')
  .controller('InvestmentplanDetailsCtrl', ['$scope', '$state', '$rootScope', '$location', '$stateParams', 'ProjectService', 'OrderService', '$modal', '$alert', 'toaster', '$timeout', 'ipCookie', 'MainService', function($scope, $state, $rootScope, $location, $stateParams, ProjectService, OrderService, $modal, $alert, toaster, $timeout, ipCookie, MainService) {
    $rootScope.redirectUrl = $location.path();
    var number = $stateParams.number;
    if (!number) {
      $state.go('root.investmentplan-list');
    }
    ProjectService.getFundsProjectDetailByNumber.get({
      number: $stateParams.number
    }, function(response) {
      if (response.ret === 1) {
        // 宏金盈项目信息
        $scope.fundsProject = response.data.fundsProject;
        $scope.orderList = response.data.orderList;
        $scope.investorCount = response.data.investorCount;
        $scope.repeatCount = response.data.repeatCount;
        $scope.fundsProduct = response.data.fundsProduct;
        $scope.repaymentDate = moment(response.data.fundsProject.repaymentDate).format('YYYY年MM月DD日');
        $scope.releaseStartTime = moment(response.data.fundsProject.repaymentDate).format('YYYY年MM月DD日 HH:MM');
        $scope.fundsProjectInvestNum = $scope.fundsProject.total - ($scope.fundsProject.soldStock + $scope.fundsProject.occupancyStock) * $scope.fundsProject.increaseAmount;
        // 处理投资记录分页
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.data = [];
        $scope.fundsProject.isRepeatFlag = false;
        $scope.numberOfPages = function() {
          return Math.ceil($scope.data.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.orderList.length; i++) {
          $scope.orderList[i].id = (i + 1);
          $scope.data.push($scope.orderList[i]);
        }
        if ($scope.fundsProject.status === 1) {
          if ($rootScope.userCapital) {
            $scope.userCanFundsInvestNum = $scope.fundsProjectInvestNum > $rootScope.userCapital.balance ? $rootScope.userCapital.balance : $scope.fundsProjectInvestNum;
          } else {
            $scope.userCanCreditInvestNum = 0;
          }
          if ($rootScope.isLogged) {

            if ($rootScope.autoTransfer === 1) {
              // 预约用户
              $scope.invPlanFlag = 3;
            } else if ($rootScope.securityStatus.realNameAuthStatus === 1) {
              // 实名认证用户
              $scope.invPlanFlag = 2;
            } else {
              //开启普通用户
              $scope.invPlanFlag = 1;
            }
          } else {
            // 未登录
            $scope.invPlanFlag = 0;
          }
        } else {

        }
      } else {
        $state.go('root.investmentplan-list');
      }
    });

    // 跳到登录界面
    $scope.toRealLogin = function() {
      if (!$rootScope.isLogged) {
        $modal({
          scope: $scope,
          template: 'views/modal/modal-toLogin.html',
          show: true
        });
      }
    };
    // 完善资料第一代
    $scope.toRealNameAuth = function() {
      $alert({
        scope: $scope,
        template: 'views/modal/alert-perfectinformation.html',
        show: true
      });
    };
    // 跳到实名认证页面第二代
    $scope.toRealNameAuthPro = function() {
      if ($rootScope.securityStatus.realNameAuthStatus !== 1) {
        $modal({
          scope: $scope,
          template: 'views/modal/modal-toRealNameAuth.html',
          show: true
        });
      }
    };

    // 跳到自动投资页面
    $scope.toAutoTransfer = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/modal-toAutoTransfer.html',
        show: true
      });
    };
    // 跳到充值页面
    $scope.toRecharge = function() {
      if ($scope.invPlanFlag >= 2) {
        $modal({
          scope: $scope,
          template: 'views/modal/modal-toRecharge.html',
          show: true
        });
      } else {
        // 去实名
        $scope.toRealNameAuth();
      }
    };

    // 显示协议
    $scope.showAgreement = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/alert-toinvPlanAgreement.html',
        show: true
      });
    };

    $scope.showSecondAgreement = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/alert-toinvPlanSecondAgreement.html',
        show: true
      });
    };

    $scope.checkAutoTransfer = function(fundsProject) {
      if ($scope.invPlanFlag !== 3) {
        $scope.fundsProject.isRepeatFlag = false;
        fundsProject.isRepeatFlag = false;
        $scope.toAutoTransfer();
      }
    };

    // 检测input step
    $scope.checkStepAmount = function(fundsProject) {
      if (fundsProject.invPlanAmount >= fundsProject.increaseAmount) {
        if (fundsProject.invPlanAmount % fundsProject.increaseAmount === 0) {
          return false;
        } else {
          return true;
        }
      }
    };

    $scope.checkMinAmount = function(fundsProject) {
      if (fundsProject.invPlanAmount < fundsProject.minInvest) {
        return true;
      } else {
        return false;
      }
    };

    $scope.checkMaxAmount = function(fundsProject) {
      if (fundsProject.invPlanAmount > $scope.userCanFundsInvestNum) {
        return true;
      } else {
        return false;
      }
    };

    // 检测用户可投最高金额
    $scope.checkLargeUserCanAmount = function(fundsProject) {
      if ($rootScope.userCapital) {
        if ($rootScope.userCapital.balance < fundsProject.invPlanAmount) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    $scope.toInvest = function(fundsProject) {
      if (fundsProject.isRepeatFlag && $scope.invPlanFlag === 3) {
        $scope.isRepeat = 1;
      } else {
        $scope.isRepeat = 2;
      }
      $scope.invPlanAmount = fundsProject.invPlanAmount;
      if ($scope.invPlanFlag === 0) {
        $scope.toRealLogin();
      } else if ($scope.invPlanFlag === 1) {
        $scope.toRealNameAuth();
        // 跳到实名认证页面
      } else if ($scope.checkLargeUserCanAmount(fundsProject)) {
        $scope.toRecharge();
      } else if ($scope.invPlanFlag === 2 || $scope.invPlanFlag === 3) {
        ProjectService.isFundsAvailableInvest.get({
          amount: fundsProject.invPlanAmount,
          projectId: fundsProject.id,
          isRepeat: $scope.isRepeat
        }, function(response) {
          if (response.ret === 1) {
            $state.go('root.invplan-verify', {
              projectId: response.data.projectId,
              amount: response.data.amount,
              isRepeat: response.data.isRepeat
            });
          } else {
            if (response.code === -1027) {
              $scope.msg = '抱歉，已经卖光了。';
              $modal({
                scope: $scope,
                template: 'views/modal/alert-dialog.html',
                show: true
              });
            } else {
              $scope.msg = response.msg;
              $modal({
                scope: $scope,
                template: 'views/modal/alert-dialog.html',
                show: true
              });
            }
          }
        });
      }
    };
    $rootScope.selectPage = $location.path().split('/')[1];

    $scope.tabs = [{
      title: '计划简介',
    }, {
      title: '加入记录',
    }, {
      title: '计划进程',
    }, {
      title: '常见问题',
    }];
    $scope.toggle = {};
    $scope.toggle.switchTab = function(tabIndex) {
      $scope.toggle.activeTab = tabIndex;
    };

    // $scope.image = 'images/test/0.png';
    // var myOtherModal = $modal({
    //   scope: $scope,
    //   template: 'views/modal/modal-imageEnlarge.html',
    //   show: false
    // });
    // $scope.showModal = function(image) {
    //   $scope.targetImg = image;
    //   myOtherModal.$promise.then(myOtherModal.show);
    // };

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

    $scope.toLogin = function() {
      var thisUrl = $location.path();
      $location.path('/login').search({
        redirectUrl: thisUrl
      });
    };
  }]);
