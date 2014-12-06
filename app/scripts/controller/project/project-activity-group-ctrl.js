'use strict';
hongcaiApp.controller('ProjectActivityGroupCtrl', ['$scope', 'ProjectService', 'toaster', function ($scope, ProjectService, toaster) {
  $scope.valCategory = {7: '立即投资', 8: '查看宏标', 9:'查看宏标', 10:'查看宏标'};
  var activityGroup = ProjectService.getGiftProjectList.get(function() {
    if(activityGroup.ret == 1) {
      $scope.projectList = activityGroup.data.projectList;
    }
  })
}]);
