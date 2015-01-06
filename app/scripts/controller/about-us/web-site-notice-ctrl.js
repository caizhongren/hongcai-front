'use strict';
hongcaiApp.controller('WebSiteNoticeCtrl', ['$scope', '$state', '$location', '$stateParams', 'AboutUsService', function($scope, $state, $location, $stateParams, AboutUsService) {
  // FIX
  $scope.perPage = parseInt($location.search().perPage, 10) || 15;
  $scope.page = parseInt($location.search().page, 10) || 0;
  $scope.clientLimit = 250;
  $scope.urlParams = {
    category: "2"
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
    };
    if (perPage >= 0) {
      $scope.perPage = perPage;
    };
  });

  // AboutUsService.textList.get({category: 2}, function(response) {
  //     $scope.textList = response.data;
  //     $scope.orderProp = 'id';
  //     $scope.currentPage = 0;
  //     $scope.pageSize = 15;
  //     $scope.data = [];
  //     $scope.numberOfPages = function(){
  //         return Math.ceil($scope.data.length / $scope.pageSize);
  //     }
  //     for (var i = 0; i < $scope.textList.textList.length; i++) {
  //         $scope.data.push($scope.textList.textList[i]);
  //     }
  // });

}]);
