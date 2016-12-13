'use strict';
angular.module('hongcaiApp')
  .controller('SafeCtrl', function($anchorScroll, $scope, $state, $rootScope, $interval, $location, $timeout) {
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
		//风控严谨初始动画效果
		// $(".content-top").css({opacity:0}).hide();
    	if($(window).scrollTop() >= 1400 && $(window).scrollTop() <1800){
       		$('.content-top').show().animate({left:0, opacity: 1 }, 1000,function(){
       			// if($(window).scrollTop() >=1803 || $(window).scrollTop() < 1500){
       				
       			// } 
       		})
       		$('.content-midlle').show().animate({right:0, opacity: 1 }, 1000,function(){
       			// if($(window).scrollTop() >=1803 || $(window).scrollTop() < 1500){
       				
       			// } 
       		})
       		$('.content-bottom').show().animate({right:0, opacity: 1 }, 1000,function(){
       			// if($(window).scrollTop() >=1803 || $(window).scrollTop() < 1500){
       				
       			// } 
       		})
       		// $(".content-top").addClass("animated fadeInLeft fadedelaya");
       		// $(".strict-midlle").addClass("animated fadeInRight fadedelayb");
       		// $(".content-bottom").addClass("animated fadeInRight fadedelayb");
      	}else {
      		$(".content-top").css({left:-48, opacity:1}).show();
      		$(".content-midlle").css({right:-48, opacity:1}).show();
      		$(".content-bottom").css({right:-48, opacity:1}).show();
      		// $(".content-top").removeClass("animated fadeInLeft fadedelaya");
       		// 	$(".strict-midlle").removeClass("animated fadeInRight fadedelayb");
       		// 	$(".content-bottom").removeClass("animated fadeInRight fadedelayb");
      	}
      	//技术保障初始动画
      	$(".technical-content .content>p").css({opacity:0}).hide();
		
      	if ($(window).scrollTop() >= 2361 && $(window).scrollTop() < 5004) {
      		$(".information-security>h4, .data-security>h4").addClass("animated fadeInLeft");
      		$(".system-security>h4").addClass("animated fadeInRight");
	       	// $(".technical-content .content>p").addClass("fade-in");
	       	$(".technical-content .content>p").show().animate({opacity:1}, 1500,function(){})
      	}else {
      		$(".information-security>h4, .data-security>h4").removeClass("animated fadeInLeft");
      		$(".system-security>h4").removeClass("animated fadeInRight");
	       	// $(".technical-content .content>p").removeClass("fade-in");
	       	$(".technical-content .content>p").css({opacity:0}).hide();
      	}
   	});



   	$scope.disableScroll = function(){
   		// left: 37, up: 38, right: 39, down: 40,
   		// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
   		var keys = {37: 1, 38: 1, 39: 1, 40: 1};

   		function preventDefault(e) {
   		  e = e || window.event;
   		  if (e.preventDefault)
   		      e.preventDefault();
   		  e.returnValue = false;  
   		}

   		function preventDefaultForScrollKeys(e) {
   		    if (keys[e.keyCode]) {
   		        preventDefault(e);
   		        return false;
   		    }
   		}

   		if (window.addEventListener) // older FF
   		      window.addEventListener('DOMMouseScroll', preventDefault, false);
		window.onwheel = preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
		window.ontouchmove  = preventDefault; // mobile
		document.onkeydown  = preventDefaultForScrollKeys;

   	}


   	$scope.enableScroll = function(){
   			//Re-enabling the Wheel
   		if(document.attachEvent){ 
   			document.attachEvent('onmousewheel', wheel); 
   		} else if (window.addEventListener){
   			window.addEventListener('DOMMouseScroll', wheel, false);
   		} 
   		window.onmousewheel = document.onmousewheel = wheel;

   	}


	//全屏滚动
	function handle(delta, top){
		if($scope.isHandled){
			return;
		}
    	var fullHeight = 758; // 每个滚动屏幕的高度
    	
    	if (delta<0){	// 向下滚动
			for(var i=0;i<4;i++){
				if(top>i*fullHeight - 83&&top<fullHeight*(i+1) - 83){
					$('html,body').stop(true).animate({
						scrollTop:$('.slide').eq(i+1).offset().top -'83'+'px'
					},500);
							$scope.isHandled = true;
							$scope.disableScroll();
							$timeout(function() {
					          $scope.isHandled = false;
					          $scope.enableScroll();
					        }, 1500);
					
				}
			}
    	}else{  // 向上滚动
			for(var i=0;i<4;i++){
				if(top>i*fullHeight + 83 &&top<fullHeight*(i+1) + 83){
					$('html,body').stop(true).animate({
						scrollTop:$('.slide').eq(i).offset().top -'83'+'px'
					},500);	
							
							$scope.isHandled = true;
							$scope.disableScroll
							$timeout(function() {
					          $scope.isHandled = false;
					          $scope.enableScroll();
					        }, 1500);
				}
			}
		}
    	
 	}
	function wheel(event){

		// 小屏幕不做处理
		if($(window).height()<630){
			return;
		}


    	var delta = 0;
   	 	if (!event) 
   	 		event = window.event;
    	if (event.wheelDelta) {
        	delta = event.wheelDelta/120; 
        	if (window.opera) 
        		delta = -delta;
    	} else if (event.originalEvent && event.originalEvent.detail) {
        	delta = -event.originalEvent.detail/3;
    	}
    	if(delta != 0 ){
    		console.log('delta: ' + delta);
    		var top = document.body.scrollTop || document.documentElement.scrollTop;
    		console.log('top: ' + top);
    		handle(delta, top);
    	}

		
	}



	// 注册滚动事件
	if(document.attachEvent){ 
		document.attachEvent('onmousewheel', wheel); 
	} else if (window.addEventListener){
		window.addEventListener('DOMMouseScroll', wheel, false);
	} 
	window.onmousewheel = document.onmousewheel = wheel;
	

	//资金安全的动画效果
	var timer;
	var fundAnimation = function(index) {
		$('.tab').hide();
		if(index !=2){
			$interval.cancel(timer);
			timer = undefined;
		}
		
		//初始化密码锁的数字位置
		$('.info2 .icon .firstUl').css({'top':'-338px'});
		$('.info2 .icon .secondUl').css({'top':'3px'});
		$('.info2 .icon .thirdUl').css({'top':'-338px'});
		$('.info3 .line').css({'top':'-55px'});
		$(".fund-slide-content .info").css({opacity:0}).hide();
		$(".info").eq(index).show().animate({opacity:1}, 800,function(){
			$(".info").eq(index).find(".tab").show();
			if(index == 0 ) {
				$('.pre').hide();
				$interval.cancel(timer);
				timer = undefined;
				$('.info,.info1 img').addClass("toggle-scale");
			};
			if(index == 1 ) {
				$interval.cancel(timer);
				timer = undefined;
				$('.info2 .icon .firstUl').animate({'top': "0px" },1000);
				$('.info2 .icon .secondUl').animate({'top': "-338px"},1000);
				$('.info2 .icon .thirdUl').animate({'top': "0px"},1000);
			};
			if(index == 2 ) {
				$('.info3 .line').animate({'top': "340px" },2000);
				$('.info3 .line').animate({'top': "-55px" },2000);

					timer = $interval(function(){
						$('.info3 .line').animate({'top': "340px" },2000);
						$('.info3 .line').animate({'top': "-55px" },2000);
					},4000);
					$('.nxt').hide();
				}
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

	// 关于我们动画效果
	$('.banner-li01').show().animate({top:460}, 600,function(){})
	$('.banner-li02').show().animate({top:460}, 1000,function(){})
	$('.banner-li03').show().animate({top:460}, 1300,function(){})
	$('.banner-li04').show().animate({top:460}, 1500,function(){})
	
  });
