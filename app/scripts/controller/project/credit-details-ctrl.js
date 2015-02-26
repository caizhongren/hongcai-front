'use strict';
angular.module('hongcaiApp')
  .controller('CreditDetailsCtrl', ['$scope', '$state', '$rootScope', '$location', '$stateParams', 'ProjectService', 'OrderService', '$modal', '$alert', 'toaster', '$timeout', 'ipCookie', 'MainService', function($scope, $state, $rootScope, $location, $stateParams, ProjectService, OrderService, $modal, $alert, toaster, $timeout, ipCookie, MainService) {
//     $rootScope.redirectUrl = $location.path();
//     $scope.chk = true;
//     $scope.checkFlag = true;
//     $scope.check = function(val) {
//       $scope.checkFlag = !val ? true : false;
//     };

//     $scope.getProjectDetails = function() {
//       var projectDetails = ProjectService.projectDetails.get({
//         number: $stateParams.number
//       }, function() {
//         if (projectDetails.ret === 1) {
//           $scope.statSecond = parseInt(projectDetails.data.countDownTime / 1000 + 1) || 1;
//           $scope.onTimeout = function() {
//             $scope.statSecond--;
//             mytimeout = $timeout($scope.onTimeout, 1000);
//             $scope.statDay = moment().startOf('month').seconds($scope.statSecond).format('DD') - 1 + '天,';
//             $scope.statTime = moment().startOf('month').seconds($scope.statSecond).format('HH时,mm分,ss秒');
//             if ($scope.statSecond === 0) {
//               ProjectService.projectDetails.get({
//                 number: $stateParams.number
//               }, function(response) {
//                 if (response.ret === 1) {
//                   $scope.project = response.data.project;
//                 }
//               });
//               window.location.reload();
//             }
//           };
//           var mytimeout = $timeout($scope.onTimeout, 1000);
//           $scope.$on('$stateChangeStart', function() {
//             $timeout.cancel(mytimeout);
//           });
//           $scope.project = projectDetails.data.project;
//           $scope.categoryCode = $scope.project.categoryCode;
//           if ($scope.categoryCode !== '04') {
//             $scope.tabs = [{
//               title: '项目信息',
//             }, {
//               title: '企业信息',
//             }, {
//               title: '风控信息',
//             }, {
//               title: '相关文件',
//             }, {
//               title: '项目历程',
//             }];
//           } else {
//             $scope.tabs = [{
//               title: '项目信息',
//             }, {
//               title: '企业信息',
//             }, {
//               title: '相关文件',
//             }];
//           }
//           $scope.repaymentDate = projectDetails.data.repaymentDate;

//           $scope.totalType = $scope.project.status === 11 && $scope.project.progress < 100 ? '可预约金额' : '可投金额';
//           // 项目可投金额
//           $scope.projectInvestNum = $scope.project.currentStock * $scope.project.increaseAmount;
//           // 用户可用金额
//           if ($rootScope.userCapital) {
//             if ($scope.project.status === 11) {
//               $scope.userCanInvestNum = $scope.project.reserveAmount > $rootScope.userCapital.balance * 10 ? $rootScope.userCapital.balance * 10 : $scope.project.reserveAmount;
//             } else {
//               $scope.userCanInvestNum = $scope.projectInvestNum > $rootScope.userCapital.balance ? $rootScope.userCapital.balance : $scope.projectInvestNum;
//             }
//           } else {
//             $scope.userCanInvestNum = 0;
//           }
//           $scope.projectInfo = projectDetails.data.projectInfo;
//           $scope.projectRank = projectDetails.data.projectRank;

//           // $scope.pledges = projectDetails.data.pledges;
//           $scope.isAvailable = projectDetails.data.isAvailable;
//           $scope.enterprise = projectDetails.data.enterprise;
//           $scope.orderList = projectDetails.data.orderList;
//           $scope.enterpriseThumbnailFileList = projectDetails.data.enterpriseThumbnailFileList;
//           $scope.enterpriseOriginalFileList = projectDetails.data.enterpriseOriginalFileList;
//           $scope.contractOriginalFileList = projectDetails.data.contractOriginalFileList;
//           $scope.contractThumbnailFileList = projectDetails.data.contractThumbnailFileList;
//           $scope.preRepaymentList = projectDetails.data.preRepaymentList;
//           $scope.billCount = projectDetails.data.billCount;
//           $scope.remainInterest = projectDetails.data.remainInterest;
//           $scope.remainPrincipal = projectDetails.data.remainPrincipal;
//           $scope.baseFileUrl = projectDetails.data.baseFileUrl;
//           // 处理投资记录分页
//           $scope.currentPage = 0;
//           $scope.pageSize = 10;
//           $scope.data = [];

//           $scope.numberOfPages = function() {
//             return Math.ceil($scope.data.length / $scope.pageSize);
//           };
//           for (var i = 0; i < $scope.orderList.length; i++) {
//             $scope.data.push($scope.orderList[i]);
//           }
//         } else if (projectDetails.code === -1054) {
//           $state.go('root.project-list-query-no');
//         } else {
//           toaster.pop('warning', projectDetails.msg);
//         }
//       });
//     };
//     $scope.getProjectDetails();
//     $scope.finished = function() {
//       ProjectService.projectDetails.get({
//         projectId: $stateParams.projectId
//       }, function(response) {
//         if (response.ret === 1) {
//           $scope.project = response.data.project;
//         }
//         // 刷新页面
//         if ($scope.statSecond === 0) {
//           window.location.reload();
//         }
//       });
//     };
//     $scope.Alertdata = function() {
//       $alert({
//         scope: $scope,
//         template: 'views/modal/alert-perfectinformation.html',
//         show: true
//       });
//     };

//     $scope.getReserveRecords = function() {
//       ProjectService.getReserveRecords.get({
//         number: $stateParams.number
//       }, function(response) {
//         if (response.ret === 1) {
//           $scope.reserveData = response.data;
//           $scope.reserveOrders = response.data.reserveOrders;
//           $scope.singleReserveCounts = $scope.reserveOrders.length;
//           for (var i = 0; i < $scope.singleReserveCounts; i++) {
//             var $index = $scope.reserveOrders[i].status;
//             $scope.reserveOrders[i].statusTxt = response.data.statusMap[$index];
//           }
//         }
//       });
//     };

//     $scope.getReserveRecords();

//     //获取预约收益
//     $scope.getProfit = function(project) {
//       if ($rootScope.autoTransfer !== 1) {
//         $scope.msg = '需要完成自动投标授权，请到安全中心设置中授权。';
//         $alert({
//           scope: $scope,
//           template: 'views/modal/alert-autoTransfer.html',
//           show: true
//         });
//         return;
//       }
//       $scope.alert = {
//         toReserveAmount: project.toReserveAmount
//       };
//       if ($scope.checkFlag) {
//         if (project.toReserveAmount > $scope.userCanInvestNum) {
//           $scope.msg = $scope.project.reserveAmount > $rootScope.userCapital.balance * 10 ? '您输入的金额高于可用余额！' : '您输入的金额高于可预约金额！';
//           $alert({
//             scope: $scope,
//             template: 'views/modal/alert-dialog.html',
//             show: true
//           });
//         } else {
//           ProjectService.getProfit.get({
//             reserveAmount: project.toReserveAmount,
//             projectId: project.id
//           }, function(response) {
//             if (response.ret === 1) {
//               $scope.reserveProfit = response.data.reserveProfit;
//               $alert({
//                 scope: $scope,
//                 template: 'views/modal/alert-reserve-success.html',
//                 show: true
//               });

//             } else {
//               $scope.msg = response.msg;
//               $alert({
//                 scope: $scope,
//                 template: 'views/modal/alert-dialog.html',
//                 show: true
//               });
//             }
//           });
//         }

//       } else {
//         $scope.msg = '您还没有同意《项目预约规则》';
//         $alert({
//           scope: $scope,
//           template: 'views/modal/alert-dialog.html',
//           show: true
//         });
//         return;
//       }
//     };

//     $scope.toInvest = function(project) { //验证用户权限
//       if (project.inviteMobile) {
//         $rootScope.inviteMobile = project.inviteMobile;
//       }
//       $scope.amount = project.status === 11 ? project.toReserveAmount : project.amount;
//       if ($scope.amount <= $scope.project.minInvest) {
//         // alert('投资金额必须大于最小投资金额' + $scope.project.minInvest + '！');
//         // $scope.msg = '投资金额必须大于最小投资金额' + $scope.project.minInvest + '！';
//         $scope.msg = '投资金额必须大于最小投资金额:100元！';
//         $alert({
//           scope: $scope,
//           template: 'views/modal/alert-dialog.html',
//           show: true
//         });
//         return;
//       } else if ($scope.amount % $scope.project.increaseAmount) {
//         // alert('投资金额必须为' + $scope.project.increaseAmount + '的整数倍！');
//         $scope.msg = '投资金额必须为' + $scope.project.increaseAmount + '的整数倍！';
//         $alert({
//           scope: $scope,
//           template: 'views/modal/alert-dialog.html',
//           show: true
//         });
//         return;
//       }

//       if (project.status === 11) {
//         // 预约项目投资
//         ProjectService.reserve.get({
//           reserveAmount: project.toReserveAmount,
//           projectId: project.id,
//           inviteMobile: project.inviteMobile
//         }, function(response) {
//           if (response.ret === 1) {
//             angular.element('.alert').remove();
//             angular.element('.mask_layer').remove();
//             var balance = $rootScope.userCapital.balance;
//             $rootScope.userCapital.balance = balance - (project.toReserveAmount / 10);
//             $scope.getProjectDetails(); //更新投资模块
//             $scope.getReserveRecords(); //更新预约记录
//           } else {
//             $scope.msg = response.msg;
//             $alert({
//               scope: $scope,
//               template: 'views/modal/alert-dialog.html',
//               show: true
//             });
//           }
//         });
//       } else {
//         // 非预约项目投资
//         ProjectService.isAvailableInvest.get({
//           amount: project.amount,
//           projectId: project.id
//         }, function(response) {
//           if (response.ret === 1) {
//             if (response.data.flag) {
//               if (response.data.isBalance) {
//                 $state.go('root.invest-verify', {
//                   projectId: response.data.projectId,
//                   amount: response.data.amount
//                 });
//               } else {
//                 $state.go('root.invest-verify', {
//                   projectId: response.data.projectId,
//                   amount: response.data.amount
//                 });
//               }
//             } else {
//               $state.go('root.userCenter.account-overview');
//             }
//           } else {
//             $scope.msg = response.msg;
//             $alert({
//               scope: $scope,
//               template: 'views/modal/alert-dialog.html',
//               show: true
//             });
//           }
//         });
//       }


//     };
    //假数据
    $scope.project = {
      'progress' : 10 ,
      'increaseAmount' : 100
    }
    $scope.securityStatus = {
      'mobileStatus' : 1,
      'realNameAuthStatus' : 1,
      'emailStatus' : 1
    }

    $rootScope.selectPage = $location.path().split('/')[1];

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


    $scope.tabsRight = [{
      title: '投资记录',
    }, {
      title: '还款计划',
    }];

    $scope.tabsRightReserve = [{
      title: '当前预约',
    }, {
      title: '我的预约记录',
    }];

    $scope.switchTab = function(tabIndex) {
      $scope.activeTab = tabIndex;
    };

    $scope.switchTabRight = function(tabIndexRight) {
      $scope.activeTabRight = tabIndexRight;
    };

    $scope.switchTabRightReserve = function(tabIndexRightReserve) {
      $scope.activeTabRightReserve = tabIndexRightReserve;
    };

//     $scope.image = 'images/test/0.png';
//     var myOtherModal = $modal({
//       scope: $scope,
//       template: 'views/modal/modal-imageEnlarge.html',
//       show: false
//     });
//     $scope.showModal = function(image) {
//       $scope.targetImg = image;
//       myOtherModal.$promise.then(myOtherModal.show);
//     };

//     // 处理推广流量统计
//     var from = $stateParams.from;
//     if (from) {
//       ipCookie('utm_from', from, {
//         expires: 1
//       });
//       MainService.trafficStats.get({
//         from: from
//       });
//     }

    $scope.toLogin = function() {
      var thisUrl = $location.path();
      $location.path('/login').search({
        redirectUrl: thisUrl
      });
    };
  }]);