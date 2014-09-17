define(['scripts/app'], function (hongcaiApp) {
	hongcaiApp.factory('ProjectFactory', function ($resource, $location) {
    	var DEFAULT_DOMAIN = "http://" + $location.host() + ":" + $location.port() + "/hongcai/api/v1";
    	return {
    		project: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectByID', {id:'@id'}),
    		projectList: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectList')
    	}
    });
});