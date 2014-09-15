var hongcaiResources = angular.module('hongcaiResources', ['ngResource']);

hongcaiResources.factory('ProjectFactory', function($resource, $location){
	var DEFAULT_DOMAIN = "http://" + $location.host() + ":" + $location.port() + "/hongcai/s/v1";
	return {
		project: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectByID', {id:'@id'}),
		projectList: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectList')
	}
});

