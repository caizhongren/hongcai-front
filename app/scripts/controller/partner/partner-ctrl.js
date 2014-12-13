'use strict';
hongcaiApp.controller('PartnerCtrl', ['$scope', '$state', '$rootScope', '$stateParams', '$location', function ($scope, $state, $rootScope, $stateParams, $location) {
	$scope.menus = {
            'left': [{
            	'href': '/introduction-of-platform',
                'link': 'root.about-us.introduction-of-platform',
                'text': '宏财简介'},
            {
                'href': '/hongcai-trends',
                'link': 'root.about-us.hongcai-trends',
                'text': '宏财动态'},
            {
                'href': '/web-site-notice',
                'link': 'root.about-us.web-site-notice',
                'text': '网站公告'},
            {
            	'href': '/company-profile',
                'link': 'root.about-us.company-profile',
                'text': '加入宏财'},
            {
            	'href': '/media-reports',
                'link': 'root.about-us.media-reports',
                'text': '媒体报道'},
            {
            	'href': '/link-us',
                'link': 'root.about-us.link-us',
                'text': '联系我们'}]
        };

    $rootScope.selectPage = $location.path().split('/')[1];

}]);
