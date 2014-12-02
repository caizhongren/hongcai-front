'use strict';
hongcaiApp.controller('GuaranteeListCtrl', ['$scope', '$stateParams', '$location', 'GuaranteeService' ,function ($scope, $stateParams, $location, GuaranteeService) {
    $scope.sortType = $stateParams.sortType || false ;

    var sponsor = GuaranteeService.guaranteeList.get(function() {
        $scope.guaranteeList = sponsor.data.guaranteeList;
        $scope.media = [];
        var arr = {};
        var m = Math.floor($scope.guaranteeList.length/9);
        var n = $scope.guaranteeList.length%9;
        
        if (m === 0 && n !== 0){
            var s = $scope.guaranteeList.slice(0,n);
            var card = {};
            card.items = s;
            $scope.media.push(card);
        } else if(m !== 0 && n ===0){
            for(i=1;i<=m;i++){
                var s = $scope.guaranteeList.slice((i-1)*9,i*9-1);
                var card = {};
                card.items = s;
                $scope.media.push(card);

            }
        } else if(m !== 0 && n !==0){
            for(i=1;i<=m;i++){
                var s = $scope.guaranteeList.slice((i-1)*9,i*9);
                var card = {};
                card.items = s;
                $scope.media.push(card);
            }

            var t = $scope.guaranteeList.slice(m*9);
            var card = {};
            card.items = t;
            $scope.media.push(card);

        }

        $scope.slickConfig = {
            dots: true,
            autoplay: true,
            autoplaySpeed: 3000,
            onAfterChange: function(slick, index) {
                var slides = $('.slick-track').children().not('.slick-cloned');
                if (index >= slides.length) return;
                // $(slides[index]).find('video').each(playVideo);
            }
        };

        $scope.slickHandle = {};

    });

}]);



