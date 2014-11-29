hongcaiApp.controller('ProjectActivityGroupCtrl', ['$scope', 'ProjectService', '$window', function ($scope, ProjectService, $window) {
  var activityGroup = ProjectService.getGiftProjectList.get(function() {
    if(activityGroup.ret == 1) {
      $scope.projectList = activityGroup.data.projectList;
    } else {
      $window.alert('服务器被修空调的搬走了，正在努力追赶。')
    }
  })
}]);
