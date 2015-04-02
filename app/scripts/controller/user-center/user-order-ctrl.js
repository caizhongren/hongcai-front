'use strict';
angular.module('hongcaiApp')
  .controller('UserOrderCtrl', ['$location', '$scope', '$http', '$rootScope', '$state', '$stateParams', 'UserCenterService', '$aside', '$window', 'OrderService', 'config', 'toaster', '$alert', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster, $alert) {

    $rootScope.redirectUrl = $location.path();
    $rootScope.selectSide = 'userCenter-investment';
    $scope.typeInvStatus = {
      '0': '未支付',
      '1': '已支付'
    };
    $scope.status = $stateParams.status || 0;
    $scope.dateInterval = $stateParams.dateInterval || 0;
    $scope.listInvPond = [];
    $scope.unpaid = 0;
    $scope.paid = 0;
    $scope.showListNameInfo = function() {
      angular.element('#investment-list').animate({
        width: 'show'
      }, 300);
    };
    $scope.showListDetails = function(number) {
      angular.element('#investment-detail').animate({
        width: 'show'
      }, 300);
      $scope.getOrderBillByOrderId(number);
    };
    $scope.generateContractPDF = function(projectId, orderId, status, type) {
      if (status === 2) {
        if (type !== 4) {
          $scope.downloadPDF('hongcai/api/v1/siteProject/generateContractPDFModel?orderId=' + orderId + '&projectId=' + projectId);
        } else if (type === 4) {
          $scope.downloadPDF('hongcai/api/v1/siteCredit/downloadFundsContractModel');
        }

        // UserCenterService.generatePartContractPDF.get({
        //   projectId: projectId,
        //   orderId: orderId
        // }, function() {
        //   $scope.downloadPDF('hongcai/api/v1/siteProject/generatePartContractPDF?orderId=' + orderId + '&projectId=' + projectId);
        // });
      } else if (status >= 3 && status <= 6) {
        if (type !== 4) {
          $scope.downloadPDF('hongcai/api/v1/siteProject/generateContractPDF?orderId=' + orderId + '&projectId=' + projectId);
        } else if (type === 4) {
          $scope.downloadPDF('hongcai/api/v1/siteCredit/downloadFundsContract?orderId=' + orderId);
        }

        // UserCenterService.generateContractPDF.get({
        //   projectId: projectId,
        //   orderId: orderId
        // }, function() {
        //   $scope.downloadPDF('hongcai/api/v1/siteProject/generateContractPDF?orderId=' + orderId + '&projectId=' + projectId);
          // 简单的处理方式，可能被浏览器屏蔽。
          // window.open('hongcai/api/v1/siteProject/generateContractPDF?orderId=' + orderId + '&projectId=' + projectId, '_blank', '');
        // });
      }

    };

    //判断是否开通第三方托管账户
    $scope.checkTrusteeshipAccount = function() {
      if ( $rootScope.securityStatus.trusteeshipAccountStatus === 1) {
        $scope.haveTrusteeshipAccount = true;
      } else {
        $scope.haveTrusteeshipAccount = false;
      }
      return $scope.haveTrusteeshipAccount;
    };

    $scope.showOrderStatistics = true;
    var getOrderByUser = UserCenterService.getOrderByUser.get({
        type: $stateParams.type,
        dateInterval: $stateParams.dateInterval,
        status: $stateParams.status
      },
      function(response) {
        if (getOrderByUser.ret === 1) {
          // console.log(getOrderByUser);
          // $scope.haveTrusteeshipAccount = $scope.checkTrusteeshipAccount();
          // if($scope.haveTrusteeshipAccount) {
          $scope.orderList = getOrderByUser.data.orderProjectList;
          $scope.orderCount = getOrderByUser.data.orderCount;
          $scope.amount = getOrderByUser.data.amount;
          $scope.type = getOrderByUser.data.type;
          $scope.dateInterval = getOrderByUser.data.dateInterval;
          $scope.status = getOrderByUser.data.status;
          $scope.notPayOrder = getOrderByUser.data.notPayOrder;
          $scope.productsMap = getOrderByUser.data.productsMap;
          // $scope.invFromDate = getOrderByUser.data.dateStart || 0;
          // $scope.invUntilDate = getOrderByUser.data.dateEnd || 0;
          $scope.currentPage = 0;
          $scope.pageSize = 6;
          $scope.data = [];
          $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
          };
          for (var i = 0; i < $scope.orderList.length; i++) {
            var item = $scope.orderList[i];
            item.url = item.type === 1 ? 'root.project-details({projectId: ' + item.projectId + '})' : 'root.activity-details({activityId: ' + item.projectId + ', type:' + item.type + '})';
            $scope.data.push(item);
            }
          // }

        } else {
          $scope.showOrderStatistics = false;
          toaster.pop('warning', response.msg);
        }
      });

    $scope.reload = function() {
      window.location.reload();
    };

    // 继续支付订单
    $scope.toPay = function(projectId, orderId, orderType) {
      $scope.msg = '4';
      $scope.page = 'investment';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });

      window.open('/user-order-transfer/' + projectId + '/' + orderId + '/' + orderType);
    };
    // 取消订单
    $scope.cancelOrder = function(number) {
      if ($window.confirm('确定取消订单?')) {
        // 确定要删除订单的弹窗。
        UserCenterService.cancelOrder.get({
          number: number
        }, function(response) {
          if (response.ret === 1) {
            $window.location.reload();
            // 刷新页面
          } else {
            toaster.pop('warning', '无法取消订单，请重试。');
          }
        });
      }
    };
    // 获取详情按钮

    $scope.getOrderBillByOrderId = function(number) {
      UserCenterService.getOrderBillByOrderId.get({
        number: number
      }, function(response) {
        if (response.ret === 1) {
          var invTotal = response.data.order.orderAmount;
          if (response.data.project) {
            var rdp = response.data.project;
            //总融资额
            var invInitDate = moment(rdp.valueDate).toString();
            var accountDay = rdp.accountDay;
            var invStartDate = moment([moment(invInitDate).year(), moment(invInitDate).month(), accountDay]).toString();
            invStartDate = moment(invStartDate).add(1, 'month').toString();
            var invEndDate = moment(rdp.repaymentDate).toString();
            var invCycle = rdp.cycle;
            var invType = rdp.type;
            var invRate = rdp.annualEarnings / 100;
            if (invType === 1) {
              // 先息后本
              everyMonthInterestPri(invTotal, invInitDate, invStartDate, invEndDate, invCycle, invRate);
            } else if (invType === 2) {
              everyMonthInterestEq(invTotal, invInitDate, invStartDate, invEndDate, invCycle, invRate);
              // 等额本息
            }
            if (response.data.billList) {
              var bill = response.data.billList;
              var billList = {};
              for (var i = 0; i < bill.length; i++) {
                billList = {
                  'payDate': moment(bill[i].successTime).format('YYYY-MM-DD'),
                  'invEarnings': bill[i].amount,
                  'invStatus': bill[i].status
                };
                $scope.listInvPond.splice(i, 1, billList);
              }
            }
            $scope.paid = 0;
            $scope.unpaid = 0;
            for (var x = 0; x < $scope.listInvPond.length; x++) {
              var status = $scope.listInvPond[x].invStatus;
              if (status === 1) {
                $scope.paid += $scope.listInvPond[x].invEarnings;
              } else {
                $scope.unpaid = $scope.unpaid + $scope.listInvPond[x].invEarnings;
              }
            }
          }
        }
      });
    };
    var everyMonthInterestPri = function(invTotal, invInitDate, invStartDate, invEndDate, invCycle, invRate) {
      // 每月的付费天数，付费日期，上次支付日期，该月的利息；
      $scope.listInvPond = [];
      var invDays, payDate, prevDate, invEarnings;
      var invList = {};
      if (invCycle === 1) {
        invDays = moment(invEndDate).diff(moment(invInitDate), 'days', true);
        invEarnings = invTotal + invTotal * invRate * Math.round(invDays) / 365; //计算利率
        invList = {
          'payDate': moment(invEndDate).format('YYYY-MM-DD'),
          'invEarnings': invEarnings,
          'invStatus': '0'
        };
        $scope.listInvPond.push(invList);
      } else {
        // var LastPayDate = moment(invStartDate).add((invCycle - 1), 'month').toString();
        // LastPayDate 永远等于 invEndDate?
        // var diffDate = moment(LastPayDate).diff(moment(invEndDate), 'days');
        // if (diffDate === 0) {
        //   invCycle = invCycle - 1;
        // }
        // 原先是这样
        invCycle = invCycle - 1;
        for (var i = 0; i <= invCycle; i++) {
          payDate = moment(invStartDate).add(i, 'month').toString();
          if (moment(payDate) > moment(invEndDate)) {
            payDate = invEndDate;
          }
          if (i === 0) {
            invDays = moment(payDate).diff(moment(invInitDate), 'days', true) + 1;
          } else {
            invDays = moment(payDate).diff(moment(prevDate), 'days', true);
          }
          invEarnings = invTotal * invRate * Math.round(invDays) / 365; //计算利率
          if (i === invCycle) {
            invEarnings = invEarnings + invTotal;
          }
          prevDate = payDate;
          invList = {
            'payDate': moment(payDate).format('YYYY-MM-DD'),
            'invEarnings': invEarnings,
            'invStatus': '0'
          };
          $scope.listInvPond.push(invList);
        }
      }
    };
    // 等额本息  intType = 2
    var everyMonthInterestEq = function(invTotal, invInitDate, invStartDate, invEndDate, invCycle, invRate) {
      $scope.listInvPond = [];
      var invDays, payDate, prevDate, invEarnings, currentMonthInterest, payDiffDate; //每月的付费天数，付费日期，上次支付日期，该月的付款金额, 当月生成的的利息；
      var invList = {};
      invEarnings = (invTotal * invRate * Math.pow((1 + invRate / invCycle), invCycle)) / (Math.pow((1 + invRate / invCycle), invCycle) - 1) / invCycle;
      var LastPayDate = moment(invStartDate).add(invCycle, 'month').toString();
      var diffDate = moment(LastPayDate).diff(moment(invEndDate), 'days');
      if (diffDate === 0) {
        invCycle = invCycle - 1;
      }
      invCycle = invCycle - 1;
      for (var i = 0; i <= invCycle; i++) {
        payDate = moment(invStartDate).add(i, 'month').toString();
        if (diffDate !== 0) {
          payDiffDate = moment(payDate).diff(moment(invEndDate), 'days');
          if (payDiffDate > 0) {
            payDate = invEndDate;
            invDays = moment(payDate).diff(moment(prevDate), 'days', true);
            invEarnings = invTotal + invTotal * invRate * Math.round(invDays) / 365;
            invList = {
              'payDate': moment(payDate).format('YYYY-MM-DD'),
              'invEarnings': invEarnings,
              'invStatus': '0'
            };
            $scope.listInvPond.push(invList);
            break;
          } else {
            currentMonthInterest = invTotal * invRate / 12;
            invTotal = invTotal - (invEarnings - currentMonthInterest);
          }
        }
        prevDate = payDate;
        invList = {
          'payDate': moment(payDate).format('YYYY-MM-DD'),
          'invEarnings': invEarnings,
          'invStatus': '0'
        };
        $scope.listInvPond.push(invList);
      }
    };

    /*function newForm() {
      var f = document.createElement('form');
      document.body.appendChild(f);
      f.method = 'post';
      //f.target = '_blank';
      return f;
    }

    function createElements(eForm, eName, eValue) {
      var e = document.createElement('input');
      eForm.appendChild(e);
      e.type = 'text';
      e.name = eName;
      if (!document.all) {
        e.style.display = 'none';
      } else {
        e.style.display = 'block';
        e.style.width = '0px';
        e.style.height = '0px';
      }
      e.value = eValue;
      return e;
    }*/
    // Based on an implementation here: web.student.tuwien.ac.at/~e0427417/jsdownload.html
    $scope.downloadPDF = function(httpPath) {
      // Use an arraybuffer
      $http.get(httpPath, {
          responseType: 'arraybuffer'
        })
        .success(function(data, status, headers) {
          var blob;
          var octetStreamMime = 'application/pdf';
          var success = false;
          // Get the headers
          headers = headers();
          // Get the filename from the x-filename header or default to "download.bin"
          var filename = headers['x-filename'] || '宏财网借款协议.pdf';
          // Determine the content type from the header or default to "application/octet-stream"
          var contentType = headers['content-type'] || octetStreamMime;
          try {
            // Try using msSaveBlob if supported
            blob = new Blob([data], {
              type: contentType
            });
            if (navigator.msSaveBlob) {
              navigator.msSaveBlob(blob, filename);
            }
            else {
              // Try using other saveBlob implementations, if available
              var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
              if (saveBlob === undefined) {
                throw 'Not supported';
              }
              saveBlob(blob, filename);
            }
            success = true;
          } catch (ex) {
            // console.log("saveBlob method failed with the following exception:");
            // console.log(ex);
          }
          if (!success) {
            // Get the blob url creator
            var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
            if (urlCreator) {
              var link = document.createElement('a');
              if ('download' in link) {
                try {
                  // Prepare a blob URL
                  blob = new Blob([data], {
                    type: contentType
                  });
                  var url = urlCreator.createObjectURL(blob);
                  link.setAttribute('href', url);
                  // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                  link.setAttribute('download', filename);
                  // Simulate clicking the download link
                  var event = document.createEvent('MouseEvents');
                  event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                  link.dispatchEvent(event);
                  success = true;
                } catch (ex) {
                  // console.log("Download link method with simulated click failed with the following exception:");
                  // console.log(ex);
                }
              }
              if (!success) {
                try {
                  var openUrl;
                  // console.log("Trying download link method with window.location ...");
                  blob = new Blob([data], {
                    type: octetStreamMime
                  });
                  openUrl = urlCreator.createObjectURL(blob);
                  window.location = openUrl;
                  success = true;
                } catch (ex) {
                  // console.log("Download link method with window.location failed with the following exception:");
                  // console.log(ex);
                }
              }
            }
          }
          if (!success) {
            // console.log("No methods worked for saving the arraybuffer, using last resort window.open");
            var w = $window.open(httpPath, '_blank', '');
            w.location.href = httpPath;
          }
        })
        .error(function(data, status) {
          // console.log("Request failed with status: " + status);
          // Optionally write the error out to scope
          $scope.errorDetails = 'Request failed with status: ' + status;
        });
    };

    $scope.removeWarning = function() {
      angular.element('.notPayOrder').remove();
    };
  }]);
