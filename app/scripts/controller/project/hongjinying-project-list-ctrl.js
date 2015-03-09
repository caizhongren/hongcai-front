'use strict';
angular.module('hongcaiApp')
  .controller('HjyProjectListCtrl', ['$scope', '$stateParams', '$rootScope', '$location', '$state', 'ProjectService', 'toaster', function($scope, $stateParams, $rootScope, $location, $state, ProjectService, toaster) {
    $scope.getHongjinyingList = function() {
      $scope.showFlag = 1;
      ProjectService.hongjinyingList.get({}, function(response) {
        if (response.ret === 1) {
          console.log(response);
        } else {
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          console.log('ask project-list, why projectList did not load data...');
        }
      });
    };

    $scope.getHongjinyingList();
    $scope.tabs = [{
      title: '七日盈',
    }, {
      title: '月月盈',
    }, {
      title: '季度盈',
    }];

    $scope.toggle = {};
    $scope.toggle.switchTab = function(tabIndex) {
      $scope.toggle.activeTab = tabIndex;
    };

    // $rootScope.selectPage = $location.path().split('/')[1];

  }]);
