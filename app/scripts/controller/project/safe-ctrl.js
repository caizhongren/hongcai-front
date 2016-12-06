'use strict';
angular.module('hongcaiApp')
  .controller('SafeCtrl', function($anchorScroll, $scope, $state, $rootScope, $location) {
	$rootScope.pageTitle = '安全保障' + ' - 要理财，上宏财!';
    $rootScope.selectPage = $location.path().split('/')[1];

    $scope.hsh = $location.hash();

    $scope.addActive = function($event) {
      angular.element($event.target).closest('.col-xs-12').find('.active').removeClass('active');
      angular.element($event.target).closest('li').find('a').addClass('active');
    };

    //banner的tab切换
    $(".banner-tit").click(function(){
		var index = $(this).index('.banner-tit');
		$(".banner-info").hide();
		$('.banner-info').eq(index).slideDown(500);
		$('.banner-tit').removeClass('banner-click1 banner-click2 banner-click3 banner-click4');
		$(this).addClass("banner-click"+(index+1));
	});
	//关闭banner抽屉
	$(".wrapB b").click(function(){
		$(this).parent().parent().slideUp();
		$('.banner-tit').removeClass('banner-click1 banner-click2 banner-click3 banner-click4');
	});

	$scope.demo = function () {
	    $location.hash('test');
	    $anchorScroll();
	};

  });
