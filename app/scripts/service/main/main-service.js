hongcaiApp.factory('MainService', function ($resource, DEFAULT_DOMAIN) {
	return {
		projectList: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectList?sortType=false')
	};
});
