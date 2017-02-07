'use strict';
angular.module('hongcaiApp')
  .controller('QuestionnaireCtrl', function($scope, $state, $rootScope, $timeout, $alert, UserCenterService) {
  	$scope.showWarning = false;
  	$scope.busy = false;
  	$scope.questionAndAnswer = {};
  	$scope.tppe = '';
  	$scope.ability = '';

  	if(!$rootScope.isLogged){
			$state.go('root.login');
  	}

   	//风险测评问题详情  
   	$scope.getQuestionnaire = function(){
   		UserCenterService.getQuestionnaire.get({
   			userId: 0,
   			surveyType: 1
   		}, function(response){
   		  if(response && response.ret !== -1) {
   		  	$scope.questionnaires = response;
   		  }
   		})
   	};
    $scope.getQuestionnaire();

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
  	  el.addClass('active').siblings('li').removeClass('active');
  	  $scope.submitQuestionnaire = function(){
  	  	if($scope.busy == true) {
  	  		return;
  	  	}
  	  	$scope.busy = true;
  	  	$scope.submit($scope.questionAndAnswer);
  	  }
    };

   //提交
    $scope.submit = function(questionAndAnswer) {
   		UserCenterService.questionnaire.post({
	   		userId: 0,
	   		surveyType: 1,
	   		answerJson: questionAndAnswer
	   	}, function(response){
	   	  if(response && response.ret !== -1) {
	   	  	$scope.questionnaires = response.questionnaires;
	   	  	$scope.getQuestionnaire();
	   	  	$alert({
	   	  	  scope: $scope,
	   	  	  template: 'views/modal/alert-results.html',
	   	  	  show: true
	   	  	});
	   	  	var score1 = response.score1,
	   	  			score2 = response.score2; 
	   	  	$scope.ability = function(){
	   	  		if(score1 > 21 && score1 < 41){return '一般';}
	   	  		if(score1 > 40 && score1 < 56){return '较强';}
	   	  		if(score1 > 55 && score1 < 71){return '很强';}
	   	  		if(score1 > 70){return '超赞';}
	   	  	}();
	   	  	$scope.type = function(){
	   	  		if(score2 < 35){return '保守型';}
	   	  		if(score2 > 34 && score2 < 60){return '稳健型';}
	   	  		if(score2 > 59){return '进取型';}
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
	  };



  })