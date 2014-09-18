define(['scripts/app'], function (hongcaiApp) {
	hongcaiApp.factory('ProjectFactory', function ($resource, $location, DEFAULT_DOMAIN) {
    	return {
    		projectDetail: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectDetail', {projectId:'@projectId'}),
    		projectList: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectList', {status:'@status'})
    	}
    });
});