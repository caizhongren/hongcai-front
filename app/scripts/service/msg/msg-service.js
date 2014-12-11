'use strict';
hongcaiApp.factory('MsgService', function ($resource, DEFAULT_DOMAIN) {
	return {
		getUnreadMsgCount: $resource(DEFAULT_DOMAIN + '/siteMsg/getUnreadMsgCount')
	};
});
