hongcaiApp.factory('MainService', function ($resource, DEFAULT_DOMAIN) {
	return {
		projectList: $resource(DEFAULT_DOMAIN + '/siteProject/indexProjectList'),
		indexStatistics: $resource(DEFAULT_DOMAIN + '/siteOrder/indexStatistics')
	};
});
