define(['scripts/app'], function (hongcaiApp) {
	hongcaiApp.register.factory('ProjectFactory', function ($resource, $location, DEFAULT_DOMAIN) {
    	return {
    		projectDetails: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectDetail', {projectId:'@projectId'}), 
    		projectList: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectList')
    	}
    });
});