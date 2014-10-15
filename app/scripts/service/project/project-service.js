hongcaiApp.factory('ProjectService', function ($resource, $location, DEFAULT_DOMAIN) {
	return {
		projectDetails: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectDetail', {projectId:'@projectId'}), 
		projectList: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectList'),
		isAvailableInvest: $resource(DEFAULT_DOMAIN + '/siteProject/isAvailableInvest', {amount: '@amount',projectId:'@projectId'}),
		projectShop: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectShop', {projectId:'@projectId',amount:'@amount'})
	}
});
