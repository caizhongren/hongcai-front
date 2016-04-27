'use strict';
angular.module('hongcaiApp')
  .controller('SliderCtrl', function($scope, $stateParams, $rootScope, $location, MainService) {
    $rootScope.selectPage = $location.path().split('/')[1];

    //http://www.hongcai.com/hongcai-trends?page=0&perPage=5

    $scope.media = [{
      mimeType: 'image/jpg',
      src: 'images/banner/banner008.jpg',
      name: '4000元体验金'
    }, {
      mimeType: 'image/jpg',
      src: 'images/banner/banner007.jpg',
      href: 'https://www.hongcai.com/media-reports-detail/213',
      name: '东兴证券、太平洋证券合作'
    }, {
      mimeType: 'image/jpg',
      src: 'images/banner/banner006.jpg',
      href: 'http://mp.weixin.qq.com/s?__biz=MzA5Nzg0MzA5OQ==&mid=400520084&idx=1&sn=972091ed5d1ebceb6a96a0067cbb1294#rd',
      name: '点赞就送50元'
    }, {
      mimeType: 'image/jpg',
      src: 'images/banner/banner003.jpg',
      href: '/banner-investmentplan',
      name: '宏金盈简介'

    }, {
      mimeType: 'image/jpg',
      src: 'images/banner/banner002.jpg',
      href: '/consultant-team',
      name: '专业权威专家团队'
    }, {
      mimeType: 'image/jpg',
      src: 'images/banner/banner005.jpg',
      href: '/safe',
      name: '安全保障'
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
