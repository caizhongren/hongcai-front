'use strict';

/**
 * @ngdoc directive
 * @name p2pSiteWebApp.directive:fancybox
 * @description
 * # fancybox
 */
angular.module('hongcaiApp')
  .directive('fancybox', function ($window) {
    return {
      // template: '<div></div>',
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function () {
          var url = attrs.hcPreviewUrl;
          // var opt = attra.hcOption;
          // $window.$.fancybox.open(url);
          // angular.element('img[fancybox]').fancybox();
          $('a.grouped_elements').fancybox();
        });
      }
    };
  });
