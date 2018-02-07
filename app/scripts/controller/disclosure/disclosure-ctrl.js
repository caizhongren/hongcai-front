'use strict';
angular.module('hongcaiApp')
  .controller('disclosureCtrl', ['$scope', '$state', '$rootScope', '$location', function($scope, $state, $rootScope, $location) {
    $scope.menus = {
      'left': [{
        'href': '/disclosure/information',
        'link': 'root.disclosure.information',
        'text': '备案信息'
      },
      {
        'href': '/disclosure/risk-management',
        'link': 'root.disclosure.risk-management',
        'text': '风险管理'
      },
      {
        'href': '/disclosure/organization',
        'link': 'root.disclosure.organization',
        'text': '组织信息'
      },
      {
        'href': '/disclosure/business-information',
        'link': 'root.disclosure.business-information',
        'text': '经营信息'
      },
      {
        'href': '/disclosure/policies-regulations',
        'link': 'root.disclosure.policies-regulations',
        'text': '政策法规'
      }]
    };

    $rootScope.selectPage = $location.path().split('/')[1];
  }]);
