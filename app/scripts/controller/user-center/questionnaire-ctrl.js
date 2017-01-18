'use strict';
angular.module('hongcaiApp')
  .controller('QuestionnaireCtrl', function($scope, $state, $rootScope, $stateParams, $timeout, $alert, UserCenterService) {
  	$scope.showWarning = false;
  	$scope.busy = false;
  	$scope.questionAndAnswer = {};
  	$scope.tppe = '';
  	$scope.ability = '';

  	if(!$rootScope.isLogged){
			$state.go('root.login');
  	}
   	//风险测评问题详情  
    UserCenterService.getQuestionnaire.get({
    	userId: 0,
    	surveyType: 1

    }, function(response){
      if(response && response.ret !== -1) {
      	$scope.questionnaires = response.questionnaires;
      }
    })

    //选择选项
    
    $scope.select = function($event,question,answer) {
    	$scope.mask = true;
    	var el = (function(){
	      if ($event.target.nodeName === 'SPAN') {
	         return angular.element($event.target).parent(); // get li
	      } else {
	         return angular.element($event.target);          // is li
	      }
  	  })();
  	  $scope.questionAndAnswer[question] = answer;
  	  console.log($scope.questionAndAnswer);
  	  el.addClass('active').siblings('li').removeClass('active');
  	  $scope.submitQuestionnaire = function(){
  	  	if($scope.busy == true) {
  	  		return;
  	  	}
  	  	$scope.busy = true;
  	  	$scope.submit($scope.questionAndAnswer);
  	  }
    }
   //提交
    $scope.submit = function(questionAndAnswer) {
   		UserCenterService.questionnaire.post({
	   		userId: 0,
	   		surveyType: 1,
	   		answerJson: questionAndAnswer
	   	}, function(response){
	   	  if(response && response.ret !== -1) {
	   	  	$scope.questionnaires = response.questionnaires;
	   	  	$alert({
	   	  	  scope: $scope,
	   	  	  template: 'views/modal/alert-results.html',
	   	  	  show: true
	   	  	});
	   	  	$scope.ability = function(){
	   	  		if(response.score > 21 && response.score < 40){return '一般';}
	   	  		if(response.score > 40 && response.score < 56){return '较强';}
	   	  		if(response.score > 55 && response.score < 71){return '很强';}
	   	  		if(response.score > 70 && response.score < 151){return '超赞';}
	   	  	}();
	   	  	$scope.type = function(){
	   	  		if(response.score < 35){return '保守型';}
	   	  		if(response.score > 34 && response.score < 60){return '稳健型';}
	   	  		if(response.score > 59){return '稳健型';}
	   	  	}()
	   	  	$timeout(function() {
	   	  		$scope.busy = false;
	   	  	}, 3000);
	   	  }
	   	  if(response.ret === -1 && response.msg) {
	   	  	$scope.warningMsg = response.msg;
	   	  	$scope.showWarning = true;
	   	  	$timeout(function() {
	   	  		$scope.busy = false;
	   	  		$scope.showWarning = false;
	   	  	}, 3000);
	   	  }
	   	})
	  }



  })