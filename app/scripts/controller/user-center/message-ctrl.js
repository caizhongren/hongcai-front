'use strict';
angular.module('hongcaiApp')
  .controller('MessageCtrl', ['$location', '$scope', 'toaster', '$state', '$rootScope', '$stateParams', 'UserCenterService', function($location, $scope, toaster, $state, $rootScope, $stateParams, UserCenterService) {
    $rootScope.selectSide = 'message';
    UserCenterService.getUserMsgByStatus.get({
      status: $stateParams.status
    }, function(response) {
      $scope.status = $stateParams.status;
      if (response.ret === 1) {
        $scope.userMsgList = response.data.userMsgList;
        $scope.orderProp = 'id';
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.data = [];
        $scope.numberOfPages = function() {
          return Math.ceil($scope.data.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.userMsgList.length; i++) {
          $scope.data.push($scope.userMsgList[i]);
        }
        $scope.toggleMessage = function($index){
          $scope.toggleIndex = $index;
          var index = $index + 1;
          $('.list-group-item').siblings().removeClass('bg-grey7').eq(index).addClass('bg-grey7');
          $('.list-group-item').siblings().find('.collapse').removeClass('in').eq(index);
          var targetC = $('.list-group-item').eq(index).find('.collapse').hasClass('in');//判断当前是否为打开状态
          console.log(targetC);
          if(targetC){
            $('.list-group-item').eq(index).find('.collapse').removeClass('in');
          }
        }
        // $scope.changeStatus = function(status,id,$event,$index){
        $scope.changeStatus = function(status, id, $index) {
          var index = $index + 1;
          var targetP = $('.list-group-item').eq(index).find('p');

          if (targetP.hasClass('unfold')) {
            targetP.removeClass('unfold');
          } else {
            targetP.addClass('unfold');
          }

          if (status === 0) {
            //markSingleMsgRead
            UserCenterService.updateSingleUserMsgStatus.get({
              'userMsgId': id
            }, function(response) {
              if (response.ret === 1) {
                UserCenterService.getUnreadMsgCount.get(function(response) {
                  if (response.ret === 1) {
                    $rootScope.unreadCount = response.data.unreadCount;
                  }
                });
              } else {
                toaster.pop('error', response.msg);
              }
            });

            $('.list-group-item').eq(index).removeClass('unread-flag');

          }
        };

        //markAllMsgRead
        $scope.updateAllMsgStatus = function() {
          UserCenterService.updateAllUserMsgStatus.get({}, function(response) {
            if (response.ret === 1) {
              angular.element('li[class]').removeClass('unread-flag');
              UserCenterService.getUnreadMsgCount.get(function(response) {
                if (response.ret === 1) {
                  $rootScope.unreadCount = response.data.unreadCount;
                }
              });
            } else {
              toaster.pop('error', response.msg);
            }
          });
        };
      }
    });

  }]);
