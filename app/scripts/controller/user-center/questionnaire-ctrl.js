'use strict';
angular.module('hongcaiApp')
  .controller('QuestionnaireCtrl', function($scope, $state, $rootScope, $stateParams, UserCenterService) {

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
    $scope.questionAndAnswer = {};
    $scope.select = function($event,question,answer) {
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
  	  $scope.fun = function(){$scope.submitQuestionnaire($scope.questionAndAnswer);}
    }

   //提交
    $scope.submitQuestionnaire = function() {
   		UserCenterService.questionnaire.post({
	   		userId: 0,
	   		surveyType: 1,
	   		answerJson: $scope.questionAndAnswer
	   	}, function(response){
	   	  if(response && response.ret !== -1) {
	   	  	$scope.questionnaires = response.questionnaires;
	   	  }
	   	})
	  }

  })