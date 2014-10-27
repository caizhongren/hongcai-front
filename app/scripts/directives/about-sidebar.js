'use strict';
angular.module('hongcaiApp').directive('aboutsidebar', ['$location', '$rootScope', function($location, $rootScope) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			menus: '='
		},
		link: function postLink(scope, element, attrs, controller) {
			scope.$watch(function() {
				return $location.path();
			}, function(newValue, oldValue) {
				$('a[href]', element).each(function(k, a) {
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
		template: '<div class="col-md-offset-1 col-lg-offset-1 col-md-2 col-lg-2 about-left-area no-padding">' + 
		'<a ng-repeat="m in menus.left" ui-sref="{{m.link}}" href="{{m.href}}" class="tips-area" >' + 
		'<div class="left-show-area left-top-radius"></div>' + 
		'<p class="">{{m.text}}</p>' + 
		'</a>' + 
		'</div>'
	};
}]);
