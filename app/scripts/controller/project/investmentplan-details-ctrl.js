'use strict';
angular.module('hongcaiApp')
  .controller('InvestmentplanDetailsCtrl', ['$scope', '$state', '$rootScope', '$location', '$stateParams', 'ProjectService', 'OrderService', '$modal', '$alert', 'toaster', '$timeout', 'ipCookie', 'MainService', function($scope, $state, $rootScope, $location, $stateParams, ProjectService, OrderService, $modal, $alert, toaster, $timeout, ipCookie, MainService) {
    $rootScope.redirectUrl = $location.path();
    var number = $stateParams.number;
    if (!number) {
      $state.go('root.invstmentplan-list-query-no');
    }
    ProjectService.getFundsProjectDetailByNumber.get({
      number: $stateParams.number
    }, function(response) {
      if (response.ret === 1) {
        // 宏金盈项目信息
        $scope.fundsProject = response.data.fundsProject;
        $scope.orderList = response.data.orderList;
        $scope.fundsProduct = response.data.fundsProduct;
        $scope.releaseEndTime = moment(response.data.fundsProject.releaseEndTime).format('YYYY年MM月DD日');
        $scope.fundsProjectInvestNum = $scope.fundsProject.total - ($scope.fundsProject.soldStock + $scope.fundsProject.occupancyStock) * $scope.fundsProject.increaseAmount;
        // 处理投资记录分页
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.data = [];
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
            if ($rootScope.securityStatus.realNameAuthStatus === 1) {
              // 实名认证用户
              $scope.invPlanFlag = 2;
            } else if ($rootScope.securityStatus.autoTransfer === 1){
              // 预约用户
              $scope.invPlanFlag = 3;
            } else {
              //开启普通用户
              $scope.invPlanFlag = 1;
            }
          } else {
            // 未登录
            $scope.invPlanFlag = 0;
          }
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

    // 跳到授权页面
    $scope.toAutoTransfer = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/modal-toAutoTransfer.html',
        show: true
      });
    };
    // 跳到充值页面
    $scope.toRecharge = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/modal-toRecharge.html',
        show: true
      });
    };

    // 显示协议
    $scope.showAgreement = function() {

    };

    // 检测input step
    $scope.checkStepAmount = function(fundsProject) {
      if (fundsProject.invPlanAmount >= 100) {
        if (fundsProject.invPlanAmount % 100 === 0) {
          return false;
        } else {
          return true;
        }
      }
    };

    // 检测用户可投最高金额
    $scope.checkLargeUserCanAmount = function(fundsProject) {
      if ($rootScope.userCapital.balance < fundsProject.invPlanAmount) {
        return true;
      } else {
        return false;
      }
    };

    $scope.toInvest = function(fundsProject) {
      if (fundsProject.isRepeatFlag) {
        $scope.isRepeat = 1;
      } else {
        $scope.isRepeat = 2;
      }
      $scope.invPlanAmount = fundsProject.invPlanAmount;
      if($scope.invPlanFlag === 0) {
        $scope.toRealLogin();
      } else if ($scope.invPlanFlag === 1) {
        $scope.toRealNameAuth();
        // 跳到实名认证页面
      } else if ($scope.invPlanFlag === 2 || $scope.invPlanFlag === 3) {
        ProjectService.isFundsAvailableInvest.get({
          amount: fundsProject.invPlanAmount,
          projectId: fundsProject.id,
          isRepeat: $scope.isRepeat
        }, function(response) {
          if (response.ret === 1) {
            $state.go('root.invplan-verify', { projectId: response.data.projectId, amount: response.data.amount, isRepeat: response.data.isRepeat });
          } else  {

          }

        });
      }
    };







    // $scope.chk = true;
    // $scope.checkFlag = true;
    // $scope.check = function(val) {
    //   $scope.checkFlag = !val ? true : false;
    // };

    // $scope.getProjectDetails = function() {
    //   var projectDetails = ProjectService.projectDetails.get({
    //     number: $stateParams.number
    //   }, function() {
    //     if (projectDetails.ret === 1) {
    //       $scope.statSecond = parseInt(projectDetails.data.countDownTime / 1000 + 1) || 1;
    //       $scope.onTimeout = function() {
    //         $scope.statSecond--;
    //         mytimeout = $timeout($scope.onTimeout, 1000);
    //         $scope.statDay = moment().startOf('month').seconds($scope.statSecond).format('DD') - 1 + '天,';
    //         $scope.statTime = moment().startOf('month').seconds($scope.statSecond).format('HH时,mm分,ss秒');
    //         if ($scope.statSecond === 0) {
    //           ProjectService.projectDetails.get({
    //             number: $stateParams.number
    //           }, function(response) {
    //             if (response.ret === 1) {
    //               $scope.project = response.data.project;
    //             }
    //           });
    //           window.location.reload();
    //         }
    //       };
    //       var mytimeout = $timeout($scope.onTimeout, 1000);
    //       $scope.$on('$stateChangeStart', function() {
    //         $timeout.cancel(mytimeout);
    //       });
    //       $scope.project = projectDetails.data.project;
    //       $scope.categoryCode = $scope.project.categoryCode;
    //       if ($scope.categoryCode !== '04' && $scope.categoryCode !== '05' && $scope.categoryCode !== '06') {
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
    //       } else {
    //         $scope.tabs = [{
    //           title: '计划简介',
    //         }, {
    //           title: '加入记录',
    //         }, {
    //           title: '计划进程',
    //         }, {
    //           title: '常见问题',
    //         }];
    //       }
    //       $scope.repaymentDate = projectDetails.data.repaymentDate;

    //       $scope.totalType = $scope.project.status === 11 && $scope.project.progress < 100 ? '可预约金额' : '可投金额';
    //       // 项目可投金额
    //       $scope.projectInvestNum = $scope.project.currentStock * $scope.project.increaseAmount;
    //       // 用户可用金额
    //       if ($rootScope.userCapital) {
    //         if ($scope.project.status === 11) {
    //           $scope.userCanInvestNum = $scope.project.reserveAmount > $rootScope.userCapital.balance * 10 ? $rootScope.userCapital.balance * 10 : $scope.project.reserveAmount;
    //         } else {
    //           $scope.userCanInvestNum = $scope.projectInvestNum > $rootScope.userCapital.balance ? $rootScope.userCapital.balance : $scope.projectInvestNum;
    //         }
    //       } else {
    //         $scope.userCanInvestNum = 0;
    //       }
    //       $scope.projectInfo = projectDetails.data.projectInfo;
    //       $scope.projectRank = projectDetails.data.projectRank;

    //       // $scope.pledges = projectDetails.data.pledges;
    //       $scope.isAvailable = projectDetails.data.isAvailable;
    //       $scope.enterprise = projectDetails.data.enterprise;
    //       $scope.orderList = projectDetails.data.orderList;
    //       $scope.enterpriseThumbnailFileList = projectDetails.data.enterpriseThumbnailFileList;
    //       $scope.enterpriseOriginalFileList = projectDetails.data.enterpriseOriginalFileList;
    //       $scope.contractOriginalFileList = projectDetails.data.contractOriginalFileList;
    //       $scope.contractThumbnailFileList = projectDetails.data.contractThumbnailFileList;
    //       $scope.preRepaymentList = projectDetails.data.preRepaymentList;
    //       $scope.billCount = projectDetails.data.billCount;
    //       $scope.remainInterest = projectDetails.data.remainInterest;
    //       $scope.remainPrincipal = projectDetails.data.remainPrincipal;
    //       $scope.baseFileUrl = projectDetails.data.baseFileUrl;
    //       // 处理投资记录分页
    //       $scope.currentPage = 0;
    //       $scope.pageSize = 10;
    //       $scope.data = [];

    //       $scope.numberOfPages = function() {
    //         return Math.ceil($scope.data.length / $scope.pageSize);
    //       };
    //       for (var i = 0; i < $scope.orderList.length; i++) {
    //         $scope.data.push($scope.orderList[i]);
    //       }
    //     } else if (projectDetails.code === -1054) {
    //       $state.go('root.project-list-query-no');
    //     } else {
    //       toaster.pop('warning', projectDetails.msg);
    //     }
    //   });
    // };
    // $scope.getProjectDetails();
    // // $scope.currentAmount = $scope.project.currentStock * $scope.project.increaseAmount
    // /*$scope.statDate = new Date('2014', '10', '21', '20','17','10');*/ //假数据
    // $scope.finished = function() {
    //   ProjectService.projectDetails.get({
    //     projectId: $stateParams.projectId
    //   }, function(response) {
    //     if (response.ret === 1) {
    //       $scope.project = response.data.project;
    //     }
    //     // 刷新页面
    //     if ($scope.statSecond === 0) {
    //       window.location.reload();
    //     }
    //   });
    // };
    // $scope.Alertdata = function() {
    //   $alert({
    //     scope: $scope,
    //     template: 'views/modal/alert-perfectinformation.html',
    //     show: true
    //   });
    // };

    // $scope.getReserveRecords = function() {
    //   ProjectService.getReserveRecords.get({
    //     number: $stateParams.number
    //   }, function(response) {
    //     if (response.ret === 1) {
    //       $scope.reserveData = response.data;
    //       $scope.reserveOrders = response.data.reserveOrders;
    //       $scope.singleReserveCounts = $scope.reserveOrders.length;
    //       for (var i = 0; i < $scope.singleReserveCounts; i++) {
    //         var $index = $scope.reserveOrders[i].status;
    //         $scope.reserveOrders[i].statusTxt = response.data.statusMap[$index];
    //       }
    //     }
    //   });
    // };

    // $scope.getReserveRecords();

    // //获取预约收益
    // $scope.getProfit = function(project) {
    //   if ($rootScope.autoTransfer !== 1) {
    //     $scope.msg = '需要完成自动投标授权，请到安全中心设置中授权。';
    //     $alert({
    //       scope: $scope,
    //       template: 'views/modal/alert-autoTransfer.html',
    //       show: true
    //     });
    //     return;
    //   }
    //   $scope.alert = {
    //     toReserveAmount: project.toReserveAmount
    //   };
    //   if ($scope.checkFlag) {
    //     if (project.toReserveAmount > $scope.userCanInvestNum) {
    //       $scope.msg = $scope.project.reserveAmount > $rootScope.userCapital.balance * 10 ? '您输入的金额高于可用余额！' : '您输入的金额高于可预约金额！';
    //       $alert({
    //         scope: $scope,
    //         template: 'views/modal/alert-dialog.html',
    //         show: true
    //       });
    //     } else {
    //       ProjectService.getProfit.get({
    //         reserveAmount: project.toReserveAmount,
    //         projectId: project.id
    //       }, function(response) {
    //         if (response.ret === 1) {
    //           $scope.reserveProfit = response.data.reserveProfit;
    //           $alert({
    //             scope: $scope,
    //             template: 'views/modal/alert-reserve-success.html',
    //             show: true
    //           });

    //         } else {
    //           $scope.msg = response.msg;
    //           $alert({
    //             scope: $scope,
    //             template: 'views/modal/alert-dialog.html',
    //             show: true
    //           });
    //         }
    //       });
    //     }

    //   } else {
    //     $scope.msg = '您还没有同意《项目预约规则》';
    //     $alert({
    //       scope: $scope,
    //       template: 'views/modal/alert-dialog.html',
    //       show: true
    //     });
    //     return;
    //   }
    // };

    // $scope.toInvest = function(project) { //验证用户权限
    //   if (project.inviteMobile) {
    //     $rootScope.inviteMobile = project.inviteMobile;
    //   }
    //   $scope.amount = project.status === 11 ? project.toReserveAmount : project.amount;
    //   if ($scope.amount <= $scope.project.minInvest) {
    //     // alert('投资金额必须大于最小投资金额' + $scope.project.minInvest + '！');
    //     // $scope.msg = '投资金额必须大于最小投资金额' + $scope.project.minInvest + '！';
    //     $scope.msg = '投资金额必须大于最小投资金额:100元！';
    //     $alert({
    //       scope: $scope,
    //       template: 'views/modal/alert-dialog.html',
    //       show: true
    //     });
    //     return;
    //   } else if ($scope.amount % $scope.project.increaseAmount) {
    //     // alert('投资金额必须为' + $scope.project.increaseAmount + '的整数倍！');
    //     $scope.msg = '投资金额必须为' + $scope.project.increaseAmount + '的整数倍！';
    //     $alert({
    //       scope: $scope,
    //       template: 'views/modal/alert-dialog.html',
    //       show: true
    //     });
    //     return;
    //   }

    //   if (project.status === 11) {
    //     // 预约项目投资
    //     ProjectService.reserve.get({
    //       reserveAmount: project.toReserveAmount,
    //       projectId: project.id,
    //       inviteMobile: project.inviteMobile
    //     }, function(response) {
    //       if (response.ret === 1) {
    //         angular.element('.alert').remove();
    //         angular.element('.mask_layer').remove();
    //         var balance = $rootScope.userCapital.balance;
    //         $rootScope.userCapital.balance = balance - (project.toReserveAmount / 10);
    //         $scope.getProjectDetails(); //更新投资模块
    //         $scope.getReserveRecords(); //更新预约记录
    //       } else {
    //         $scope.msg = response.msg;
    //         $alert({
    //           scope: $scope,
    //           template: 'views/modal/alert-dialog.html',
    //           show: true
    //         });
    //       }
    //     });
    //   } else {
    //     // 非预约项目投资
    //     ProjectService.isAvailableInvest.get({
    //       amount: project.amount,
    //       projectId: project.id
    //     }, function(response) {
    //       if (response.ret === 1) {
    //         if (response.data.flag) {
    //           if (response.data.isBalance) {
    //             $state.go('root.invest-verify', {
    //               projectId: response.data.projectId,
    //               amount: response.data.amount
    //             });
    //           } else {
    //             $state.go('root.invest-verify', {
    //               projectId: response.data.projectId,
    //               amount: response.data.amount
    //             });
    //           }
    //         } else {
    //           $state.go('root.userCenter.account-overview');
    //         }
    //       } else {
    //         $scope.msg = response.msg;
    //         $alert({
    //           scope: $scope,
    //           template: 'views/modal/alert-dialog.html',
    //           show: true
    //         });
    //       }
    //     });
    //   }


    // };
    // $rootScope.selectPage = $location.path().split('/')[1];

    // $scope.tabsRight = [{
    //   title: '投资记录',
    //   // url: 'one.tpl.html'
    // }, {
    //   title: '还款计划',
    //   // url: 'two.tpl.html'
    // }];

    // $scope.tabsRightReserve = [{
    //   title: '当前预约',
    //   // url: 'one.tpl.html'
    // }, {
    //   title: '我的预约记录',
    //   // url: 'two.tpl.html'
    // }];

    // /*$scope.switchTab = function(tabIndex) {
    //   $scope.activeTab = tabIndex;
    //   // $scope.currentTab = tab.url;
    // };*/
    $scope.tabs = [{
      title: '计划简介',
    }, {
      title: '项目历程',
    }, {
      title: '投资记录',
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

    // // 处理推广流量统计
    // var from = $stateParams.from;
    // if (from) {
    //   ipCookie('utm_from', from, {
    //     expires: 1
    //   });
    //   MainService.trafficStats.get({
    //     from: from
    //   });
    // }


    // $scope.toLogin = function() {
    //   var thisUrl = $location.path();
    //   $location.path('/login').search({
    //     redirectUrl: thisUrl
    //   });
    // };
  }]);
