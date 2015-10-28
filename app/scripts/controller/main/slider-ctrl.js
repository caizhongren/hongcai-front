'use strict';
angular.module('hongcaiApp')
  .controller('SliderCtrl', ['$scope', '$stateParams', '$rootScope', '$location', function($scope, $stateParams, $rootScope, $location) {
    $rootScope.selectPage = $location.path().split('/')[1];

    //http://www.hongcai.com/hongcai-trends?page=0&perPage=5
    $scope.media = [{
      mimeType: 'image/jpg',
      src: 'images/banner/banner001.png',
      href: '/hongcai-trends'
    },{
      mimeType: 'image/jpg',
      src: 'images/banner/banner002.png',
      href: '/consultant-team'
    },{
      mimeType: 'image/jpg',
      src: 'images/banner/banner003.png',
      href: '/banner-investmentplan'
    }, {
      mimeType: 'image/jpg',
      src: 'images/banner/banner004.png',
      href: 'http://mp.weixin.qq.com/s?__biz=MzA5Njg0Mzk4Mg==&mid=400010012&idx=1&sn=436a7eb0508d0439e898d604c4dd7727#rd'
    },{
      mimeType: 'image/jpg',
      src: 'images/banner/banner005.png',
      href: '/safe'
    }];

        // 首页数据统计
    var indexStatistics = MainService.indexStatistics.get(function(response) {
      if (response.ret === 1) {
        $scope.indexStatic = indexStatistics.data.indexStatic;
      }
    });
    
    $scope.slickConfig = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 6000,
      onAfterChange: function(slick, index) {
        var slides = $('.slick-track').children().not('.slick-cloned');
        if (index >= slides.length) {
          return;
        }
      }
    };
    $scope.slickHandle = {};
  }]);
