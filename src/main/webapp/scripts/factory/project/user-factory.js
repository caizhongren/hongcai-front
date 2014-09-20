define(['scripts/app'], function (hongcaiApp) {
	hongcaiApp.factory('UserFactory', function ($resource, $location) {
    	var DEFAULT_DOMAIN = "http://" + $location.host() + ":" + $location.port() + "/hongcai/api/v1";
    	return {
    		userInfo: $resource(DEFAULT_DOMAIN + '/user/getUserInfo', {userId:'@userId'}),
    		projectList: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectList')
    	}
    });
});