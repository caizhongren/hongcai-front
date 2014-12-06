'use strict';
hongcaiApp.controller('MainCtrl', ['$scope', '$stateParams', '$rootScope', '$location', 'MainService', 'AboutUsService', 'ProjectService', function ($scope, $stateParams, $rootScope, $location, MainService, AboutUsService, ProjectService) {
    var loginName;
    var logout;
    var projectList = MainService.projectList.get(function(response) {
      if(response.ret === 1){
          $scope.projectList = projectList.data.recommend;
          $scope.projectVo = projectList.data.specialRecommend[0];
        }

       /* $scope.orderProp = 'id';
        $scope.currentPage = 0;
        $scope.pageSize = 15;
        $scope.data = [];
        $scope.numberOfPages = function(){
          return Math.ceil($scope.data.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.projectList.projectList.length; i++) {
          $scope.data.push($scope.projectList.projectList[i]);
        }*/
    });
    var activityGroup = ProjectService.getGiftProjectList.get(function() {
      if(activityGroup.ret == 1) {
        $scope.activityList = activityGroup.data.projectList;
      }
    });

    var indexStatistics = MainService.indexStatistics.get(function(response) {
      if(response.ret === 1) {
        $scope.indexStatic = indexStatistics.data.indexStatic;
      }
    });

    AboutUsService.textList.get({category: 1}, function(response) {
      if(response.ret === 1){
        $scope.textList = response.data.textList;
        $scope.mediaList = $scope.textList.slice(0, 4);
      }
    });

    AboutUsService.textList.get({category: 2}, function(response) {
      if(response.ret === 1) {
        $scope.textList = response.data.textList;
        $scope.noticeList = $scope.textList.slice(0, 4);
      }
    });

    AboutUsService.textList.get({category: 3}, function(response) {
      if(response.ret === 1) {
        $scope.textList = response.data.textList;
        $scope.trendList = $scope.textList.slice(0, 4);
      }
    });

    $rootScope.selectPage = $location.path().split('/')[1];


    $scope.media = [
      {mimeType: 'image/png', src:'images/banner-1.png', href:'/project-sponsorInstitution/137' },
      {mimeType: 'image/png', src:'images/banner-2.png', href:'banner-fourty.html' },
      {mimeType: 'image/png', src:'images/banner-3.png', href:'banner-nine.html'},
      {mimeType: 'image/png', src:'images/banner-4.png', href:'/project-activity-group' },
      {mimeType: 'image/png', src:'images/banner-5.png', href:'banner-partner.html' }
    ];
    $scope.slickConfig = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 3000,
      onAfterChange: function(slick, index) {
          var slides = $('.slick-track').children().not('.slick-cloned');
          if (index >= slides.length) return;
          // $(slides[index]).find('video').each(playVideo);
      }
    };
    $scope.slickHandle = {
    };
}]);


