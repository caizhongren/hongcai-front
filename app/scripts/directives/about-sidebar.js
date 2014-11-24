'use strict';
angular.module('hongcaiApp').directive('aboutsidebar', ['$location', function($location) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			menus: '='
		},
		link: function postLink(scope, element) {
			scope.$watch(function() {
				return $location.path();
			}, function(newValue) {
        // $('a[href]', element).each(function(k, a) {
				angular.element('a[href]', element).each(function(k, a) {
					var $a = angular.element(a),
					pattern = $a.attr('href'),
					regexp = new RegExp('^' + pattern + '$', ['i']);
					if(regexp.test(newValue)) {
						$a.addClass('on-it');
					} else {
						$a.removeClass('on-it');
					}

				});
			});
		},
		template: '<div class="col-md-2 col-lg-2 about-left-area">' +
		'<div class="row"><a ng-repeat="m in menus.left" ui-sref="{{m.link}}" href="{{m.href}}" class="tips-area" >' +
		'<div class="left-show-area"></div>' +
		'<p>{{m.text}}</p>' +
		'</a></div></div>'
	};
}]);
