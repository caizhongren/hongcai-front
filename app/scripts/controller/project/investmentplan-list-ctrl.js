'use strict';
angular.module('hongcaiApp')
  .controller('InvestmentplanListCtrl', ['$scope', '$stateParams', '$rootScope', '$location', '$state', 'ProjectService', 'toaster', function($scope, $stateParams, $rootScope, $location, $state, ProjectService, toaster) {
    $scope.baseFundsProductData = function() {
      ProjectService.getFundsProductTypeMap.get({}, function(response) {
        if (response.ret === 1) {
          $scope.productMap = response.data.productMap;
          // $scope.getFundsProjectListByProductType(1);
        } else {
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          console.log('ask investmentplan-list, why getFundsProductIdList did not load data...');
        }
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
    $scope.perPage = parseInt($location.search().perPage, 10) || 8;
    $scope.page = parseInt($location.search().page, 10) || 0;
    $scope.clientLimit = 250;
    $scope.urlParams = {
      type: '1'
    };

    $scope.$watch('page', function(page) {
      $location.search('page', page);
    });
    $scope.$watch('perPage', function(page) {
      $location.search('perPage', page);
    });
    $scope.$on('$locationChangeSuccess', function() {
      var page = +$location.search().page,
        perPage = +$location.search().perPage;
      if (page >= 0) {
        $scope.page = page;
      }
      if (perPage >= 0) {
        $scope.perPage = perPage;
      }
    });
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
      $scope.urlParams.type = tabIndex + 1;
      $scope.toggle.activeTab = tabIndex;
    };
    $rootScope.selectPage = $location.path().split('/')[1];

  }]);
