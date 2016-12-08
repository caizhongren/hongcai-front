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

	$scope.demo = function (id) {
	    $location.hash(id);
	    $anchorScroll();
	};
	
	//全屏滚动
	function handle(delta){
    	var s = delta + ": ";
    	var fullHeight=$(window).height()>830?$(window).height():1048;
    	var top = document.body.scrollTop || document.documentElement.scrollTop;
		var index=Math.floor(top/fullHeight);
    	if (delta<0){	
			for(var i=0;i<6;i++){
				if(top>i*fullHeight&&top<fullHeight*(i+1)){
					$('html,body').stop(true).animate({
						scrollTop:$('.slide').eq(i+1).offset().top -'80'+'px'
					},500);
				}
			}
    	}else{
			for(var i=0;i<6;i++){
				if(top>i*fullHeight&&top<fullHeight*(i+1)){
					$('html,body').stop(true).animate({
						scrollTop:$('.slide').eq(i).offset().top -'80'+'px'
					},500);	
				}
			}
		}
    	
 	}
	function wheel(event){
    	var delta = 0;
   	 	if (!event) event = window.event;
    	if (event.wheelDelta) {
        	delta = event.wheelDelta/120; 
        if (window.opera) delta = -delta;
    	} else if (event.detail) {
        	delta = -event.detail/3;
    	}
    	if (delta){
    	if($(window).height()>830){
    		handle(delta);
    	}
    	}    
	}
	if (window.addEventListener){
		window.addEventListener('DOMMouseScroll', wheel, false);
		window.onmousewheel = document.onmousewheel = wheel;
	}

  });
