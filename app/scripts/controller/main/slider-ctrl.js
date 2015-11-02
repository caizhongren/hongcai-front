'use strict';
angular.module('hongcaiApp')
  .controller('SliderCtrl', function($scope, $stateParams, $rootScope, $location, MainService) {
    $rootScope.selectPage = $location.path().split('/')[1];

    //http://www.hongcai.com/hongcai-trends?page=0&perPage=5
    $scope.media = [{
      mimeType: 'image/jpg',
      src: 'images/banner/banner001.jpg',
      href: '/hongcai-trends'
    },{
      mimeType: 'image/jpg',
      src: 'images/banner/banner002.jpg',
      href: '/consultant-team'
    },{
      mimeType: 'image/jpg',
      src: 'images/banner/banner003.jpg',
      href: '/banner-investmentplan'
    }, {
      mimeType: 'image/jpg',
      src: 'images/banner/banner004.jpg',
      href: 'http://mp.weixin.qq.com/s?__biz=MzA5Njg0Mzk4Mg==&mid=400423810&idx=4&sn=8fae955a68ffd81eace88c4382414dbf'
    },{
      mimeType: 'image/jpg',
      src: 'images/banner/banner005.jpg',
      href: '/safe'
    }];

        // 首页数据统计
    MainService.indexStatistics.get(function(response) {
      if (response.ret === 1) {
        $scope.indexStatic = response.data.indexStatic;
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
  });
