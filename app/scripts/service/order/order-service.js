hongcaiApp.factory('OrderService', function ($resource, DEFAULT_DOMAIN) {
	return {
		investVerify: $resource(DEFAULT_DOMAIN + '/siteOrder/investVerify', {projectId: '@projectId',amount: '@amount'})
	};
});
