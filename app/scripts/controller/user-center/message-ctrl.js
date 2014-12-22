'use strict';
hongcaiApp.controller('MessageCtrl', ['$location', '$scope', 'toaster', '$state', '$rootScope', '$stateParams', 'UserCenterService', function ($location, $scope, toaster, $state, $rootScope, $stateParams, UserCenterService) {
	$rootScope.selectSide = 'message';

	UserCenterService.getUserMsgByStatus.get({status: $stateParams.status}, function(response) {
		$scope.status = $stateParams.status;
		if(response.ret === 1) {
			$scope.userMsgList = response.data.userMsgList;
			$scope.orderProp = 'id';
			$scope.currentPage = 0;
			$scope.pageSize = 6;
			$scope.data = [];
			$scope.numberOfPages = function() {
				return Math.ceil($scope.data.length / $scope.pageSize);
			}
			for (var i = 0; i < $scope.userMsgList.length; i++) {
				$scope.data.push($scope.userMsgList[i]);
			}

			$scope.changeStatus = function(status,id){
				var target = angular.element(event.target);
				if(target.hasClass('list-group-item')){

					if(target.find('p').hasClass('unfold')){
						target.find('p').removeClass('unfold');
					}else{
						target.find('p').addClass('unfold');
					}
					
				}else{

					if(target.closest('li').find('p').hasClass('unfold')){
						target.closest('li').find('p').removeClass('unfold');
					}else{
						target.closest('li').find('p').addClass('unfold');
					};

				}

				if(status===0){
					//markSingleMsgRead
					UserCenterService.updateSingleUserMsgStatus.get({'userMsgId':id},function(response){
						if(response.ret === 1){
						}else{
							toaster.pop('error', response.msg);
						}
					});

					if(target.hasClass('list-group-item')){
							target.removeClass('unread-flag');

					}else{
						target.closest('li').removeClass('unread-flag');
					}

				}
			};

			//markAllMsgRead
			$scope.updateAllMsgStatus = function(){
				UserCenterService.updateAllUserMsgStatus.get({},function(response){
					if(response.ret === 1){
					}else{
						toaster.pop('error', response.msg);
					};
				});
			}


		}
	});

}]);
