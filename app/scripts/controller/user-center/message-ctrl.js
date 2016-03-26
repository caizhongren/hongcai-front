'use strict';
angular.module('hongcaiApp')
  .controller('MessageCtrl', function($location, $scope, toaster, $state, $rootScope, $stateParams, UserCenterService) {
    $rootScope.pageTitle = '站内信-要理财，上宏财！';

    $rootScope.selectSide = 'message';


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
        UserCenterService.readOneMsg.get({
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

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.status = $stateParams.status;

    

    /**
     * 加载更多
     */
    $scope.loadPage = function(page, pageSize, status){

      UserCenterService.getUserMsgByStatus.get({
        status: status
      }, function(response) {
        if (response.ret === 1) {
          $scope.currentPage = page;
          $scope.pageSize = pageSize;
          $scope.status = status;

          $scope.count = response.data.count;
          $scope.orderProp = 'id';
          $scope.data = response.data.userMsgList;
          $scope.numberOfPages = function() {
            return Math.ceil($scope.count / $scope.pageSize);
          };
        }
      });

    }

    $scope.loadPage($scope.currentPage, $scope.pageSize, $stateParams.status);


    //markAllMsgRead
    $scope.updateAllMsgStatus = function() {
      UserCenterService.readAllMsg.get({}, function(response) {
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

  });
