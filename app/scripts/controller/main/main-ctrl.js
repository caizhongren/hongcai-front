'use strict';
hongcaiApp.controller('MainCtrl', ['$scope', '$stateParams', '$rootScope', '$location', 'MainService', 'AboutUsService', 'ProjectService', 'ipCookie', function ($scope, $stateParams, $rootScope, $location, MainService, AboutUsService, ProjectService, ipCookie) {
    var loginName;
    var logout;
    var projectList = MainService.projectList.get(function(response) {
      if(response.ret === 1){
          $scope.projectList = projectList.data.recommend;
          $scope.projectVo = projectList.data.specialRecommend[0];
          $scope.baseFileUrl = projectList.data.baseFileUrl;
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
      // {mimeType: 'image/png', src:'images/banner-1.png', href:'/project-sponsorInstitution/140' },
      // {mimeType: 'image/png', src:'images/banner-2.png', href:'/banner-fourty' },
      {mimeType: 'image/png', src:'images/banner-6.png', href:'/banner-P2B' },
      {mimeType: 'image/png', src:'images/banner-3.png', href:'/banner-nine'},
      {mimeType: 'image/png', src:'images/banner-4.png', href:'/project-activity-group' },
      {mimeType: 'image/png', src:'images/banner-5.png', href:'banner-partner' }
    ];
    $scope.slickConfig = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 6000,
      onAfterChange: function(slick, index) {
          var slides = $('.slick-track').children().not('.slick-cloned');
          if (index >= slides.length) return;
          // $(slides[index]).find('video').each(playVideo);
      }
    };
    $scope.slickHandle = {
    };

    /**
     * 处理推广流量统计
     */
     var from = $stateParams.from;
     if (from){
        ipCookie('utm_from', from, { expires: 60 })
        MainService.trafficStats.get({from: from});
     }

}]);


