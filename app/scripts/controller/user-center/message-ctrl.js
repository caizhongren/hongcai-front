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

			console.log($scope.data)

			$scope.changeStatus = function(status,id){
				var target = angular.element(event.target);
				if(target.hasClass('msg-con')){
					
					if(target.hasClass('unfold')){
						target.removeClass('unfold');
					}else{
						target.addClass('unfold');
					}
					
				}else{

					if(target.find('p').hasClass('unfold')){
						target.removeClass('unfold');
					}else{
						target.addClass('unfold');
					}
				}
				console.log(status,id)
				if(status===0){
					//请求接口改status=1
					status = 1;
					console.log(angular.element(event.target))
					
					

				}else {

				}
			}
		}
	});

}]);
