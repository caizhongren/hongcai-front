'use strict';
angular.module('hongcaiApp')
  .controller('ProjectDetailsCtrl', function($scope, $interval, $state, $rootScope, $location, $stateParams, ProjectUtils, UserCenterService, ProjectService, OrderService, $modal, $alert, toaster, $timeout, ipCookie,

    MainService, DateUtils, AboutUsService, projectStatusMap, config, $window, DEFAULT_DOMAIN, RESTFUL_DOMAIN) {
    // $rootScope.toActivate();
    $scope.type =  $stateParams.type;
    $scope.chk = true;
    $scope.checkFlag = true;
    $scope.templateType = '';
    $scope.check = function(val) {
      $scope.checkFlag = !val ? true : false;
    };

    $scope.projectStatusMap = projectStatusMap;
    $scope.newbieBiaoInvestFlag = true;
    /**
     * 用户可使用的券
     */
    $scope.couponLists = function (investAmount) {
      if (investAmount >= $scope.availableAmount) {
        return
      }
      ProjectService.coupons.get({
        investAmount: investAmount,
        userId: 0,
        number: $stateParams.number
      }, function (response) {
        if (response && response.ret !== -1) {
          $scope.coupons = response.data
          welfares ? $scope.addWelfaresRate(investAmount) : null
        }
      })
    }
    var welfares = null
    $rootScope.isLogged ? ProjectService.welfares.get({
      onlyUserLevel: 1,
      userId: 0
    }, function (response) {
      if (response && response.data != '') {
        var level = response.data[0].level;
        $scope.welfaresLevel = '';
        switch(level){
          case 1:
            $scope.welfaresLevel = '普通';
            break;
          case 2:
            $scope.welfaresLevel = '青铜';
            break;
          case 3:
            $scope.welfaresLevel = '白银';
            break;
          case 4:
            $scope.welfaresLevel = '黄金';
            break;
          case 5:
            $scope.welfaresLevel = '铂金';
            break;
          case 6:
            $scope.welfaresLevel = '钻石';
            break;
        }
        5 == $scope.type ? welfares = response.data[0].welfareRules[0] : welfares = response.data[0].welfareRules[1]
      }
    }) : null
    // 指定排序的比较函数
    function compare(property){
      return function(obj1,obj2){
          var value1 = obj1[property];
          var value2 = obj2[property];
          return value2 - value1;
      }
    }
    $scope.addWelfaresRate = function (investAmount) {
      var profit = null
          $scope.coupons.push(welfares)
          for (var i = 0; i < $scope.coupons.length; i++) {
            if ($scope.coupons[i].type == 1) {
              profit = investAmount * $scope.coupons[i].value * $scope.project.projectDays / 36500
              $scope.coupons[i].profit = profit
            } else if ($scope.coupons[i].type == 2) {
              $scope.coupons[i].profit = $scope.coupons[i].value
            } else {
              profit = investAmount * $scope.coupons[i].amount * $scope.project.projectDays / 36500
              $scope.coupons[i].profit = profit
            }
          }
          $scope.coupons.sort(compare("profit"))
          $scope.selectedCoupon = $scope.coupons[0];
          $scope.increaseProfit = 0;
          if($scope.selectedCoupon !== undefined){
            if ($scope.selectedCoupon.type === 1) {
              $scope.increaseProfit = $scope.calcProfit($scope.selectedCoupon.value);
            } else if ($scope.selectedCoupon.type === 2) {
              $scope.increaseProfit = investAmount < $scope.selectedCoupon.minInvestAmount ? 0 : $scope.selectedCoupon.value;
            } else {
              $scope.increaseProfit = $scope.calcProfit($scope.selectedCoupon.amount);
            }
          }
    }
    $scope.investCoupons = function(project) {
      $scope.coupons = [];
      $scope.availableAmount = project.total - project.soldStock * project.increaseAmount;
      if (!$rootScope.isLogged || $scope.availableAmount <= 0) {
        return;
      }
      ProjectService.investCoupons.get({
        projectId: project.id,
        amount: $scope.availableAmount
      }, function(response) {
        if (response && response.ret !== -1) {
          $scope.coupons = response;
          welfares ? $scope.addWelfaresRate($scope.availableAmount) : null
          $scope.selectedCoupon = $scope.coupons[0];
          for (var i = 0; i < $scope.coupons.length; i++) {
            if ($scope.rateType === '' && $scope.cashType === '') {
              $scope.selectedCoupon = $scope.coupons[0];
            }
            if ($scope.rateNum == $scope.coupons[i].number || $scope.cashNum == $scope.coupons[i].number) {
              $scope.selectedCoupon = $scope.coupons[i];
            }
          }
        }
      });
    }
    /**
     * 展示和关闭可选择的券
     */
    $scope.showCoupons = false;
    $scope.checkeCoupon = function() {
        if ($scope.coupons.length > 0) {
          $scope.showCoupons = !$scope.showCoupons;
        }
      }
      /**
       * 选择券
       */
    $scope.showSelectCoupon = false;
    $scope.selectCoupon = function(coupon) {
      $scope.showSelectCoupon = false;
      $scope.selectedCoupon = coupon;
      $scope.validateAmountAndCoupon($scope.project.amount, coupon);
    }

    /**
     * 不选择券
     */
    $scope.unUseCoupon = function() {
      $scope.selectedCoupon = null;
      $scope.validateAmountAndCoupon($scope.project.amount, $scope.selectedCoupon);
    }


    /**
     * 记录项目来源
     */
    $scope.cashNum = ipCookie('cashNum') || '';
    $scope.cashType = ipCookie('cashType') || '';
    $scope.rateNum = ipCookie('rateNum') || '';
    $scope.rateType = ipCookie('rateType') || '';
    /**
     * 获取具体某项目
     */
    $scope.getProjectDetails = function() {
      var projectDetails = ProjectService.projectDetails.get({
        number: $stateParams.number
      }, function() {
        if (projectDetails && projectDetails.ret === 1) {
          $rootScope.pageTitle = projectDetails.data.project.name + ' - 宏财网';
          $scope.project = projectDetails.data.project;
          $scope.repaymentTypeMap = projectDetails.data.repaymentTypeMap;
          /**
           * 预发布倒计时
           */
          var serverTime = projectDetails.data.serverTime;
          ProjectUtils.projectTimedown($scope.project, serverTime);
          $scope.categoryCode = projectDetails.data.category.code;

          if ($scope.categoryCode === '0112') {
            /**
             * 请求判断用户是否可以投资新手标
             */
            ProjectService.investNewbieBiaoProjectVerify.get({
              number: $stateParams.number
            }, function(response) {
              if (response.ret === -1) {
                return;
              }

              $scope.newbieBiaoInvestFlag = response.isOk;
              if (!$scope.newbieBiaoInvestFlag) {
                $scope.newbieBiaoErrorMsg = '该项目仅限用户首次投资后一周内参与';
              }
            });
          }

          if ($scope.categoryCode === '0113' || $scope.categoryCode === '0114') {
            $scope.tabs = [{
              title: '项目信息',
            }, {
              title: '企业信息',
            }, {
              title: '相关文件',
            }];
          } else if ($scope.categoryCode === '0115' || $scope.categoryCode === '0119') {
            $scope.tabs = [{
              title: '项目信息',
            }, {
              title: '相关文件',
            }, {
              title: '项目历程',
            }];
          } else if ($scope.categoryCode === '0112' || $scope.categoryCode === '0116') {
            $scope.tabs = [{
              title: '项目信息',
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
              title: '风控信息',
            }, {
              title: '相关文件',
            }, {
              title: '项目历程',
            }];
          }

          $scope.repaymentDate = projectDetails.data.repaymentDate;
          $scope.project.progress = ($scope.project.soldStock + $scope.project.occupancyStock) * 100 / $scope.project.countInvest;
          $scope.totalType = $scope.project.status === 11 && $scope.project.progress < 100 ? '可预约金额' : '可投金额';
          /**
           * 项目可投金额
           */
          $scope.projectInvestNum = $scope.project.currentStock * $scope.project.increaseAmount;

          /**
           * 用户可用金额
           */
          if ($rootScope.account) {
            if ($scope.project.status === 11) {
              $scope.userCanInvestNum = $scope.project.reserveAmount > $rootScope.account.balance * 10 ? $rootScope.account.balance * 10 : $scope.project.reserveAmount;
            } else {
              $scope.userCanInvestNum = $scope.projectInvestNum > $rootScope.account.balance ? $rootScope.account.balance : $scope.projectInvestNum;
            }
          } else {
            $scope.userCanInvestNum = 0;
          }
          $scope.projectInfo = projectDetails.data.projectInfo;
          $scope.projectRank = projectDetails.data.projectRank;

          $scope.isAvailable = projectDetails.data.isAvailable;

          $scope.preRepaymentList = projectDetails.data.preRepaymentList;
          $scope.projectPrepayment = projectDetails.data.projectPrepayment; // 根据是否等于null，判断是否为提前还款项目
          $scope.billCount = projectDetails.data.billCount;
          $scope.remainInterest = projectDetails.data.remainInterest;
          $scope.remainPrincipal = projectDetails.data.remainPrincipal;
          /**
           * 处理投资记录分页
           */
          $scope.currentPage = 0;
          $scope.pageSize = 10;
          $scope.data = [];

          if($scope.categoryCode === '0118'){
            $scope.projectOrders($scope.project.originProjectId, $scope.project.type);
          }else{
            $scope.projectOrders($scope.project.id, $scope.project.type);
          }
          
          $scope.projectFiles($scope.project.id);
          $scope.projectTexts($scope.project.id);
          $scope.enterpriseInfo($scope.project.enterpriseId);
          $scope.investCoupons($scope.project);

        } else if (projectDetails.code === -1054) {
          // $state.go('root.project-list-query-no');
        } else {
          toaster.pop('warning', projectDetails.msg);
        }
      });
    };


    $scope.profit = 0;
    /**
     * 计算预计收益
     */
    $scope.calcProfit = function(annualEarnings) {
      var profit = $scope.project.amount * $scope.project.projectDays * annualEarnings / 36500;
      return profit;
    }
    /**
     * 验证金额和券
     */
    $scope.validateAmountAndCoupon = function(amount, coupon) {
      $scope.errorMsg = '';

      if (!$rootScope.isLogged) {
        return;
      }
      if (amount === undefined || amount <= 0) {
        return;
      }
      if ($rootScope.account.balance <= 0) {
        $scope.errorMsg = '账户余额不足，请先充值';
      } else if (amount > $scope.availableAmount) {
        $scope.errorMsg = '投资金额必须小于' + $scope.availableAmount;
      } else if (amount > $rootScope.account.balance) {
        $scope.errorMsg = '账户余额不足，请先充值';
      } else if (amount < $scope.project.minInvest) {
        $scope.errorMsg = '投资金额必须大于等于' + $scope.project.minInvest;
      } else if (amount % $scope.project.increaseAmount !== 0) {
        $scope.errorMsg = '投资金额必须为' + $scope.project.increaseAmount + '的整数倍';
      } else if (coupon !== undefined && coupon !== null && coupon.type === 2 && amount < coupon.minInvestAmount) {
        $scope.errorMsg = '投资金额不满足返现条件';
      }

      if (($scope.project !== undefined && $scope.project) || $scope.selectedCoupon !== null) {
        $scope.profit = $scope.calcProfit($scope.project.annualEarnings) || 0;
        $scope.increaseProfit = 0;
        if($scope.selectedCoupon !== undefined){
          if ($scope.selectedCoupon.type === 1) {
            $scope.increaseProfit = $scope.calcProfit($scope.selectedCoupon.value);
          } else if ($scope.selectedCoupon.type === 2) {
            $scope.increaseProfit = amount < $scope.selectedCoupon.minInvestAmount ? 0 : $scope.selectedCoupon.value;
          } else {
            $scope.increaseProfit = $scope.calcProfit($scope.selectedCoupon.amount);
          }
        }
      }
    }

    $scope.$watch('project.amount', function(newVal, oldVal) {
      $scope.errorMsg = '';
      if (!$rootScope.isLogged) {
        return;
      }
      if (newVal !== oldVal) {
        $scope.errorMsg = undefined;
      }
      $scope.validateAmountAndCoupon(newVal, $scope.selectedCoupon);
      if (newVal > $scope.projectInvestNum) {
        $scope.project.amount = $scope.projectInvestNum;
      }
      newVal >= 100 ? $scope.couponLists(newVal) : null;
    });

    /**
     * 项目订单列表
     */
    $scope.projectOrders = function(projectId, projectType) {
      ProjectService.projectOrders.get({
        projectId: projectId,
        projectType: projectType
      }, function(response) {
        if (response.ret !== -1) {
          $scope.orderList = response.data.orderList;
          $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
          };
          for (var i = 0; i < $scope.orderList.length; i++) {
            $scope.data.push($scope.orderList[i]);
          }
        }

      });
    }

    /**
     * 项目文件信息
     */
    $scope.projectFiles = function(projectId) {
      ProjectService.projectFiles.get({
        projectId: projectId
      }, function(response) {
        if (response && response.ret !== -1) {
          $scope.enterpriseThumbnailFileList = response.data.enterpriseThumbnailFileList;
          $scope.enterpriseOriginalFileList = response.data.enterpriseOriginalFileList;
          $scope.contractOriginalFileList = response.data.contractOriginalFileList;
          $scope.contractThumbnailFileList = response.data.contractThumbnailFileList;
          $scope.projectThumbnailFileList = response.data.projectThumbnailFileList;
          $scope.projectOriginalFileList = response.data.projectOriginalFileList;
        }
      });
    }

    /**
     * 项目风控信息
     */
    $scope.ProjectRisk = function() {
      ProjectService.getProjectRisk.get({
        number: $stateParams.number
      },function(response){
        if(!response.ret || response.ret == -1){
          return;
        }
        $scope.riskControl = response.data.riskControl;
      });
    }
    $scope.ProjectRisk();
    /**
     * 借款企业信息
     */
    $scope.enterpriseInfo = function(enterpriseId) {
      ProjectService.getEnterpriseById.get({
        enterpriseId: enterpriseId
      }, function(response) {
        $scope.enterprise = response.data.enterprise;
      });
    }

    /**
     * 媒体报道
     */
    $scope.projectTexts = function(projectId) {
      ProjectService.projectTexts.get({
        projectId: projectId
      }, function(response) {
        $scope.mediaList = response.data.texts;
      });
    }

    /**
     * 项目预约记录
     */
    $scope.getReserveRecords = function() {
      ProjectService.getReserveRecords.get({
        number: $stateParams.number
      }, function(response) {
        if (response.ret === 1) {
          $scope.reserveData = response.data;
          $scope.reserveOrders = response.data.reserveOrders;
          $scope.singleReserveCounts = $scope.reserveOrders.length;
          for (var i = 0; i < $scope.singleReserveCounts; i++) {
            var $index = $scope.reserveOrders[i].status;
            $scope.reserveOrders[i].statusTxt = response.data.statusMap[$index];
          }
        }
      });
    };

    /**
     * 获取预约收益
     */
    $scope.getProfit = function(project) {
      if ($rootScope.autoTransfer !== 1) {
        $scope.msg = '需要完成自动投标授权，请到安全中心设置中授权。';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-autoTransfer.html',
          show: true
        });
        return;
      }
      $scope.alert = {
        toReserveAmount: project.toReserveAmount
      };
      if ($scope.checkFlag) {
        if (project.toReserveAmount > $scope.userCanInvestNum) {
          $scope.msg = $scope.project.reserveAmount > $rootScope.account.balance * 10 ? '您输入的金额高于可用余额！' : '您输入的金额高于可预约金额！';
          $alert({
            scope: $scope,
            template: 'views/modal/alert-dialog.html',
            show: true
          });
        } else {
          ProjectService.getProfit.get({
            reserveAmount: project.toReserveAmount,
            projectId: project.id
          }, function(response) {
            if (response.ret === 1) {
              $scope.reserveProfit = response.data.reserveProfit;
              $alert({
                scope: $scope,
                template: 'views/modal/alert-reserve-success.html',
                show: true
              });

            } else {
              $scope.msg = response.msg;
              $alert({
                scope: $scope,
                template: 'views/modal/alert-dialog.html',
                show: true
              });
            }
          });
        }

      } else {
        $scope.msg = '您还没有同意《项目预约规则》';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
        return;
      }
    };
    /**
     * 跳转到充值
     */
    $scope.toRecharge = function() {
      if($rootScope.bankCardStatus){

      }
      if ($rootScope.securityStatus.realNameAuthStatus + $rootScope.autoTransfer >= 1 && $rootScope.bankCardStatus ==='VERIFIED') {
        $modal({
          scope: $scope,
          template: 'views/modal/modal-toRecharge.html',
          show: true
        });
      } else if($rootScope.securityStatus.realNameAuthStatus !==1){
        $scope.toRealNameAuth();
      }else if($rootScope.bankCardStatus !=='VERIFIED'){
        $modal({
          scope: $scope,
          template: 'views/modal/modal-toBindBank.html',
          show: true
        });
      }
    }

    /**
     * 调到易宝支付
     */
    $scope.transfer = function(project, investAmount, giftCount, selectedCoupon) {
      var invest = function() {
        $scope.investAmount = investAmount;
        $scope.msg = '4';
        $scope.page = 'investVerify';
        var couponNumber = selectedCoupon.amount > 0 ? "" : selectedCoupon.number;

        // 使用同步请求， 解决有可能弹窗被浏览器拦截的问题
        var saveOrderUrl = RESTFUL_DOMAIN + '/projects/' + project.number + '/users/0/investment?' + 'investAmount=' + investAmount + '&couponNumber=' + couponNumber;
        if (couponNumber === '') {
          saveOrderUrl += '&useMemberIncreaseCoupon=true'
        }
        $.ajax({
          url: saveOrderUrl,
          'type': 'POST',
          async: false,
          dataType: 'json',
          success: function(response) {
            if (response.ret !== 1) {
              var order = response;
              $alert({
                scope: $scope,
                template: 'views/modal/alertYEEPAY.html',
                show: true
              });

              $window.open('/#!/user-order-transfer/' + order.projectId + '/' + order.id + '/' + order.type+ '?orderNumber=' + order.number, '_blank');
            } else if(response.code == -1037) {
                 $modal({
                 scope: $scope,
                 template: 'views/modal/alert-unfinishedOrder.html',
                 show: true
               });
            } else {
              toaster.pop('error', response.msg);
            }
          }
        });
      }
      $rootScope.migrateStatus(invest);

      // var getOrder = $q.defer();
      // OrderService.saveOrder.get({
      //   projectId: project.id,
      //   investAmount: investAmount,
      //   giftCount: giftCount,
      //   inviteMobile: $rootScope.inviteMobile,
      //   couponNumber: couponNumber
      // }).$promise.then(function(response) {
      //   if (response.ret === 1) {
      //     var orderId = response.data.orderId;
      //     var orderType = 1;
      //     $alert({
      //       scope: $scope,
      //       template: 'views/modal/alertYEEPAY.html',
      //       show: true
      //     });

      //     $window.open(config.domain + '/#!/user-order-transfer/' + project.id + '/' + orderId + '/' + orderType, '_blank');
      //   } else {
      //     toaster.pop('error', response.msg);
      //   }
      // });


    };

    /**
     * 显示协议
     */
    $scope.showAgreement = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/alert-toShowActivityruleAgreement.html',
        show: true
      });
    };

    /**
     * 自定义dialog
     */
    $scope.alertDialog = function(msg) {
      $scope.msg = msg;
      $alert({
        scope: $scope,
        template: 'views/modal/alert-dialog.html',
        show: true
      });
    }

    /**
     * 投资或者预约
     */
    $scope.toInvest = function(project) {
      var invest = function () {
        if (project.status === 11) {
          /**
           * 预约项目投资
           */
          ProjectService.reserve.get({
            reserveAmount: project.toReserveAmount,
            projectId: project.id,
            inviteMobile: project.inviteMobile
          }, function(response) {
            if (response.ret === 1) {
              angular.element('.alert').remove();
              angular.element('.mask_layer').remove();
              var balance = $rootScope.account.balance;
              $rootScope.account.balance = balance - (project.toReserveAmount / 10);
              $scope.getProjectDetails(); //更新投资模块
              $scope.getReserveRecords(); //更新预约记录
            } else {
              $scope.msg = response.msg;
              $alert({
                scope: $scope,
                template: 'views/modal/alert-dialog.html',
                show: true
              });
            }
          });
        } else {
          /**
           * 非预约项目投资
           */
          if (!$rootScope.account || $rootScope.account.balance < project.amount) {
            $scope.msg = '账户余额不足';
            $alert({
              scope: $scope,
              template: 'views/modal/alert-dialog.html',
              show: true
            });
          }

          OrderService.investVerify.get({
            projectId: project.id,
            amount: project.amount
          }, function(response) {
            if (response.ret === 1) {
              $state.go('root.invest-verify', {
                projectId: project.id,
                amount: project.amount
              });
            } else if (response.ret === -1) {
              if (response.code === 1) {
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
      }
      $rootScope.migrateStatus(invest);

    };
    $rootScope.selectPage = $location.path().split('/')[1];

    $scope.tabsRight = [{
      title: '投资记录',
      // url: 'one.tpl.html'
    }, {
      title: '还款计划',
      // url: 'two.tpl.html'
    }];

    $scope.tabsRightReserve = [{
      title: '当前预约',
      // url: 'one.tpl.html'
    }, {
      title: '我的预约记录',
      // url: 'two.tpl.html'
    }];

    $scope.toggle = {};
    $scope.toggle.switchTab = function(tabIndex) {
      $scope.toggle.activeTab = tabIndex;
    };


    $scope.toggle.switchTabRight = function(tabIndexRight) {
      $scope.toggle.activeTabRight = tabIndexRight;
    };

    $scope.toggle.switchTabRightReserve = function(tabIndexRightReserve) {
      $scope.toggle.activeTabRightReserve = tabIndexRightReserve;
    };

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

    if ($rootScope.channelCode) {
      MainService.trafficStats.get({
        from: $rootScope.channelCode
      });
    }

    /**
     * 某宝宝的回报率
     */
    ProjectService.getYuebaoInterestRatesByDate.get(function(response) {
      if (response.ret === 1) {
        var interestRates = response.data.yuebaoInterestRates;
        $scope.rateLabels = [];
        $scope.yuebaoRate = [];
        $scope.selfRate = [];
        for (var i = 0; i < interestRates.length; i++) {
          var date = new Date(interestRates[i].interestDate);
          $scope.rateLabels.push(date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate());
          $scope.yuebaoRate.push(interestRates[i].yuebaoRate);
          $scope.selfRate.push(interestRates[i].rate);
        }
      }
      if ($scope.rateLabels.length !== 0 && $scope.yuebaoRate.length !== 0 && $scope.selfRate.length !== 0) {
        $scope.lineProjectData = {
          labels: $scope.rateLabels,
          datasets: [{
            label: 'My yuebaoRate dataset',
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: $scope.yuebaoRate
          }, {
            label: 'My selfRate dataset',
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: $scope.selfRate
          }]
        };
        //
      } else {}
    });

    $scope.lineProjectData = {
      labels: [],
      datasets: [{
        label: 'My First dataset',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: []
      }, {
        label: 'My Second dataset',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: []
      }]
    };

    $scope.lineProjectOptions = {
      scaleGridLineWidth: 1,
      pointDotRadius: 4,
      datasetFill: true
    };


    $scope.getProjectDetails();
    $scope.getReserveRecords();

    //查看更多
    $scope.initLimit = 8;
    $scope.loadMore = function(){
      $scope.initLimit = $scope.initLimit + 3 < $scope.list.length ? $scope.initLimit + 3 : $scope.list.length;
    }
    $scope.contractTemplate = function () {
      ProjectService.contractTemplate.get({
        number: $stateParams.number
      }, function (response) {
        $scope.templateType = response.type;
      })
    }
    $scope.contractTemplate();
    $scope.downContracts = function () {
      ProjectService.downContracts.get({
        templateType: $scope.templateType
      }, function (response) {
        if (response && response.ret !== -1) {
          window.location.href = $rootScope.baseFileUrl + response.url
        }
      })
    }

  });
