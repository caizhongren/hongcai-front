'use strict';

/**
 * @ngdoc function
 * @name p2pSiteWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the p2pSiteWebApp
 */
angular.module('p2pSiteWebApp')
  	.controller('MainCtrl', ['$scope', '$resource', function ($scope, $resource) {
      // $scope.projectList = Restangular.all('siteProject/getProjectList?sortType=false');
      // $scope.projectList = Restangular.one('siteProject').all('getProjectList').getList({ sortType: false});
      var ProjectList = $resource('/hongcai/api/v1/siteProject/getProjectList?sortType=false');
      ProjectList.get({}, function (projectList) {
        $scope.projectList = projectList.data.projectList;
      });
      console.log($scope.projectList);
    }])
  	.controller('phoneRegiste', ['$scope', function ($scope) {
  	/*$scope.changeCheckPic = function(){
  		var checkPic = angular.element('checkPic')[0].src;
  		alert(checkPic);
  		if( checkPic == "images/check_01.png"){
  			angular.element('checkPic').src = "images/check_02.png";
  		}else{
  			angular.element('checkPic').src = "images/check_01.png";
  		}*/
  	}])

/*.controller('TooltipDemoCtrl', function($scope, $q, $sce, $tooltip) {

  $scope.tooltip = {title: 'Hello Tooltip<br />This is a multiline message!', checked: false};

  // Controller usage example
  /*
  var myTooltip = $tooltip(angular.element(document.querySelector('#test')), {title: 'Hello tooltip', placement: 'right'});
  $scope.showTooltip = function() {
    myTooltip.$promise.then(myTooltip.show);
  };
  $scope.hideTooltip = function() {
    myTooltip.$promise.then(myTooltip.hide);
  };
  */

//})
;








//JQuery 操作DOM
  	function change_agree_pic(x){
		var Flag = ( x.getAttribute( "src", 2 ) == "images/check_01.png" )
		x.src = Flag ? "images/check_02.png" : "images/check_01.png";
	}
