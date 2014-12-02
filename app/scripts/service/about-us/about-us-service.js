'use strict';
hongcaiApp.factory('AboutUsService', function ($resource, DEFAULT_DOMAIN) {
	return {
		textList: $resource(DEFAULT_DOMAIN + '/siteText/getTextList', {category:'@category'}),
		textDetail: $resource(DEFAULT_DOMAIN + '/siteText/getTextDetail', {textId:'@textId'})
	};
});
