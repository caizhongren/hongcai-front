hongcaiApp.factory('OrderService', function ($resource, DEFAULT_DOMAIN) {
	return {
		investVerify: $resource(DEFAULT_DOMAIN + '/siteOrder/investVerify', {projectId: '@projectId',amount: '@amount'}),
		transfer: $resource(DEFAULT_DOMAIN + '/yeepay/transfer', {projectId: '@projectId', orderId: '@orderId'}),
		statisticsByUser: $resource(DEFAULT_DOMAIN + '/siteOrder/statisticsByUser', {orderId: '@orderId'}),
		getOrderListByProject: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderListByProject', {projectId: '@projectId'}),
    saveOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/saveOrder', {projectId: '@projectId', investAmount: '@investAmount', giftCount: '@giftCount'}),
	};
});
