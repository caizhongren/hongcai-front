'use strict';
angular.module('hongcaiApp')
  .factory('SessionService', function($http, $resource, $location, DEFAULT_DOMAIN) {
    return {
      set: function(key, value) {
        return sessionStorage.setItem(key, value);
      },
      get: function(key) {
        return sessionStorage.getItem(key);
      },
      destory: function(key) {
        $http.post(DEFAULT_DOMAIN + '/siteUser/destorySession');
        return sessionStorage.removeItem(key);
      }
    };
  });
