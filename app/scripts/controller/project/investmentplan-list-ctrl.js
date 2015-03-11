'use strict';
angular.module('hongcaiApp')
  .controller('InvestmentplanListCtrl', ['$scope', '$stateParams', '$rootScope', '$location', '$state', 'ProjectService', 'toaster', function($scope, $stateParams, $rootScope, $location, $state, ProjectService, toaster) {
    $scope.switchFlag = {};
    $scope.baseFundsProductData = function() {
      ProjectService.getFundsProductMap.get({}, function(response) {
        if (response.ret === 1) {
          $scope.productMap = response.data.productMap;
          if ($scope.productMap['七日盈']) {
            $scope.switchFlag[0] = $scope.productMap['七日盈'];
            $scope.getFundsProjectListByProductId($scope.productMap['七日盈']);
          } else {}
          if ($scope.productMap['月月盈']) {
            $scope.switchFlag[1] = $scope.productMap['月月盈'];
          } else {
          }
          if ($scope.productMap['季度盈']) {
            $scope.switchFlag[2] = $scope.productMap['季度盈'];
          } else {
          }
        } else {
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          console.log('ask investmentplan-list, why getFundsProductIdList did not load data...');
        }
        ;
      });
      ProjectService.getFundsTotalStatisticalData.get({}, function(response) {
        if (response.ret === 1) {
          $scope.totalRepeatInvestCount = response.data.totalRepeatInvestCount;
          $scope.totalProfit = response.data.totalProfit;
          $scope.totalAmount = response.data.totalAmount;
          $scope.totalInvestCount = response.data.totalInvestCount;
        } else {
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          console.log('ask investmentplan-list, why getFundsTotalStatisticalData did not load data...');
        }
      });


    };

    $scope.getFundsProjectListByProductId = function(productId) {
      ProjectService.getFundsProjectListByProductId.get({productId: productId}, function(response) {
        if (response.ret === 1) {
          $scope.fundsProjectList = response.data.fundsProjectList;
          $scope.fundsProjectStatus = response.data.fundsProjectStatus;
          $scope.data = [];
          $scope.currentPage = 0;
          $scope.pageSize = 10;
          $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
          };
          for (var i = 0; i < $scope.fundsProjectList.length; i++) {
            $scope.data.push($scope.fundsProjectList[i]);
          }
        } else {
          console.log('ask investmentplan-list, why getFundsProjectListByProductId did not load data...');
        }
      });
    };
    $scope.baseFundsProductData();
    $scope.tabs = [{
      title: '七日盈',
    }, {
      title: '月月盈',
    }, {
      title: '季度盈',
    }];

    $scope.toggle = {};
    $scope.toggle.switchTab = function(tabIndex) {
      $scope.getFundsProjectListByProductId($scope.switchFlag[tabIndex]);
      $scope.toggle.activeTab = tabIndex;
    };
    $rootScope.selectPage = $location.path().split('/')[1];

  }]);
