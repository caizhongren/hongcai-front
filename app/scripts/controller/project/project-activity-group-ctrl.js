'use strict';
hongcaiApp.controller('ProjectActivityGroupCtrl', ['$scope', 'ProjectService', 'toaster', function ($scope, ProjectService, toaster) {
  $scope.valCategory = {7: '立即投资', 8: '查看宏包标', 9:'查看宏包标', 10:'查看宏包标'};
  var activityGroup = ProjectService.getGiftProjectList.get(function() {
    if(activityGroup.ret === 1) {
      $scope.projectList = activityGroup.data.projectList;
    } else {
      $scope.projectList = [];
      toaster.pop('warning', '服务器正在努力的加载....请稍等。');
    }
  })
}]);
