'use strict';
angular.module('hongcaiApp').directive('drag-scroll', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var imgs = [
                    {
                        title:"百度",
                        src:'images/test/0.png'
                    },
                    {
                        title:"腾讯",
                        src:'images/test/1.png'
                    },
                    {
                        title:"搜狐",
                        src:'images/test/2.png'
                    },
                    {
                        title:"网易",
                        src:'images/test/3.png'
                    },
                    {
                        title:"优酷",
                        src:'images/test/4.png'
                    },
                    {
                        title:"土豆",
                        src:'images/test/5.png'
                    },
                    {
                        title:"雅虎",
                        src:'images/test/6.png'
                    },
                    {
                        title:"网易",
                        src:'images/test/7.png'
                    },
                    {
                        title:"优酷",
                        src:'images/test/8.png'
                    },
                    {
                        title:"土豆",
                        src:'images/test/9.png'
                    },
                    {
                        title:"雅虎",
                        src:'images/test/10.png'
                    }
                ];

                $(function(){
                    $("#slider").sudySlider();
                });
                        console.log(5)
        }
    };
}]);