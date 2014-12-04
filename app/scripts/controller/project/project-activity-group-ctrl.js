'use strict';
hongcaiApp.controller('ProjectActivityGroupCtrl', ['$scope', 'ProjectService', '$window', function ($scope, ProjectService, $window) {
  $scope.valCategory = {7: '立即投资', 8: '查看宏标', 9:'查看宏标', 10:'查看宏标'};
  var activityGroup = ProjectService.getGiftProjectList.get(function() {
    if(activityGroup.ret == 1) {
      $scope.projectList = activityGroup.data.projectList;
    } else {
      $window.alert('服务器被修空调的搬走了，正在努力追赶。')
    }
  })
}]);
