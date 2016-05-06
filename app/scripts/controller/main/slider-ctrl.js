'use strict';
angular.module('hongcaiApp')
  .controller('SliderCtrl', function($scope, $stateParams, $rootScope, $location, MainService) {
    $rootScope.selectPage = $location.path().split('/')[1];

    //http://www.hongcai.com/hongcai-trends?page=0&perPage=5

    $scope.media = [/*{
      mimeType: 'image/png',
      src: 'images/banner-new/banner01.png',
      name: '国有企业入驻宏财网'
    },*/ {
      mimeType: 'image/png',
      src: 'images/banner-new/banner02.png',
      href: 'https://www.hongcai.com/media-reports-detail/213',
      name: '新三板金控第一股严选项目'
    },/* {
      mimeType: 'image/png',
      src: 'images/banner-new/banner03.png',
      href: 'http://mp.weixin.qq.com/s?__biz=MzA5Nzg0MzA5OQ==&mid=400520084&idx=1&sn=972091ed5d1ebceb6a96a0067cbb1294#rd',
      name: '领现金最高50元'
    }, */{
      mimeType: 'image/png',
      src: 'images/banner-new/banner04.png',
      href: '/activity/invite',
      name: '邀好友注册、领150元现金'

    }/*, {
      mimeType: 'image/jpg',
      src: 'images/banner/banner002.jpg',
      href: '/consultant-team',
      name: '专业权威专家团队'
    }, {
      mimeType: 'image/jpg',
      src: 'images/banner/banner005.jpg',
      href: '/safe',
      name: '安全保障'
    }*/];

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
