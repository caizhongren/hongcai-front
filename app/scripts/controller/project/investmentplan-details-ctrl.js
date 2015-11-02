'use strict';
angular.module('hongcaiApp')
  .controller('InvestmentplanDetailsCtrl', ['$scope', '$state', '$rootScope', '$location', '$stateParams', 'ProjectService', 'OrderService', '$modal', '$alert', 'toaster', '$timeout', 'ipCookie', 'MainService', 
    function($scope, $state, $rootScope, $location, $stateParams, ProjectService, OrderService, $modal, $alert, toaster, $timeout, ipCookie, MainService) {
    
    // $rootScope.redirectUrl = $location.path();

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
        console.info($scope.fundsProject);
        $scope.orderList = response.data.orderList;
        $scope.investorCount = response.data.investorCount;
        $scope.repeatCount = response.data.repeatCount;
        $scope.fundsProduct = response.data.fundsProduct;
        $scope.fundsProject.product = $scope.fundsProduct;
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
        // 当status===1可融资状态的时候，判断invPlanFlag的状态。0：未登录，1：普通用户，2：实名用户，3：开启自动投资用户。
        if ($scope.fundsProject.status === 1) {
          $scope.initInvPlanFlag();
          // if ($rootScope.isLogged) {
          //   if ($rootScope.autoTransfer === 1) {
          //     $scope.invPlanFlag = 3;
          //   } else if ($rootScope.securityStatus.realNameAuthStatus === 1) {
          //     $scope.invPlanFlag = 2;
          //   } else {
          //     $scope.invPlanFlag = 1;
          //   }
          // } else {
          //   $scope.invPlanFlag = 0;
          // }
        } else {
          console.log('other status flag..');
        }
      } else {
        $state.go('root.investmentplan-list');
      }
    });

    //初始化 invPlanFlag的状态。0：未登录，1：普通用户，2：实名用户，3：开启自动投资用户。
    $scope.initInvPlanFlag = function(){
      if ($rootScope.account) {
          $scope.userCanFundsInvestNum = $scope.fundsProjectInvestNum > $rootScope.account.balance ? $rootScope.account.balance : $scope.fundsProjectInvestNum;
          // switch > if
          var plusFlag = $rootScope.securityStatus.realNameAuthStatus + $rootScope.autoTransfer;
          switch (plusFlag) {
          case 2:
            $scope.invPlanFlag = 3;
            break;
          case 1:
            $scope.invPlanFlag = 2;
            break;
          case 0:
            $scope.invPlanFlag = 1;
            break;
          }
        } else {
          $scope.userCanCreditInvestNum = 0;
          $scope.invPlanFlag = 0;
        }
    }

    // 弹出登录弹层
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

    
    // 显示零存宝协议
    $scope.showCurrentDepositAgreement = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/alert-current-deposit-toinvPlanAgreement.html',
        show: true
      });
    };

    // 显示协议
    $scope.showAgreement = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/alert-toinvPlanAgreement.html',
        show: true
      });
    };
    // 显示第二个协议(未使用)
    $scope.showSecondAgreement = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/alert-toinvPlanSecondAgreement.html',
        show: true
      });
    };
    // 判断是否可以充值。
    $scope.checkAutoTransfer = function(fundsProject) {
      if ($scope.invPlanFlag !== 3) {
        $scope.fundsProject.isRepeatFlag = false;
        fundsProject.isRepeatFlag = false;
        $scope.toAutoTransfer();
      }
    };

    $scope.repeatCheckFlag = false;
    // 检测input step
    $scope.checkStepAmount = function(fundsProject) {
      if (fundsProject.invPlanAmount >= fundsProject.increaseAmount) {
        if (fundsProject.invPlanAmount % fundsProject.increaseAmount === 0) {
          $scope.repeatCheckFlag = $rootScope.account.experienceAmount >= fundsProject.invPlanAmount ? true : false;
          return false;
        } else {
          return true;
        }
      }
    };
    // 检测Input最小额度
    $scope.checkMinAmount = function(fundsProject) {
      if (fundsProject.invPlanAmount < fundsProject.minInvest) {
        return true;
      } else {
        return false;
      }
    };
    // 检测Input最大额度
    $scope.checkMaxAmount = function(fundsProject) {
      if (fundsProject.invPlanAmount > $scope.userCanFundsInvestNum) {
        return true;
      } else {
        return false;
      }
    };

    // 检测用户可投最高金额
    $scope.checkLargeUserCanAmount = function(fundsProject) {
      if ($rootScope.account) {
        var availableAmount = fundsProject.product.type !== 1 ? $rootScope.account.balance : $rootScope.account.balance + $rootScope.account.experienceAmount;
        if (availableAmount < fundsProject.invPlanAmount) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    // 投资
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

    var urlTab = $stateParams.tab;
    if(urlTab == '加入记录'){
      $scope.tab = $scope.tabs[1];
      $timeout(function(){
        $scope.toggle.switchTab(1);
      }, 1000);
      
    }

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
