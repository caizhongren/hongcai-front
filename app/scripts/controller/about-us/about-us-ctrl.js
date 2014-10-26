hongcaiApp.controller("AboutUsCtrl", ["$scope", "$state", "$rootScope", "$location", "$stateParams", "AboutUsService", function ($scope, $state, $rootScope, $location, $stateParams, AboutUsService) {
	$scope.menus = {
            "left": [{
            	"href": "/introduction-of-platform",
                "link": "root.about-us.introduction-of-platform",
                "text": "平台简介"},
            {
            	"href": "/business-model",
                "link": "root.about-us.business-model",
                "text": "业务模式"},
            {
            	"href": "/company-profile",
                "link": "root.about-us.company-profile",
                "text": "公司简介"},
            {
            	"href": "/web-site-notice",
                "link": "root.about-us.web-site-notice",
                "text": "网站公告"},
            {
            	"href": "/hongcaidynamic",
                "link": "root.about-us.hongcaidynamic",
                "text": "宏财动态"},
            {
            	"href": "/media-reports",
                "link": "root.about-us.media-reports",
                "text": "媒体报道"},
            {
            	"href": "/link-us",
                "link": "root.about-us.link-us",
                "text": "联系我们"}]
        };

}]);
