'use strict';
hongcaiApp.controller('ProjectCategoryCtrl', ['$scope','$rootScope', '$location', function ($scope, $rootScope, $location) {

  $rootScope.selectPage = $location.path().split('/')[1];
  
  $scope.projectTitle = '宏财网 - 产品介绍';
  $scope.projectCategory = [{'title':'理财项目',
    'content':'平台提供担保保镖，实地认证登多类产品，用户根据审核后的信息，自选合适的劫镖。平台提供担保保镖，实地认证登多类产品，用户根据审核后的信息，自选合适的劫镖。',
    'tips':['项目收益率','期限灵活','100元起投，可小额多笔投资，分散风险','100%本息保障'],
    'url': "root.project-list-query({status: '6,7,8,9,10', minCycle: 0, maxCycle: 100, minEarning: 0, maxEarning: 100, minTotalAmount: 0, maxTotalAmount: 200000000, sortCondition:'release_start_time', sortType: false })"},
   {'title':'宏运当头标',
    'content':'平台提供担保保镖，实地认证登多类产品，用户根据审核后的信息，自选合适的劫镖。平台提供担保保镖，实地认证登多类产品，用户根据审核后的信息，自选合适的劫镖。',
    'tips':['项目收益率','期限灵活','100元起投，可小额多笔投资，分散风险','100%本息保障'],
    'url':"root.project-activity-group"
  }]

}]);

