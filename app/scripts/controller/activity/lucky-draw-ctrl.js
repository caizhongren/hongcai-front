'use strict';
hongcaiApp.controller('LuckyDrawCtrl', ['$scope', '$state', 'UserCenterService', '$alert', '$timeout', '$http', 'analytics', function($scope, $state, UserCenterService, $alert, $timeout, $http, analytics) {
  $scope.status = 0;

  $scope.ScrollImgLeft = function() { 
    var speed=30; 
    var scroll_begin = document.getElementById("scroll_begin"); 
    var scroll_end = document.getElementById("scroll_end"); 
    var scroll_div = document.getElementById("scroll_div"); 
    scroll_end.innerHTML=scroll_begin.innerHTML; 
    function Marquee(){ 
    if(scroll_end.offsetWidth-scroll_div.scrollLeft<=0) 
    scroll_div.scrollLeft-=scroll_begin.offsetWidth; 
    else 
    scroll_div.scrollLeft++; 
    } 
    var MyMar=setInterval(Marquee,speed); 
    scroll_div.onmouseover=function() {clearInterval(MyMar);} 
    scroll_div.onmouseout=function() {MyMar=setInterval(Marquee,speed);} 
  };

  UserCenterService.getLuckyList.get(function(response) {
    if (response.ret === 1) {
      $scope.lotteryRecords = response.data.lotteryRecords;
      $scope.hongYunProject = response.data.hongYunProject;
      $scope.tuhaoProject = response.data.tuhaoProject;
      
      var winnerNum = $scope.lotteryRecords.length;
      $scope.checkRender = function() {
        $timeout.cancel(mytimeout);
        if(winnerNum > 4 && angular.element('#scroll_begin span').length === winnerNum){
          $scope.ScrollImgLeft();
        } else {
          var mytimeout = $timeout($scope.checkRender,50);
        }
      }
      var mytimeout = $timeout($scope.checkRender,1);
    } else {
      $scope.msg = response.msg;
      var alertDialog = $alert({
        scope: $scope,
        template: 'views/modal/alert-dialog.html',
        show: true
      });
    }
  });

  $scope.luckyDraw = function() {
    UserCenterService.luckyDraw.get(function(response) {
      if (response.ret === 1) {
        var hongbaoLevel = response.data.userHongbaoLottery.prizeLevel;
        if (hongbaoLevel === 0) {
          // 土豪状态
          $scope.status = 2;
        } else if (hongbaoLevel === 1) {
          // 普通宏包状态。
          $scope.status = 1;
        }
      } else {
        $scope.msg = response.msg;
        var alertDialog = $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
      }
    })
  };

  $scope.goToRule = function() {
    $state.go($scope.isLogged === true ? 'root.userCenter.gift-overview' : 'root.login');
  }

  



}]);
