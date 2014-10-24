hongcaiApp
.controller("AboutUsCtrl", ["$scope", "$state", "$rootScope", "$location", "$stateParams", "AboutUsService", function ($scope, $state, $rootScope, $location, $stateParams, AboutUsService) {
	$rootScope.flag = 0;
	$rootScope.selectPage = $location.path().split('/')[1];

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
            	"href": "/web-site-announcement",
                "link": "root.about-us.web-site-announcement",
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

}])
.controller("IntroductionCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "AboutUsService", function ($scope, $state, $rootScope, $stateParams, AboutUsService) {
	$rootScope.flag = 1;
}])
.controller("BusinessModelCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "AboutUsService", function ($scope, $state, $rootScope, $stateParams, AboutUsService) {
	$rootScope.flag = 2;
}])
.controller("CompanyProfileCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "AboutUsService", function ($scope, $state, $rootScope, $stateParams, AboutUsService) {
	$rootScope.flag = 3;
}])
.controller("WebSiteCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "AboutUsService", function ($scope, $state, $rootScope, $stateParams, AboutUsService) {
	$rootScope.flag = 4;
}])
.controller("HongcaiDynamicCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "AboutUsService", function ($scope, $state, $rootScope, $stateParams, AboutUsService) {
	$rootScope.flag = 5;
}])
.controller("MediaReportsCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "AboutUsService", function ($scope, $state, $rootScope, $stateParams, AboutUsService) {
	$rootScope.flag = 6;
}])
.controller("LinkUsCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "AboutUsService", function ($scope, $state, $rootScope, $stateParams, AboutUsService) {
	$rootScope.flag = 7;
}])
.controller("NewsCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "AboutUsService", function ($scope, $state, $rootScope, $stateParams, AboutUsService) {

}])
;
