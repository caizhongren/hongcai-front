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
	//导航栏跳转
	// $anchorScroll.yOffset = +130;
	$scope.demo = function (arg) {
	    $location.hash(arg);
	    $anchorScroll();
	};
	// 风控严谨＋技术保障 初始动画效果
	$(window).scroll(function(){
		console.log($(window).scrollTop());
		//风控严谨初始动画效果
    	if($(window).scrollTop() >= 1443 && $(window).scrollTop() <1567){
       		$(".content-top").addClass("animated fadeInLeft fadedelaya");
       		$(".strict-midlle").addClass("animated fadeInRight fadedelayb");
       		$(".content-bottom").addClass("animated fadeInRight fadedelayb");
      	}else {
      		$(".content-top").removeClass("animated fadeInLeft fadedelaya");
       		$(".strict-midlle").removeClass("animated fadeInRight fadedelayb");
       		$(".content-bottom").removeClass("animated fadeInRight fadedelayb");
      	}
      	//技术保障初始动画
      	if ($(window).scrollTop() >= 2881 && $(window).scrollTop() < 3004) {
      		$(".information-security>h4, .data-security>h4").addClass("animated fadeInLeft");
      		$(".system-security>h4").addClass("animated fadeInRight");
	       	$(".technical-content .content>p").addClass("fade-in");
      	}else {
      		$(".information-security>h4, .data-security>h4").removeClass("animated fadeInLeft");
      		$(".system-security>h4").removeClass("animated fadeInRight");
	       	$(".technical-content .content>p").removeClass("fade-in");
      	}
   	});
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
						scrollTop:$('.slide').eq(i+1).offset().top -'83'+'px'
					},500);
				}
			}
    	}else{
			for(var i=0;i<6;i++){
				if(top>i*fullHeight&&top<fullHeight*(i+1)){
					$('html,body').stop(true).animate({
						scrollTop:$('.slide').eq(i).offset().top -'83'+'px'
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

	//资金安全的动画效果
	var fundAnimation = function(index) {
		$('.tab').hide();
		$(".fund-slide-content .info").css({opacity:0}).hide();
		$(".info").eq(index).show().animate({opacity:1}, 1000,function(){
			$(".info").eq(index).find(".tab").show();
			if(index == 0 ) {
				$('.pre').hide();
				$('.info,.info1 img').addClass("toggle-scale");
				};
			if(index == 1 ) {
					$('.info2 .icon .firstUl').addClass('ratateNum1');
					$('.info2 .icon .secondUl').addClass('ratateNum2');
					$('.info2 .icon .thirdUl').addClass('ratateNum3');
				};
			if(index == 2 ) {
					$('.info3 .line').addClass('highlight-line');
					$('.nxt').hide();
				};
			});	
	}
	//资金安全点击按钮切换动画
	$('#fund-slide p').click(function(){
		var index = $(this).index('#fund-slide p');
		$('#fund-slide p').removeClass('active-tab');
		$(this).addClass('active-tab');
		fundAnimation(index);
		});

	//资金安全左右切换动画
	var leftIndext = $('.pre').index();
	var rightIndex = $('nxt').index();
	if(leftIndext == 0) {
		$('.pre').hide();
	}
	if(rightIndex == 1) {
		$('nxt').hide();
	}
	$(".pre").click(function(){
			var index = $(this).index(".pre");
			fundAnimation(index - 1);
			$("#fund-slide p").removeClass("active-tab");
			$("#fund-slide p").eq(index-1).addClass("active-tab");	
		})
		$(".nxt").click(function() {
			var index = $(this).index(".nxt");
			fundAnimation(index + 1);
			$("#fund-slide p").removeClass("active-tab");
			$("#fund-slide p").eq(index+1).addClass("active-tab");
				
		});

	//运营规范悬浮效果

	var turn = function(target,time,opts){
			target.find('li').hover(function(){
				$(this).find('.front').stop().animate(opts[0],time,function(){
				$(this).hide().next().show().animate(opts[1],time);
			});
			},function(){
				$(this).find('.back').stop().animate(opts[0],time,function(){
				$(this).hide().prev().show().animate(opts[1],time);
			});
			});
		}
	var verticalOpts = [{'width':0,opacity:0},{'width':'339px',opacity:1}];
	turn($('.running-rule-list ul'),200,verticalOpts);


  });
