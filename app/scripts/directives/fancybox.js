'use strict';

/**
 * @ngdoc directive
 * @name p2pSiteWebApp.directive:fancybox
 * @description
 * # fancybox
 */
angular.module('hongcaiApp')
  .directive('fancybox', function () {
    return {
      // template: '<div></div>',
      restrict: 'A',
      link: function(scope, element) {
        element.bind('click', function () {
          // var url = attrs.hcPreviewUrl;
          // var opt = attra.hcOption;
          // $window.$.fancybox.open(url);
          // angular.element('img[fancybox]').fancybox();
          angular.element('a.grouped_elements').fancybox();
        });
      }
    };
  });
